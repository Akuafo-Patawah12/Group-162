
import { Routes,Route } from 'react-router-dom'
import Login from '../General/Login'

const General = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  )
}

export default General