import React, { useState } from 'react';
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from '../config/FireBase';
import bcrypt from 'bcryptjs';
import { useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
const [data,setData]=useState({email:"" , password:""})
const navigate = useNavigate();
const LoginAccount = async (e) => {
    e.preventDefault();

    const userQuery = query(
      collection(db, "account"),
      where("email", "==", data.email),
      limit(1)
    );

    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) {
        console.log("Email does not exist");
        return;
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(data.password, userData.password);
    
    if (!isMatch) {
      toast.error("Invalid password");
      return;
    }
    localStorage.setItem('id',userId);
    toast.success("Login account successfully");
    setTimeout(() => {
        navigate('/'); // Redirect after the toast is shown
    }, 3000); // Redirect to the home page or desired route
  };

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
  return (
    <div className="h-[80vh] flex flex-col gap-4 max-w-[400px] align-middle mt-auto justify-center m-auto w-[82vw]">
      <form onSubmit={LoginAccount} className="border border-white p-8 rounded">
        <h2 className="text-white text-4xl justify-center flex">Login now</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">Email</label>
          <input type="email" onChange={onChange} name="email" className="outline-none h-10 border px-2" />
          <div className="text-red-500"></div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white">Password</label>
          <input type="password" minLength={5} onChange={onChange} name="password" className="outline-none h-10 border px-2" />
          <div className="text-red-500"></div>
        </div>
        <button
          type="submit"
          className="block mt-3 m-auto border bg-orange-500 px-3 py-1.5 bg-orange text-white border-none rounded-md"
        >
          Login
        </button>
       <div className='text-white flex justify-center mt-2 flex-col'><p className='m-auto'>Don't have account?</p><Link to="/signup" className='text-blue-500 m-auto'>Sign Up now</Link></div>
      </form>
      <ToastContainer position="bottom-center"/>
    </div>
  )
}

export default Login
