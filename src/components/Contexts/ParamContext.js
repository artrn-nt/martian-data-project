import React, { useState, useContext, useCallback } from 'react'

const ParamContext = React.createContext()
const ParamUpdateContext = React.createContext()

const useParam = () => useContext(ParamContext)
const useParamUpdate = () => useContext(ParamUpdateContext)

const ParamProvider = ({ children }) => {

    const [param, setParam] = useState({
        isActiveAt: { active: true, unit1: true, unit2: false },
        isActiveHws: { active: false, unit1: true, unit2: false },
        isActivePre: { active: false }
    })

    const [animationRunning, setAnimationRunning] = useState(false)

    const handleParam = (str) => {
        switch (str) {
            case 'at':
                setParam(prevState => ({
                    isActiveAt: { active: true, unit1: prevState.isActiveAt.unit1, unit2: prevState.isActiveAt.unit2 },
                    isActiveHws: { active: false, unit1: prevState.isActiveHws.unit1, unit2: prevState.isActiveHws.unit2 },
                    isActivePre: { active: false }
                }))
                break
            case 'hws':
                setParam(prevState => ({
                    isActiveAt: { active: false, unit1: prevState.isActiveAt.unit1, unit2: prevState.isActiveAt.unit2 },
                    isActiveHws: { active: true, unit1: prevState.isActiveHws.unit1, unit2: prevState.isActiveHws.unit2 },
                    isActivePre: { active: false }
                }))
                break
            case 'pre':
                setParam(prevState => ({
                    isActiveAt: { active: false, unit1: prevState.isActiveAt.unit1, unit2: prevState.isActiveAt.unit2 },
                    isActiveHws: { active: false, unit1: prevState.isActiveHws.unit1, unit2: prevState.isActiveHws.unit2 },
                    isActivePre: { active: true }
                }))
                break
            case 'cel':
                setParam(prevState => ({
                    isActiveAt: { active: true, unit1: true, unit2: false },
                    isActiveHws: { active: false, unit1: prevState.isActiveHws.unit1, unit2: prevState.isActiveHws.unit2 },
                    isActivePre: { active: false }
                }))
                break
            case 'far':
                setParam(prevState => ({
                    isActiveAt: { active: true, unit1: false, unit2: true },
                    isActiveHws: { active: false, unit1: prevState.isActiveHws.unit1, unit2: prevState.isActiveHws.unit2 },
                    isActivePre: { active: false }
                }))
                break
            case 'kmh':
                setParam(prevState => ({
                    isActiveAt: { active: false, unit1: prevState.isActiveAt.unit1, unit2: prevState.isActiveAt.unit2 },
                    isActiveHws: { active: true, unit1: true, unit2: false },
                    isActivePre: { active: false }
                }))
                break
            case 'ms':
                setParam(prevState => ({
                    isActiveAt: { active: false, unit1: prevState.isActiveAt.unit1, unit2: prevState.isActiveAt.unit2 },
                    isActiveHws: { active: true, unit1: false, unit2: true },
                    isActivePre: { active: false }
                }))
                break
            default:
                setParam(prevState => ({
                    isActiveAt: { active: prevState.isActiveAt.active, unit1: prevState.isActiveAt.unit1, unit2: prevState.isActiveAt.unit2 },
                    isActiveHws: { active: prevState.isActiveHws.active, unit1: prevState.isActiveHws.unit1, unit2: prevState.isActiveHws.unit2 },
                    isActivePre: { active: prevState.isActivePre.active }
                }))
        }
    }

    const handleAnimationRunning = useCallback((bool) => {
        setAnimationRunning(bool)
    }, [setAnimationRunning])

    return (
        <ParamContext.Provider value={{ param, animationRunning }}>
            <ParamUpdateContext.Provider value={{ handleParam, handleAnimationRunning }}>
                {children}
            </ParamUpdateContext.Provider>
        </ParamContext.Provider>
    )

}

export { ParamProvider, useParam, useParamUpdate }