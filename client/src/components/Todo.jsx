import React, { useEffect, useState } from 'react'
// Axios
import axios from 'axios'

// Environmental variable
const API = import.meta.env.VITE_API_URL

const Task = () => {

  const [data, setData] = useState('')

  useEffect(()=>{
    const data = async () => {
      try{
        const res = await axios.get(API)
        setData(res.data)
      }
      catch(err){
        console.log('Error', err);
      }
    }

    data()
  }, [])

  console.log(data);

  return (
    <>

    </>
  )
}

export default Task