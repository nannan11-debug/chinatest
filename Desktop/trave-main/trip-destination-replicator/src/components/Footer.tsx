
import React from 'react';
import { Globe, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageSwitcher'; // <-- 新增导入

const Footer = () => {
  const { t } = useLanguage(); // <-- 新增：获取 t 函数

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-5">
              <Globe className="h-6 w-6 text-white" />
              <span className="font-bold text-xl text-white">TravelSpot</span> {/* Brand name, consider if it needs translation */}
            </div>
            <p className="mb-4">
              {t('footer_description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">{t('footer_destinations_title')}</h3>
            <ul className="space-y-3">
              <li><Link to="/destinations?category=Beaches" className="hover:text-white transition-colors">{t('footer_beaches')}</Link></li>
              <li><Link to="/destinations?category=Mountains" className="hover:text-white transition-colors">{t('footer_mountains')}</Link></li>
              <li><Link to="/destinations?category=Cities" className="hover:text-white transition-colors">{t('footer_cities')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">{t('footer_quick_links_title')}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('footer_about_us')}</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">{t('footer_destinations_link')}</Link></li>
              <li><Link to="/travel-guides" className="hover:text-white transition-colors">{t('footer_travel_guides')}</Link></li>
              <li><Link to="/faqs" className="hover:text-white transition-colors">{t('footer_faqs')}</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">{t('footer_privacy_policy')}</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">{t('footer_terms_of_service')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer_contact')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">{t('footer_contact_us_title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>{t('footer_contact')}</span> {/* 在这里使用 t('footer_contact') */}
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} TravelSpot. {t('footer_rights_reserved')}</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-5">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer_privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer_terms')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer_sitemap')}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
