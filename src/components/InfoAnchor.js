import React, { useEffect } from 'react'
import gsap from 'gsap'
import '../scss/components/utilities/InfoAnchor.scss'
import { ReactComponent as RightArrow } from '../assets/tap.svg'

const InfoAnchor = ({ mounted, setMounted }) => {

    useEffect(() => {

        if (!mounted) {
            gsap.to('.anchor-wrap', {
                delay: 7.2,
                duration: 1.15,
                opacity: 1,
                ease: 'power3.out'
            })
        } else {
            gsap.to('.anchor-wrap', {
                duration: 0,
                opacity: 1,
                ease: 'power3.out'
            })
        }

        return () => setMounted(true)

    }, [mounted, setMounted])

    return (
        <div className='anchor-wrap'>
            <a href='https://api.nasa.gov/'>
                <span>Learn more about NASA APIs</span>
                <div className='svg-wrap'>
                    <RightArrow />
                </div>
            </a>
        </div>
    )
}

export default InfoAnchor
