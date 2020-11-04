import React, { useState, useCallback } from 'react'
import Layout from './components/Layout'
import { ParamProvider } from './components/Contexts/ParamContext'
import { ErrorProvider } from './components/Contexts/ErrorContext'
import InSight from './components/InSight/InSight'
import './scss/components/App.scss'

const Home = () => {

  const [mounted, setMounted] = useState(false)

  const setMountedWrapper = useCallback(bool => {
    setMounted(bool)
  }, [setMounted])

  return (
    <div className='app'>
      <ErrorProvider>
        <Layout mounted={mounted} setMounted={setMountedWrapper}>
          <ParamProvider>
            <InSight mounted={mounted} setMounted={setMountedWrapper} />
          </ParamProvider>
        </Layout>
      </ErrorProvider>
    </div>
  )
}

export default Home
