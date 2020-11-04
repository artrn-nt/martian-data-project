import React, { useState, useContext } from 'react'

const ErrorContext = React.createContext()
const ErrorUpdateContext = React.createContext()

const useError = () => useContext(ErrorContext)
const useErrorUpdate = () => useContext(ErrorUpdateContext)

const ErrorProvider = ({ children }) => {

    const [error, setError] = useState(false)

    return (

        <ErrorContext.Provider value={error}>
            <ErrorUpdateContext.Provider value={setError}>
                {children}
            </ErrorUpdateContext.Provider>
        </ErrorContext.Provider>

    )

}

export { ErrorProvider, useError, useErrorUpdate }