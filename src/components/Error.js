import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../scss/components/utilities/Error.scss'

const Error = () => {

    const errorMsgRef = useRef()

    const tl = useRef()

    useEffect(() => {   
        const line_1 = errorMsgRef.current.children[0]
        const line_2 = line_1.nextSibling

        tl.current = gsap.timeline()
            .fromTo([line_1.children[0], line_2.children[0]], {
                yPercent: 100,
                opacity: 0
            }, {
                duration: 1.1,
                // delay: .25,
                delay: 6.575,
                yPercent: 0,
                opacity: 1,
                // ease: 'power3.inOut',
                ease: 'power3.out',
                stagger: {
                    amount: .225
                }
            })

    }, [])

    return (
        <div className='error-msg' ref={errorMsgRef}>
            <div className='line'>
                <span>Oops! It seems that an error occured while loading data.</span>
            </div>
            <div className='line'>
                <span>Please try to refresh the page or come back later.</span>
            </div>
        </div>
    )
}

export default Error
