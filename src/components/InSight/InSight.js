import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import PresentationSection from './PresentationSection'
import ChartSection from './ChartSection/ChartSection'
import CardsSection from './CardsSection/CardsSection'
import InfoAnchor from '../InfoAnchor'
import Error from '../Error'
import { ValueTypeProvider } from '../Contexts/ValueTypeContext'
import { useParam } from '../Contexts/ParamContext'
import { useError, useErrorUpdate } from '../Contexts/ErrorContext'
import useWindowSize from '../../utilities/useWindowSize'
import '../../scss/components/InSight/Insight.scss'

const InSight = ({ mounted, setMounted }) => {

    const size = useWindowSize()
    const { param: paramState } = useParam()

    // Fetched data
    const [data, setData] = useState([])

    // Dealing with an error or the lack of data
    const error = useError()
    const setError = useErrorUpdate()

    // Extracted / Processed data

    // Dates
    const [sols, setSols] = useState([])
    const [earthDates, setEarthDates] = useState([])
    // const [season, setSeason] = useState(null)

    // Params
    const [celsiusTemperatures, setCelsiusTemperatures] = useState([])
    const [fahrenheitTemperatures, setFahrenheitTemperatures] = useState([])
    const [kmhWindsSpeeds, setKmhWindsSpeeds] = useState([])
    const [msWindsSpeeds, setMsWindsSpeeds] = useState([])
    const [pressures, setPressures] = useState([])

    // For opening page animation
    const insightContainerRef = useRef()
    const tween = useRef()

    // Fetching data on mount + Insight container background animation
    useEffect(() => {
        // fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.REACT_APP_API_KEY}&feedtype=json&ver=1.0`)
        fetch(`https://api.nasa.gov/insight_weather/?api_key=Hrlm07c329d9awhkb3JOyYzLVvzxLl2XvOSPe7Fe&feedtype=json&ver=1.0`)
            .then(res => res.json())
            .then((res) => {
                setData(res)
            })
            .catch(() => {
                setError(true)
            })

        gsap.to(insightContainerRef.current, { duration: 0, delay: 0, css: { visibility: 'visible' } })

        gsap.to(insightContainerRef.current, {
            duration: 1.15,
            delay: 6.975,
            background: 'linear-gradient(43deg, #262221, #7f8081 83%)',
            ease: 'power3.out'
        })

    }, [setError])

    // PresentationSection + ChartSection animation
    useEffect(() => {
        if (!error) {
            const presentationSection = insightContainerRef.current.children[0]
            const chartSection = presentationSection.nextSibling

            tween.current = gsap.fromTo([presentationSection, chartSection], {
                opacity: 0,
                y: 28
            }, {
                delay: 7.6,
                duration: .9,
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                onComplete: () => {
                    document.body.style.overflow = 'auto'
                }
            })

            return () => tween.current.kill()

        }
    }, [error])

    // Setting states
    useEffect(() => {

        // const keys = Object.keys(data)
        // const isNoDigit = (key) => !/^\d+$/.test(key)
        // if (keys.every(isNoDigit) && data.length !== 0) setError(true)

        // For missing data
        if (typeof data['sol_keys'] !== 'undefined' && data['sol_keys'].length === 0) {
            setError(true)
        }

        const arr = []
        const paramDataArr = Array.of([], [], [])
        const earthDates = []

        for (let i in data) {
            if (/^\d+$/.test(i)) {
                arr.push(data[i])
            }
        }

        arr.forEach((obj) => {
            if (obj !== undefined && obj !== null && (Object.keys(obj).length !== 0 && obj.constructor === Object)) {
                earthDates.push(formatEarthDate(obj['First_UTC']))
                paramDataArr[0].push(obj['AT'])
                paramDataArr[1].push(obj['HWS'])
                paramDataArr[2].push(obj['PRE'])
            } else {
                earthDates.push(undefined)
                paramDataArr[0].push(undefined)
                paramDataArr[1].push(undefined)
                paramDataArr[2].push(undefined)
            }
        })

        setSols(Object.keys(data).filter(key => /^\d+$/.test(key)))
        setEarthDates(earthDates)
        setCelsiusTemperatures(paramDataArr[0].map((obj) => obj !== undefined ? Object.values(obj) : undefined))
        setFahrenheitTemperatures(paramDataArr[0].map((obj) => obj !== undefined ?
            Object.values(obj).map((value, index) => {
                if (value !== undefined && value !== null) {
                    if (index !== 1) return Number(convertToFarhenheit(value).toFixed(2))
                    else return value
                } else return undefined
            })
            :
            undefined
        ))
        setMsWindsSpeeds(paramDataArr[1].map((obj) => obj !== undefined ? Object.values(obj) : undefined))
        setKmhWindsSpeeds(paramDataArr[1].map((obj) => obj !== undefined ?
            Object.values(obj).map((value, index) => {
                if (value !== undefined && value !== null) {
                    if (index !== 1) return Number(convertToKmh(value).toFixed(2))
                    else return value
                } else return undefined
            })
            :
            undefined
        ))
        setPressures(paramDataArr[2].map((obj) => obj !== undefined ? Object.values(obj) : undefined))

    }, [data, setError])

    // Some methods
    const formatEarthDate = (earthDate) => {
        const dateArr = earthDate.slice(0, earthDate.indexOf('T')).split('-')
        return [dateArr[1], dateArr[2], dateArr[0]].join('.')
    }

    const passData = () => {
        if (paramState.isActiveAt.active && paramState.isActiveAt.unit1) return ['°C', celsiusTemperatures]
        else if (paramState.isActiveAt.active && paramState.isActiveAt.unit2) return ['°F', fahrenheitTemperatures]
        else if (paramState.isActiveHws.active && paramState.isActiveHws.unit1) return ['km/h', kmhWindsSpeeds]
        else if (paramState.isActiveHws.active && paramState.isActiveHws.unit2) return ['m/s', msWindsSpeeds]
        else if (paramState.isActivePre.active) return ['Pa', pressures]
    }

    const convertToFarhenheit = (val) => {
        return (val * (9 / 5)) + 32
    }

    const convertToKmh = (val) => {
        return (val * 3600) / 1000
    }

    // Returns
    if (error) {
        return (
            <div className='insight-fail-container' ref={insightContainerRef}>
                <Error />
            </div>
        )
    }

    else {
        return (
            <div className='insight-success-container' ref={insightContainerRef}>
                <PresentationSection />
                <ValueTypeProvider>
                    <ChartSection
                        sols={sols}
                        earthDates={earthDates}
                        data={passData()}
                    />
                </ValueTypeProvider>
                <CardsSection
                    sols={sols}
                    earthDates={earthDates}
                    data={passData()}
                />
                {size.width <= 1225 && <InfoAnchor mounted={mounted} setMounted={setMounted} />}
            </div>
        )
    }
}

export default InSight
