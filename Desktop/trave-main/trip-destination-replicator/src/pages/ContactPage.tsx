import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSwitcher'; // <-- 添加导入

const ContactPage = () => { // <-- 修改为函数声明以使用 hook
  const { t } = useLanguage(); // <-- 获取 t 函数

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-travel-blue py-16 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <Mail className="h-16 w-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact_us_title')}</h1>
          <p className="text-xl opacity-90">{t('contact_us_subtitle')}</p>
        </div>
      </div>
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('contact_methods_title')}</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <Mail className="h-5 w-5 mr-2 text-travel-blue" />
                  info@travelspot.com
                </li>
                <li className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-2 text-travel-blue" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-2 text-travel-blue" />
                  {t('contact_address_value')}
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t('contact_online_message_title')}</h2>
              <p className="text-gray-700">{t('contact_online_message_text')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;