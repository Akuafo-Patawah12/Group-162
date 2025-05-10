import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserDashboard from '../UserDashboard'
import ProductShow from '../ProductShow'
import CustomerHeader from '../Components/CustomersHeader'

const UserLayout: React.FC = () => {
  return (
    <div>
        <CustomerHeader userName="John Doe" cartCount={3} />
         <Routes>
            <Route path='/dashboard' element={<UserDashboard />}/>  
            <Route path='/product' element={<ProductShow />} />   
         </Routes>
    </div>
  )
}

export default UserLayout