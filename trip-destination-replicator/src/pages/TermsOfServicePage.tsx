import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSwitcher'; // <-- 新增导入

const TermsOfServicePage = () => {
  const { t, language } = useLanguage(); // <-- 获取 t 函数和当前语言

  // 添加调试信息
  useEffect(() => {
    console.log('Current language in TermsOfServicePage:', language);
    console.log('Terms page title translation:', t('terms_page_title'));
  }, [language, t]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-travel-blue py-16 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <FileText className="h-16 w-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('terms_page_title')}</h1>
          <p className="text-xl opacity-90">{t('terms_page_subtitle')}</p>
        </div>
      </div>
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('terms_section1_title')}</h2>
              <p className="text-gray-700">{t('terms_section1_content')}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('terms_section2_title')}</h2>
              <p className="text-gray-700">{t('terms_section2_content')}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('terms_section3_title')}</h2>
              <p className="text-gray-700">{t('terms_section3_content')}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('terms_section4_title')}</h2>
              <p className="text-gray-700">{t('terms_section4_content')}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('terms_section5_title')}</h2>
              <p className="text-gray-700">{t('terms_section5_content')}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('terms_section6_title')}</h2>
              <p className="text-gray-700">{t('terms_section6_content', { email: 'info@travelspot.com' })}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TermsOfServicePage;