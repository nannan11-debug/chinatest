import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookMarked, MapPinned, Compass } from 'lucide-react'; // Importing icons
import { useLanguage } from '@/components/LanguageSwitcher'; // <-- 新增导入

const TravelGuidesPage = () => {
  const { t } = useLanguage(); // <-- 新增：获取 t 函数

  const guides = [
    {
      id: 1,
      title: t('travelguide_beijing_title'),
      description: t('travelguide_beijing_desc'),
      category: t('travelguide_category_city'),
      icon: <MapPinned className="h-8 w-8 text-travel-orange mb-3" />,
      link: "#"
    },
    {
      id: 2,
      title: t('travelguide_guilin_title'),
      description: t('travelguide_guilin_desc'),
      category: t('travelguide_category_photography'),
      icon: <Compass className="h-8 w-8 text-travel-orange mb-3" />,
      link: "#"
    },
    {
      id: 3,
      title: t('travelguide_xian_title'),
      description: t('travelguide_xian_desc'),
      category: t('travelguide_category_food'),
      icon: <BookMarked className="h-8 w-8 text-travel-orange mb-3" />,
      link: "#"
    },
    {
      id: 4,
      title: t('travelguide_zhangjiajie_title'),
      description: t('travelguide_zhangjiajie_desc'),
      category: t('travelguide_category_outdoor'),
      icon: <MapPinned className="h-8 w-8 text-travel-orange mb-3" />,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-travel-blue py-16 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('travelguides_page_title')}</h1>
          <p className="text-xl opacity-90">
            {t('travelguides_page_subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('travelguides_section_title')}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {t('travelguides_section_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <div className="mx-auto">
                  {guide.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{guide.title}</h3>
                <p className="text-gray-600 text-sm mb-1 text-center text-travel-blue font-medium">{guide.category}</p>
                <p className="text-gray-700 mb-4 flex-grow">{guide.description}</p>
                <a
                  href={guide.link}
                  className="mt-auto inline-block bg-travel-orange text-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  {t('travelguides_read_guide_button')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TravelGuidesPage;