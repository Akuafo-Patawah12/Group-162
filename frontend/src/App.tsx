
import { Routes, Route } from 'react-router-dom'
import AdminLayout from './Layouts/AdminLayout'
import './App.css'
import General from './Layouts/General'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserLayout from './Layouts/UserLayout';

function App() {
  

  return (
    <div>
      <Routes>
         <Route path="/*" element={<AdminLayout />} />
         <Route path="/auth/*" Component={General} />
         <Route path="/u/*" element={<UserLayout />} />
       </Routes>
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
