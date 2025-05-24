
import React from 'react';
import { Waves, Mountain, Building, Trees, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageSwitcher'; // <-- 新增导入

const CategorySection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // <-- 新增：获取 t 函数

  const categories = [
    {
      name: t('category_beaches'), // <-- 修改
      icon: Waves,
      color: "bg-blue-100 text-blue-600",
      count: 43, // Consider if count needs to be dynamic or translated if it's part of a string
      path: "/destinations?category=Beaches" // Path might need to be dynamic if category names change
    },
    {
      name: t('category_mountains'), // <-- 修改
      icon: Mountain,
      color: "bg-green-100 text-green-600",
      count: 37,
      path: "/destinations?category=Mountains"
    },
    {
      name: t('category_cities'), // <-- 修改
      icon: Building,
      color: "bg-orange-100 text-orange-600",
      count: 51,
      path: "/destinations?category=Cities"
    },
    {
      name: t('category_forests'), // <-- 修改
      icon: Trees,
      color: "bg-emerald-100 text-emerald-600",
      count: 28,
      path: "/destinations?category=Forests"
    },
    {
      name: t('category_adventures'), // <-- 修改
      icon: Compass,
      color: "bg-red-100 text-red-600",
      count: 32,
      path: "/destinations?category=Adventures"
    }
  ];
  
  const handleCategoryClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('category_section_title')}</h2>
          <p className="mt-4 text-xl text-gray-600">
            {t('category_section_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <div 
              key={category.name} // Ensure key is unique if names can be the same after translation
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCategoryClick(category.path)}
            >
              <div className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{t('category_destinations_count', { count: category.count })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
