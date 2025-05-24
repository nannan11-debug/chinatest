
import React from "react";
import { Link } from "react-router-dom";
import { Map, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from '@/components/LanguageSwitcher'; // <-- 新增导入

const NotFound = () => {
  const { t } = useLanguage(); // <-- 新增：获取 t 函数

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Map className="h-24 w-24 text-travel-blue opacity-20" />
              <MapPin className="h-12 w-12 text-travel-blue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{t('notfound_title')}</h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('notfound_message')}
          </p>
          
          <Button asChild className="bg-travel-blue hover:bg-travel-blue/90">
            <Link to="/">{t('notfound_return_home')}</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
