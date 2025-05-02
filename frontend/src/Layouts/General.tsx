
import { Routes,Route } from 'react-router-dom'
import Login from '../General/Login'
import SignUp from '../General/SignUp'

const General = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    </div>
  )
}

export default General