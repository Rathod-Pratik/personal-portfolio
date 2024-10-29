import React, { useState } from 'react';
import { collection, query, where, limit, getDocs, addDoc } from "firebase/firestore";
import { db } from '../config/FireBase';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [data, setData] = useState({ email: "", password: "", cpassword: "" });
  const navigate = useNavigate(); // Called at the top of the component

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const CreateAccount = async (e) => {
    e.preventDefault();

    if (data.password !== data.cpassword) {
        toast.error("Passwords do not match");
      return;
    }

    const isEmailExist = async (email) => {
      const emailQuery = query(
        collection(db, "account"),
        where("email", "==", email),
        limit(1)
      );

      const querySnapshot = await getDocs(emailQuery);
      return !querySnapshot.empty;
    };

    if (await isEmailExist(data.email)) {
     toast.error("Email already exists");
      return;
    }

    const contactRef = collection(db, "account");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const accountData = {
      email: data.email,
      password: hashedPassword,
    };

    await addDoc(contactRef, accountData);
    toast.success("Create account successfully");
    setTimeout(() => {
        navigate('/'); // Redirect after the toast is shown
    }, 3000);
  };

  return (
    <div className="h-[80vh] w-[80vw] flex flex-col gap-4 max-w-[400px] align-middle mt-auto justify-center m-auto">
      <form className="border border-white p-8 rounded" onSubmit={CreateAccount}>
        <h2 className="text-white text-4xl justify-center flex">Sign up now</h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">Email</label>
          <input type="email" onChange={onChange} name="email" className="h-10 border outline-none px-2" />
          <div className="text-red-500"></div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white">Password</label>
          <input type="password" minLength={5} onChange={onChange} name="password" className="h-10 border outline-none px-2" />
          <div className="text-red-500"></div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cpassword" className="text-white">Confirm Password</label>
          <input type="password" onChange={onChange} name="cpassword" className="h-10 border outline-none px-2" minLength={5} />
          <div className="text-red-500"></div>
        </div>
        <button
          type="submit"
          className="block mt-3 m-auto border bg-orange-500 px-3 py-1.5 bg-orange text-white border-none rounded-md"
        >
          Create Account
        </button>
        <div className='text-white flex justify-center mt-2 flex-col'><p className='m-auto'>Already have account?</p><Link to="/login" className='text-blue-500 m-auto'>login now</Link></div>
      </form>
      <ToastContainer position="bottom-center"/>
    </div>
  );
};

export default Signup;
