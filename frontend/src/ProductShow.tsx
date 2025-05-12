import React, {  useState } from 'react';
import axios from 'axios';
import {  useGetProductsQuery } from "./api/api";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import Rating from './Components/Rating';

interface ProductItem {
  _id: string;
  name: string;
  price: number;
  stockQuantity: boolean;
}

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const ProductShow: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [orderSummary, setOrderSummary] = useState<OrderItem[]>([]);

  const [selectedProduct, setSelectedProduct] = useState(null); // store clicked product
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState(1); // default quantity

  const handleAddToOrderClick = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowQuantityModal(true);
  };

  const confirmAddToOrder = () => {
    if (selectedProduct) {
      addToOrder({ ...selectedProduct, quantity });
      setShowQuantityModal(false);
    }
  };

  const {
      data: products,
      isLoading,
      isError,
    } = useGetProductsQuery(searchTerm);

 

    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }

  const addToOrder = (product: ProductItem) => {
    const existingOrderItem = orderSummary.find((item) => item._id === product._id);
    if (existingOrderItem) {
      // If the product already exists in the order, increment the quantity
      setOrderSummary(prev => prev.map(item =>
        item._id === product._id
          ? { ...item, stockQuantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new product to the order
      setOrderSummary(prev => [...prev, {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }]);
    }
  };

  const handlePlaceOrder = () => {
    // Logic to place order, like sending a POST request to backend
    axios.post('/api/placeOrder', { order: orderSummary })
      .then(response => {
        console.log('Order placed successfully', response.data);
        setOrderSummary([]); // Clear order summary
      })
      .catch(err => console.error('Error placing order', err));
  };
  type paramData ={
    row:{
     productId:string;
     name:string;
     price: number;
     stockQuantity: number;
     rating: number;
    }

  }
  // Columns for the DataGrid component
  const columns: GridColDef[] = [
    { field: 'productId', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price', width: 120, renderCell: (params: paramData) => `$${params.row.price}` },
    {field:'stockQuantity',headerName: 'In Stock', width: 120,},
    {field:'rating',headerName: 'Rating', width: 120,renderCell: (params: paramData)=>(
    <div className='flex h-full items-center'>
     <Rating rating={params.row.rating} />
     </div>
    )},
    { 
  field: 'action', 
  headerName: 'Action', 
  width: 150, 
  renderCell: (params: paramData) => (
    <div className="flex h-full items-center">
      <button
        onClick={() => handleAddToOrderClick(params.row)}
        className="px-2 leading-3 h-[35px] !bg-blue-600 text-white rounded-xl"
      >
        Add to Order
      </button>
    </div>
  )
}

  ];

  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Products</h1>

      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 mb-6 border border-gray-300 rounded-xl"
      />

      <div className="h-72 w-full mb-6">
        <DataGrid
          rows={products || []}
          getRowId={(row) => row.productId}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
        />
      </div>

      {/* Order Summary */}
      {orderSummary.length > 0 && (
        <div className="mt-6 p-4 border border-gray-200 rounded-xl bg-white shadow-md">
          <h2 className="text-xl font-semibold">Your Order</h2>
          <ul className="mt-4">
            {orderSummary.map((item) => (
              <li key={item._id} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>{item.quantity} x ${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2 bg-green-600 text-white rounded-xl"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      <Modal open={showQuantityModal} onClose={() => setShowQuantityModal(false)}>
  <Box
    sx={{
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      p: 4,
    }}
  >
    <Typography variant="h6" component="h2" gutterBottom>
      Select Quantity
    </Typography>

    <TextField
      label="Quantity"
      type="number"
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
      fullWidth
      margin="normal"
      inputProps={{ min: 1 }}
    />

    <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
      <Button variant="outlined" onClick={() => setShowQuantityModal(false)}>
        Cancel
      </Button>
      <Button variant="contained" onClick={confirmAddToOrder}>
        Confirm
      </Button>
    </Box>
  </Box>
</Modal>



    </div>
  );
};

export default ProductShow;
