import React, { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import WeatherCard from './WeatherCard'
import '../../../scss/components/InSight/CardsSection.scss'

// Customed hook
const usePrevious = (obj) => {
    const ref = useRef()
    useEffect(() => {
        ref.current = obj
    })
    return ref.current
}

const CardsSection = ({ sols, earthDates, data }) => {

    const [rearrangedData, setRearrangedData] = useState([])
    const [different, setDifferent] = useState(true)
    const [introFinished, setIntroFinished] = useState(false)
    
    const prevData = usePrevious(data)
    
    useEffect(() => {
        if (JSON.stringify(data) === JSON.stringify(prevData)) setDifferent(false)
        else setDifferent(true)
    }, [data, prevData])

    const rearrangeData = useCallback(() => {

        return sols.map((sol, i) => [sol, earthDates[i]]).map((item, j) => [...item, data[1][j]])
            .map(arrItem => {
                return {
                    sol: arrItem[0],
                    earthDate: arrItem[1],
                    unit: data[0],
                    data: arrItem[2] !== undefined ?
                        {
                            'av': arrItem[2][0] !== undefined && arrItem[2][0] !== null ? arrItem[2][0].toFixed(1) : undefined,
                            'ct': arrItem[2][1] !== undefined && arrItem[2][1] !== null ? arrItem[2][1] : undefined,
                            'mn': arrItem[2][2] !== undefined && arrItem[2][2] !== null ? arrItem[2][2].toFixed(1) : undefined,
                            'mx': arrItem[2][3] !== undefined && arrItem[2][3] !== null ? arrItem[2][3].toFixed(1) : undefined
                        }
                        :
                        undefined
                }
            })

    }, [sols, earthDates, data])

    const introAnimation = useRef()

    useEffect(() => {
        if (!introFinished) {
            introAnimation.current = gsap.fromTo('.cards-section', {
                opacity: 0,
                y: 28
            }, {
                delay: 7.6,
                duration: .9,
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                onComplete: () => setIntroFinished(true)
            })

            return () => introAnimation.current.kill()
        }
    }, [introFinished])
    
    useEffect(() => {
        if (!introFinished) {
            setRearrangedData(rearrangeData())
        }
    }, [rearrangeData, introFinished])

    useEffect(() => {
        if (different && introFinished) {
            setRearrangedData(rearrangeData())
            gsap.fromTo('.cards-section',
            {
                opacity: 0
            },
            {
                duration: .7,
                opacity: 1,
                ease: 'power2.inOut'
            })
        }
    }, [different, rearrangeData, introFinished])

    // console.log(rearrangedData)

    return (
        <section className='cards-section'>
            {rearrangedData.map((obj, index) => {
                return <WeatherCard key={index + 6742} dataObj={obj} />
            })}
        </section>
    )
}

export default CardsSection
