
import { useState} from 'react'
import axios from 'axios'

const useFetch = (url) => {

    const [dataContainer, setDataContainer] = useState()
    const [hasError, setHasError] = useState(false)
   
    const getData=()=>{
  
      axios.get(url)
      .then(response =>{
        setDataContainer(response.data)  
        setHasError(false)
      })
      .catch(error =>{
        console.log(error)
        setHasError(true)
      })
    };

  return [dataContainer, getData, hasError ]

}
export default useFetch