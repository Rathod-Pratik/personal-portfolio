import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = (props) => {

  let history=useNavigate();
  const [credentials,setcredentials]=useState({email: "" ,password: "",name:"",cpassword:""})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { setProgress, showAlert } = props;
    setProgress(10);
  
    const { name, email, password } = credentials;
  
    try {
      const response = await fetch(`https://inotebookbackend-ten.vercel.app/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      setProgress(50);
      const json = await response.json();
  
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("name", json.name);
        history("/login");
        setProgress(100);
        showAlert("Account created successfully", "text-green-800", "bg-green-50");
      } else {
        setProgress(100);
        showAlert("Invalid credentials", "text-red-800", "bg-red-50");
      }
    } catch (error) {
      setProgress(100);
      console.error("Error creating account:", error); // Logs the error details
      showAlert("Error creating account", "text-red-800", "bg-red-50");
    }
  };
  
  

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="pt-[120px] md:pt-[80px]">
  <div className="w-[90%] max-w-md mx-auto bg-black p-6 rounded-lg shadow-sm shadow-white mt-10 md:mt-[5vh] py-[50px] px-[28px] md:px-[40px]" 
    style={{ boxShadow: "0 4px 15px 4px rgba(255, 255, 255, 0.5)" }}>
    
    <h2 className="text-white text-[28px] md:text-3xl text-center pb-4">
      Sign Up Now
    </h2>

    <form onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          onChange={onChange}
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={onChange}
          type="email"
          name="email"
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={onChange}
          autoComplete="password"
          type="password"
          name="password"
          minLength={5}
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={onChange}
          autoComplete="password"
          type="password"
          name="cpassword"
          minLength={5}
          id="cpassword"
          className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="cpassword"
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm password
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign Up
      </button>
      <p className="text-white my-2 text-center">already have account <Link className="text-blue-700" to={"/login"}>Login</Link> now</p>
    </form>
  </div>
</div>

  );
};

export default SignUp;
