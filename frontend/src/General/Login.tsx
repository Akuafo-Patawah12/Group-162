"use client"
import { useLoginMutation } from "../api/api";
import { useState,FormEvent } from "react";
import { useNavigate } from "react-router-dom";



const Login = ()=>{
    const router = useNavigate();
    const [login] = useLoginMutation();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const result = await login({ email, password }).unwrap();
        const { token } = result; // Assuming the API returns a token and user object
        localStorage.setItem("token", token); // Store the token in local storage
        router("/dashboard"); // or wherever you want to redirect

    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

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
          className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login