import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Delete,
  Remove,
  Add,
  Close,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function CartItem({ item, onQuantityChange, onRemove }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isHovered, setIsHovered] = useState(false);

  const handleQuantityInput = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 99) {
      onQuantityChange(item.id, value);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < 99) {
      onQuantityChange(item.id, item.quantity + 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 2,
          position: 'relative',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: theme.shadows[4],
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Product Image */}
          <Grid item xs={3} sm={2}>
            <Box
              component={Link}
              to={`/product/${item.productId}`}
              sx={{
                display: 'block',
                width: '100%',
                pt: '100%',
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'grey.50',
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={9} sm={5}>
            <Typography
              variant="body1"
              component={Link}
              to={`/product/${item.productId}`}
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                fontWeight: 500,
                '&:hover': { color: 'primary.main' },
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${item.price.toFixed(2)} each
            </Typography>
            {!isMobile && (
              <Typography variant="caption" color="text.secondary">
                In stock
              </Typography>
            )}
          </Grid>

          {/* Quantity Controls */}
          <Grid item xs={6} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 1,
                }}
              >
                <Remove fontSize="small" />
              </IconButton>
              <TextField
                value={item.quantity}
                onChange={handleQuantityInput}
                size="small"
                sx={{
                  width: 50,
                  '& input': {
                    textAlign: 'center',
                    padding: '6px 4px',
                  },
                }}
                inputProps={{ min: 1, max: 99 }}
              />
              <IconButton
                size="small"
                onClick={handleIncrease}
                disabled={item.quantity >= 99}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 1,
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Price & Actions */}
          <Grid item xs={6} sm={2}>
            <Box sx={{ textAlign: { xs: 'right', sm: 'right' } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ${itemTotal.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 0.5 }}>
                {isMobile ? (
                  <IconButton
                    size="small"
                    onClick={handleRemove}
                    color="error"
                    sx={{ p: 0.5 }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                ) : (
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleRemove}
                    sx={{ fontSize: '0.7rem' }}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Mobile Quick Actions */}
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="body2" color="text.secondary">
              ${item.price.toFixed(2)} each
            </Typography>
            <Button
              size="small"
              color="error"
              startIcon={<Close />}
              onClick={handleRemove}
            >
              Remove
            </Button>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
}

export default CartItem;
