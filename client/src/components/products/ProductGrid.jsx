import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

function ProductGrid({ products, loading = false, compact = false }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" gutterBottom>
          No products found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters or search terms
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <AnimatePresence>
        {products.map((product, index) => (
          <Grid 
            item 
            xs={compact ? 6 : 12} 
            sm={compact ? 6 : 6} 
            md={compact ? 4 : 4} 
            lg={compact ? 3 : 3} 
            key={product.id}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <ProductCard product={product} compact={compact} />
            </motion.div>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
}

export default ProductGrid;
