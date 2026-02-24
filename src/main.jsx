import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { initAnalytics, trackPageView } from '@/lib/analytics';
import LoadingFallback from '@/components/LoadingFallback';
import '@/index.css';

// Lazy load components for code splitting
const App = React.lazy(() => import('@/App'));
const SeguroVida = React.lazy(() => import('@/pages/SeguroVida'));
const SeguroAuto = React.lazy(() => import('@/pages/SeguroAuto'));
const SeguroResidencial = React.lazy(() => import('@/pages/SeguroResidencial'));
const SeguroEmpresarial = React.lazy(() => import('@/pages/SeguroEmpresarial'));
const SeguroPatrimonial = React.lazy(() => import('@/pages/SeguroPatrimonial'));
const SeguroRCProfissional = React.lazy(() => import('@/pages/SeguroRCProfissional'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

// Analytics Tracker Component
const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
};

// Main Entry Point
const Main = () => {
  useEffect(() => {
    initAnalytics('G-XXXXXXXXXX'); // Replace with actual Measurement ID
    
    // Service Worker Registration (Placeholder for future implementation)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js');
      });
    }
  }, []);

  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <AnalyticsTracker />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/seguro-vida" element={<SeguroVida />} />
              <Route path="/seguro-auto" element={<SeguroAuto />} />
              <Route path="/seguro-residencial" element={<SeguroResidencial />} />
              <Route path="/seguro-empresarial" element={<SeguroEmpresarial />} />
              <Route path="/seguro-patrimonial" element={<SeguroPatrimonial />} />
              <Route path="/seguro-profissional" element={<SeguroRCProfissional />} />
              <Route path="/seguro-rc-profissional" element={<SeguroRCProfissional />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);