import { useState, useEffect } from 'react';

export function useMobileDetector() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkDeviceType = () => {
      // Check if the user agent contains mobile identifiers
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipod', 'windows phone', 'blackberry', 'nokia', 'opera mini', 'mobile'];
      const tabletKeywords = ['ipad', 'tablet'];
      
      const hasMobileKeyword = mobileKeywords.some(keyword => userAgent.includes(keyword));
      const hasTabletKeyword = tabletKeywords.some(keyword => userAgent.includes(keyword));
      
      // Screen width detection
      const screenWidth = window.innerWidth;
      
      // Device classification based on screen width
      const isSmallMobile = screenWidth < 640; // Small mobile devices
      const isMediumScreen = screenWidth >= 640 && screenWidth < 768; // Larger phones
      const isTabletScreen = screenWidth >= 768 && screenWidth < 1024; // Tablets
      
      // Determine device type using both user agent and screen size
      setIsMobile(isSmallMobile || isMediumScreen || (hasMobileKeyword && !hasTabletKeyword && !isTabletScreen));
      setIsTablet(isTabletScreen || hasTabletKeyword);
    };

    checkDeviceType();
    
    // Update on resize
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return { isMobile, isTablet, isClient };
} 