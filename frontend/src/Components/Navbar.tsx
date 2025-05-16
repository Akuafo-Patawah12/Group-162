
import { useState, useEffect  } from "react";
import axios from "axios";


import { useAppDispatch, useAppSelector } from "../redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "../types/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Button,
} from "@mui/material";



type Notification = {
  customerId: {
    _id: string;
    name: string;
  };
  dateOrdered: string; // ISO date string
  productName: string;
  quantity: number;
  status: 'Pending' | 'Approved' | 'Rejected' | string; // Expand as needed
};

interface unread {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt?: string;
  updatedAt?: string;
}


import {Link} from "react-router-dom";


const Navbar = () => {
  const [openNotifDialog, setOpenNotifDialog] = useState(false);
const handleOpenDialog = () => setOpenNotifDialog(true);
const handleCloseDialog = () => setOpenNotifDialog(false);
const [notifications, setNotifications] = useState<Notification[]>([]);
const [loading, setLoading] = useState(false);
const [unreadNotification,setUnreadNotification] = useState<unread[]>([])
const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  axios.defaults.withCredentials=true


    useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:8000/notifications/unread');
        setUnreadNotification(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);


  useEffect(() => {
  if (openNotifDialog) {
    setLoading(true);
    setError(null);
    axios.get("http://localhost:8000/getAllOrders") // Replace with your actual API endpoint
      .then((res) => {
        console.log(res.data)
        setNotifications(res.data); // Expecting an array
        setUnreadNotification([])
      })
      .catch((err) => {
        setError("Failed to load notifications.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
}, [openNotifDialog]);





  return (
    <div style={{marginBlock:"20px"}} className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>

          <button onClick={handleOpenDialog} className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            {unreadNotification.length > 0 && <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              {unreadNotification.length}
            </span>}
          </button>

          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="/Ayisi.jpg"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full size-10 overflow-hidden object-cover"
            />
            <span className="font-semibold">SMB's</span>
          </div>
        </div>
        <Link to="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>

      <Dialog open={openNotifDialog} onClose={handleCloseDialog}>
      <DialogTitle>Order Notifications</DialogTitle>
      <DialogContent>
        {loading && <div className="flex flex-col items-center justify-center gap-2 w-full"><CircularProgress/><p>Loading orders...</p></div>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && notifications.length === 0 && (
          <p>No new orders.</p>
        )}

        {!loading && !error && notifications.length > 0 && (
          <ul className="space-y-4">
            {notifications.map((order, index) => (
              <li key={index} className="border-b pb-3">
                <p className="font-semibold">{order.productName}</p>
                <p className="text-sm text-gray-700">
                  Ordered by <strong>{order.customerId?.name}</strong> &bull; Quantity: {order.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Status: <span className="italic">{order.status}</span> &bull; Date: {new Date(order.dateOrdered).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>

    </div>
  );
};

export default Navbar;
