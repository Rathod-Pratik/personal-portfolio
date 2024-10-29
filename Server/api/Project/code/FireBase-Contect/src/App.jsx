import 'react-toastify/dist/ReactToastify.css';
import Signup from './Components/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
const App = () => {


  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
