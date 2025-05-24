import React from 'react';
import { Link } from 'react-router-dom'; // 假设您使用了 react-router-dom
import LanguageSwitcher, { useLanguage } from '@/components/LanguageSwitcher'; // 导入 useLanguage
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { t } = useLanguage(); // 获取 t 函数

  const navLinks = [
    { to: '/', label: t('nav_home') }, // 使用 t() 函数
    { to: '/destinations', label: t('nav_destinations') }, // 使用 t() 函数
    { to: '/about', label: t('nav_about') }, // 使用 t() 函数
    { to: '/contact', label: t('nav_contact') }, // 使用 t() 函数
  ];

  return (
    <nav className="bg-travel-blue text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          TravelSpot
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Button key={link.label} variant="ghost" asChild className="hover:bg-white/10">
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-travel-blue text-white">
              <div className="flex flex-col space-y-4 p-6">
                {navLinks.map((link) => (
                  <Button key={link.label} variant="ghost" asChild className="justify-start text-lg hover:bg-white/10">
                    <Link to={link.to}>{link.label}</Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;