import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Chip,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search,
  FilterList,
  ShoppingBag,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import OrderCard from '../components/profile/OrderCard';

function OrdersPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  // Mock orders data
  const orders = [
    {
      id: '1234',
      date: '2024-03-15',
      total: 259.98,
      status: 'delivered',
      address: '123 Main Street, New York, NY 10001',
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK-123456789',
      items: [
        {
          name: 'Wireless Bluetooth Headphones Pro',
          price: 129.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
        },
        {
          name: 'Classic Denim Jacket',
          price: 89.99,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=100&h=100&fit=crop',
        },
      ],
    },
    {
      id: '1233',
      date: '2024-03-10',
      total: 149.99,
      status: 'shipped',
      address: '456 Oak Avenue, Los Angeles, CA 90001',
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK-987654321',
      items: [
        {
          name: 'Smart Fitness Tracker Watch',
          price: 79.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop',
        },
        {
          name: 'Premium Leather Backpack',
          price: 159.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
        },
      ],
    },
    {
      id: '1232',
      date: '2024-03-05',
      total: 89.99,
      status: 'processing',
      address: '789 Pine Street, Chicago, IL 60601',
      paymentMethod: 'Credit Card',
      trackingNumber: null,
      items: [
        {
          name: 'Organic Skincare Set',
          price: 64.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop',
        },
      ],
    },
    {
      id: '1231',
      date: '2024-02-28',
      total: 199.98,
      status: 'cancelled',
      address: '321 Elm Street, Miami, FL 33101',
      paymentMethod: 'Cash',
      trackingNumber: null,
      items: [
        {
          name: 'Ceramic Non-Stick Cookware Set',
          price: 149.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1584988381604-846ef78c61d0?w=100&h=100&fit=crop',
        },
        {
          name: 'Gaming Mechanical Keyboard',
          price: 99.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100&h=100&fit=crop',
        },
      ],
    },
    {
      id: '1230',
      date: '2024-02-20',
      total: 49.99,
      status: 'delivered',
      address: '654 Maple Drive, Seattle, WA 98101',
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK-456789123',
      items: [
        {
          name: 'Yoga Mat Premium Non-Slip',
          price: 49.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=100&h=100&fit=crop',
        },
      ],
    },
  ];

  // Filter orders based on tab and search
  const getFilteredOrders = () => {
    let filtered = orders;

    // Tab filter
    if (tabValue === 1) {
      filtered = filtered.filter(o => o.status === 'processing' || o.status === 'shipped');
    } else if (tabValue === 2) {
      filtered = filtered.filter(o => o.status === 'delivered');
    } else if (tabValue === 3) {
      filtered = filtered.filter(o => o.status === 'cancelled');
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(o => o.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(o =>
        o.id.includes(searchTerm) ||
        o.items.some(item => item.name.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();
  const ordersPerPage = 3;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const displayedOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          My Orders
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: isMobile ? '100%' : 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant={isMobile ? 'fullWidth' : 'standard'}
        sx={{ mb: 3 }}
      >
        <Tab label="All" />
        <Tab label="Processing" />
        <Tab label="Delivered" />
        <Tab label="Cancelled" />
      </Tabs>

      {/* Orders Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredOrders.length} orders found
        </Typography>
        {filteredOrders.length > ordersPerPage && (
          <Typography variant="body2" color="text.secondary">
            Page {page} of {totalPages}
          </Typography>
        )}
      </Box>

      {/* Orders List */}
      {displayedOrders.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <OrderCard order={order} />
            </motion.div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            </Box>
          )}
        </motion.div>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingBag sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No orders found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your filters'
              : 'Start shopping to see your orders here'}
          </Typography>
          {(searchTerm || statusFilter !== 'all') && (
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default OrdersPage;
