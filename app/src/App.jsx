import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Home from './Component/Home/Home'
import Expertise from './Component/Expertise/Expertise'
import Language from './Component/Language/Language'
import Contect from './Component/Contect/contect'
import Footer from './Component/Footer/Footer'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Expertise/>
      <Language/>
      <Contect/>
      <Footer/>
    </div>
  )
}

export default App
