import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Divider,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Search,
  Clear,
  FilterList,
  Visibility,
  Edit,
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
  Receipt,
  Download,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import AdminOrderDetails from './AdminOrderDetails';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-12345',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2024-03-15',
    total: 259.98,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    items: [
      { name: 'Wireless Headphones', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
      { name: 'Denim Jacket', price: 89.99, quantity: 2, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=100&h=100&fit=crop' },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: 'ORD-12346',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2024-03-14',
    total: 149.99,
    status: 'processing',
    paymentMethod: 'PayPal',
    items: [
      { name: 'Smart Watch', price: 79.99, quantity: 1, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop' },
      { name: 'Leather Backpack', price: 159.99, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
    ],
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: 'ORD-12347',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    date: '2024-03-14',
    total: 89.99,
    status: 'shipped',
    paymentMethod: 'Credit Card',
    items: [
      { name: 'Skincare Set', price: 64.99, quantity: 1, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop' },
    ],
    shippingAddress: '789 Pine St, Chicago, IL 60601',
  },
  {
    id: 'ORD-12348',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    date: '2024-03-13',
    total: 59.99,
    status: 'pending',
    paymentMethod: 'Cash',
    items: [
      { name: 'Yoga Mat', price: 49.99, quantity: 1, image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=100&h=100&fit=crop' },
    ],
    shippingAddress: '321 Elm St, Miami, FL 33101',
  },
  {
    id: 'ORD-12349',
    customer: 'Charlie Wilson',
    email: 'charlie@example.com',
    date: '2024-03-12',
    total: 199.98,
    status: 'cancelled',
    paymentMethod: 'Credit Card',
    items: [
      { name: 'Cookware Set', price: 149.99, quantity: 1, image: 'https://images.unsplash.com/photo-1584988381604-846ef78c61d0?w=100&h=100&fit=crop' },
      { name: 'Mechanical Keyboard', price: 99.99, quantity: 1, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100&h=100&fit=crop' },
    ],
    shippingAddress: '654 Maple Dr, Seattle, WA 98101',
  },
];

function AdminOrders() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const itemsPerPage = 8;

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

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
      case 'delivered': return <CheckCircle fontSize="small" />;
      case 'processing': return <Pending fontSize="small" />;
      case 'shipped': return <LocalShipping fontSize="small" />;
      case 'cancelled': return <Cancel fontSize="small" />;
      default: return <Pending fontSize="small" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Tab filter
    let matchesTab = true;
    if (tabValue === 1) matchesTab = order.status === 'pending' || order.status === 'processing';
    else if (tabValue === 2) matchesTab = order.status === 'shipped';
    else if (tabValue === 3) matchesTab = order.status === 'delivered';
    else if (tabValue === 4) matchesTab = order.status === 'cancelled';
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
    setStatusFilter('all');
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (order, newStatus) => {
    setSelectedOrder(order);
    setNewStatus(newStatus);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, status: newStatus }
          : order
      );
      setOrders(updatedOrders);
      setSnackbar({
        open: true,
        message: `Order ${selectedOrder.id} status updated to ${newStatus}`,
        severity: 'success',
      });
      setStatusDialogOpen(false);
      setSelectedOrder(null);
      setNewStatus('');
    }
  };

  const handleStatusDialogClose = () => {
    setStatusDialogOpen(false);
    setSelectedOrder(null);
    setNewStatus('');
  };

  const handleExport = () => {
    toast.info('Exporting orders data...', {
      position: 'bottom-right',
    });
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Manage Orders</Typography>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Manage Orders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {orders.length} total orders
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExport}
          >
            Export Orders
          </Button>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : false}
          sx={{ mb: 3 }}
        >
          <Tab label="All" />
          <Tab label="Pending" />
          <Tab label="Shipped" />
          <Tab label="Delivered" />
          <Tab label="Cancelled" />
        </Tabs>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{ flex: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
              startAdornment={<FilterList sx={{ mr: 1, color: 'text.secondary' }} />}
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

        {/* Orders Table */}
        <Paper sx={{ overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedOrders.length > 0 ? (
                  displayedOrders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{order.customer}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.email}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{order.date}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ${order.total.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={getStatusIcon(order.status)}
                          label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(order)}
                          color="primary"
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleStatusChange(order, 'processing')}
                          color="info"
                          disabled={order.status === 'delivered' || order.status === 'cancelled'}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No orders found
                      </Typography>
                      {searchTerm && (
                        <Button size="small" onClick={handleClearSearch} sx={{ mt: 1 }}>
                          Clear Search
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            </Box>
          )}
        </Paper>
      </motion.div>

      {/* Order Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, maxHeight: '90vh' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Order Details - {selectedOrder?.id}
            </Typography>
            <IconButton onClick={handleCloseDetails}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && <AdminOrderDetails order={selectedOrder} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
          <Button
            variant="contained"
            startIcon={<Receipt />}
            onClick={() => toast.info('Printing invoice...')}
          >
            Print Invoice
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={handleStatusDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Change status for order {selectedOrder?.id}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>New Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="New Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStatusDialogClose}>Cancel</Button>
          <Button
            onClick={handleStatusConfirm}
            variant="contained"
            disabled={!newStatus || newStatus === selectedOrder?.status}
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminOrders;
