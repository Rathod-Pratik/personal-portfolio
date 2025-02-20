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
import LoadingBar from "react-top-loading-bar";
import ScrollToTop from "./Component/Scroll/scroll";

const App = () => {

  const [progress, setProgress] = useState(0);

  useEffect(()=>{
    AOS.init();
  },[])
  return (
      <BrowserRouter>
       <LoadingBar
        color="blue"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar setProgress={setProgress} />
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home setProgress={setProgress}  />} />
          <Route path="/notes" element={<Note setProgress={setProgress}  />} />
          <Route path="/codes" element={<Code setProgress={setProgress}  />} />
          <Route path="/project" element={<Project setProgress={setProgress}  />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
};

export default App;
