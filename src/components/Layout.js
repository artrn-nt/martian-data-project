import React from 'react'
import Header from './Header/Header'
import AppTitle from './AppTitle/AppTitle'
import '../scss/components/Layout.scss'

const Layout = ({ children, mounted, setMounted }) => {

    return (
        <div className='container'>
            <Header mounted={mounted} setMounted={setMounted} />
            <AppTitle />
            <main className='content'>
                {children}
            </main>
        </div>
    )
}

export default Layout
