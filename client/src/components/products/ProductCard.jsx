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
} from '@mui/material';
import { Favorite, FavoriteBorder, AddShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function ProductCard({ product, compact = false }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = product.discount || 0;
  const finalPrice = product.discountedPrice || product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    toast.info(isLiked ? 'Removed from wishlist' : 'Added to wishlist', {
      position: 'bottom-right',
      autoClose: 1500,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
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
        {/* Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '100%' }}>
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
              transition: 'transform 0.3s',
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

          {/* Wishlist Button */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'white',
              '&:hover': { bgcolor: 'white' },
              boxShadow: 1,
            }}
            onClick={handleWishlistToggle}
            size="small"
          >
            {isLiked ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>

          {/* Quick Actions - Show on Hover */}
          {isHovered && !compact && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                px: 1,
              }}
            >
              <Button
                variant="contained"
                size="small"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                fullWidth
                sx={{ borderRadius: 4 }}
              >
                Add to Cart
              </Button>
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          {/* Brand / Category */}
          {product.brand && (
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
              {product.brand}
            </Typography>
          )}

          {/* Name */}
          <Typography
            variant={compact ? 'body2' : 'h6'}
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
              fontWeight: compact ? 500 : 600,
              fontSize: compact ? '0.875rem' : '1rem',
              mb: 0.5,
            }}
          >
            {product.name}
          </Typography>

          {/* Rating */}
          {!compact && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Rating value={product.rating} readOnly size="small" precision={0.5} />
              <Typography variant="caption" color="text.secondary">
                ({product.reviewCount})
              </Typography>
            </Box>
          )}

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography
              variant={compact ? 'subtitle1' : 'h6'}
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

          {/* Stock Status */}
          {compact && (
            <Typography variant="caption" color={product.stock > 0 ? 'success.main' : 'error.main'}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
          )}
        </CardContent>

        {/* Compact Action Button */}
        {compact && (
          <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              size="small"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
              sx={{ borderRadius: 4 }}
            >
              Add
            </Button>
          </CardActions>
        )}
      </Card>
    </motion.div>
  );
}

export default ProductCard;
