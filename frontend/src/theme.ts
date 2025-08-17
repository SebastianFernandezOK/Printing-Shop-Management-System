import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
    },
    secondary: {
      main: '#00bcd4',
      light: '#62efff',
      dark: '#008ba3',
    },
    background: {
      default: '#f4f7fa',
      paper: '#fff',
    },
    info: {
      main: '#7c4dff',
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#e53935',
    },
    warning: {
      main: '#ffa726',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 0, // Cuadrado global
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Cuadrado
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Cuadrado
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#1976d2',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2', // Cambia aquí si quieres otro color para el modo claro
          color: '#fff',
          boxShadow: 'none',
          borderRight: 'none',
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Cuadrado
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => {
          if (ownerState && ownerState.id === 'react-admin-title') {
            return {
              color: '#fff !important',
            };
          }
          return {};
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          // Sidebar toggle button has aria-label="Open sidebar" or "Close sidebar"
          if (
            ownerState &&
            (ownerState['aria-label'] === 'Open sidebar' || ownerState['aria-label'] === 'Close sidebar')
          ) {
            return {
              color: '#fff !important',
            };
          }
          return {};
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ ownerState }) => {
          // Sidebar toggle icon (hamburger) is inside IconButton in AppBar
          if (
            ownerState &&
            ownerState['data-testid'] === 'MenuIcon'
          ) {
            return {
              color: '#fff !important',
            };
          }
          return {};
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#181c25',
      paper: '#23293a',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  shape: {
    borderRadius: 0, // Cuadrado global
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Cuadrado
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Cuadrado
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#1976d2',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2', // Cambia aquí si quieres otro color para el modo claro
          color: '#fff',
          boxShadow: 'none',
          borderRight: 'none',
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Cuadrado
        },
      },
    },
  },
});
