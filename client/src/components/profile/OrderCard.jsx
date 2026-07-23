import React, { useState } from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  Divider,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
  Receipt,
  TrackChanges,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'cancelled':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle />;
      case 'processing':
        return <Pending />;
      case 'shipped':
        return <LocalShipping />;
      case 'cancelled':
        return <Cancel />;
      default:
        return <Pending />;
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'processing':
        return 50;
      case 'shipped':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  const handleTrackOrder = () => {
    toast.info(`Tracking order #${order.id}`, {
      position: 'bottom-right',
    });
  };

  const handleCancelOrder = () => {
    toast.warning(`Cancelling order #${order.id}...`, {
      position: 'bottom-right',
    });
  };

  const handleReorder = () => {
    toast.success(`Items from order #${order.id} added to cart!`, {
      position: 'bottom-right',
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3, transition: 'box-shadow 0.3s' }}>
      {/* Order Header */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <Typography variant="caption" color="text.secondary">
            Order #{order.id}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {order.date}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="caption" color="text.secondary">
            Total
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            ${order.total.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="caption" color="text.secondary">
            Status
          </Typography>
          <Chip
            icon={getStatusIcon(order.status)}
            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            color={getStatusColor(order.status)}
            size="small"
            sx={{ mt: 0.5 }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              sx={{ bgcolor: 'grey.50' }}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Order Progress */}
      <Box sx={{ mt: 2, mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={getStatusProgress(order.status)}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor:
                order.status === 'cancelled'
                  ? 'error.main'
                  : order.status === 'delivered'
                  ? 'success.main'
                  : 'primary.main',
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary">Order Placed</Typography>
          <Typography variant="caption" color="text.secondary">Processing</Typography>
          <Typography variant="caption" color="text.secondary">Shipped</Typography>
          <Typography variant="caption" color="text.secondary">Delivered</Typography>
        </Box>
      </Box>

      {/* Expandable Content */}
      <Collapse in={expanded}>
        <Divider sx={{ my: 2 }} />

        {/* Order Items */}
        <TableContainer>
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
                  <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />

        {/* Order Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">
              Shipping Address
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {order.address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">
              Payment Method
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {order.paymentMethod}
            </Typography>
          </Grid>
          {order.trackingNumber && (
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                Tracking Number
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {order.trackingNumber}
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Order Actions */}
        <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap' }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<TrackChanges />}
            onClick={handleTrackOrder}
          >
            Track Order
          </Button>
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          )}
          {order.status === 'delivered' && (
            <Button
              size="small"
              variant="contained"
              startIcon={<Receipt />}
              onClick={handleReorder}
            >
              Reorder
            </Button>
          )}
          <Button
            size="small"
            variant="outlined"
            startIcon={<Receipt />}
            onClick={() => toast.info('Downloading invoice...')}
          >
            Download Invoice
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
}

export default OrderCard;
