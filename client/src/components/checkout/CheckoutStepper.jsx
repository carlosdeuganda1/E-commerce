import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LocalShipping,
  Payment,
  CheckCircle,
  Assignment,
} from '@mui/icons-material';

function CheckoutStepper({ activeStep, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = [
    {
      label: 'Shipping',
      icon: <LocalShipping />,
      description: 'Enter your shipping details',
    },
    {
      label: 'Payment',
      icon: <Payment />,
      description: 'Choose payment method',
    },
    {
      label: 'Review',
      icon: <Assignment />,
      description: 'Review your order',
    },
    {
      label: 'Confirmation',
      icon: <CheckCircle />,
      description: 'Order placed successfully',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        sx={{
          '& .MuiStepLabel-root': {
            flexDirection: isMobile ? 'row' : 'column',
          },
          '& .MuiStepLabel-iconContainer': {
            pr: isMobile ? 2 : 0,
          },
          '& .MuiStepLabel-label': {
            fontWeight: 500,
          },
          '& .MuiStepLabel-label.Mui-active': {
            fontWeight: 700,
            color: 'primary.main',
          },
          '& .MuiStepLabel-label.Mui-completed': {
            fontWeight: 500,
            color: 'success.main',
          },
        }}
      >
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel StepIconComponent={() => (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: activeStep >= index ? 'primary.main' : 'grey.200',
                  color: activeStep >= index ? 'white' : 'text.secondary',
                  transition: 'all 0.3s',
                  '& svg': {
                    fontSize: 20,
                  },
                }}
              >
                {step.icon}
              </Box>
            )}>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {step.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </StepLabel>
            {!isMobile && activeStep === index && (
              <StepContent>
                <Paper sx={{ p: 3, mt: 2, bgcolor: 'grey.50' }}>
                  {children}
                </Paper>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>

      {/* Mobile Content */}
      {isMobile && (
        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
            {children}
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default CheckoutStepper;
