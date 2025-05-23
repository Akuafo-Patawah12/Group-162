
import { useLoginMutation } from "../api/api";
import { useState,FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = ()=>{
    const router = useNavigate();
    const [login] = useLoginMutation();
    const [email, setEmail] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const result = await login({ email, password, rememberMe }).unwrap();
        const { message,user } = result; // Assuming the API returns a token and user object
        localStorage.setItem("name", user.name); // Store the token in local storage
        toast.success("Login successful!"); // Show success message
        if(message === "Admin login successful"){
            router("/protected/dashboard"); // or wherever you want to redirect
        }else{
           router("/u/product")
        }
        

    } catch (err) {
      console.log(err)
      toast.error("Invalid crediatials")
    }
  };

  return (
    <div className="auth min-h-screen  flex items-center justify-center bg-gray-100 px-4">
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
         
         <section className="w-full  flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-semibold text-gray-700">Remember me</label>
          </div>
          <Link to="/forget_password" className="text-sm text-purple-600 hover:underline">Forget Password?</Link>
          </section>

        <button
          type="submit"
          className="w-full !bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"
        >
          Login
        </button>
        <section className="flex justify-between my-3"><p>Don't have an account?</p><a href="/signup">Sign up</a></section>
      </form>
    </div>
  )
}

export default Login