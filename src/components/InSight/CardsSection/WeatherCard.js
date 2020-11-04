import React from 'react'
import '../../../scss/components/InSight/CardsSection.scss'

const WeatherCard = ({ dataObj }) => {

    const Measures = () => {
        return (
            <p className='measures'>
                <span className='value-field av'>
                    <span className='chip av' />
                    Average: {dataObj.data.av !== undefined ?
                        <span className='value'>{(dataObj.data.av)} {dataObj.unit}</span> :
                        <span className='value'>N/A</span>}
                </span>
                <span className='value-field min'>
                    <span className='chip min' />
                    Min: {dataObj.data.mn !== undefined ?
                        <span className='value'>{(dataObj.data.mn)} {dataObj.unit}</span> :
                        <span className='value'>N/A</span>}
                </span>
                <span className='value-field max'>
                    <span className='chip max' />
                    Max: {dataObj.data.mx !== undefined ?
                        <span className='value'>{(dataObj.data.mx)} {dataObj.unit}</span> :
                        <span className='value'>N/A</span>}
                </span>
                <span className='value-field'>
                    Total samples: {dataObj.data.ct !== undefined ?
                        <span className='value'>{dataObj.data.ct}</span> :
                        <span className='value'>N/A</span>}
                </span>
            </p>
        )
    }

    const UnavailableMeasures = () => <p className='measures'>
        <span className='value-field'>N/A</span>
        <span className='value-field'>Please try to refresh or come back later</span>
    </p>

    return (
        <div className="weather-card">
            <p className="date">
                <span className="martian-date">Sol {dataObj.sol}</span>
                <span className="earth-date">{dataObj.earthDate !== undefined ? dataObj.earthDate : 'N/A'}</span>
            </p>
            {dataObj.data !== undefined ? <Measures /> : <UnavailableMeasures />}
        </div>
    )
}

export default WeatherCard
