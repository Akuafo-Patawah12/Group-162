import {useEffect} from "react"
import {Routes,Route} from "react-router-dom"
import Navbar from "../Components/Navbar"
import Dashboard from '../Admin/Dashboard'
import Products from '../Admin/Product'
import Inventory from "../Admin/Inventory"
import Users from "../Admin/Users"
import Expenses from "../Admin/Expenses"
import Settings from "../Admin/Settings"
import Sidebar from "../Components/Sidebar"
import  { useAppSelector } from "../redux";


const AdminLayout = () => {
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
      );
      const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    
      useEffect(() => {
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.add("light");
        }
      });
  return (
    <main>
        <Sidebar />
        <section style={{marginLeft:`${isSidebarCollapsed ? "70px" : "250px"}`}}   >
        <Navbar/>
        <Routes>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/products' element={<Products />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path="/users" element={<Users />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="settings" element={<Settings />} />
        </Routes>
        </section>
    </main>
  )
}
export default AdminLayout
