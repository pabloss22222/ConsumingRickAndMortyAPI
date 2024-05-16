import { useState, useEffect, useRef } from 'react'
import './App.css'
import getRandomNumber from './assets/services/getRandomNumber'
import useFetch from './hooks/useFetch'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import axios from 'axios'

function App() {
  
  const [locationName, setLocationName] = useState('Citadel of Ricks');
  const url= `https://rickandmortyapi.com/api/location/?name=${locationName}`;
  const [dataLocation, getLocationByName, hasError] = useFetch(url);
  const [suggestions, setSuggestions] = useState([])    
  const [dataLocationTotal, setDataLocationTotal] = useState([]); 

  useEffect(()=>{
    getLocationByName()
    setLocationName('')
  },[]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalPages = 7;
        const locationData = [];

        for (let i = 1; i <= totalPages; i++) {
          const response = await axios(`https://rickandmortyapi.com/api/location?page=${i}`);
          locationData.push(...response.data.results);
        }
        setDataLocationTotal(locationData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  },[]);
  
  
  useEffect(() => {
  
      if (locationName.length > 1) {
        const filteredLocations = dataLocationTotal.filter(loc =>
          loc.name.toLowerCase().startsWith(locationName.toLowerCase())
        );
        setSuggestions(filteredLocations);
      }else {
        setSuggestions([]); 
      
      }

  }, [locationName]);

  
  const inputName= useRef();

  const handleInputChange = () => {
    setLocationName(inputName.current.value.trim());
  };

  const handleSuggestionClick = (name) => {
    setLocationName(name);
    // getLocationByName(); 
    // setLocationName('');

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getLocationByName(); 
    setLocationName('');
  };
  
  return (

    <div>
      <header className="app__header">
        <h1 className='title'>The Universe of  Rick And Morty</h1>        
      </header>
      
      <form className="app__form" onSubmit={handleSubmit} >
        <input 
          className="app__input" ref={inputName} type="text" placeholder="Enter name of location"
          value={locationName}  
          onChange={handleInputChange}  
        />
        <button className="app__button" type='submit'>Search</button>
      </form> 
      
      {suggestions.length > 0 && (   
          <ul className='app__list'>
            {suggestions.map(loc => (
              <li className='app__list__name' key={loc.id} onClick={() => handleSuggestionClick(loc.name)}>
                {loc.name}
              </li>
            ))}
          </ul>)
      }

      { hasError? <h2>💥 The location entered does not exist </h2>:(
      <article>
        <div>
          < LocationInfo dataLocation ={dataLocation}/>
        </div>
        <div className="card__container">
          {
            dataLocation?.results[0].residents.map(residentUrl => (< ResidentCard key={residentUrl} residentUrl={residentUrl}/>))
          }
        </div>
        <br/>
        
      </article>)
       }
    </div>

  )
}
export default App;
