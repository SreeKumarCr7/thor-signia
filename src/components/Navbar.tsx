import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import logoImg from '../assets/images/logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 400);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 400);
    };

    // Close mobile menu whenever location changes
    setIsMobileMenuOpen(false);
    
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [location]);

  // Helper function to handle navigation and scrolling
  const handleNavigation = (e, path, id = null) => {
    // Always scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu regardless
    setIsMobileMenuOpen(false);
  };

  // Function to scroll to top when clicking the logo/company name
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#f0f8f8] shadow-md py-2 md:py-3' : 'bg-[#f0f8f8] py-3 md:py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 hover:scale-[1.01] transition-transform duration-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center" 
              onClick={(e) => {
                handleNavigation(e, '/', 'home-hero-section');
                scrollToTop();
              }}
            >
              <img 
                src={logoImg} 
                alt="Thor Signia Logo" 
                className="h-10 w-auto mr-3 object-contain"
                onError={(e) => {
                  // Fallback if the import doesn't work
                  e.currentTarget.src = '/src/assets/images/logo.jpg';
                  // Add a second fallback
                  e.currentTarget.onerror = () => {
                    e.currentTarget.src = '/assets/logo.jpg';
                  };
                }}
              />
              <div className="h-[50px] md:h-[60px] flex items-center font-bold text-xl md:text-2xl text-[#009898] cursor-pointer select-none" 
                   onClick={scrollToTop}
                   style={{ transform: 'none', transition: 'none' }}
              >
                Thor Signia
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-primary-700 hover:text-[#009898] transition-colors font-medium ${location.pathname === '/' ? 'text-[#009898]' : ''}`}
              onClick={(e) => handleNavigation(e, '/', 'home-hero-section')}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-primary-700 hover:text-[#009898] transition-colors font-medium ${location.pathname === '/about' ? 'text-[#009898]' : ''}`}
              onClick={(e) => handleNavigation(e, '/about')}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`text-primary-700 hover:text-[#009898] transition-colors font-medium ${location.pathname === '/services' ? 'text-[#009898]' : ''}`}
              onClick={(e) => handleNavigation(e, '/services')}
            >
              Services
            </Link>
            <Link 
              to="/case-studies" 
              className={`text-primary-700 hover:text-[#009898] transition-colors font-medium ${location.pathname === '/case-studies' ? 'text-[#009898]' : ''}`}
              onClick={(e) => handleNavigation(e, '/case-studies')}
            >
              Case Studies
            </Link>
            <Link 
              to="/ai-engineers" 
              className={`text-primary-700 hover:text-[#009898] transition-colors font-medium ${location.pathname === '/ai-engineers' ? 'text-[#009898]' : ''}`}
              onClick={(e) => handleNavigation(e, '/ai-engineers')}
            >
              AI Engineers
            </Link>
            <Link 
              to="/awards" 
              className={`text-primary-700 hover:text-[#009898] transition-colors font-medium ${location.pathname === '/awards' ? 'text-[#009898]' : ''}`}
              onClick={(e) => handleNavigation(e, '/awards')}
            >
              Awards
            </Link>
            <Link 
              to="/blog" 
              className={`text-primary-700 hover:text-[#009898] transition-colors font-medium ${location.pathname === '/blog' ? 'text-[#009898]' : ''}`}
              onClick={(e) => handleNavigation(e, '/blog')}
            >
              Blog
            </Link>
            <Button className="bg-[#009898] hover:bg-[#007b7b] text-white rounded-lg shadow-sm" asChild>
              <Link to="/contact" onClick={(e) => handleNavigation(e, '/contact')}>Contact Us</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-700 p-2 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 bg-[#f0f8f8] rounded-lg mt-2 shadow-lg">
            <Link 
              to="/" 
              className="block text-primary-700 hover:text-[#009898] transition-colors font-medium py-2 px-4"
              onClick={(e) => handleNavigation(e, '/', 'home-hero-section')}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block text-primary-700 hover:text-[#009898] transition-colors font-medium py-2 px-4"
              onClick={(e) => handleNavigation(e, '/about')}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="block text-primary-700 hover:text-[#009898] transition-colors font-medium py-2 px-4"
              onClick={(e) => handleNavigation(e, '/services')}
            >
              Services
            </Link>
            <Link 
              to="/case-studies" 
              className="block text-primary-700 hover:text-[#009898] transition-colors font-medium py-2 px-4"
              onClick={(e) => handleNavigation(e, '/case-studies')}
            >
              Case Studies
            </Link>
            <Link 
              to="/ai-engineers" 
              className="block text-primary-700 hover:text-[#009898] transition-colors font-medium py-2 px-4"
              onClick={(e) => handleNavigation(e, '/ai-engineers')}
            >
              AI Engineers
            </Link>
            <Link 
              to="/awards" 
              className="block text-primary-700 hover:text-[#009898] transition-colors font-medium py-2 px-4"
              onClick={(e) => handleNavigation(e, '/awards')}
            >
              Awards
            </Link>
            <Link 
              to="/blog" 
              className="block text-primary-700 hover:text-[#009898] transition-colors font-medium py-2 px-4"
              onClick={(e) => handleNavigation(e, '/blog')}
            >
              Blog
            </Link>
            <div className="px-4 pt-2">
              <Button className="w-full bg-[#009898] hover:bg-[#007b7b] text-white rounded-lg shadow-sm" asChild>
                <Link to="/contact" onClick={(e) => handleNavigation(e, '/contact')}>Contact Us</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
