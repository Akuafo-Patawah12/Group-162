import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface InventoryItem {
  _id: string;
  productName: string;
  quantity: number;
  status: 'Delivered' | 'Pending' ;
  dateOrdered: string;
}

const UserDashboard: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filtered, setFiltered] = useState<InventoryItem[]>(inventory);
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('Customer');

  useEffect(() => {
    // Simulate fetching from a REST API
    axios.get('/api/inventory')
  .then(res => {
    console.log("Inventory API response:", res.data);
    
    const data = Array.isArray(res.data)
      ? res.data
      : res.data.inventory || []; // fallback if data is wrapped

    setInventory(data);
  })
  .catch(err => console.error(err));

  }, []);

  useEffect(() => {
    const filteredData = inventory.filter(item =>
      item.productName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, inventory]);

  const columns: GridColDef[] = [
     { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'productName', headerName: 'Product Name', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
    { field: 'status', headerName: 'Status', width: 140 },
    { field: 'dateOrdered', headerName: 'Date Ordered', width: 180 }
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userName} 👋</h1>

      <input
        type="text"
        placeholder="Search by product name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-xl"
      />

      <div className="bg-white rounded-2xl shadow-md p-2 overflow-x-auto">
        <DataGrid
          rows={filtered}
          columns={columns}
          getRowId={(row) => row._id}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
