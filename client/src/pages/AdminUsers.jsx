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
  Avatar,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import {
  Search,
  Clear,
  FilterList,
  Edit,
  Block,
  CheckCircle,
  PersonAdd,
  Delete,
  AdminPanelSettings,
  Person,
  VerifiedUser,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-15',
    orders: 12,
    totalSpent: 1245.50,
    lastActive: '2024-03-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-01',
    orders: 8,
    totalSpent: 567.80,
    lastActive: '2024-03-14',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-01-20',
    orders: 3,
    totalSpent: 234.50,
    lastActive: '2024-03-01',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-15',
    orders: 5,
    totalSpent: 345.20,
    lastActive: '2024-03-13',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'user',
    status: 'blocked',
    joinDate: '2024-01-10',
    orders: 2,
    totalSpent: 189.00,
    lastActive: '2024-02-28',
  },
  {
    id: 6,
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-03-01',
    orders: 1,
    totalSpent: 89.99,
    lastActive: '2024-03-12',
  },
];

function AdminUsers() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const itemsPerPage = 8;

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const getRoleColor = (role) => {
    return role === 'admin' ? 'secondary' : 'primary';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      inactive: 'warning',
      blocked: 'error',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle fontSize="small" />;
      case 'inactive': return <Person fontSize="small" />;
      case 'blocked': return <Block fontSize="small" />;
      default: return <Person fontSize="small" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    // Tab filter
    let matchesTab = true;
    if (tabValue === 1) matchesTab = user.status === 'active';
    else if (tabValue === 2) matchesTab = user.status === 'inactive';
    else if (tabValue === 3) matchesTab = user.status === 'blocked';
    
    return matchesSearch && matchesRole && matchesStatus && matchesTab;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
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

  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setRoleDialogOpen(true);
  };

  const handleRoleConfirm = () => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, role: newRole }
          : user
      );
      setUsers(updatedUsers);
      setSnackbar({
        open: true,
        message: `${selectedUser.name}'s role updated to ${newRole}`,
        severity: 'success',
      });
      setRoleDialogOpen(false);
      setSelectedUser(null);
      setNewRole('');
    }
  };

  const handleStatusChange = (user) => {
    setSelectedUser(user);
    setNewStatus(user.status);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, status: newStatus }
          : user
      );
      setUsers(updatedUsers);
      setSnackbar({
        open: true,
        message: `${selectedUser.name}'s status updated to ${newStatus}`,
        severity: 'success',
      });
      setStatusDialogOpen(false);
      setSelectedUser(null);
      setNewStatus('');
    }
  };

  const handleDialogClose = () => {
    setRoleDialogOpen(false);
    setStatusDialogOpen(false);
    setSelectedUser(null);
    setNewRole('');
    setNewStatus('');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleIcon = (role) => {
    return role === 'admin' ? <AdminPanelSettings /> : <Person />;
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Manage Users</Typography>
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
              Manage Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {users.length} total users • {users.filter(u => u.status === 'active').length} active
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => toast.info('Add user form coming soon...')}
          >
            Add User
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
          <Tab label="All Users" />
          <Tab label="Active" />
          <Tab label="Inactive" />
          <Tab label="Blocked" />
        </Tabs>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search users..."
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
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="Role"
            >
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Users Table */}
        <Paper sx={{ overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Orders</TableCell>
                  <TableCell align="right">Total Spent</TableCell>
                  <TableCell align="center">Last Active</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              user.status === 'active' ? (
                                <CheckCircle sx={{ fontSize: 14, color: 'success.main' }} />
                              ) : user.status === 'blocked' ? (
                                <Block sx={{ fontSize: 14, color: 'error.main' }} />
                              ) : null
                            }
                          >
                            <Avatar
                              sx={{
                                bgcolor: user.role === 'admin' ? 'secondary.main' : 'primary.main',
                                width: 36,
                                height: 36,
                                fontSize: 14,
                              }}
                            >
                              {getInitials(user.name)}
                            </Avatar>
                          </Badge>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Joined {user.joinDate}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={getRoleIcon(user.role)}
                          label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          color={getRoleColor(user.role)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={getStatusIcon(user.status)}
                          label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          color={getStatusColor(user.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">{user.orders}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ${user.totalSpent.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{user.lastActive}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleRoleChange(user)}
                          color="secondary"
                          title="Change Role"
                        >
                          <AdminPanelSettings />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleStatusChange(user)}
                          color={user.status === 'blocked' ? 'error' : 'info'}
                          title="Change Status"
                        >
                          {user.status === 'blocked' ? <CheckCircle /> : <Block />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No users found
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

      {/* Role Change Dialog */}
      <Dialog
        open={roleDialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Change role for {selectedUser?.name}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleRoleConfirm}
            variant="contained"
            disabled={!newRole || newRole === selectedUser?.role}
          >
            Update Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Change User Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Change status for {selectedUser?.name}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleStatusConfirm}
            variant="contained"
            disabled={!newStatus || newStatus === selectedUser?.status}
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

export default AdminUsers;
