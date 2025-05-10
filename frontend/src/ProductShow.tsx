import React, {  useState } from 'react';
import axios from 'axios';
import {  useGetProductsQuery } from "./api/api";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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

  // Columns for the DataGrid component
  const columns: GridColDef[] = [
    { field: 'productId', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price', width: 120, renderCell: (params) => `$${params.row.price}` },
    {field:'stockQuantity',headerName: 'In Stock', width: 120,},
    { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => (
        <button
          onClick={() => addToOrder(params.row)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Add to Order
        </button>
      )}
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
    </div>
  );
};

export default ProductShow;
