import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  image, 
  alternateLink, 
  alternateText 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="xl" sx={{ minHeight: '80vh', py: 4 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Image Section */}
        {!isMobile && (
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[10],
                }}
              >
                <Box
                  component="img"
                  src={image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'}
                  alt="Authentication"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 4,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    color: 'white',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Welcome to ShopHub
                  </Typography>
                  <Typography variant="body1">
                    Your one-stop destination for quality products
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        )}

        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Paper
              elevation={isMobile ? 0 : 3}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 4,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 1,
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                  }}
                >
                  🛍️ ShopHub
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {title}
                </Typography>
                {subtitle && (
                  <Typography variant="body2" color="text.secondary">
                    {subtitle}
                  </Typography>
                )}
              </Box>

              {/* Form Content */}
              {children}

              {/* Alternate Link */}
              {alternateLink && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    {alternateText}{' '}
                    <Typography
                      component={Link}
                      to={alternateLink}
                      color="primary"
                      sx={{
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {alternateText === 'Login' ? 'Sign in' : 'Sign up'}
                    </Typography>
                  </Typography>
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AuthLayout;
