import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CartContextProvider } from './Store/CartContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#219653', // Professional green
      light: '#6FCF97',
      dark: '#17643A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFB800', // Elegant yellow accent
      light: '#FFE082',
      dark: '#C68400',
      contrastText: '#222B45',
    },
    background: {
      default: '#FAFAFA', // Subtle off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#222B45', // Deep blue-gray for readability
      secondary: '#6B7280', // Soft gray
    },
    divider: '#E0E0E0',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
