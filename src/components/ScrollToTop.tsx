import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!hash) {
      // Delay the scroll to top slightly to ensure smooth page transition
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      }, 10);
      
      return () => clearTimeout(timeoutId);
    } else {
      // If there is a hash, scroll to that element instead
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

export default ScrollToTop; 