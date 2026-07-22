import { createTheme } from '@mui/material/styles';

// HSL Color System
export const colors = {
  primary: {
    main: 'hsl(220, 80%, 50%)',
    light: 'hsl(220, 80%, 65%)',
    dark: 'hsl(220, 80%, 35%)',
    contrastText: '#ffffff',
  },
  secondary: {
    main: 'hsl(330, 80%, 50%)',
    light: 'hsl(330, 80%, 65%)',
    dark: 'hsl(330, 80%, 35%)',
    contrastText: '#ffffff',
  },
  success: {
    main: 'hsl(140, 80%, 45%)',
    light: 'hsl(140, 80%, 60%)',
    dark: 'hsl(140, 80%, 30%)',
  },
  warning: {
    main: 'hsl(40, 95%, 55%)',
    light: 'hsl(40, 95%, 70%)',
    dark: 'hsl(40, 95%, 40%)',
  },
  error: {
    main: 'hsl(0, 80%, 50%)',
    light: 'hsl(0, 80%, 65%)',
    dark: 'hsl(0, 80%, 35%)',
  },
  info: {
    main: 'hsl(190, 80%, 50%)',
    light: 'hsl(190, 80%, 65%)',
    dark: 'hsl(190, 80%, 35%)',
  },
  grey: {
    50: 'hsl(0, 0%, 98%)',
    100: 'hsl(0, 0%, 96%)',
    200: 'hsl(0, 0%, 90%)',
    300: 'hsl(0, 0%, 80%)',
    400: 'hsl(0, 0%, 70%)',
    500: 'hsl(0, 0%, 60%)',
    600: 'hsl(0, 0%, 50%)',
    700: 'hsl(0, 0%, 40%)',
    800: 'hsl(0, 0%, 30%)',
    900: 'hsl(0, 0%, 20%)',
  },
};

export const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    grey: colors.grey,
    background: {
      default: 'hsl(220, 20%, 97%)',
      paper: 'hsl(0, 0%, 100%)',
    },
    text: {
      primary: 'hsl(220, 30%, 20%)',
      secondary: 'hsl(220, 20%, 45%)',
      disabled: 'hsl(220, 15%, 70%)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(0, 0%, 100%)',
          color: 'hsl(220, 30%, 20%)',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});
