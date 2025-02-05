import React, { useEffect } from 'react'
import Hero from '../../Component/Home/Home'
import Expertise from '../../Component/Home/Expertise'
import Language from '../../Component/Home/Language'
import Contact from '../../Component/Home/Contect'

const Home = () => {
  return (
        <div className='overflow-hidden'>
    <Hero/>
    <Expertise/>
    <Language/>
    <Contact/>
    </div>
  )
}

export default Home
