import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Globe, Users, Target, BookOpen, Heart } from 'lucide-react'; // Importing icons
import { useLanguage } from '@/components/LanguageSwitcher'; // 确保路径正确

const AboutPage = () => {
  const { t } = useLanguage(); // 获取 t 函数

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-travel-blue py-16 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about_page_title')}</h1>
          <p className="text-xl opacity-90">
            {t('about_page_subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Our Mission Section */}
          <section className="text-center">
            <Target className="h-12 w-12 text-travel-orange mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about_our_mission_title')}</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {t('about_our_mission_text')}
            </p>
          </section>

          {/* Our Story Section */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <BookOpen className="h-10 w-10 text-travel-blue mb-3" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('about_our_story_title')}</h2>
                <p className="text-gray-700 mb-4">
                  {t('about_our_story_text1')}
                </p>
                <p className="text-gray-700">
                  {t('about_our_story_text2')}
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/images/about-us-placeholder.jpg" 
                  alt={t('about_team_image_alt')} // 图片的 alt 文本也应该被翻译
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                  onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600")} 
                />
              </div>
            </div>
          </section>
          
          {/* Why Choose Us Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('about_why_choose_us_title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Globe className="h-10 w-10 text-travel-orange mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('about_feature_curated_destinations_title')}</h3>
                <p className="text-gray-600">{t('about_feature_curated_destinations_text')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Users className="h-10 w-10 text-travel-orange mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('about_feature_expert_team_title')}</h3>
                <p className="text-gray-600">{t('about_feature_expert_team_text')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <Heart className="h-10 w-10 text-travel-orange mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('about_feature_customer_first_title')}</h3>
                <p className="text-gray-600">{t('about_feature_customer_first_text')}</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;