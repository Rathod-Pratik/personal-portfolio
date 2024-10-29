import "./App.css";
import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [text, setText] = useState("Dark mode");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setText("Light mode");
      document.body.style.backgroundColor = "#1f3b51";
      document.title = "Rathod Pratik - Home Dark mode";
    } else {
      setMode("light");
      setText("Dark mode");
      document.body.style.backgroundColor = "white";
      document.title = "Rathod Pratik - Home Light mode";
    }
  };

  const changeMode = (backgroundColor, navClass) => {
    document.body.style.backgroundColor = backgroundColor;
    const Bmod = document.querySelector("nav");
    if (Bmod) {
      Bmod.classList.remove("blue-nav", "Red-nav", "Green-nav");
      Bmod.classList.add(navClass);
    }
  };

  const Bmode = () => changeMode("#61b9ff", "blue-nav");
  const Rmode = () => changeMode("#1d1d1d", "Red-nav");
  const Gmode = () => changeMode("#2d2d2d", "Green-nav");

  const btnColor = mode === "light" ? "btn btn-outline-dark mx-2" : "btn btn-outline-light mx-2";

  return (
    <>
      <Router>
        <div>
          <Navbar
            title="Rathod Pratik"
            mode={mode}
            btncolor={btnColor}
            btn={text}
            Blue={Bmode}
            Red={Rmode}
            Green={Gmode}
            togglemode={toggleMode}
          />
          <div className="my-4 container">
            <Routes>
              <Route path="/" element={<TextForm title="Enter text to check" mode={mode} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
