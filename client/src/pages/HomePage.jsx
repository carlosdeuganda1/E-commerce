import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LocalShipping,
  VerifiedUser,
  SupportAgent,
  ArrowForward,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { mockProducts, mockCategories } from '../utils/mockData';

function HomePage() {
  const theme = useTheme();
  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 4);
  const latestProducts = mockProducts.slice(0, 6);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="overline" sx={{ color: 'primary.light', fontWeight: 600 }}>
                  Summer Sale
                </Typography>
                <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
                  Discover Amazing
                  <br />
                  Deals Today!
                </Typography>
                <Typography variant="h5" sx={{ color: 'primary.light', mb: 4, fontWeight: 400 }}>
                  Up to 70% off on selected items
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/products"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Shop Now
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ textAlign: 'center' }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop"
                  alt="Shopping"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {[
            { icon: <LocalShipping />, title: 'Free Shipping', desc: 'On orders over $50' },
            { icon: <VerifiedUser />, title: 'Secure Payment', desc: '100% secure transactions' },
            { icon: <SupportAgent />, title: '24/7 Support', desc: 'Dedicated support team' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', fontSize: 40, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Featured Products
          </Typography>
          <Button component={Link} to="/products" endIcon={<ArrowForward />}>
            View All
          </Button>
        </Box>
        <ProductGrid products={featuredProducts} />
      </Container>

      {/* Category Showcase */}
      <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {mockCategories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={category.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card
                    component={Link}
                    to={`/products?category=${category.id}`}
                    sx={{
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="h2" sx={{ fontSize: 40, mb: 1 }}>
                        {category.icon}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {category.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.count} items
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Latest Products */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          New Arrivals
        </Typography>
        <ProductGrid products={latestProducts} compact />
      </Container>
    </Box>
  );
}

export default HomePage;
