
import React from 'react';
import DestinationCard from './DestinationCard';
import { useLanguage } from './LanguageSwitcher';

const destinations = [
  {
    id: "beijing",
    title: "Beijing",
    location: "China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80",
    rating: 4.8,
    description: "Explore Beijing with its iconic Great Wall, Forbidden City, and Temple of Heaven. Experience the rich history and culture of China's capital city while enjoying delicious cuisine."
  },
  {
    id: "shanghai",
    title: "Shanghai",
    location: "China",
    image: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&q=80",
    rating: 4.9,
    description: "Visit Shanghai, China's vibrant modern metropolis with its impressive skyline, historic Bund, and charming old neighborhoods. Experience the blend of traditional and contemporary China."
  },
  {
    id: "xian",
    title: "Xi'an",
    location: "China",
    image: "/images/xian/5.jpg", // <--- 修改这里
    rating: 4.7,
    description: "Discover Xi'an, home to the world-famous Terracotta Army, ancient city wall, and rich Silk Road history. Enjoy authentic Shaanxi cuisine and vibrant local culture.",
  },
  {
    id: "qingdao",
    title: "Qingdao",
    location: "China",
    image: "/images/qingdao/1.jpg", // <--- 图片路径已设置
    rating: 4.6,
    description: "Explore Qingdao with its beautiful beaches, German colonial architecture, and world-famous beer. Enjoy fresh seafood and stunning coastal views.",
  },
  {
    id: "guilin",
    title: "Guilin",
    location: "China",
    image: "/images/guilin/1.jpg", // ← 修改为本地图片
    rating: 4.7,
    description: "Marvel at Guilin's breathtaking karst landscapes, picturesque rivers, and lush countryside. Take a Li River cruise and experience traditional rural life."
  },
  {
    id: "yangshuo",
    title: "Yangshuo",
    location: "China",
    image: "/images/yangshuo/1.jpg", // ← 修改为本地图片
    rating: 4.8,
    description: "Enjoy Yangshuo's stunning scenery, outdoor adventures, and vibrant West Street. Cycle through rice paddies and explore caves along the Yulong River."
  },
  {
    id: "zhangjiajie",
    title: "Zhangjiajie",
    location: "China",
    image: "/images/zhangjiajie/1.jpg", // ← 修改为本地图片
    rating: 4.9,
    description: "Explore Zhangjiajie National Forest Park with its unique pillar-like formations that inspired the 'Avatar' movie. Experience the breathtaking glass bridge and Tianmen Mountain."
  },
  {
    id: "henan",
    title: "Henan",
    location: "China",
    image: "/images/henan/1.jpg", // <-- 修改为本地图片路径，假设图片名为1.jpg
    rating: 4.5,
    description: "Visit Henan, the cradle of Chinese civilization, with highlights like the Shaolin Temple, Longmen Grottoes, and ancient capitals Luoyang and Kaifeng."
}
];

const FeaturedDestinations = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('featured_destinations_title')}</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t('featured_destinations_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              id={destination.id}
              title={t(destination.id)}
              location={t(destination.location.toLowerCase())}
              image={destination.image}
              rating={destination.rating}
              description={destination.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;

const travelerReviews = [
  {
    name: "李明",
    destination: "Beijing",
    date: "2022年7月",
    rating: 5,
    comment: "夏天的北京很热，但长城和故宫真的值得一去。历史氛围浓厚。"
  },
  {
    name: "Sarah",
    destination: "Beijing",
    date: "2024年3月",
    rating: 4,
    comment: "春天的北京公园很美，玉渊潭的樱花盛开。地铁很方便。"
  },
  {
    name: "Anna",
    destination: "Shanghai",
    date: "2023年11月",
    rating: 5,
    comment: "上海的夜景令人惊叹，外滩和陆家嘴的高楼很有未来感。"
  },
  {
    name: "王磊",
    destination: "Shanghai",
    date: "2025年1月",
    rating: 4,
    comment: "新年在上海跨年，气氛很棒。小吃很多，交通便利。"
  },
  {
    name: "王伟",
    destination: "Xi'an",
    date: "2022年10月",
    rating: 5,
    comment: "兵马俑非常壮观，古城墙夜景很美。回民街的小吃很有特色。"
  },
  {
    name: "Emily",
    destination: "Xi'an",
    date: "2024年5月",
    rating: 4,
    comment: "西安的历史遗迹很多，适合喜欢文化的游客。"
  },
  {
    name: "Emily",
    destination: "Qingdao",
    date: "2023年8月",
    rating: 4,
    comment: "青岛的海滩很干净，啤酒节很热闹，海鲜新鲜又实惠。"
  },
  {
    name: "张晨",
    destination: "Qingdao",
    date: "2022年6月",
    rating: 5,
    comment: "夏天在青岛游泳很舒服，德国建筑很有特色。"
  },
  {
    name: "张婷",
    destination: "Guilin",
    date: "2024年5月",
    rating: 5,
    comment: "桂林山水甲天下，漓江漂流风景如画。象鼻山和阳朔都很值得去。"
  },
  {
    name: "Lucas",
    destination: "Guilin",
    date: "2022年9月",
    rating: 4,
    comment: "桂林的自然风光非常美，适合摄影和放松。"
  },
  {
    name: "Lucas",
    destination: "Yangshuo",
    date: "2025年4月",
    rating: 5,
    comment: "阳朔的田园风光很美，骑行和竹筏漂流都很有趣。西街很热闹。"
  },
  {
    name: "王芳",
    destination: "Yangshuo",
    date: "2023年10月",
    rating: 4,
    comment: "阳朔的山水和夜市都很有特色，适合情侣出游。"
  },
  {
    name: "赵磊",
    destination: "Zhangjiajie",
    date: "2023年10月",
    rating: 5,
    comment: "张家界的山峰很奇特，玻璃桥很刺激。空气清新，适合徒步。"
  },
  {
    name: "Sophie",
    destination: "Zhangjiajie",
    date: "2022年5月",
    rating: 4,
    comment: "张家界的自然景观令人震撼，缆车体验很棒。"
  },
  {
    name: "Sophie",
    destination: "Henan",
    date: "2024年4月",
    rating: 4,
    comment: "河南的少林寺和龙门石窟都很有历史感，洛阳牡丹花很美。"
  },
  {
    name: "李强",
    destination: "Henan",
    date: "2022年11月",
    rating: 5,
    comment: "开封的夜市很热闹，古都文化氛围浓厚。"
  }
];
