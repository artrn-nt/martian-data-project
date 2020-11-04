import React from 'react'
import InfoAnchor from '../InfoAnchor'
import useWindowSize from '../../utilities/useWindowSize'
import { useError } from '../Contexts/ErrorContext'
import '../../scss/components/Header/Header.scss'

const Header = ({ mounted, setMounted }) => {

    const size = useWindowSize()
    const error = useError()

    return (
        <header>
            {size.width > 1225 && !error ? <InfoAnchor mounted={mounted} setMounted={setMounted} /> : null}
        </header>
    )
}

export default Header
