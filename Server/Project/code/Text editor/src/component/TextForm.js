import React from "react";
import { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("NewText");

  // State for the bold style
  const [mybold, setBold] = useState({
    fontWeight: "normal",
  });
  // State for the italic style
  const [myitalic, setitalic] = useState({
    fontStyle: "normal",
  });

  // Function to toggle bold text style
  function boldText() {
    if (mybold.fontWeight === "normal") {
      setBold({
        fontWeight: "bold",
      });
    } else {
      setBold({
        fontWeight: "normal",
      });
    }
  }
  // Function to toggle italic text style
  function italicText() {
    if (myitalic.fontStyle === "normal") {
      setitalic({
        fontStyle: "italic",
      });
    } else {
      setitalic({
        fontStyle: "normal",
      });
    }
  }

  // Function to handle text change in the textarea
  function changetext(event) {
    setText(event.target.value);
  }

  // Function to convert text to uppercase
  function touppercase() {
    let NewText = text.toUpperCase();
    setText(NewText);
  }

  // Function to convert text to lowercase
  function tolowercase() {
    let NewText = text.toLowerCase();
    setText(NewText);
  }

  // Function to clear the text
  function clearText() {
    let NewText = "";
    setText(NewText);
  }

  return (
    <>
      <div className="container">
        <h2 className="text-center" style={{color:props.mode==='dark'?'white':'black'}}>Word Editor</h2>
        <div className="mb-3">
          <textarea
          style={{...mybold, ...myitalic,color:props.mode==='dark'?'white':'black',backgroundColor:props.mode==='dark'?'gray':'white'}}
            className="form-control"
            rows="8"
            value={text}
            onChange={changetext}
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mx-1 my-1" onClick={touppercase}>
            To Uppercase
          </button>
          <button className="btn btn-primary mx-1 my-1" onClick={tolowercase}>
            To lowercase
          </button>
          <button className="btn btn-primary mx-1 my-1" onClick={clearText}>
            Clear text
          </button>
          <button className="btn btn-primary mx-1 my-1" onClick={boldText}>
            Bold text
          </button>
          <button className="btn btn-primary mx-1 my-1" onClick={italicText}>
            italic text
          </button>
        </div>
      </div>
      <div className="container">
        <h2 className="text-center" style={{color:props.mode==='dark'?'white':'black'}}>Count</h2>
        <p className="text-center" style={{color:props.mode==='dark'?'white':'black'}}>
          there are {text.split(" ").filter((element)=>{return element.length!==1}).length} Words and{" "}
          {text.length} characters in this paragraph <br /> It takes{" "}
          {0.25 * text.split(" ").filter(Boolean).length} seconds to read
        </p>
        <h2 className="text-center" style={{color:props.mode==='dark'?'white':'black'}} >Preview</h2>
        <p  className="text-center" style={{ ...mybold, ...myitalic,color:props.mode==='dark'?'white':'black' }}>{text}</p>
      </div>
    </>
  );
}
