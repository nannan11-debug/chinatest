import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { Filter, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import LanguageSwitcher, { useLanguage } from '@/components/LanguageSwitcher'; // <-- 修改导入

// Extended destination data for the destinations page
const allDestinations = [
  // Chinese destinations
  {
    id: "beijing",
    title: "Beijing",
    location: "China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80",
    rating: 4.8,
    description: "Explore Beijing with its iconic Great Wall, Forbidden City, and Temple of Heaven. Experience the rich history and culture of China's capital city while enjoying delicious cuisine.",
    category: "Cities"
  },
  {
    id: "henan",
    title: "Henan",
    location: "China",
    image: "/images/henan/1.jpg",
    rating: 4.5,
    description: "Visit Henan, the cradle of Chinese civilization, with highlights like the Shaolin Temple, Longmen Grottoes, and ancient capitals Luoyang and Kaifeng.",
    category: "Historical Sites"
  },
  {
    id: "xian",
    title: "Xi'an",
    location: "China",
    image: "/images/xian/5.jpg", // ← 按home页保持一致
    rating: 4.7,
    description: "Discover Xi'an, home to the world-famous Terracotta Army, ancient city wall, and rich Silk Road history. Enjoy authentic Shaanxi cuisine and vibrant local culture.",
    category: "Cities"
  },
  {
    id: "shanghai",
    title: "Shanghai",
    location: "China",
    image: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&q=80",
    rating: 4.9,
    description: "Visit Shanghai, China's vibrant modern metropolis with its impressive skyline, historic Bund, and charming old neighborhoods. Experience the blend of traditional and contemporary China.",
    category: "Cities"
  },
  {
    id: "qingdao",
    title: "Qingdao",
    location: "China",
    image: "/images/qingdao/1.jpg", // ← 按home页保持一致
    rating: 4.6,
    description: "Explore Qingdao with its beautiful beaches, German colonial architecture, and world-famous beer. Enjoy fresh seafood and stunning coastal views.",
    category: "Beaches"
  },
  {
    id: "guilin",
    title: "Guilin",
    location: "China",
    image: "/images/guilin/1.jpg", // ← 修改为本地图片
    rating: 4.9,
    description: "Marvel at Guilin's breathtaking karst landscapes, picturesque rivers, and lush countryside. Take a Li River cruise and experience traditional rural life.",
    category: "Mountains"
  },
  {
    id: "yangshuo",
    title: "Yangshuo",
    location: "China",
    image: "/images/yangshuo/1.jpg", // ← 修改为本地图片
    rating: 4.8,
    description: "Enjoy Yangshuo's stunning scenery, outdoor adventures, and vibrant West Street. Cycle through rice paddies and explore caves along the Yulong River.",
    category: "Mountains"
  },
  {
    id: "zhangjiajie",
    title: "Zhangjiajie",
    location: "China",
    image: "/images/zhangjiajie/1.jpg", // ← 修改为本地图片
    rating: 4.9,
    description: "Explore Zhangjiajie National Forest Park with its unique pillar-like formations that inspired the 'Avatar' movie. Experience the breathtaking glass bridge and Tianmen Mountain.",
    category: "Mountains"
  }
  // Removed all destinations where location is not "China"
];

const categories = ["All", "Beaches", "Mountains", "Cities"]; // Adjusted categories based on remaining destinations

const DestinationsPage = () => {
  const { t } = useLanguage(); // <-- 新增：获取 t 函数
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();

  // Check for category in URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredDestinations = allDestinations.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-16">
        {/* Hero section */}
        <div className="bg-travel-blue py-16 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('destinations_page_title')}</h1>
            <p className="text-xl opacity-90">
              {t('destinations_page_subtitle')}
            </p>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="bg-white shadow-md py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
              <div className="w-full md:w-1/3 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('destinations_search_placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-travel-blue"
                />
              </div>

              <div className="w-full md:w-auto flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={selectedCategory === category
                      ? "bg-travel-blue hover:bg-travel-blue/90"
                      : ""}
                    onClick={() => setSelectedCategory(category)} // Logic might need adjustment if category values change
                  >
                    {t(category.toLowerCase())}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Destinations grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  id={destination.id}
                  title={destination.title}
                  location={destination.location}
                  image={destination.image}
                  rating={destination.rating}
                  description={destination.description}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-1">{t('destinations_not_found_title')}</h3>
              <p className="text-gray-500">{t('destinations_not_found_message')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default DestinationsPage;
