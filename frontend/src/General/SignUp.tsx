"use client"
import { useSignUpMutation } from "../api/api";
import { useState,FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const SignUp = ()=>{
    const router = useNavigate();
    const [signUp] = useSignUpMutation();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        await signUp({name,email,password }).unwrap();
        // Store the token in local storage
        toast.success("Sign up successful!"); // Show success message
        router("/auth/login"); // or wherever you want to redirect

    } catch (err) {
        toast.error("Sign up failed!"); // Show error message
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign up</h2>
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="w-full !bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"
        >
          Sign up
        </button>
        <section className="flex justify-between my-3"><p>Already have an account?</p><a href="/auth/login">Login</a></section>
      </form>
    </div>
  )
}

export default SignUp