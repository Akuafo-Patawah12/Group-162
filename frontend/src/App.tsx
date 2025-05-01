
import { Routes, Route } from 'react-router-dom'
import AdminLayout from './Layouts/AdminLayout'
import './App.css'
import General from './Layouts/General'

function App() {
  

  return (
    <div>
      <Routes>
         <Route path="/*" element={<AdminLayout />} />
         <Route path="/auth/*" Component={General} />
       </Routes>
    </div>
  )
}

export default App
