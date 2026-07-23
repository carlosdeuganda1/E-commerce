import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Home,
  Business,
  Map,
} from '@mui/icons-material';

function ShippingForm({ formData, errors, onChange, onSubmit, onBack, loading }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Shipping Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please enter your shipping details for order delivery
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {/* Full Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <Person sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>

          {/* Email & Phone */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <Email sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              error={!!errors.phone}
              helperText={errors.phone}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>

          {/* Address Line 1 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={onChange}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
              disabled={loading}
              placeholder="123 Main Street"
              InputProps={{
                startAdornment: (
                  <Home sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>

          {/* Address Line 2 */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Apartment, Suite, etc. (Optional)"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={onChange}
              disabled={loading}
              placeholder="Apt 4B"
              InputProps={{
                startAdornment: (
                  <Business sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>

          {/* City, State, ZIP */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={onChange}
              error={!!errors.city}
              helperText={errors.city}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={onChange}
              error={!!errors.state}
              helperText={errors.state}
              disabled={loading}
            />
          </Grid>

          {/* ZIP & Country */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ZIP/Postal Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={onChange}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.country}>
              <InputLabel>Country</InputLabel>
              <Select
                name="country"
                value={formData.country}
                onChange={onChange}
                label="Country"
                disabled={loading}
                startAdornment={
                  <Map sx={{ mr: 1, color: 'text.secondary' }} />
                }
              >
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="AU">Australia</MenuItem>
                <MenuItem value="IN">India</MenuItem>
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="FR">France</MenuItem>
                <MenuItem value="JP">Japan</MenuItem>
              </Select>
              {errors.country && (
                <FormHelperText>{errors.country}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Delivery Instructions */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Delivery Instructions (Optional)"
              name="deliveryInstructions"
              value={formData.deliveryInstructions}
              onChange={onChange}
              disabled={loading}
              multiline
              rows={2}
              placeholder="Any special delivery instructions..."
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={onBack}
                disabled={loading}
              >
                Back to Cart
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ minWidth: 150 }}
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ShippingForm;
