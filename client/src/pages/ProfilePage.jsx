import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileInfo from '../components/profile/ProfileInfo';
import OrdersPage from './OrdersPage';

function ProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    bio: 'Passionate shopper and tech enthusiast.',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo user={user} />;
      case 'orders':
        return <OrdersPage />;
      case 'wishlist':
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" gutterBottom>
              Wishlist
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your wishlist items will appear here
            </Typography>
          </Box>
        );
      case 'payments':
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" gutterBottom>
              Payment Methods
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your payment methods here
            </Typography>
          </Box>
        );
      case 'notifications':
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your notification settings will appear here
            </Typography>
          </Box>
        );
      case 'settings':
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Account settings will appear here
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          My Account
        </Typography>

        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                position: isMobile ? 'relative' : 'sticky',
                top: 100,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <ProfileSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                user={user}
              />
            </Paper>
          </Grid>

          {/* Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3 }}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}

export default ProfilePage;
