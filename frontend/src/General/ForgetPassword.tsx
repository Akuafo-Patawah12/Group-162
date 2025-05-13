import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  
} from '@mui/material';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/forgetPassword', { email });
      toast.success('Reset link to your email.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send reset link');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
      }}
      className="auth"
    >
      <Card sx={{ width: 350, border: '2px solid #9c27b0', boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Group 162
          </Typography>

          

          <Typography variant="subtitle1" align="center" fontWeight="bold" gutterBottom>
            Regain Access to Your Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleChange}
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#9c27b0', mt: 2 }}
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgetPassword;
