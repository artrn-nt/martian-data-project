import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import StrokedTitle from './StrokedTitle'
import SplittedTitle from './SplittedTitle'
import '../../scss/components/AppTitle.scss'

const AppTitle = () => {

    const [finished, setFinished] = useState(false)

    const strokedTitleRef = useRef()
    const splittedTitleRef = useRef()

    const tl = useRef(null)

    useEffect(() => {

        tl.current = gsap.timeline()
            .to(strokedTitleRef.current, {
                delay: 4.4,
                duration: .9,
                attr: {
                    width: 215,
                    height: 39.394
                },
                strokeWidth: 2.1,
                top: 17.103,
                left: '1.05rem',
                transform: 'translate3d(0, 0, 0)',
                ease: 'power1.out'
            })
            .to(splittedTitleRef.current.children[0], {
                duration: .2,
                opacity: 1,
                ease: 'power2.in'
            }, "+=.1")
            .to(splittedTitleRef.current.children[0], {
                duration: .6,
                right: 0,
                left: 0,
                ease: 'power1.out',
                onComplete: () => {
                    setFinished(true)
                }
            }, "+=.15")

        return () => tl.current.kill()
        
    }, [])

    return (
        <>
            <StrokedTitle ref={strokedTitleRef} finished={finished} />
            <SplittedTitle ref={splittedTitleRef} />
        </>
    )
}

export default AppTitle
