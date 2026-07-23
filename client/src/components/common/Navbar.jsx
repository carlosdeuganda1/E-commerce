import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button,
  Container,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Person,
  Favorite,
  Menu as MenuIcon,
  Home,
  Category,
  History,
  ExitToApp,
  AdminPanelSettings,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isLoggedIn = false; // Will be replaced with actual auth state
  const isAdmin = false;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Products', icon: <Category />, path: '/products' },
    { text: 'My Orders', icon: <History />, path: '/orders' },
    { text: 'Wishlist', icon: <Favorite />, path: '/wishlist' },
  ];

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, flexWrap: 'wrap', gap: 2 }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton onClick={() => setMobileDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                flexGrow: isMobile ? 1 : 0,
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.25rem' : '1.5rem',
              }}
            >
              🛍️ ShopHub
            </Typography>

            {/* Search Bar */}
            {!isMobile && (
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                  flexGrow: 1,
                  maxWidth: '500px',
                  mx: 4,
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 8,
                      backgroundColor: 'grey.50',
                    },
                  }}
                />
              </Box>
            )}

            {/* Navigation Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isMobile ? (
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/wishlist"
                  >
                    <Badge badgeContent={3} color="secondary">
                      <Favorite />
                    </Badge>
                  </IconButton>

                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/cart"
                  >
                    <Badge badgeContent={2} color="primary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </>
              )}

              {isLoggedIn ? (
                <>
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      U
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                      <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/orders">
                      <ListItemIcon><History fontSize="small" /></ListItemIcon>
                      My Orders
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={Link} to="/wishlist">
                      <ListItemIcon><Favorite fontSize="small" /></ListItemIcon>
                      Wishlist
                    </MenuItem>
                    {isAdmin && (
                      <MenuItem onClick={handleMenuClose} component={Link} to="/admin">
                        <ListItemIcon><AdminPanelSettings fontSize="small" /></ListItemIcon>
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon><ExitToApp fontSize="small" /></ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/login"
                  startIcon={<Person />}
                  sx={{ borderRadius: 8, display: isMobile ? 'none' : 'inline-flex' }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>

          {/* Mobile Search Bar */}
          {isMobile && (
            <Box component="form" onSubmit={handleSearch} sx={{ px: 2, pb: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                    backgroundColor: 'grey.50',
                  },
                }}
              />
            </Box>
          )}
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <Typography
            variant="h6"
            sx={{ px: 2, pb: 2, color: 'primary.main', fontWeight: 700 }}
          >
            🛍️ ShopHub
          </Typography>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                onClick={() => setMobileDrawerOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <Divider />
            {isLoggedIn ? (
              <>
                <ListItem button component={Link} to="/profile" onClick={() => setMobileDrawerOpen(false)}>
                  <ListItemIcon><Person /></ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => {}}>
                  <ListItemIcon><ExitToApp /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={() => setMobileDrawerOpen(false)}
              >
                <ListItemIcon><Person /></ListItemIcon>
                <ListItemText primary="Login / Register" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
