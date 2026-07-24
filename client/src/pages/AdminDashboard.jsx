import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingBag,
  AttachMoney,
  People,
  TrendingUp,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Receipt,
  Store,
  Assessment,
  Download,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('weekly');
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStats({
        revenue: 12450,
        orders: 156,
        customers: 423,
        products: 89,
      });
      setRecentOrders([
        { id: '#12345', customer: 'John Doe', date: '2024-03-15', total: 129.99, status: 'delivered' },
        { id: '#12346', customer: 'Jane Smith', date: '2024-03-14', total: 89.99, status: 'processing' },
        { id: '#12347', customer: 'Bob Johnson', date: '2024-03-14', total: 249.99, status: 'shipped' },
        { id: '#12348', customer: 'Alice Brown', date: '2024-03-13', total: 59.99, status: 'pending' },
        { id: '#12349', customer: 'Charlie Wilson', date: '2024-03-13', total: 179.99, status: 'delivered' },
      ]);
      setChartData([
        { day: 'Mon', revenue: 1200, orders: 15 },
        { day: 'Tue', revenue: 1800, orders: 22 },
        { day: 'Wed', revenue: 900, orders: 11 },
        { day: 'Thu', revenue: 2100, orders: 28 },
        { day: 'Fri', revenue: 1600, orders: 19 },
        { day: 'Sat', revenue: 2800, orders: 35 },
        { day: 'Sun', revenue: 1400, orders: 17 },
      ]);
      setLoading(false);
    }, 1000);
  }, [timeframe]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const statCards = [
    { title: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: <AttachMoney />, color: 'primary.main', change: '+12.5%', trend: 'up' },
    { title: 'Orders', value: stats.orders, icon: <ShoppingBag />, color: 'secondary.main', change: '+8.2%', trend: 'up' },
    { title: 'Customers', value: stats.customers, icon: <People />, color: 'success.main', change: '+5.3%', trend: 'up' },
    { title: 'Products', value: stats.products, icon: <Store />, color: 'warning.main', change: '-2.1%', trend: 'down' },
  ];

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Dashboard</Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Paper sx={{ p: 3 }}>
                <LinearProgress />
              </Paper>
            </Grid>
          ))}
        </Grid>
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
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Here's what's happening with your store.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Timeframe</InputLabel>
              <Select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                label="Timeframe"
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<Download />}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Assessment />}
              component={Link}
              to="/admin/reports"
            >
              Reports
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                          {stat.value}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                          {stat.trend === 'up' ? (
                            <ArrowUpward sx={{ fontSize: 14, color: 'success.main' }} />
                          ) : (
                            <ArrowDownward sx={{ fontSize: 14, color: 'error.main' }} />
                          )}
                          <Typography variant="caption" color={stat.trend === 'up' ? 'success.main' : 'error.main'}>
                            {stat.change}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            vs last period
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          bgcolor: stat.color,
                          color: 'white',
                          p: 1.5,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {stat.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Chart Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Revenue Overview
                </Typography>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 2, pt: 2 }}>
                {chartData.map((item, index) => (
                  <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: `${(item.revenue / 3000) * 250}px`,
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        minHeight: 10,
                        transition: 'height 0.3s',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                          opacity: 0.8,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
                      {item.day}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Orders
                </Typography>
                <Button
                  size="small"
                  component={Link}
                  to="/admin/orders"
                >
                  View All
                </Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">
                            {order.customer}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            ${order.total.toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}

export default AdminDashboard;
