import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
  Chip,
  Divider,
  Paper,
  TextField,
  Avatar,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  Remove,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  ArrowBack,
  CheckCircle,
  Star,
  StarBorder,
  ThumbUp,
  ThumbDown,
  LocalShipping,
  Shield,
  Refresh,
  Payment,
} from '@mui/icons-material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ProductCard from '../components/products/ProductCard';
import { mockProducts } from '../utils/mockData';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Load product data
  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(0);
      
      // Get related products (same category, different product)
      const related = mockProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);

      // Generate mock reviews
      const mockReviews = [
        {
          id: 1,
          user: 'John D.',
          rating: 5,
          date: '2024-03-15',
          comment: 'Amazing product! Exceeded my expectations. Highly recommend!',
          helpful: 12,
          unhelpful: 1,
          avatar: 'J',
        },
        {
          id: 2,
          user: 'Sarah M.',
          rating: 4,
          date: '2024-03-10',
          comment: 'Great quality, fast shipping. Would buy again.',
          helpful: 8,
          unhelpful: 0,
          avatar: 'S',
        },
        {
          id: 3,
          user: 'Mike R.',
          rating: 5,
          date: '2024-03-05',
          comment: 'Perfect product! Exactly what I was looking for.',
          helpful: 15,
          unhelpful: 2,
          avatar: 'M',
        },
        {
          id: 4,
          user: 'Emma W.',
          rating: 3,
          date: '2024-02-28',
          comment: 'Good product but shipping took longer than expected.',
          helpful: 3,
          unhelpful: 4,
          avatar: 'E',
        },
      ];
      setReviews(mockReviews);
    } else {
      // Product not found - redirect to products page
      navigate('/products');
      toast.error('Product not found');
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  // Handlers
  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success(`${quantity} × ${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const handleBuyNow = () => {
    toast.info('Redirecting to checkout...');
    // navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    setIsLiked(!isLiked);
    toast.info(isLiked ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on ShopHub!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnackbar({
        open: true,
        message: 'Link copied to clipboard!',
        severity: 'success',
      });
    }
  };

  const handleSubmitReview = () => {
    if (ratingValue === 0) {
      setSnackbar({
        open: true,
        message: 'Please select a rating',
        severity: 'error',
      });
      return;
    }
    setSnackbar({
      open: true,
      message: 'Review submitted successfully!',
      severity: 'success',
    });
    setRatingValue(0);
    setRatingComment('');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const discountPercentage = product.discount || 0;
  const finalPrice = product.discountedPrice || product.price;
  const totalPrice = finalPrice * quantity;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    return {
      stars,
      count,
      percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0,
    };
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Link component={RouterLink} to="/products" color="inherit">
          Products
        </Link>
        <Link component={RouterLink} to={`/products?category=${product.category}`} color="inherit">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Main Product Section */}
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ position: 'relative' }}>
              {/* Main Image */}
              <Paper
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 3,
                  mb: 2,
                  p: 2,
                  bgcolor: 'grey.50',
                }}
              >
                <Box
                  component="img"
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 500,
                    objectFit: 'contain',
                  }}
                />
                {discountPercentage > 0 && (
                  <Chip
                    label={`-${discountPercentage}%`}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      fontWeight: 700,
                      fontSize: '1rem',
                      py: 2,
                    }}
                  />
                )}
              </Paper>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                  {product.images.map((img, index) => (
                    <Box
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      sx={{
                        width: 80,
                        height: 80,
                        flexShrink: 0,
                        border: selectedImage === index ? '2px solid' : '1px solid',
                        borderColor: selectedImage === index ? 'primary.main' : 'grey.300',
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        p: 0.5,
                        bgcolor: 'white',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </motion.div>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Brand & Name */}
            {product.brand && (
              <Typography variant="overline" color="text.secondary">
                {product.brand}
              </Typography>
            )}
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {product.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount} reviews)
              </Typography>
              <Chip
                label={`${product.stock} in stock`}
                color={product.stock > 0 ? 'success' : 'error'}
                size="small"
              />
            </Box>

            {/* Price */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                ${finalPrice.toFixed(2)}
              </Typography>
              {discountPercentage > 0 && (
                <>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ${product.originalPrice.toFixed(2)}
                  </Typography>
                  <Chip
                    label={`Save ${discountPercentage}%`}
                    color="error"
                    size="small"
                  />
                </>
              )}
            </Box>

            {/* Description */}
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              {product.description}
            </Typography>

            {/* Key Features */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Chip icon={<LocalShipping />} label="Free Shipping" variant="outlined" />
              <Chip icon={<Shield />} label="2 Year Warranty" variant="outlined" />
              <Chip icon={<Refresh />} label="30 Day Returns" variant="outlined" />
              <Chip icon={<Payment />} label="Secure Payment" variant="outlined" />
            </Box>

            {/* Quantity & Actions */}
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Quantity:
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                  sx={{ border: '1px solid', borderColor: 'grey.300' }}
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val > 0 && val <= product.stock) {
                      setQuantity(val);
                    }
                  }}
                  size="small"
                  sx={{ width: 60, '& input': { textAlign: 'center' } }}
                  inputProps={{ min: 1, max: product.stock }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange('increase')}
                  disabled={quantity >= product.stock}
                  sx={{ border: '1px solid', borderColor: 'grey.300' }}
                >
                  <Add />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{ borderRadius: 2 }}
                >
                  Add to Cart
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleBuyNow}
                  sx={{ borderRadius: 2 }}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
                onClick={handleWishlistToggle}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                {isLiked ? 'Wishlisted' : 'Add to Wishlist'}
              </Button>
              <Button
                startIcon={<Share />}
                onClick={handleShare}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Share
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ mt: 6 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? 'fullWidth' : 'standard'}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label={`Reviews (${reviews.length})`} />
        </Tabs>

        {/* Tab Panels */}
        <Box sx={{ mt: 3 }}>
          {/* Description Tab */}
          {tabValue === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </Typography>
            </motion.div>
          )}

          {/* Specifications Tab */}
          {tabValue === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={2}>
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="caption" color="text.secondary">
                        {key}
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {product.category}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" color="text.secondary">
                      Stock
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {product.stock} units
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* Reviews Tab */}
          {tabValue === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4}>
                {/* Rating Summary */}
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700 }}>
                      {averageRating.toFixed(1)}
                    </Typography>
                    <Rating value={averageRating} readOnly precision={0.5} size="large" />
                    <Typography variant="body2" color="text.secondary">
                      Based on {reviews.length} reviews
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ textAlign: 'left' }}>
                      {ratingDistribution.map((item) => (
                        <Box key={item.stars} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="caption" sx={{ minWidth: 20 }}>
                            {item.stars}
                          </Typography>
                          <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                          <LinearProgress
                            variant="determinate"
                            value={item.percentage}
                            sx={{ flex: 1, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {item.count}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                {/* Review List */}
                <Grid item xs={12} md={8}>
                  {/* Write Review */}
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Write a Review
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Rating
                        value={ratingValue}
                        onChange={(e, newValue) => setRatingValue(newValue)}
                        size="large"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {ratingValue > 0 ? `${ratingValue} stars` : 'Select rating'}
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Share your experience with this product..."
                      value={ratingComment}
                      onChange={(e) => setRatingComment(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSubmitReview}
                      startIcon={<CheckCircle />}
                    >
                      Submit Review
                    </Button>
                  </Paper>

                  {/* Reviews List */}
                  <List>
                    {reviews.map((review) => (
                      <Paper key={review.id} sx={{ mb: 2, p: 2 }}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {review.avatar}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    {review.user}
                                  </Typography>
                                  <Rating value={review.rating} readOnly size="small" />
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                  {review.date}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  {review.comment}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                  <Button size="small" startIcon={<ThumbUp />}>
                                    Helpful ({review.helpful})
                                  </Button>
                                  <Button size="small" startIcon={<ThumbDown />}>
                                    Not Helpful ({review.unhelpful})
                                  </Button>
                                </Box>
                              </>
                            }
                          />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </motion.div>
          )}
        </Box>
      </Box>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Related Products
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map((product) => (
              <Grid item xs={6} sm={6} md={3} key={product.id}>
                <ProductCard product={product} compact />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

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
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProductDetails;
