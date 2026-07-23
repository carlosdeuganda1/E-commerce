import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Google, Facebook, Apple } from '@mui/icons-material';
import { toast } from 'react-toastify';

function SocialLogin() {
  const handleSocialLogin = (provider) => {
    toast.info(`Redirecting to ${provider} login...`, {
      position: 'bottom-right',
    });
    // In production, this would redirect to OAuth provider
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Divider sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary">
          OR CONTINUE WITH
        </Typography>
      </Divider>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          onClick={() => handleSocialLogin('Google')}
          sx={{
            py: 1.5,
            borderRadius: 2,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.light',
              color: 'primary.main',
            },
          }}
        >
          Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Facebook />}
          onClick={() => handleSocialLogin('Facebook')}
          sx={{
            py: 1.5,
            borderRadius: 2,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: '#1877f2',
              bgcolor: '#1877f210',
              color: '#1877f2',
            },
          }}
        >
          Facebook
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Apple />}
          onClick={() => handleSocialLogin('Apple')}
          sx={{
            py: 1.5,
            borderRadius: 2,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: '#000',
              bgcolor: '#00000010',
              color: '#000',
            },
          }}
        >
          Apple
        </Button>
      </Box>
    </Box>
  );
}

export default SocialLogin;
