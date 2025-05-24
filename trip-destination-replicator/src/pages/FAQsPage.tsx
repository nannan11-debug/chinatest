import React, { useState, useContext } from 'react'; // 引入 useContext
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { LanguageContext } from '@/components/LanguageSwitcher'; // 引入 LanguageContext

// 将 faqData 移到组件内部，以便使用 t 函数
// const faqData = [ ... ]; // 旧的静态数据

const FAQItem = ({ faqQuestion, faqAnswer, isOpen, toggleFAQ }) => ( // 修改 props 以接收翻译后的文本
  <div className="border-b border-gray-200 py-4">
    <button
      onClick={toggleFAQ}
      className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 hover:text-travel-orange focus:outline-none"
    >
      {faqQuestion}
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
    {isOpen && (
      <div className="mt-3 text-gray-700">
        <p>{faqAnswer}</p>
      </div>
    )}
  </div>
);

const FAQsPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // 明确类型
  const { t } = useContext(LanguageContext); // 获取 t 函数

  const toggleFAQ = (id: number) => { // 明确类型
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // 定义翻译后的 faqData
  const faqData = [
    {
      id: 1,
      questionKey: "faq_q1", // 使用 key
      answerKey: "faq_a1"    // 使用 key
    },
    {
      id: 2,
      questionKey: "faq_q2",
      answerKey: "faq_a2"
    },
    {
      id: 3,
      questionKey: "faq_q3",
      answerKey: "faq_a3"
    },
    {
      id: 4,
      questionKey: "faq_q4",
      answerKey: "faq_a4"
    },
    {
      id: 5,
      questionKey: "faq_q5",
      answerKey: "faq_a5"
    },
    {
      id: 6,
      questionKey: "faq_q6",
      answerKey: "faq_a6"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-travel-blue py-16 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('faq_page_title')}</h1>
          <p className="text-xl opacity-90">
            {t('faq_page_subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('faq_section_title')}</h2>
            {faqData.map((faq) => (
              <FAQItem 
                key={faq.id} 
                faqQuestion={t(faq.questionKey)} // 翻译问题
                faqAnswer={t(faq.answerKey)}   // 翻译答案
                isOpen={openFAQ === faq.id}
                toggleFAQ={() => toggleFAQ(faq.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQsPage;