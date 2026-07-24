import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import {
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
  Receipt,
  Print,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

function AdminOrderDetails({ order }) {
  const getStatusColor = (status) => {
    const colors = {
      delivered: 'success',
      processing: 'info',
      shipped: 'primary',
      pending: 'warning',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle />;
      case 'processing': return <Pending />;
      case 'shipped': return <LocalShipping />;
      case 'cancelled': return <Cancel />;
      default: return <Pending />;
    }
  };

  const handlePrint = () => {
    toast.info('Printing invoice...', {
      position: 'bottom-right',
    });
  };

  return (
    <Box>
      {/* Status */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Status:
          </Typography>
          <Chip
            icon={getStatusIcon(order.status)}
            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            color={getStatusColor(order.status)}
          />
        </Box>
        <Button
          size="small"
          startIcon={<Print />}
          onClick={handlePrint}
        >
          Print
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Order Info */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="caption" color="text.secondary">
            Order ID
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {order.id}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="caption" color="text.secondary">
            Date
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {order.date}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="caption" color="text.secondary">
            Payment Method
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {order.paymentMethod}
          </Typography>
        </Grid>
      </Grid>

      {/* Customer Info */}
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        Customer Information
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" color="text.secondary">
            Name
          </Typography>
          <Typography variant="body2">{order.customer}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body2">{order.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" color="text.secondary">
            Shipping Address
          </Typography>
          <Typography variant="body2">{order.shippingAddress}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* Order Items */}
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
        Order Items
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 40,
                        height: 40,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right" sx={{ fontWeight: 600 }}>
                Total
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ${order.total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminOrderDetails;
