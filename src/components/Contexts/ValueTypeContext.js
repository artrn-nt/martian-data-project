import React, { useState, useContext } from 'react'

const ValueTypeContext = React.createContext()
const ValueTypeUpdateContext = React.createContext()

const useValueType = () => useContext(ValueTypeContext)
const useValueTypeUpdate = () => useContext(ValueTypeUpdateContext)

const ValueTypeProvider = ({children}) => {

    const [valueType, setValueType] = useState({
        av: true,
        mn: false,
        mx: false
    })

    const handleValueType = (type) => {
        switch (type) {
            case 'av':
                setValueType(prevState => ({
                    av: !prevState.av,
                    mn: prevState.mn,
                    mx: prevState.mx
                }))
                break
            case 'mn':
                setValueType(prevState => ({
                    av: prevState.av,
                    mn: !prevState.mn,
                    mx: prevState.mx
                }))
                break
            case 'mx':
                setValueType(prevState => ({
                    av: prevState.av,
                    mn: prevState.mn,
                    mx: !prevState.mx
                }))
                break
            default:
                setValueType({
                    av: true,
                    mn: false,
                    mx: false
                })
        }
    }


    return (
        <ValueTypeContext.Provider value={valueType}>
            <ValueTypeUpdateContext.Provider value={handleValueType}>
                {children}
            </ValueTypeUpdateContext.Provider>
        </ValueTypeContext.Provider>
    )

}

export {ValueTypeProvider, useValueType, useValueTypeUpdate}