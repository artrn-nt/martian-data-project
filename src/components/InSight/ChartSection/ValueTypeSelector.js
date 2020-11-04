import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useValueType, useValueTypeUpdate } from '../../Contexts/ValueTypeContext'

const ValueTypeSelect = styled.button`
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        background-color: ${props => props.color};
        opacity: ${props => props.opacity};
        transform: rotate(45deg) translate(-85%, 0%);
        transition: opacity 250ms ease-in-out;
    }
`

const ValueTypeSelector = ({valueType, text, color}) => {

    const handleValueType = useValueTypeUpdate()
    const valueTypeState = useValueType()

    const [disabled, setDisabled] = useState(false)
    
    useEffect(() => {
        let count = 0
        let activeRemainingSelector = null
        setDisabled(false)

        for (let key in valueTypeState) {
            if (valueTypeState[key]) count++
        }

        if (count === 1) {
            for (let key in valueTypeState) {
                if (valueTypeState[key]) activeRemainingSelector = key
            }

            setDisabled(document.querySelector(`.${valueType}-selector`).className.includes(activeRemainingSelector))

        }

    }, [valueTypeState, valueType])

    return (
        <ValueTypeSelect
            className={`${valueType}-selector`} 
            onClick={() => handleValueType(valueType)}
            disabled={disabled}
            color={color}
            opacity={valueTypeState[valueType] ? 1 : 0}
        >
            <span>{text}</span>
        </ValueTypeSelect>
    )
}

export default ValueTypeSelector