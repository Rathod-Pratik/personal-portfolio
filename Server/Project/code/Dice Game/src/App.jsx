import React, { useState } from 'react'
import Home from './Component/Home'
import Gameplay from './Component/Gameplay'
import './reset.css';

const App = () => {
  const [start,setstart]=useState(false);
  const Toggle=()=>{
    setstart((prev)=>(!prev));
  }
  return (
    <div>
      {start? <Gameplay/>  : <Home toggle={Toggle}/>}
    </div>
  )
}

export default App
