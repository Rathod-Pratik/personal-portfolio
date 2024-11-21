"use client"
import React from 'react'
import Home from '@/app/_Component/HomePage/Home'
import Expertise from '@/app/_Component/HomePage/Expertise'
import Language from '@/app/_Component/HomePage/Language'
import Contect from '@/app/_Component/HomePage/Contect'
import Footer from '@/app/_Component/HomePage/Footer'

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
