import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from "./Pages/Home/Home";
import Navbar from "./Component/Home/Navbar";
import About from "./Pages/About/About";
import Footer from "./Component/Footer/Footer";
import Note from "./Pages/Note/Note";
import Project from "./Pages/Project/Project";
import Code from "./Pages/Code/Code";

const App = () => {
  useEffect(()=>{
    AOS.init();
  },[])
  return (
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Note />} />
          <Route path="/codes" element={<Code />} />
          <Route path="/project" element={<Project />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
};

export default App;
