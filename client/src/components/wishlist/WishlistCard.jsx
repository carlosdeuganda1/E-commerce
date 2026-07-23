import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  IconButton,
  Chip,
  Button,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Delete,
  ShoppingCart,
  Favorite,
  Visibility,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function WishlistCard({ product, onRemove }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const discountPercentage = product.discount || 0;
  const finalPrice = product.discountedPrice || product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
    // In production, this would add to cart API call
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const handleRemove = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 800));
      onRemove(product.id);
      toast.info(`${product.name} removed from wishlist`, {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Failed to remove item', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleCancelRemove = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
      >
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <Box sx={{ position: 'relative', overflow: 'hidden', pt: '75%' }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <Chip
                label={`-${discountPercentage}%`}
                color="error"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              />
            )}

            {/* Stock Badge */}
            <Chip
              label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              color={product.stock > 0 ? 'success' : 'error'}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontWeight: 500,
                fontSize: '0.65rem',
              }}
            />

            {/* Quick View Overlay */}
            {isHovered && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<Visibility />}
                  onClick={handleViewProduct}
                  size="small"
                  sx={{ borderRadius: 4 }}
                >
                  Quick View
                </Button>
              </Box>
            )}
          </Box>

          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            {/* Brand */}
            {product.brand && (
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                {product.brand}
              </Typography>
            )}

            {/* Name */}
            <Typography
              variant="h6"
              component={Link}
              to={`/product/${product.id}`}
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': { color: 'primary.main' },
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontWeight: 600,
                fontSize: '1rem',
                mb: 0.5,
              }}
            >
              {product.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Rating value={product.rating} readOnly size="small" precision={0.5} />
              <Typography variant="caption" color="text.secondary">
                ({product.reviewCount})
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                ${finalPrice.toFixed(2)}
              </Typography>
              {discountPercentage > 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${product.originalPrice.toFixed(2)}
                </Typography>
              )}
            </Box>
          </CardContent>

          {/* Actions */}
          <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              sx={{ borderRadius: 4 }}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <IconButton
              color="error"
              onClick={handleRemove}
              sx={{
                bgcolor: 'grey.50',
                '&:hover': { bgcolor: 'error.light', color: 'white' },
              }}
            >
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelRemove}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Favorite color="error" />
            Remove from Wishlist
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove "{product.name}" from your wishlist?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={handleCancelRemove} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmRemove} 
            variant="contained" 
            color="error"
            disabled={loading}
          >
            {loading ? 'Removing...' : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WishlistCard;
