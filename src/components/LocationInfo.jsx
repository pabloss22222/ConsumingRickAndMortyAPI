import React from 'react'
import "./styles/LocationInfo.css"


const LocationInfo = ({dataLocation}) => {


  return (

    <div className='location__div'>
        <article className="location__info">
            <h2 className="location__name">{dataLocation?.results[0].name}</h2>
            <ul className="location__list">
                <li className="location__item">
                    <div className="location__label">Type</div>
                    <div className='location__value'>{dataLocation?.results[0].type}</div>

                </li>
                <li className="location__item">
                    <div className="location__label">Dimension</div>
                    <div className='location__value'>{dataLocation?.results[0].dimension}</div>

                </li>
                <li className="location__item">
                    <div className="location__label">Population</div>
                    <div className='location__value'>{dataLocation?.results[0].residents.length}</div>
                </li>
            </ul>

        </article>
        
       
    </div>
  )
}

export default LocationInfo