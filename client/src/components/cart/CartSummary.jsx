import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Divider,
  Button,
  Chip,
  Alert,
  TextField,
  IconButton,
  CircularProgress,
  Collapse,
} from '@mui/material';
import {
  LocalOffer,
  CheckCircle,
  Clear,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

function CartSummary({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  totalItems,
  couponCode,
  setCouponCode,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
  onContinueShopping,
  isLoading = false,
}) {
  const [promoError, setPromoError] = React.useState('');

  const handleApplyCoupon = () => {
    setPromoError('');
    if (!couponCode.trim()) {
      setPromoError('Please enter a coupon code');
      return;
    }
    onApplyCoupon();
  };

  return (
    <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Order Summary
      </Typography>

      {/* Coupon Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
            disabled={!!appliedCoupon || isLoading}
            fullWidth
            error={!!promoError}
            helperText={promoError}
            InputProps={{
              startAdornment: <LocalOffer sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          <Button
            variant="outlined"
            onClick={handleApplyCoupon}
            disabled={!!appliedCoupon || isLoading}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Apply
          </Button>
        </Box>
        {appliedCoupon && (
          <Chip
            label={`Coupon ${appliedCoupon.code} applied`}
            color="success"
            size="small"
            onDelete={onRemoveCoupon}
            sx={{ mt: 1 }}
          />
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Price Breakdown */}
      <Box sx={{ space: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Subtotal ({totalItems} items)
          </Typography>
          <Typography variant="body2">
            ${subtotal.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Shipping
          </Typography>
          <Typography variant="body2">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Tax (8%)
          </Typography>
          <Typography variant="body2">
            ${tax.toFixed(2)}
          </Typography>
        </Box>

        {discount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="success.main">
              Discount
            </Typography>
            <Typography variant="body2" color="success.main">
              -${discount.toFixed(2)}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            ${total.toFixed(2)}
          </Typography>
        </Box>

        {shipping === 0 && subtotal > 0 && (
          <Alert icon={<CheckCircle />} severity="success" sx={{ mb: 2 }}>
            You've qualified for free shipping!
          </Alert>
        )}

        {subtotal < 50 && subtotal > 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Add ${(50 - subtotal).toFixed(2)} more for free shipping
          </Alert>
        )}

        {subtotal === 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Your cart is empty
          </Alert>
        )}
      </Box>

      {/* Checkout Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={onCheckout}
        disabled={subtotal === 0 || isLoading}
        sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Proceed to Checkout'
        )}
      </Button>

      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={onContinueShopping}
        sx={{ mt: 1, py: 1.5, borderRadius: 2 }}
      >
        Continue Shopping
      </Button>

      {/* Secure Payment Info */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          🔒 Secure Checkout
        </Typography>
        <Typography variant="caption" color="text.secondary">
          •
        </Typography>
        <Typography variant="caption" color="text.secondary">
          💳 All Major Cards
        </Typography>
      </Box>
    </Paper>
  );
}

export default CartSummary;
