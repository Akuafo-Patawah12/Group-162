import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
} from '@mui/material';


type Order = {
  _id?: string;
  customerId: string;
  productName: string;
  quantity: number;
  status: 'Delivered' | 'Pending';
  dateOrdered: string | Date;
};

type OrdersDialogProps = {
  open: boolean;
  onClose: () => void;
  order: Order;
};


const OrdersDialog: React.FC<OrdersDialogProps> = ({ open, onClose, order }) => {
  const { productName, quantity, status, dateOrdered, customerId } = order;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Order Details</DialogTitle>
      <Divider />
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Detail label="Product Name" value={productName} />
          <Detail label="Quantity" value={quantity.toString()} />
          <Detail
            label="Status"
            value={
              <Chip
                label={status}
                color={status === 'Delivered' ? 'success' : 'warning'}
                variant="outlined"
              />
            }
          />
          <Detail
            label="Date Ordered"
            value={new Date(dateOrdered).toLocaleDateString()}
          />
          <Detail label="Customer ID" value={customerId} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Detail = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {value}
    </Typography>
  </Box>
);

export default OrdersDialog;
