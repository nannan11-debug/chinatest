
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './LanguageSwitcher';

const Newsletter = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-travel-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('newsletter_title')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('newsletter_subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder={t('newsletter_email_placeholder')}
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-travel-blue"
                />
                <Button className="bg-travel-green hover:bg-travel-green/90 text-white flex items-center justify-center gap-2">
                  <span>{t('newsletter_subscribe_button')}</span>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                {t('newsletter_privacy_notice')}
              </p>
            </div>

            <div
              className="md:w-1/2 bg-cover bg-center h-64 md:h-auto"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80')"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
