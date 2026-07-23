import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
  Chip,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import {
  CheckCircle,
  Receipt,
  LocalShipping,
  Email,
  Print,
  Share,
  Home,
  ShoppingBag,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function OrderSuccess({ order }) {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Order Confirmation - ShopHub',
        text: `Order #${order.id} confirmed!`,
        url: window.location.href,
      });
    }
  };

  return (
    <Box>
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'success.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <CheckCircle sx={{ fontSize: 48, color: 'success.main' }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Order Placed Successfully! 🎉
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Thank you for your order. We'll send you a confirmation email shortly.
        </Typography>
        <Chip
          label={`Order #${order.id}`}
          color="primary"
          sx={{ mt: 2, fontWeight: 600 }}
        />
      </Box>

      {/* Order Summary */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Order Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Order Info Grid */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Order Date
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {order.date}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Payment Method
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {order.paymentMethod}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Shipping Status
                </Typography>
                <Chip
                  label="Processing"
                  color="info"
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="body2" fontWeight={700} color="primary.main">
                  ${order.total.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Items List */}
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Items Ordered
            </Typography>
            {order.items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1,
                  borderBottom: index < order.items.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100',
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Shipping Address */}
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Shipping Address
            </Typography>
            <Typography variant="body2">
              {order.shippingAddress.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.shippingAddress.country}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Actions */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              What's Next?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Alert severity="info" icon={<LocalShipping />}>
                You'll receive a confirmation email with tracking details
              </Alert>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Receipt />}
                onClick={handlePrint}
                sx={{ mt: 1 }}
              >
                Print Order
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Share />}
                onClick={handleShare}
              >
                Share Order
              </Button>
            </Box>
          </Paper>

          {/* Quick Actions */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingBag />}
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Home />}
                onClick={() => navigate('/')}
              >
                Go to Home
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Receipt />}
                onClick={() => navigate('/orders')}
              >
                View All Orders
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderSuccess;
