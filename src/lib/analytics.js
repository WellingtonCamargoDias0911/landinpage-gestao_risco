
import React from "react";
import ReactGA from 'react-ga4';
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

// Initialize GTM and GA4
export const initAnalytics = (trackingId) => {
  // Initialize GTM
  if (typeof window !== 'undefined' && !window.gtmInitialized) {
    window.gtmInitialized = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-NSWHCCH7';
    document.head.appendChild(script);
    console.log('[Analytics] GTM-NSWHCCH7 Initialized');
  }

  // Initialize GA4
  if (trackingId) {
    ReactGA.initialize(trackingId);
    trackWebVitals();
  }

  // Capture UTM parameters globally on load
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    let hasUtms = false;
    
    utms.forEach(utm => {
      const val = params.get(utm);
      if (val) {
        sessionStorage.setItem(utm, val);
        hasUtms = true;
      }
    });

    if (hasUtms) {
      console.log('[Analytics] Captured UTM parameters:', getStoredUtms());
    }
  }
};

export const getStoredUtms = () => {
  if (typeof window === 'undefined') return {};
  return {
    utm_source: sessionStorage.getItem('utm_source') || '',
    utm_medium: sessionStorage.getItem('utm_medium') || '',
    utm_campaign: sessionStorage.getItem('utm_campaign') || '',
    utm_term: sessionStorage.getItem('utm_term') || '',
    utm_content: sessionStorage.getItem('utm_content') || ''
  };
};

// Track Web Vitals
const trackWebVitals = () => {
  const sendToAnalytics = ({ name, delta, id }) => {
    ReactGA.event({
      category: 'Web Vitals',
      action: name,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      label: id,
      nonInteraction: true,
    });
  };

  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
};

// Set to keep track of recent events to prevent duplicates (debounce)
const recentEvents = new Set();
const DEBOUNCE_TIME_MS = 2000; // Prevent same event within 2 seconds

// Track Events with deduplication
export const trackEvent = (eventName, properties = {}) => {
  try {
    // Create a unique key for the event to deduplicate
    const eventKey = `${eventName}-${JSON.stringify(properties)}`;
    
    // Check if this exact event was fired recently
    if (recentEvents.has(eventKey)) {
      console.log(`[Analytics] 🛑 Suppressed duplicate event: ${eventName}`);
      return;
    }

    // Add to recent events and set timeout to remove it
    recentEvents.add(eventKey);
    setTimeout(() => {
      recentEvents.delete(eventKey);
    }, DEBOUNCE_TIME_MS);

    console.log(`[Analytics] 🚀 Firing event: ${eventName}`, properties);

    ReactGA.event({
      action: eventName,
      category: properties.type || 'Engagement',
      label: JSON.stringify(properties),
    });
    
    // Push to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...properties
    });

    // Custom event for local debugging
    const event = new CustomEvent('app:track', { 
      detail: { name: eventName, properties } 
    });
    window.dispatchEvent(event);
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

// Page View Tracking
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Scroll Tracking Hook
export const useScrollTracking = () => {
  const tracked = { 50: false, 75: false, 100: false };

  const handleScroll = () => {
    // RequestAnimationFrame for performance debouncing
    requestAnimationFrame(() => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

      if (scrollPercent >= 50 && !tracked[50]) {
        trackEvent('scroll_depth', { depth: '50%' });
        tracked[50] = true;
      }
      if (scrollPercent >= 75 && !tracked[75]) {
        trackEvent('scroll_depth', { depth: '75%' });
        tracked[75] = true;
      }
      if (scrollPercent >= 99 && !tracked[100]) {
        trackEvent('scroll_depth', { depth: '100%' });
        tracked[100] = true;
      }
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
