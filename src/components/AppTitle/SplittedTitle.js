import React, { forwardRef } from 'react'
import '../../scss/components/AppTitle.scss'

const SplittedTitle = (props, ref)=> {

    const str = 'data'

    return (
        <p ref={ref} className='splitted-text' arial-label={str} role='heading'>
            <span className="braces">
                <span className='brace'>{'{'}</span>
                <span className='brace'>{'}'}</span>
            </span>
            {str.split('').map((char, i) => {
                return <span key={i + 2739} className='char' arian-hidden='true'>{char}</span>
            })}
        </p>
    )
}

export default forwardRef(SplittedTitle)