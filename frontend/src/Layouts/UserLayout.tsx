import React,{useState,useEffect,Suspense,lazy} from 'react'
import { Routes,Route } from 'react-router-dom'
import UserDashboard from '../UserDashboard'
const ProductShow = lazy(()=> import('../ProductShow')) 
import CustomerHeader from '../Components/CustomersHeader'
import OrderPopup from '../OrderPopup'
import Loader from '../Components/Loader'
import { toast } from 'react-toastify'
import axios from 'axios'


export type OrderStatus = 'Delivered' | 'Pending';

export interface Order {
  _id: string;
  customerId: {
    _id: string;
    name: string;
  };
  productName: string;
  quantity: number;
  
  status: OrderStatus;
  dateOrdered: string;
}



const UserLayout: React.FC = () => {
  const [open,setOpen] = useState<boolean>(false)
  const [orders,setOrders] =useState<Order[]>([])
  function close(){
    setOpen(false)
  }

  const[count,setCount] = useState([])

  
      const fetchUnviewedOrders = async () => {
    const response = await axios.get('http://localhost:8000/customer/unviewed-orders', {
      withCredentials: true, // only if using cookies for auth
    });
    setCount(response.data);
  };

  useEffect(()=>{
  fetchUnviewedOrders()
  },[])

   const handleClick = async () => {
      try {
        setOpen(prev => !prev); // toggle the pop-up first
  
        const response = await axios.get('http://localhost:8000/customer/getUserOrder', { withCredentials: true }); // add credentials if using cookies
        // assuming response includes { count: number }
        toast.success(response.data)
        setOrders(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
  
  return (
    <div>
        <CustomerHeader togglePop={setOpen} handleClick={handleClick} cartCount={count.length} />
        <OrderPopup open={open} onClose={close} product={orders}/>
         <Routes>
            <Route path='/dashboard' element={<UserDashboard />}/>  
            <Route
              path="/product"
              element={
                <Suspense fallback={<Loader />}>
                  <ProductShow  fetchUnviewedOrders={fetchUnviewedOrders} />
                </Suspense>
              }
            />
            
         </Routes>
    </div>
  )
}

export default UserLayout