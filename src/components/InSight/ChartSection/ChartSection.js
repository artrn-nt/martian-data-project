import React, { useState, useEffect, useCallback } from 'react'
import useWindowSize from '../../../utilities/useWindowSize'
import { useValueType } from '../../Contexts/ValueTypeContext'
import { Line } from 'react-chartjs-2'
import ChartTitle from './ChartTitle'
import DoubleUnitParamSelector from './DoubleUnitParamSelector'
import SingleUnitParamSelector from './SingleUnitParamSelector'
import ValueTypeSelector from './ValueTypeSelector'
import '../../../scss/components/InSight/ChartSection.scss'

const ChartSection = ({ sols, earthDates, data }) => {

    const valueTypeState = useValueType()
    const size = useWindowSize()
    
    const [dataObj, setDataObj] = useState([])
    const [dataSets, setDataSets] = useState([{
        label: 'Temperature av',
        data: dataObj.map(obj => obj.av)
    }])

    useEffect(() => {
        setDataObj(data[1].map(arrItem => {
            if (arrItem !== undefined) {
                return {
                    av: arrItem[0] !== undefined && arrItem[0] !== null ? arrItem[0] : undefined,
                    ct: arrItem[1] !== undefined && arrItem[1] !== null ? arrItem[1] : undefined,
                    mn: arrItem[2] !== undefined && arrItem[2] !== null ? arrItem[2] : undefined,
                    mx: arrItem[3] !== undefined && arrItem[3] !== null ? arrItem[3] : undefined
                }
            } else return {
                av: null, 
                ct: null,
                mn: null,
                mx: null
            }
        }))    
    }, [data])
    
    const handleDataSets = useCallback(() => {

        const dataForCharts = []

        for (let key in valueTypeState) {
            if (valueTypeState[key]) {
                dataForCharts.push([key, dataObj.map(obj => obj[key])])
            }
        }

        const setLabel = (type) => {
            if (data[0] === '°C' || data[0] === '°F') return 'temp_' + type
            else if (data[0] === 'km/h' || data[0] === 'm/s') return 'winds_speeds_' + type
            else if (data[0] === 'Pa') return 'pre_' +  type
        }

        const setFillMode = (type) => {
            if (type === 'av') {
                if (valueTypeState.av && valueTypeState.mn && valueTypeState.mx) return '+2'
                else if (valueTypeState.av && valueTypeState.mx) return '+1'
                else return false
            } else if (type === 'mn') {
                if (valueTypeState.av && valueTypeState.mn && valueTypeState.mx) return '-1'
                else if (valueTypeState.av && valueTypeState.mn) return '-1'
                else if (valueTypeState.mn && valueTypeState.mx) return '+1'
                else return false
            }
        }

        const setGradientColor = (color1, color2) => {
            const canvas = document.getElementsByTagName('canvas')[0]
            const ctx = canvas.getContext('2d')
            const gradient = ctx.createLinearGradient(0, 0, 0, 595)
            gradient.addColorStop(0, color1)
            gradient.addColorStop(1, color2)
            return gradient
        }

        // console.log(dataForCharts)

        setDataSets(dataForCharts.map(arrItem => {
            if (arrItem[0] === 'av') {
                return {    
                    label: setLabel('av'),
                    data: arrItem[1],
                    backgroundColor: setGradientColor('#e77920', '#f7f6f2'),
                    fill: setFillMode('av'),
                    borderColor: '#f7f6f2',
                    borderWidth: 1,
                    pointBackgroundColor: '#f7f6f2',
                    pointStyle: 'rectRot',
                    pointBorderWidth: 1.5,
                    pointRadius: 4
                }
            } else if (arrItem[0] === 'mn') {
                    return {    
                    label: setLabel('mn'),
                    data: arrItem[1],
                    backgroundColor: setGradientColor('#f7f6f2', '#57a2c3'),
                    fill: setFillMode('mn'),
                    borderColor: '#57a2c3',
                    borderWidth: 1,
                    pointBackgroundColor: '#57a2c3',
                    pointStyle: 'rectRot',
                    pointBorderWidth: 1.5,
                    pointRadius: 4
                }
            } else if (arrItem[0] === 'mx') {
                    return {    
                    label: setLabel('mx'),
                    data: arrItem[1],
                    fill: false,
                    borderColor: '#e77920',
                    borderWidth: 1,
                    pointBackgroundColor: '#e77920',
                    pointStyle: 'rectRot',
                    pointBorderWidth: 1.5,
                    pointRadius: 4
                }
            } else return null
        }))

    }, [valueTypeState, dataObj, data])


    useEffect(() => {
        handleDataSets()
    }, [handleDataSets])

    const setStepSize = () => {
        if (size.width > 768) {
            if (data[0] === '°C' || data[0] === 'km/h') return 10
            else if (data[0] === '°F') return 20
            else if (data[0] === 'm/s') return 5
            else return 10
        } else {
            if (data[0] === '°C' || data[0] === 'km/h') return 20
            else if (data[0] === '°F') return 40
            else if (data[0] === 'm/s') return 10
            else return 20
        }
    }

    return (
        <section className='chart-section'>
            <div className='chart-wrap'>
                <ChartTitle param={data[0]}/>
                <Line
                    data={{
                        labels: sols.map((sol, i) => ['Sol ' + sol, earthDates[i]]),
                        datasets: dataSets
                        // datasets: []
                    }}
                    options={{
                        responsive: true,
                        title: {
                            display: true,
                            position: 'top',
                            padding: size.width <= 768 ? size.width <= 462 ? 14 : 16.5 : 19,
                            fontSize: size.width <= 768 ? size.width <= 462 ? 11 : 13.5 : 16,
                            fontStyle: 300
                        },
                        legend: {
                            display: false,
                        },
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        padding: 9,
                                        fontFamily: "'Oswald', sans-serif",
                                        fontColor: '#f7f6f2',
                                        fontSize: size.width <= 768 ? size.width <= 462 ? 11.5 : 12.25 : 13
                                    },
                                    gridLines: { 
                                        color: '#f7f6f2',
                                        lineWidth: .4,
                                        tickMarkLength: 9,
                                        drawBorder: false,
                                        zeroLineColor: '#f7f6f2',
                                        zeroLineWidth: .4
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: false,
                                        stepSize: setStepSize(),
                                        padding: 9,
                                        fontFamily: "'Oswald', sans-serif",
                                        fontColor: '#f7f6f2',
                                        fontSize: size.width <= 768 ? size.width <= 462 ? 11.5 : 12.25 : 13
                                    },
                                    gridLines: {
                                        color: '#f7f6f2',
                                        lineWidth: .4,
                                        tickMarkLength: 7,
                                        drawBorder: false,
                                        borderDash: [5,6],
                                        zeroLineColor: '#f7f6f2',
                                        zeroLineWidth: .4,
                                        zeroLineBorderDash: [5, 6]
                                    }
                                }
                            ]
                        },
                        animation: {
                            duration: 650,
                            easing: 'easeOutQuad'
                        },
                        tooltips: {
                            enabled: false
                        }
                    }}
                />
            </div>

            <div className='selectors-row'>

                <div className='param-selectors'>

                    <DoubleUnitParamSelector
                        param='Temperatures'
                        classParam='at'
                        units={['C°', 'F°']}
                        classUnits={['cel', 'far']}
                        paramStateKey='isActiveAt' />

                    <DoubleUnitParamSelector
                        param='Winds Speeds'
                        classParam='hws'
                        units={['km/h', 'm/s']}
                        classUnits={['kmh', 'ms']}
                        paramStateKey='isActiveHws' />

                    <SingleUnitParamSelector param='Pressures' classParam='pre' paramStateKey='isActivePre' />

                </div>

                <div className='value-type-selectors'>

                    <ValueTypeSelector valueType='av' text='av' color='#f7f6f2'/>
                    <ValueTypeSelector valueType='mn' text='min' color='#57a2c3'/>
                    <ValueTypeSelector valueType='mx' text='max' color='#e77920'/>

                </div>

            </div>
        </section>
    )
}

export default ChartSection
