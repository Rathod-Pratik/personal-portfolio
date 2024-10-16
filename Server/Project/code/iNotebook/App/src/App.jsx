import LoadingBar from 'react-top-loading-bar'
import React, { useState ,lazy,Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import SignUp from "./Component/SignUp";
import Home from "./Component/Home";
import About from "./Component/About";
import NoteState from "./Component/contect/notes/Notestate";
import Alert from "./Component/Alert";
const App = () => {
  const[alert,setalert]=useState(null);
  const showAlert=(message,color,bgcolor)=>{
   setalert({
    message:message,
    color:color,
    bgcolor:bgcolor
   })
   setTimeout(() => {
    setalert(null);
   }, 1500);
  }
  const [progress, setProgress] = useState(0)

const Login = lazy(() => import('./Component/Login'));
  return (
    <NoteState  showAlert={showAlert} >
    <Router>
      <Navbar setProgress={setProgress}  />
      <LoadingBar
        color='#c4bfbf'
        progress={progress}
      />
      <Alert alert={alert}/>
      <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setProgress={setProgress} showAlert={showAlert} />} />
        <Route path="/signup" element={<SignUp setProgress={setProgress} showAlert={showAlert} />} />
      </Routes>
      </Suspense>
    </Router>
    </NoteState>
  );
};
export default App;