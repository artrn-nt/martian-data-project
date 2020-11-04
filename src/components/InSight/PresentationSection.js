import React from 'react'
import '../../scss/components/InSight/PresentationSection.scss'

const PresentationSection= () => {
    return (
        <section className="presentation-section">
            <p className="text">
                    <span>A single web page application</span>
                    <span>where you can check last Mars weather reports</span>
                    <span>provided by the NASA InSight lander.</span>
                    <span>All data are fetched directly from the NASA InSight API.</span>
            </p>
            <div className="img-container">
                <img className="insight-pic" src={require('../../assets/nasa-insigth.jpg')} alt='InSight lander' />
            </div>
        </section>
    )
}

export default PresentationSection
