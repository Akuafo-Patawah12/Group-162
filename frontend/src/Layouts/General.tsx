
import { Routes,Route } from 'react-router-dom'
import Login from '../General/Login'
import SignUp from '../General/SignUp'
import {Warehouse} from "lucide-react"

const General = () => {
  return (
    <div>
    <div className='fixed top-0 w-full px-4 flex items-center justify-between bg-white h-17'><span className="flex gap-3 "><Warehouse className="text-purple-600" /> <p className="font-bold text-xl">Inventory Mgt</p> </span> <p className="font-bold text-lg">Group 162</p></div>
        <Routes>
          
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    </div>
  )
}

export default General