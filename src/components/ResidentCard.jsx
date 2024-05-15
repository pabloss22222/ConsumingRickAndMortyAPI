import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import "./styles/ResidentCard.css"


const ResidentCard = ({residentUrl}) => {

  const [dataResident, getDataResident] = useFetch(residentUrl)

  useEffect(()=>{

    getDataResident()

  },[]);
    
  return (
    <div>
        <article className="resident">
             <header className="resident__header">
                 <h3 className="resident__name">{dataResident?.name}</h3> 
                 <img className="resident__image" src={dataResident?.image} alt='img' />
                 <div className={`resident__status__container ${dataResident?.status}`}>
                     <div>{dataResident?.status=='Dead'? <i className='bx bx-ghost bx-tada' ></i>: (dataResident?.status=='Alive'? <i className='bx bx-heart bx-burst' ></i>: <i className='bx bx-question-mark bx-tada' ></i>) }</div> 
                     <div className="resident__status">{dataResident?.status}</div>
                 </div>
             </header>
            <section className="resident__body">

            <ul className="resident__list">
                <li className="resident__item">
                    <div className="resident__label"><i className='bx bxs-circle'></i> Specie</div>
                    <div className="resident__value">{dataResident?.species}</div>
                </li>
                <li className="resident__item">
                    <div className="resident__label"><i className='bx bxs-circle'></i> Origin</div>
                    <div className="resident__value">{dataResident?.origin.name}</div>
                </li>
                <li className="resident__item">
                    <div className="resident__label"><i className='bx bxs-circle'></i> Eppisodes where apper</div>
                    <div className="resident__value">{dataResident?.episode.length}</div>
                </li>
 
            </ul>
        </section>

        </article>
    </div>

  )
}
export default ResidentCard