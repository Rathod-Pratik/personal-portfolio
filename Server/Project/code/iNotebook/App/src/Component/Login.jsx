import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    let history=useNavigate();
    const [credentials,setcredentials]=useState({email: "" ,password: "" })

  const handlesubmit = async (e) => {
    e.preventDefault();
    props.setProgress(10);
    const response = await fetch(`https://inotebookbackend-ten.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password }),
    });
    
    props.setProgress(50);
    const json = await response.json();
    
     if(json.success===true){
      props.setProgress(100);
      //save th auth token and redirect
      props.showAlert("Login successfully","text-green-800","bg-green-50");
      localStorage.setItem('token',json.authtoken);
      localStorage.setItem('name',json.name);
      history("/");
    }
    else{
       props.setProgress(100);
      props.showAlert("Enter valid credentials","text-red-800","bg-red-50");
     }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[90%] md:w-[31rem] md:h-auto mt-[10vh] md:mt-[5vh] rounded-lg shadow-sm shadow-white m-auto md:m-0 md:mx-auto md:flex md:justify-center" 
    style={{ boxShadow: "0 4px 15px 4px rgba(255, 255, 255, 0.5)" }}>
    
    <div className="w-full md:w-[31rem]">
      <h1 className="text-white text-[30px] md:text-[35px] py-[18px] flex justify-center">
      Login in to your account
      </h1>
  
      <form className="w-full mx-auto py-[20px] px-[10px]" onSubmit={handlesubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your email
          </label>
          <input
            value={credentials.email}
            onChange={onChange}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>
  
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your password
          </label>
          <input
            autoComplete="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            type="password"
            id="password"
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
  
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <p className="text-white my-2 text-center">Don't have account <Link className="text-blue-700" to={"/signup"}>Sign up</Link> now</p>
      </form>
    </div>
  </div>
  

  );
};

export default Login;
