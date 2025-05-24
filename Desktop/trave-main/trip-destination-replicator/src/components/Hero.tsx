
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageSwitcher'; // <-- 新增导入

const Hero = () => {
  const { t } = useLanguage(); // <-- 新增：获取 t 函数

  return (
    <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80')", 
          filter: "brightness(0.65)"
        }}
      />
      
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t('hero_title')}</h1>
        <p className="text-xl md:text-2xl mb-8">{t('hero_subtitle')}</p>
        
        <div className="relative max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative w-full mb-4 sm:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={t('hero_search_placeholder')} 
                className="w-full pl-10 pr-4 py-3 rounded-lg shadow-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-travel-blue"
              />
            </div>
            <Button size="lg" className="bg-travel-orange hover:bg-travel-orange/90 text-white px-6 sm:ml-4 whitespace-nowrap">
              {t('hero_search_button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
