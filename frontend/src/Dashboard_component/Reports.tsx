import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  CircularProgress,
 
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsReportPopUp } from "../types/state";


type Transaction = {
  _id: string;
  productId: string;
  quantity: number;
  timestamp: string;
  [key: string]: number; // Extend if needed
};

const ReportPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const isReportPopUp = useAppSelector((state) => state.global.isReportPopUp);

  const togglePopUp = () => {
    dispatch(setIsReportPopUp(!isReportPopUp));
  };

  const [productName, setProductName] = useState<string>('');
  const [type, setType] = useState<string>('sale');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnalytics = async () => {
     if (!productName) {
      setError('Please enter a product name.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/dashboard/report', {
        params: {
          productName,
          type,
        },
      });

      setTransactions(response.data.transactions);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Server error');
      } else {
        setError('Network error');
      }
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const chartData = transactions.map((tx) => ({
    date: new Date(tx.timestamp).toLocaleDateString(),
    quantity: tx.quantity,
  }));

  return (
    

<Dialog open={isReportPopUp} onClose={togglePopUp} maxWidth="sm" fullWidth>
  <DialogTitle> Product Transaction Report</DialogTitle>
  <DialogContent>
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          size="small"
        />
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as 'sale' | 'purchase')}
          fullWidth
          size="small"
        >
          <MenuItem value="sale">Sale</MenuItem>
          <MenuItem value="purchase">Purchase</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchAnalytics}
          size="small"
        >
          Get Records
        </Button>
      </Box>

      {loading && (
        <Box textAlign="center">
          <CircularProgress size={20} />
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" fontSize={14}>
          {error}
        </Typography>
      )}

      {chartData.length > 0 && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Transactions Chart
          </Typography>
          <ResponsiveContainer width={400} height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis
                  tickFormatter={(value) => {
                    return `Qty: ${value}`;
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
              <Tooltip />
              <Bar dataKey="quantity" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  </DialogContent>
</Dialog>

  );
};

export default ReportPopup;
