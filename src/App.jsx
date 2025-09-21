import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  useMediaQuery,
} from '@mui/material';
import { getTheme } from './theme/theme';

// Components
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import VoiceAIAssistant from './components/VoiceAIAssistant';

// Pages
import SplashScreen from './pages/SplashScreen';
import OnboardingFlow from './pages/OnboardingFlow';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import OrderTracking from './pages/OrderTracking';
import Analytics from './pages/Analytics';
import Earnings from './pages/Earnings';
import Marketing from './pages/Marketing';
import Help from './pages/Help';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  const theme = getTheme(darkMode ? 'dark' : 'light');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem('onboardingCompleted');
    setHasCompletedOnboarding(completed === 'true');

    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setHasCompletedOnboarding(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (showSplash) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SplashScreen />
      </ThemeProvider>
    );
  }

  if (!hasCompletedOnboarding) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Top Bar */}
          <TopBar 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode} 
            isMobile={isMobile}
          />

          <Box sx={{ display: 'flex', flex: 1 }}>
            {/* Sidebar for desktop */}
            {!isMobile && (
              <Sidebar />
            )}

            {/* Main Content */}
            <Box
              component="main"
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: 'background.default',
                minHeight: '100vh',
                paddingBottom: isMobile ? '80px' : '24px', // Extra padding for bottom nav on mobile
              }}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/orders" element={<OrderTracking />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/earnings" element={<Earnings />} />
                <Route path="/marketing" element={<Marketing />} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </Box>
          </Box>

          {/* Bottom Navigation for mobile */}
          {isMobile && <BottomNav />}

          {/* Voice AI Assistant - available on all pages */}
          <VoiceAIAssistant />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;