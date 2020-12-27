import React, { useState, useEffect, useRef } from 'react'
import { useParamUpdate } from '../../Contexts/ParamContext'
import gsap from 'gsap'
import '../../../scss/components/InSight/ChartSection.scss'

const ChartTitle = ({ param }) => {

    const { handleAnimationRunning } = useParamUpdate()

    const chartTitleRef = useRef()
    const [title, setTitle] = useState('Temperature per (martian) day (°C)')

    useEffect(() => {

        gsap.fromTo(chartTitleRef.current, {
            onStart: () => {
                handleAnimationRunning(true)
            },
            yPercent: 100,
            opacity: 0
        }, {
            delay: .2,
            duration: .75,
            yPercent: 0,
            opacity: 1,
            ease: 'power3.out',
            onComplete: () => {
                handleAnimationRunning(false)
            }
        })

        const setChartTitle = () => {

            let title = ''

            if (param === '°C') title = 'Temperature per (martian) day (°C)'
            else if (param === '°F') title = 'Temperature per (martian) day (°F)'
            else if (param === 'km/h') title = 'Winds speeds per (martian) day (km/h)'
            else if (param === 'm/s') title = 'Winds speeds per (martian) day (m/s)'
            else if (param === 'Pa') title = 'Pressure per (martian) day (Pa)'

            return title
        }


        setTitle(setChartTitle())

    }, [param, handleAnimationRunning])

    return (
        <div className='chart-title-line'>
            <h2 className='chart-title' ref={chartTitleRef}>{title}</h2>
        </div>
    )
}

export default ChartTitle
