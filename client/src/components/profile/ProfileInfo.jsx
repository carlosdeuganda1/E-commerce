import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

function ProfileInfo({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    address: user?.address || '123 Main Street, New York, NY 10001',
    bio: user?.bio || 'Passionate shopper and tech enthusiast.',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Profile updated successfully!', {
        position: 'bottom-right',
      });
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john@example.com',
      phone: user?.phone || '+1 (555) 123-4567',
      address: user?.address || '123 Main Street, New York, NY 10001',
      bio: user?.bio || 'Passionate shopper and tech enthusiast.',
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      toast.success('Profile photo updated!', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Profile Information
        </Typography>
        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <Save />}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        )}
      </Box>

      {/* Profile Photo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              fontSize: 40,
              boxShadow: 3,
            }}
          >
            {formData.name?.[0] || 'U'}
          </Avatar>
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              bgcolor: 'white',
              boxShadow: 1,
              '&:hover': { bgcolor: 'grey.50' },
            }}
            size="small"
          >
            <PhotoCamera fontSize="small" />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h6">{formData.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Member since January 2024
          </Typography>
          <Chip
            label="Active"
            size="small"
            color="success"
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>

      {/* Profile Form */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing || loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing || loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing || loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing || loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            multiline
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing || loading}
            placeholder="Tell us a little about yourself..."
          />
        </Grid>
      </Grid>

      {/* Account Stats */}
      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Account Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              12
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Orders
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
              8
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed Orders
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
              3
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending Orders
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
              ₹12,450
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Spent
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Recent Activity
      </Typography>
      <Paper sx={{ p: 3 }}>
        {[
          { action: 'Order #1234 delivered', time: '2 hours ago' },
          { action: 'Reviewed Wireless Headphones', time: '1 day ago' },
          { action: 'Added items to wishlist', time: '3 days ago' },
          { action: 'Order #1232 shipped', time: '5 days ago' },
        ].map((activity, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.5,
              borderBottom: index < 3 ? '1px solid' : 'none',
              borderColor: 'grey.100',
            }}
          >
            <Typography variant="body2">{activity.action}</Typography>
            <Typography variant="caption" color="text.secondary">
              {activity.time}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default ProfileInfo;
