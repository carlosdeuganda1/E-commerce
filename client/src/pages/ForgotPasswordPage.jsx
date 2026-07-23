import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Alert,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import { Email, ArrowBack, CheckCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthLayout from '../components/auth/AuthLayout';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      setSubmitted(true);
      toast.success('Password reset email sent!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.', {
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setSubmitted(false);
    setEmail('');
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent you a password reset link"
        image="https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&h=600&fit=crop"
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <CheckCircle sx={{ fontSize: 48, color: 'success.main' }} />
          </Box>
          
          <Typography variant="h6" gutterBottom>
            Email Sent!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            We've sent a password reset link to <strong>{email}</strong>
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
            Please check your email and follow the instructions to reset your password.
            The link will expire in 24 hours.
          </Alert>

          <Button
            fullWidth
            variant="contained"
            onClick={handleResend}
            sx={{ mb: 2 }}
          >
            Resend Email
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to="/login"
            startIcon={<ArrowBack />}
          >
            Back to Login
          </Button>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive a reset link"
      image="https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&h=600&fit=crop"
      alternateLink="/login"
      alternateText="Remember your password?"
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter the email address associated with your account and we'll send you
          a link to reset your password.
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          error={!!error}
          helperText={error}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Send Reset Link'
          )}
        </Button>

        <Button
          fullWidth
          component={Link}
          to="/login"
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Back to Login
        </Button>
      </form>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
