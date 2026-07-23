import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutStepper from '../components/checkout/CheckoutStepper';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentMethod from '../components/checkout/PaymentMethod';
import OrderSummary from '../components/checkout/OrderSummary';
import OrderSuccess from '../components/checkout/OrderSuccess';
import { mockCartItems } from '../utils/mockData';

function CheckoutPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Form Data
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    deliveryInstructions: '',
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'credit_card',
  });

  const [errors, setErrors] = useState({});

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const discount = 0; // Will be updated with coupon logic
  const total = subtotal + shipping + tax - discount;

  // Check if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.warning('Your cart is empty. Please add items before checkout.', {
        position: 'bottom-right',
      });
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Form validation
  const validateShipping = () => {
    const newErrors = {};
    if (!shippingData.fullName) newErrors.fullName = 'Full name is required';
    if (!shippingData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(shippingData.email)) newErrors.email = 'Email is invalid';
    if (!shippingData.phone) newErrors.phone = 'Phone number is required';
    if (!shippingData.addressLine1) newErrors.addressLine1 = 'Address is required';
    if (!shippingData.city) newErrors.city = 'City is required';
    if (!shippingData.state) newErrors.state = 'State is required';
    if (!shippingData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!shippingData.country) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleShippingChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (validateShipping()) {
        setActiveStep(1);
        window.scrollTo(0, 0);
      }
    } else if (activeStep === 1) {
      if (paymentData.paymentMethod) {
        setActiveStep(2);
        window.scrollTo(0, 0);
      } else {
        toast.error('Please select a payment method', {
          position: 'bottom-right',
        });
      }
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/cart');
    } else {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order data
      const order = {
        id: Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        total: total,
        paymentMethod: paymentData.paymentMethod === 'credit_card' ? 'Credit Card' : paymentData.paymentMethod,
        items: cartItems,
        shippingAddress: shippingData,
        status: 'processing',
      };

      setOrderData(order);
      setOrderComplete(true);
      setActiveStep(3);

      // Clear cart (mock)
      setCartItems([]);
      
      toast.success('Order placed successfully!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Failed to place order. Please try again.', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ShippingForm
            formData={shippingData}
            errors={errors}
            onChange={handleShippingChange}
            onSubmit={handleNext}
            onBack={handleBack}
            loading={loading}
          />
        );
      case 1:
        return (
          <PaymentMethod
            formData={paymentData}
            onChange={handlePaymentChange}
            onSubmit={handleNext}
            onBack={handleBack}
            loading={loading}
          />
        );
      case 2:
        return (
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            discount={discount}
            total={total}
            onSubmit={handlePlaceOrder}
            onBack={handleBack}
            loading={loading}
          />
        );
      case 3:
        return <OrderSuccess order={orderData} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Checkout
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete your order in a few steps
          </Typography>
        </Box>

        {/* Progress */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel={!isMobile}>
            <Step>
              <StepLabel>Shipping</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
            <Step>
              <StepLabel>Review</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirmation</StepLabel>
            </Step>
          </Stepper>
        </Box>

        {/* Content */}
        <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3 }}>
          {getStepContent(activeStep)}
        </Paper>

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
      </motion.div>
    </Container>
  );
}

export default CheckoutPage;
