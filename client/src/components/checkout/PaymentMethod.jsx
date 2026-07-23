import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Divider,
  Chip,
  Alert,
  Collapse,
  Card,
  CardContent,
} from '@mui/material';
import {
  CreditCard,
  Payment,
  AccountBalance,
  QrCode,
  Shield,
  Lock,
} from '@mui/icons-material';

function PaymentMethod({ formData, onChange, onSubmit, onBack, loading }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [showCardForm, setShowCardForm] = useState(false);

  const paymentMethods = [
    {
      id: 'credit_card',
      label: 'Credit / Debit Card',
      icon: <CreditCard />,
      description: 'Pay securely with your card',
    },
    {
      id: 'paypal',
      label: 'PayPal',
      icon: <Payment />,
      description: 'Pay with your PayPal account',
    },
    {
      id: 'upi',
      label: 'UPI',
      icon: <QrCode />,
      description: 'Pay with UPI / QR Code',
    },
    {
      id: 'bank_transfer',
      label: 'Bank Transfer',
      icon: <AccountBalance />,
      description: 'Direct bank transfer',
    },
  ];

  const handleCardSubmit = (e) => {
    e.preventDefault();
    // Validate card details
    const newErrors = {};
    if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!cardName) {
      newErrors.cardName = 'Cardholder name is required';
    }
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    if (!cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Proceed to next step
    onSubmit();
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    // Format as 1234 5678 9012 3456
    const formatted = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Payment Method
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select your preferred payment method
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          value={formData.paymentMethod}
          onChange={onChange}
          name="paymentMethod"
        >
          <Grid container spacing={2}>
            {paymentMethods.map((method) => (
              <Grid item xs={12} key={method.id}>
                <Paper
                  sx={{
                    p: 2,
                    border: '2px solid',
                    borderColor:
                      formData.paymentMethod === method.id
                        ? 'primary.main'
                        : 'transparent',
                    bgcolor:
                      formData.paymentMethod === method.id
                        ? 'primary.light'
                        : 'white',
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: 'primary.light',
                      bgcolor: 'grey.50',
                    },
                    cursor: 'pointer',
                  }}
                  onClick={() => onChange({ target: { name: 'paymentMethod', value: method.id } })}
                >
                  <FormControlLabel
                    value={method.id}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        <Box sx={{ color: 'primary.main', fontSize: 32 }}>
                          {method.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" fontWeight={600}>
                            {method.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {method.description}
                          </Typography>
                        </Box>
                        {formData.paymentMethod === method.id && (
                          <Chip
                            label="Selected"
                            color="primary"
                            size="small"
                          />
                        )}
                      </Box>
                    }
                    sx={{ width: '100%', m: 0 }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>

      {/* Credit Card Form */}
      {formData.paymentMethod === 'credit_card' && (
        <Collapse in={true}>
          <Box sx={{ mt: 3 }}>
            <Alert severity="info" icon={<Lock />} sx={{ mb: 3 }}>
              Your payment information is secure and encrypted
            </Alert>

            <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
              <CardContent>
                <form onSubmit={handleCardSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Card Number"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        disabled={loading}
                        InputProps={{
                          startAdornment: (
                            <CreditCard sx={{ mr: 1, color: 'text.secondary' }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Cardholder Name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        error={!!errors.cardName}
                        helperText={errors.cardName}
                        placeholder="John Doe"
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Expiry Date"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate}
                        placeholder="MM/YY"
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVV"
                        value={cvv}
                        onChange={handleCvvChange}
                        error={!!errors.cvv}
                        helperText={errors.cvv}
                        placeholder="123"
                        type="password"
                        disabled={loading}
                        InputProps={{
                          endAdornment: (
                            <Box component="span" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                              ?
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      Pay Now
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Collapse>
      )}

      {/* Other Payment Methods Info */}
      {formData.paymentMethod && formData.paymentMethod !== 'credit_card' && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            You will be redirected to complete payment
          </Alert>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={onBack}
              disabled={loading}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </Box>
        </Box>
      )}

      {/* Security Badges */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          icon={<Lock />}
          label="256-bit SSL Encryption"
          variant="outlined"
          size="small"
        />
        <Chip
          icon={<Shield />}
          label="PCI Compliant"
          variant="outlined"
          size="small"
        />
      </Box>
    </Box>
  );
}

export default PaymentMethod;
