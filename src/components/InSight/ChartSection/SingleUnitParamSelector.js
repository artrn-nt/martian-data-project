import React from 'react'
import styled from 'styled-components'
import { useParam, useParamUpdate } from '../../Contexts/ParamContext'

const ParamSelector = styled.button`
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        background-color: #262221;
        border: 1.2px solid #f7f6f2;
        opacity: ${props => props.opacity};
        transform: rotate(45deg) translate(-85%, 0%);
        transition: opacity 300ms ease-in-out;
    }
`

const SingleUnitParamSelector = ({ param, classParam, paramStateKey }) => {

    const paramState = useParam()
    const handleParam = useParamUpdate()

    return (
        <ParamSelector
            className='param-selector-pre'
            style={{ 
                boxShadow: paramState[paramStateKey].active ? '2.5px 2.5px 3px #262221' : '3px 3px 4px #262221',
                transform: paramState[paramStateKey].active ? 'scale(.97)' : 'scale(1)'
             }}
            onClick={() => handleParam(classParam)}
            opacity={paramState[paramStateKey].active ? '1' : '0'}
        >
            <span>{param}</span>
        </ParamSelector>
    )
}

export default SingleUnitParamSelector
