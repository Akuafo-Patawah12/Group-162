import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';

export type OrderStatus = 'Delivered' | 'Pending';

// Product type
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

// Props for the popup component
type ProductPopupProps = {
  open: boolean;
  onClose: () => void;
  product: (Order & { price: number })[];
};

const OrderPopup: React.FC<ProductPopupProps> = ({ open, onClose, product }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
  <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
    Product Details
  </DialogTitle>
  <Divider />
  <DialogContent dividers style={{ fontSize: '3.1rem' }}>
    {product.map((item, index) => (
      <Box
        key={index}
        mb={3}
        p={2}
        border="1px solid #e0e0e0"
        borderRadius={2}
        bgcolor="#fafafa"
        sx={{ fontSize: '1.05rem' }} // Each box's content font size
      >
        <Detail label="Product Name" value={item.productName} />
        <Detail label="Quantity" value={item.quantity} />
        <Detail label="Price" value={`GH₵ ${item.price}`} />
        <Detail
          label="Date"
          value={new Date(item.dateOrdered).toLocaleDateString()}
        />
        <Detail label="Status" value={item.status} />
      </Box>
    ))}
  </DialogContent>
  <DialogActions>
    <Button
      variant="contained"
      color="primary"
      onClick={onClose}
      sx={{ fontSize: '1rem' }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

  );
};

// Detail component with proper typing
type DetailProps = {
  label: string;
  value: string | number;
};

const Detail: React.FC<DetailProps> = ({ label, value }) => (
  <Box mb={1}>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {value}
    </Typography>
  </Box>
);

export default OrderPopup;
