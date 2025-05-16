import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LogOut } from 'lucide-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";



interface CustomerHeaderProps {
  handleClick: ()=> void;
  togglePop: ()=> void;
  cartCount?: number;
}


// types/order.ts or in your types file




const CustomerHeader: React.FC<CustomerHeaderProps> = ({handleClick,togglePop,cartCount = 0 }) => {
   const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  

    const name = localStorage.getItem("name")


   


    const router = useNavigate()
         async function logout(){
            try{
               const res = await axios.get("http://localhost:8000/auth/logout")
               toast.success(res.data.message)
               router("/")
            }catch(error){
              console.log(error)
            }
         }

    
  return (
    <header className="sticky top-0 z-3 bg-white shadow-md py-4 px-6 flex items-center justify-between rounded-b-2xl">
      <div className="text-xl font-bold text-gray-800">
        <span className="text-blue-600">Group 162</span> Dashboard
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-gray-600" />
          <span className="text-gray-700 font-medium">Hello, {name}</span>
        </div>

        <button className="relative group" onClick={handleClick}>
          <ShoppingCart className="h-6 w-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full group-hover:scale-110 transition">
              {cartCount}
            </span>
          )}
        </button>
        <button className="px-4 py-2 !bg-red-400 text-white rounded-lg hover:!bg-red-700 transition" 
        onClick={() =>
           setLogoutDialogOpen(true)          }>
          <LogOut />
        </button>
      </div>
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
  <DialogTitle>Confirm Logout</DialogTitle>
  <DialogContent>
    <Typography>Are you sure you want to logout?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setLogoutDialogOpen(false)} color="inherit">
      Cancel
    </Button>
    <Button
      onClick={() => {
        setLogoutDialogOpen(false);
        logout();
      }}
      color="error"
      variant="contained"
    >
      Logout
    </Button>
  </DialogActions>
</Dialog>

    </header>
  );
};

export default CustomerHeader;
