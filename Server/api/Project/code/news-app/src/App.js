import "./App.css";
import React, {useState } from 'react';
import Navbar from './Component/Navbar';
import News from "./Component/News";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App=(props)=>{
 const page = 10;
const apiKey = process.env.REACT_APP_API_KEY;

  const [progress,setProgress]=useState(0);
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={setProgress}   apiKey={apiKey}  key="general" page={page} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress={setProgress}   apiKey={apiKey}  key="business" page={page} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={setProgress}   apiKey={apiKey}  key="entertainment" page={page} country="in" category="entertainment" />} />
            <Route path="/health" element={<News setProgress={setProgress}   apiKey={apiKey}  key="health" page={page} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={setProgress}   apiKey={apiKey}  key="science" page={page} country="in" category="science" />} />
            <Route path="/sports" element={<News setProgress={setProgress}   apiKey={apiKey}  key="sports" page={page} country="in" category="sports" />} />
            <Route path="/technology" element={<News setProgress={setProgress}   apiKey={apiKey}  key="technology" page={page} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App