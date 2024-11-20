"use client"
import React from 'react'
import Home from '@/components/Home'
import Expertise from '@/components/Expertise'
import Language from '@/components/Language'
import Contect from '@/components/Contect'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className='overflow-hidden'>
    <Home/>
    <Expertise/>
    <Language/>
    <Contect/>
    <Footer/>
    </div>
  )
}

export default page
