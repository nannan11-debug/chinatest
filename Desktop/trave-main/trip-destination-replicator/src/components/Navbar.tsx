
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher, { useLanguage } from '@/components/LanguageSwitcher'; // <-- 新增导入

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useLanguage(); // <-- 新增：获取 t 函数

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-travel-blue" />
              <span className="font-bold text-xl text-travel-blue">TravelSpot</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="link" className="text-gray-600 hover:text-travel-blue">
              <Link to="/">{t('nav_home')}</Link> {/* <-- 修改 */}
            </Button>
            <Button variant="link" className="text-gray-600 hover:text-travel-blue">
              <Link to="/destinations">{t('nav_destinations')}</Link> {/* <-- 修改 */}
            </Button>
            <Button variant="link" className="text-gray-600 hover:text-travel-blue">
              <Link to="/about">{t('nav_about')}</Link> {/* <-- 修改 */}
            </Button>
            <Button variant="link" className="text-gray-600 hover:text-travel-blue">
              <Link to="/contact">{t('nav_contact')}</Link> {/* <-- 修改 */}
            </Button>
            <LanguageSwitcher /> {/* <-- 新增 */}
          </div>
          
          <div className="md:hidden flex items-center">
            <LanguageSwitcher /> {/* <-- 新增 */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-travel-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_home')} {/* <-- 修改 */}
            </Link>
            <Link 
              to="/destinations" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-travel-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_destinations')} {/* <-- 修改 */}
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-travel-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_about')} {/* <-- 修改 */}
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-travel-blue hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav_contact')} {/* <-- 修改 */}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
