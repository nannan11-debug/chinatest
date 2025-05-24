
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageSwitcher';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Star, Map, Utensils, Camera, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Extended destination data with more details for each location
const destinationsData = {
  "henan": {
    title: "Henan",
    location: "China",
    image: "/images/henan/1.jpg", // <-- 修改为本地图片路径
    rating: 4.5,
    description: "Visit Henan, the cradle of Chinese civilization, with highlights like the Shaolin Temple, Longmen Grottoes, and ancient capitals Luoyang and Kaifeng.",
    category: "Historical Sites",
    attractions: [
        {
            name: "Shaolin Temple",
            description: "Famous for its martial arts and Zen Buddhism, Shaolin Temple is a must-visit for those interested in Chinese culture.",
            images: ["/images/henan/shaolin.jpg"], // <-- 修改为本地图片路径
            tips: "Visit early to avoid crowds and enjoy the peaceful surroundings."
        },
        {
            name: "Longmen Grottoes",
            description: "A UNESCO World Heritage site, featuring thousands of statues of Buddha and his disciples carved into the cliffs.",
            images: ["/images/henan/longmen.jpg"], // <-- 修改为本地图片路径
            tips: "Wear comfortable shoes as there's a lot of walking involved."
        }
    ],
    food: [
        {
            name: "Luoyang Water Banquet",
            description: "A traditional feast featuring a variety of soups and dishes, known for its unique flavors.",
            where: "Local restaurants in Luoyang",
            price: "$$"
        }
    ],
    guides: [
        {
            title: "2-Day Henan Highlights",
            days: [
                {
                    day: 1,
                    activities: "Shaolin Temple → Longmen Grottoes → Luoyang Old Town"
                },
                {
                    day: 2,
                    activities: "Kaifeng Ancient City → Iron Pagoda → Dragon Pavilion"
                }
            ]
        }
    ],
    reviews: [
        {
            name: "John D.",
            date: "September 2023",
            rating: 5,
            comment: "Henan is a fascinating place with rich history and culture. The Shaolin Temple was a highlight of my trip!"
        }
    ],
    transportation: {
        airport: "Zhengzhou Xinzheng International Airport (CGO)",
        localTransport: "Buses, taxis, and trains are available for convenient travel.",
        tips: "Consider hiring a local guide for a more in-depth experience."
    },
    bestTimeToVisit: "Spring and Autumn offer the most pleasant weather."
  },
  "beijing": {
    title: "Beijing",
    location: "China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80",
    rating: 4.8,
    description: "Explore Beijing with its iconic Great Wall, Forbidden City, and Temple of Heaven. Experience the rich history and culture of China's capital city while enjoying delicious cuisine.",
    category: "Cities",
    attractions: [
      {
        name: "Great Wall of China",
        description: "One of the world's greatest wonders, stretching over 13,000 miles across northern China. The Mutianyu and Badaling sections are the most popular for tourists.",
        images: ["https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80"],
        tips: "Visit early in the morning to avoid crowds. Wear comfortable shoes as there's a lot of walking and steps."
      },
      {
        name: "Forbidden City",
        description: "The former Chinese imperial palace from the Ming dynasty to the end of the Qing dynasty, featuring spectacular architecture and historical artifacts.",
        images: ["/images/beijing/gugong1.jpg"], // <--- 修改这里
        tips: "Purchase tickets online to avoid long lines. Plan to spend at least 3-4 hours exploring."
      },
      {
        name: "Temple of Heaven",
        description: "An imperial complex of religious buildings visited by Emperors for annual ceremonies of prayer for good harvest.",
        images: ["/images/beijing/tiantan.jpg"], // <-- 更新这里
        tips: "Early morning is the best time to see locals practicing tai chi in the surrounding park."
      }
    ],
    food: [
      {
        name: "Peking Duck",
        description: "Beijing's signature dish - duck roasted to crisp perfection, served with thin pancakes, cucumber, spring onion and sweet bean sauce.",
        where: "Da Dong Roast Duck, Quanjude",
        price: "$$"
      },
      {
        name: "Zhajiangmian",
        description: "Fresh hand-pulled noodles topped with a savory sauce made from ground pork and fermented soybean paste.",
        where: "Old Beijing Zhajiang Noodle King, Hai Wan Ju",
        price: "$"
      },
      {
        name: "Jianbing",
        description: "Popular breakfast street food - a crepe-like pancake filled with egg, crispy wonton, sauce, and herbs.",
        where: "Street vendors around Wangfujing area",
        price: "$"
      }
    ],
    guides: [
      {
        title: "3-Day Beijing Highlights",
        days: [
          {
            day: 1,
            activities: "Tiananmen Square → Forbidden City → Jingshan Park → Wangfujing Street for dinner and shopping"
          },
          {
            day: 2,
            activities: "Great Wall (Mutianyu section) → Olympic Park → Beijing National Stadium (Bird's Nest) → Water Cube"
          },
          {
            day: 3,
            activities: "Temple of Heaven → Summer Palace → Houhai Lake area for evening relaxation"
          }
        ]
      },
      {
        title: "Beijing Culture Tour",
        days: [
          {
            day: 1,
            activities: "798 Art District → National Museum of China → Peking Opera performance"
          },
          {
            day: 2,
            activities: "Lama Temple → Confucius Temple → Hutong tour → Kung Fu Show"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Sarah J.",
        date: "October 2023",
        rating: 5,
        comment: "Beijing exceeded my expectations! The Great Wall was breathtaking, and the food was incredible. I highly recommend hiring a local guide for the Forbidden City to fully appreciate its history."
      },
      {
        name: "Michael T.",
        date: "August 2023",
        rating: 4,
        comment: "Amazing historical sites but be prepared for crowds. The subway system is efficient and easy to navigate. Don't miss the night market food stalls!"
      },
      {
        name: "Yuki H.",
        date: "May 2023",
        rating: 5,
        comment: "Visiting the Great Wall at Mutianyu was the highlight of my trip. Less crowded than Badaling and the toboggan ride down was fun! Beijing duck at Da Dong was outstanding."
      }
    ],
    transportation: {
      airport: "Beijing Capital International Airport (PEK) and Beijing Daxing International Airport (PKX)",
      localTransport: "Subway, buses, taxis, and bicycle rentals are all convenient options. The subway is particularly efficient and has English signage.",
      tips: "Consider purchasing a rechargeable transportation card for convenient access to subway and buses."
    },
    bestTimeToVisit: "Spring (April-May) and Autumn (September-October) offer the most pleasant weather. Avoid national holidays when sites are extremely crowded."
  },
  "xian": {
    title: "Xi'an",
    location: "China",
    image: "/images/xian/5.jpg",
    rating: 4.7,
    description: "Discover Xi'an, home to the famous Terracotta Army and ancient city walls. Explore the vibrant Muslim Quarter and taste the delicious local food in this historic city.",
    category: "Cities",
    attractions: [
      {
        name: "Terracotta Army",
        description: "One of the greatest archaeological discoveries of the 20th century - thousands of life-sized warriors and horses created to protect Emperor Qin Shi Huang in the afterlife.",
        images: ["/images/xian/1.jpg"],
        tips: "Hire a guide to understand the significance of what you're seeing. Visit Pit 1 last as it's the most impressive."
      },
      {
        name: "Xi'an City Wall",
        description: "The most complete ancient city wall in China, offering bike rentals to cycle the entire 14km perimeter.",
        images: ["/images/xian/2.jpg"],
        tips: "Rent a bicycle to ride around the entire wall - it takes about 2 hours at a leisurely pace."
      },
      {
        name: "Muslim Quarter",
        description: "Historic neighborhood with narrow lanes filled with food stalls, souvenir shops, and the Great Mosque.",
        images: ["/images/xian/3.jpg"],
        tips: "Visit in the evening when it's most lively. Come hungry and try as many street foods as possible!"
      },
      {
        name: "Big Wild Goose Pagoda",
        description: "A famous Buddhist pagoda and landmark of Xi'an, originally built in 652 during the Tang dynasty.",
        images: ["/images/xian/4.jpg"],
        tips: "The square in front of the pagoda has a beautiful music fountain show in the evening."
      }
    ],
    food: [
      {
        name: "Roujiamo",
        description: "Often called 'Chinese hamburger' - flatbread filled with slow-cooked spiced meat (usually pork).",
        where: "Laosunjia, Muslim Quarter food stalls",
        price: "$"
      },
      {
        name: "Biangbiang Noodles",
        description: "Extra wide, hand-pulled noodles topped with chili, vegetables and meat. The character for 'biang' is one of the most complex Chinese characters.",
        where: "Wei Jia Biangbiang Mian, Hi Noodle",
        price: "$"
      },
      {
        name: "Yang Rou Pao Mo",
        description: "Signature Xi'an dish - flatbread soaked in mutton stew with vermicelli noodles and pickled garlic.",
        where: "Lao Sun Jia, Tong Sheng Xiang",
        price: "$$"
      }
    ],
    guides: [
      {
        title: "2-Day Xi'an Essential Tour",
        days: [
          {
            day: 1,
            activities: "Terracotta Army → Huaqing Hot Springs → Tang Dynasty Show & Dumpling Dinner"
          },
          {
            day: 2,
            activities: "Xi'an City Wall → Bell Tower → Drum Tower → Muslim Quarter → Great Mosque"
          }
        ]
      },
      {
        title: "Historical Xi'an Tour",
        days: [
          {
            day: 1,
            activities: "Shaanxi History Museum → Small Wild Goose Pagoda → Xi'an Museum"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Carlos M.",
        date: "September 2023",
        rating: 5,
        comment: "The Terracotta Warriors are even more impressive in person! Don't miss the Muslim Quarter for amazing food - the spiced lamb skewers and roujiamo were delicious."
      },
      {
        name: "Emma P.",
        date: "July 2023",
        rating: 4,
        comment: "Cycling on the city wall was a highlight of our China trip. Visit the Terracotta Army early to avoid the worst of the crowds."
      },
      {
        name: "Liu W.",
        date: "April 2023",
        rating: 5,
        comment: "As a Chinese person from the south, Xi'an's food culture amazed me. The history is rich and the locals are very friendly. Biangbiang noodles are a must-try!"
      }
    ],
    transportation: {
      airport: "Xi'an Xianyang International Airport (XIY)",
      localTransport: "Subway, buses, and taxis are plentiful. The subway connects major attractions and is easy to navigate.",
      tips: "Use the subway to avoid traffic jams. Line 2 connects the train station with the Bell Tower area."
    },
    bestTimeToVisit: "Spring (March-May) and Autumn (September-November) for mild temperatures and less rain. Winters are cold but less crowded."
  },
  "shanghai": {
    title: "Shanghai",
    location: "China",
    image: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&q=80",
    rating: 4.9,
    description: "Visit Shanghai, China's vibrant modern metropolis with its impressive skyline, historic Bund, and charming old neighborhoods. Experience the blend of traditional and contemporary China.",
    category: "Cities",
    attractions: [
      {
        name: "The Bund",
        description: "Famous waterfront with colonial-era buildings on one side and the futuristic Pudong skyline on the other. Especially beautiful at night.",
        images: ["https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&q=80"],
        tips: "Visit both during day and night for different perspectives. Take a river cruise for panoramic views."
      },
      {
        name: "Yu Garden",
        description: "Traditional Chinese garden from the Ming Dynasty with pavilions, rockeries, and ponds in the heart of the old city.",
        images: ["/images/shanghai/sdafa.jpg"],
        tips: "Combine with a visit to the nearby City God Temple and the bustling bazaar area for shopping and snacks."
      },
      {
        name: "Shanghai Tower",
        description: "One of the world's tallest buildings with an observation deck offering breathtaking views of the city.",
        images: ["/images/shanghai/1245325.jpg"], // <-- 更新这里
        tips: "Purchase tickets in advance to avoid lines. Visit on a clear day for the best visibility."
      }
    ],
    food: [
      {
        name: "Xiaolongbao",
        description: "Shanghai's famous soup dumplings filled with pork and flavorful broth.",
        where: "Din Tai Fung, Jia Jia Tang Bao",
        price: "$$"
      },
      {
        name: "Shengjianbao",
        description: "Pan-fried pork buns with crispy bottoms and juicy fillings.",
        where: "Yang's Fry Dumplings, Da Hu Chun",
        price: "$"
      },
      {
        name: "Hairy Crab",
        description: "Seasonal delicacy (autumn) - steamed crab prized for its roe, eaten with vinegar and ginger.",
        where: "Wang Bao He, Jardin de Jade",
        price: "$$$"
      }
    ],
    guides: [
      {
        title: "3-Day Shanghai Experience",
        days: [
          {
            day: 1,
            activities: "The Bund → Nanjing Road → People's Square → Shanghai Museum"
          },
          {
            day: 2,
            activities: "Yu Garden → City God Temple → Xintiandi → Tianzifang"
          },
          {
            day: 3,
            activities: "Shanghai Tower → Oriental Pearl Tower → Shanghai Disneyland or Zhujiajiao Water Town"
          }
        ]
      },
      {
        title: "Art & Culture Tour",
        days: [
          {
            day: 1,
            activities: "Power Station of Art → West Bund Art Center → Former French Concession walking tour"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "David L.",
        date: "October 2023",
        rating: 5,
        comment: "Shanghai is a perfect blend of old and new China. Don't miss the view from the Bund at night when all the Pudong skyscrapers are lit up. The metro system is world-class and makes getting around easy."
      },
      {
        name: "Anna K.",
        date: "August 2023",
        rating: 4,
        comment: "Incredible city with amazing food! Xiaolongbao at Din Tai Fung was worth the wait. The contrast between ultra-modern Pudong and traditional areas like Yu Garden is fascinating."
      },
      {
        name: "Jun T.",
        date: "June 2023",
        rating: 5,
        comment: "As someone who visits Shanghai regularly for business, I always discover something new. The food scene is constantly evolving. Try the speakeasies in the Former French Concession for great cocktails."
      }
    ],
    transportation: {
      airport: "Shanghai Pudong International Airport (PVG) and Shanghai Hongqiao International Airport (SHA)",
      localTransport: "The metro is extensive, clean, efficient and has English signage. Taxis are plentiful but may get stuck in traffic during peak hours.",
      tips: "Use the Maglev train from Pudong Airport for a fast ride into the city at speeds up to 430 km/h."
    },
    bestTimeToVisit: "Spring (March-May) and autumn (September-November) offer mild temperatures. Avoid summer for its high heat, humidity and occasional typhoons."
  },
  "qingdao": {
    title: "Qingdao",
    location: "China",
    image: "/images/qingdao/1.jpg", // <--- 修改这里
    rating: 4.6,
    description: "Explore Qingdao with its beautiful beaches, German colonial architecture, and world-famous beer. Enjoy fresh seafood and stunning coastal views in this charming seaside city.",
    category: "Beaches",
    attractions: [
      {
        name: "Badaguan Scenic Area",
        description: "Historic area with unique architecture, beautiful gardens, and eight roads named after the eight famous passes of the Great Wall.",
        images: ["/images/qingdao/3.jpg"], // <--- 修改这里
        tips: "Best visited in spring when flowers are blooming or autumn when leaves change colors."
      },
      {
        name: "Tsingtao Brewery Museum",
        description: "Museum showcasing the history of China's most famous beer, founded by German settlers in 1903. Includes beer tasting.",
        images: ["/images/qingdao/2.jpg"], // <--- 修改这里
        tips: "Visit in the morning to avoid crowds. The entry ticket includes beer samples."
      },
      {
        name: "No. 1 Bathing Beach",
        description: "Popular sandy beach with clean waters and views of the iconic Zhanqiao Pier.",
        images: ["/images/qingdao/4.jpg"], // <--- 修改这里
        tips: "Early morning is best for swimming when it's less crowded. Bring your own towels."
      }
    ],
    food: [
      {
        name: "Fresh Seafood",
        description: "Clams, oysters, sea urchins and various fish prepared in local style - often simply steamed to preserve natural flavors.",
        where: "Pichaiyuan Seafood Market, Dengzhou Road",
        price: "$$"
      },
      {
        name: "Tsingtao Beer",
        description: "The city's famous beer, best enjoyed fresh from the source. Try dark and white beer varieties.",
        where: "Beer Street (Dengzhou Road), Tsingtao Beer Museum",
        price: "$"
      },
      {
        name: "Jiaozi (Dumplings)",
        description: "Qingdao style dumplings often filled with seafood like mackerel or fresh vegetables.",
        where: "Dianshi Soup Dumpling, Tonghe Xiaolong",
        price: "$"
      }
    ],
    guides: [
      {
        title: "2-Day Qingdao Coastal Tour",
        days: [
          {
            day: 1,
            activities: "Zhanqiao Pier → No. 1 Bathing Beach → Badaguan Scenic Area → Signal Hill Park (sunset view)"
          },
          {
            day: 2,
            activities: "Tsingtao Beer Museum → Zhongshan Park → St. Michael's Cathedral → Beer Street for dinner"
          }
        ]
      },
      {
        title: "Nature & Beach Tour",
        days: [
          {
            day: 1,
            activities: "Laoshan Mountain → Shilaoren Beach → Polar Ocean World"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Mark H.",
        date: "July 2023",
        rating: 5,
        comment: "Qingdao is a hidden gem! The beaches are clean, the beer is excellent, and the German architecture gives the city a unique character. Don't miss the seafood at Pichaiyuan market."
      },
      {
        name: "Lin M.",
        date: "August 2023",
        rating: 4,
        comment: "Perfect summer destination with great beaches and amazing food. The city is clean and well-organized. Try the fresh seafood - it's some of the best in China!"
      },
      {
        name: "Sophie B.",
        date: "June 2023",
        rating: 5,
        comment: "Loved the mix of European and Chinese influences. The Badaguan area is beautiful for walking. Tsingtao beer tastes even better at the source!"
      }
    ],
    transportation: {
      airport: "Qingdao Liuting International Airport (TAO)",
      localTransport: "Buses and taxis are the main transport options. The metro system is expanding but still limited.",
      tips: "Get a rechargeable transportation card for convenience on buses."
    },
    bestTimeToVisit: "May to October for beach activities. August for the International Beer Festival. Avoid winter as it can be cold and windy."
  },
  "guilin": {
    title: "Guilin",
    location: "China",
    image: "/images/guilin/1.jpg", // 顶部Banner图
    rating: 4.9,
    description: "Marvel at the breathtaking karst landscapes of Guilin, featuring dramatic limestone hills and the scenic Li River. Explore the Reed Flute Cave and immerse yourself in natural beauty.",
    category: "Mountains",
    attractions: [
      {
        name: "Li River Cruise",
        description: "Scenic cruise from Guilin to Yangshuo offering spectacular views of karst mountains, rural villages, and fishermen with cormorants.",
        images: ["/images/guilin/1.jpg"], // 第一张
        tips: "The 4-5 hour cruise is better than shorter options. Sit on the right side of the boat for the best views."
      },
      {
        name: "Reed Flute Cave",
        description: "Natural limestone cave with colorful lighting highlighting impressive stalactites and stalagmites.",
        images: ["/images/guilin/2.jpg"], // 第二张
        tips: "Bring a light jacket as it's cool inside the cave year-round."
      },
      {
        name: "Elephant Trunk Hill",
        description: "Natural stone arch on the Lijiang River that resembles an elephant drinking water - the symbol of Guilin.",
        images: ["/images/guilin/3.jpg"], // 第三张
        tips: "Best viewed from the water or the opposite riverbank for photos."
      }
    ],
    food: [
      {
        name: "Guilin Rice Noodles",
        description: "Local specialty - rice noodles in broth topped with pickled vegetables, peanuts, and various meats.",
        where: "Huang Lao Shu Rice Noodles, Chunji Roasted Goose Restaurant",
        price: "$"
      },
      {
        name: "Beer Fish",
        description: "Fresh river fish cooked with beer, tomatoes, pickled vegetables and chili - a signature Yangshuo dish.",
        where: "Meiyou Cafe, Cloud 9 Restaurant in Yangshuo",
        price: "$$"
      },
      {
        name: "Stuffed Li River Snails",
        description: "River snails filled with pork, garlic and spices - a distinctive local dish.",
        where: "Chunji Roasted Goose Restaurant, Zhengyang Pedestrian Street food stalls",
        price: "$"
      }
    ],
    guides: [
      {
        title: "3-Day Guilin & Yangshuo Highlights",
        days: [
          {
            day: 1,
            activities: "Elephant Trunk Hill → Reed Flute Cave → Seven Star Park → Two Rivers and Four Lakes Night Cruise"
          },
          {
            day: 2,
            activities: "Li River Cruise from Guilin to Yangshuo → West Street exploration → Yangshuo night show"
          },
          {
            day: 3,
            activities: "Yulong River bamboo rafting → Moon Hill → Bicycle tour of countryside → Return to Guilin"
          }
        ]
      },
      {
        title: "Photography Tour",
        days: [
          {
            day: 1,
            activities: "Sunrise at Xianggong Mountain → Xingping Ancient Town → Nine Horses Fresco Hill"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "James W.",
        date: "May 2023",
        rating: 5,
        comment: "The landscape around Guilin is simply magical! The Li River cruise was worth every penny - it feels like sailing through a traditional Chinese painting. Don't miss the countryside around Yangshuo as well."
      },
      {
        name: "Nina S.",
        date: "September 2023",
        rating: 5,
        comment: "One of the most beautiful places I've visited in China. The rice noodles are delicious and very cheap. I recommend renting a bicycle in Yangshuo to explore the surrounding villages."
      },
      {
        name: "Zhang L.",
        date: "April 2023",
        rating: 4,
        comment: "The natural scenery is outstanding, though Guilin city itself is quite ordinary. The highlight was definitely the Li River cruise and the beautiful villages around Yangshuo."
      }
    ],
    transportation: {
      airport: "Guilin Liangjiang International Airport (KWL)",
      localTransport: "Buses and taxis in Guilin city. Bicycle, motorbike rental, or guided tours in Yangshuo.",
      tips: "Consider taking the bus back from Yangshuo to Guilin instead of the boat to save time and money."
    },
    bestTimeToVisit: "April to October is ideal. April-May and September-October offer pleasant weather and good visibility. Avoid the rainy season in June-August when flooding can occur."
  },
  "yangshuo": {
    title: "Yangshuo",
    location: "China",
    image: "/images/yangshuo/1.jpg", // 主图替换为本地图片
    rating: 4.8,
    description: "Enjoy Yangshuo's stunning scenery, outdoor adventures, and vibrant West Street. Cycle through rice paddies and explore caves along the Yulong River.",
    category: "Mountains",
    attractions: [
      {
        name: "Yulong River",
        description: "Famous for bamboo rafting and picturesque scenery.",
        images: [
          "/images/yangshuo/2.jpg",
          "/images/yangshuo/3.jpg"
        ],
        tips: "Best experienced early morning or late afternoon."
      },
      {
        name: "West Street",
        description: "The oldest street in Yangshuo, full of shops, bars, and restaurants.",
        images: [
          "/images/yangshuo/4.jpg"
        ],
        tips: "Great for nightlife and souvenirs."
      }
      // 可以继续补充更多景点和图片
    ],
    food: [
      {
        name: "Beer Fish",
        description: "Yangshuo's signature dish—fresh river fish cooked with local beer, vegetables, and spices.",
        where: "Local restaurants along West Street",
        price: "$$"
      },
      {
        name: "Stuffed Li River Snails",
        description: "Snails stuffed with pork and spices, a unique local delicacy.",
        where: "Farmhouse restaurants in the countryside",
        price: "$"
      },
      {
        name: "Guilin Rice Noodles",
        description: "Popular rice noodles served with various toppings and a savory broth.",
        where: "Street vendors and noodle shops",
        price: "$"
      }
    ],
    guides: [
      {
        title: "2-Day Yangshuo Adventure",
        days: [
          {
            day: 1,
            activities: "Li River Cruise → West Street exploration → Impression Liu Sanjie light show"
          },
          {
            day: 2,
            activities: "Yulong River cycling → Moon Hill hike → Local countryside visit"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Anna L.",
        date: "September 2023",
        rating: 5,
        comment: "Yangshuo is a paradise for nature lovers! Cycling along the Yulong River was unforgettable. The Beer Fish is a must-try."
      },
      {
        name: "David W.",
        date: "June 2023",
        rating: 4.5,
        comment: "The scenery is breathtaking and the town is very lively at night. Highly recommend the river cruise."
      }
    ],
    transportation: {
      airport: "Guilin Liangjiang International Airport (KWL), then bus or taxi to Yangshuo",
      localTransport: "Bicycles, scooters, taxis, and local buses are common. Many attractions are best explored by bike.",
      tips: "Book accommodation in advance during peak season. Bring cash for small vendors."
    },
    bestTimeToVisit: "April to October for pleasant weather and lush scenery."
  },
  "zhangjiajie": {
    title: "Zhangjiajie",
    location: "China",
    image: "/images/zhangjiajie/1.jpg", // 顶部Banner图
    rating: 4.9,
    description: "Explore Zhangjiajie National Forest Park with its unique pillar-like formations that inspired the 'Avatar' movie. Experience the breathtaking glass bridge and Tianmen Mountain.",
    category: "Mountains",
    attractions: [
      {
        name: "Avatar Hallelujah Mountain",
        description: "Famous for its towering sandstone pillars, which inspired the floating mountains in the movie 'Avatar'.",
        images: ["/images/zhangjiajie/1.jpg"], // 第一张
        tips: "Visit early morning for fewer crowds and better lighting for photos."
      },
      {
        name: "Zhangjiajie Glass Bridge",
        description: "World's longest and highest glass bridge offering stunning views of the canyon below.",
        images: ["/images/zhangjiajie/2.jpg"], // 第二张
        tips: "Book tickets in advance and check weather conditions for the best experience."
      },
      {
        name: "Tianmen Mountain",
        description: "Known for its cable car ride, glass skywalk, and the natural arch 'Heaven's Gate'.",
        images: ["/images/zhangjiajie/3.jpg"], // 第三张
        tips: "Wear comfortable shoes for walking and bring a jacket as temperatures can vary."
      }
    ],
    food: [
      {
        name: "Sour Fish Soup",
        description: "A spicy and sour fish soup, a local specialty of the Tujia ethnic group.",
        where: "Local restaurants near the park entrance",
        price: "$$"
      },
      {
        name: "Tujia Bacon",
        description: "Smoked pork belly, a traditional delicacy of the Tujia people.",
        where: "Traditional Tujia restaurants",
        price: "$$"
      },
      {
        name: "Wild Mushroom Hotpot",
        description: "Hotpot featuring a variety of wild mushrooms from the surrounding mountains.",
        where: "Hotpot restaurants in Zhangjiajie city",
        price: "$$"
      }
    ],
    guides: [
      {
        title: "3-Day Zhangjiajie Highlights",
        days: [
          {
            day: 1,
            activities: "Zhangjiajie National Forest Park → Avatar Hallelujah Mountain → Golden Whip Stream"
          },
          {
            day: 2,
            activities: "Glass Bridge → Zhangjiajie Grand Canyon → Baofeng Lake"
          },
          {
            day: 3,
            activities: "Tianmen Mountain → Glass Skywalk → Explore Zhangjiajie city"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Emily Z.",
        date: "October 2023",
        rating: 5,
        comment: "The scenery is out of this world! The glass bridge was both terrifying and amazing. Highly recommend visiting in autumn."
      },
      {
        name: "Leo F.",
        date: "July 2023",
        rating: 4.8,
        comment: "Zhangjiajie is a must-see for nature lovers. The cable car ride up Tianmen Mountain is unforgettable."
      }
    ],
    transportation: {
      airport: "Zhangjiajie Hehua International Airport (DYG)",
      localTransport: "Buses, taxis, and cable cars are the main ways to get around. Many attractions are spread out, so plan your route in advance.",
      tips: "Bring rain gear as weather can change quickly. Some trails can be steep—wear good shoes."
    },
    bestTimeToVisit: "September to November for clear skies and comfortable temperatures."
  },
  "yangshuo": {
    title: "Yangshuo",
    location: "China",
    image: "/images/yangshuo/1.jpg", // 主图替换为本地图片
    rating: 4.8,
    description: "Enjoy Yangshuo's stunning scenery, outdoor adventures, and vibrant West Street. Cycle through rice paddies and explore caves along the Yulong River.",
    category: "Mountains",
    attractions: [
      {
        name: "Yulong River",
        description: "Famous for bamboo rafting and picturesque scenery.",
        images: [
          "/images/yangshuo/2.jpg",
          "/images/yangshuo/3.jpg"
        ],
        tips: "Best experienced early morning or late afternoon."
      },
      {
        name: "West Street",
        description: "The oldest street in Yangshuo, full of shops, bars, and restaurants.",
        images: [
          "/images/yangshuo/4.jpg"
        ],
        tips: "Great for nightlife and souvenirs."
      }
      // 可以继续补充更多景点和图片
    ],
    food: [
      {
        name: "Beer Fish",
        description: "Yangshuo's signature dish—fresh river fish cooked with local beer, vegetables, and spices.",
        where: "Local restaurants along West Street",
        price: "$$"
      },
      {
        name: "Stuffed Li River Snails",
        description: "Snails stuffed with pork and spices, a unique local delicacy.",
        where: "Farmhouse restaurants in the countryside",
        price: "$"
      },
      {
        name: "Guilin Rice Noodles",
        description: "Popular rice noodles served with various toppings and a savory broth.",
        where: "Street vendors and noodle shops",
        price: "$"
      }
    ],
    guides: [
      {
        title: "2-Day Yangshuo Adventure",
        days: [
          {
            day: 1,
            activities: "Li River Cruise → West Street exploration → Impression Liu Sanjie light show"
          },
          {
            day: 2,
            activities: "Yulong River cycling → Moon Hill hike → Local countryside visit"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Anna L.",
        date: "September 2023",
        rating: 5,
        comment: "Yangshuo is a paradise for nature lovers! Cycling along the Yulong River was unforgettable. The Beer Fish is a must-try."
      },
      {
        name: "David W.",
        date: "June 2023",
        rating: 4.5,
        comment: "The scenery is breathtaking and the town is very lively at night. Highly recommend the river cruise."
      }
    ],
    transportation: {
      airport: "Guilin Liangjiang International Airport (KWL), then bus or taxi to Yangshuo",
      localTransport: "Bicycles, scooters, taxis, and local buses are common. Many attractions are best explored by bike.",
      tips: "Book accommodation in advance during peak season. Bring cash for small vendors."
    },
    bestTimeToVisit: "April to October for pleasant weather and lush scenery."
  },
  "zhangjiajie": {
    title: "Zhangjiajie",
    location: "China",
    image: "/images/zhangjiajie/1.jpg", // 顶部Banner图
    rating: 4.9,
    description: "Explore Zhangjiajie National Forest Park with its unique pillar-like formations that inspired the 'Avatar' movie. Experience the breathtaking glass bridge and Tianmen Mountain.",
    category: "Mountains",
    attractions: [
      {
        name: "Avatar Hallelujah Mountain",
        description: "Famous for its towering sandstone pillars, which inspired the floating mountains in the movie 'Avatar'.",
        images: ["/images/zhangjiajie/1.jpg"], // 第一张
        tips: "Visit early morning for fewer crowds and better lighting for photos."
      },
      {
        name: "Zhangjiajie Glass Bridge",
        description: "World's longest and highest glass bridge offering stunning views of the canyon below.",
        images: ["/images/zhangjiajie/2.jpg"], // 第二张
        tips: "Book tickets in advance and check weather conditions for the best experience."
      },
      {
        name: "Tianmen Mountain",
        description: "Known for its cable car ride, glass skywalk, and the natural arch 'Heaven's Gate'.",
        images: ["/images/zhangjiajie/3.jpg"], // 第三张
        tips: "Wear comfortable shoes for walking and bring a jacket as temperatures can vary."
      }
    ],
    food: [
      {
        name: "Sour Fish Soup",
        description: "A spicy and sour fish soup, a local specialty of the Tujia ethnic group.",
        where: "Local restaurants near the park entrance",
        price: "$$"
      },
      {
        name: "Tujia Bacon",
        description: "Smoked pork belly, a traditional delicacy of the Tujia people.",
        where: "Traditional Tujia restaurants",
        price: "$$"
      },
      {
        name: "Wild Mushroom Hotpot",
        description: "Hotpot featuring a variety of wild mushrooms from the surrounding mountains.",
        where: "Hotpot restaurants in Zhangjiajie city",
        price: "$$"
      }
    ],
    guides: [
      {
        title: "3-Day Zhangjiajie Highlights",
        days: [
          {
            day: 1,
            activities: "Zhangjiajie National Forest Park → Avatar Hallelujah Mountain → Golden Whip Stream"
          },
          {
            day: 2,
            activities: "Glass Bridge → Zhangjiajie Grand Canyon → Baofeng Lake"
          },
          {
            day: 3,
            activities: "Tianmen Mountain → Glass Skywalk → Explore Zhangjiajie city"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Emily Z.",
        date: "October 2023",
        rating: 5,
        comment: "The scenery is out of this world! The glass bridge was both terrifying and amazing. Highly recommend visiting in autumn."
      },
      {
        name: "Leo F.",
        date: "July 2023",
        rating: 4.8,
        comment: "Zhangjiajie is a must-see for nature lovers. The cable car ride up Tianmen Mountain is unforgettable."
      }
    ],
    transportation: {
      airport: "Zhangjiajie Hehua International Airport (DYG)",
      localTransport: "Buses, taxis, and cable cars are the main ways to get around. Many attractions are spread out, so plan your route in advance.",
      tips: "Bring rain gear as weather can change quickly. Some trails can be steep—wear good shoes."
    },
    bestTimeToVisit: "September to November for clear skies and comfortable temperatures."
  },
  "yangshuo": {
    title: "Yangshuo",
    location: "China",
    image: "/images/yangshuo/1.jpg", // 主图替换为本地图片
    rating: 4.8,
    description: "Enjoy Yangshuo's stunning scenery, outdoor adventures, and vibrant West Street. Cycle through rice paddies and explore caves along the Yulong River.",
    category: "Mountains",
    attractions: [
      {
        name: "Yulong River",
        description: "Famous for bamboo rafting and picturesque scenery.",
        images: [
          "/images/yangshuo/2.jpg",
          "/images/yangshuo/3.jpg"
        ],
        tips: "Best experienced early morning or late afternoon."
      },
      {
        name: "West Street",
        description: "The oldest street in Yangshuo, full of shops, bars, and restaurants.",
        images: [
          "/images/yangshuo/4.jpg"
        ],
        tips: "Great for nightlife and souvenirs."
      }
      // 可以继续补充更多景点和图片
    ],
    food: [
      {
        name: "Beer Fish",
        description: "Yangshuo's signature dish—fresh river fish cooked with local beer, vegetables, and spices.",
        where: "Local restaurants along West Street",
        price: "$$"
      },
      {
        name: "Stuffed Li River Snails",
        description: "Snails stuffed with pork and spices, a unique local delicacy.",
        where: "Farmhouse restaurants in the countryside",
        price: "$"
      },
      {
        name: "Guilin Rice Noodles",
        description: "Popular rice noodles served with various toppings and a savory broth.",
        where: "Street vendors and noodle shops",
        price: "$"
      }
    ],
    guides: [
      {
        title: "2-Day Yangshuo Adventure",
        days: [
          {
            day: 1,
            activities: "Li River Cruise → West Street exploration → Impression Liu Sanjie light show"
          },
          {
            day: 2,
            activities: "Yulong River cycling → Moon Hill hike → Local countryside visit"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Anna L.",
        date: "September 2023",
        rating: 5,
        comment: "Yangshuo is a paradise for nature lovers! Cycling along the Yulong River was unforgettable. The Beer Fish is a must-try."
      },
      {
        name: "David W.",
        date: "June 2023",
        rating: 4.5,
        comment: "The scenery is breathtaking and the town is very lively at night. Highly recommend the river cruise."
      }
    ],
    transportation: {
      airport: "Guilin Liangjiang International Airport (KWL), then bus or taxi to Yangshuo",
      localTransport: "Bicycles, scooters, taxis, and local buses are common. Many attractions are best explored by bike.",
      tips: "Book accommodation in advance during peak season. Bring cash for small vendors."
    },
    bestTimeToVisit: "April to October for pleasant weather and lush scenery."
  },
  "zhangjiajie": {
    title: "Zhangjiajie",
    location: "China",
    image: "/images/zhangjiajie/1.jpg", // 顶部Banner图
    rating: 4.9,
    description: "Explore Zhangjiajie National Forest Park with its unique pillar-like formations that inspired the 'Avatar' movie. Experience the breathtaking glass bridge and Tianmen Mountain.",
    category: "Mountains",
    attractions: [
      {
        name: "Tianmen Mountain",
        description: "Known for its cable car ride, glass skywalk, and the natural arch 'Heaven's Gate'.",
        images: ["/images/zhangjiajie/1.jpg"], // 第一张
        tips: "Wear comfortable shoes for walking and bring a jacket as temperatures can vary."
      },
      {
        name: "Zhangjiajie Glass Bridge",
        description: "World's longest and highest glass bridge offering stunning views of the canyon below.",
        images: ["/images/zhangjiajie/2.jpg"], // 第二张
        tips: "Book tickets in advance and check weather conditions for the best experience."
      },
      {
        name: "Golden Whip Stream",
        description: "A picturesque 7.5 km stream winding through Zhangjiajie National Forest Park, surrounded by towering peaks and lush vegetation.",
        images: ["/images/zhangjiajie/3.jpg"], // 第三张
        tips: "The trail is relatively flat and easy to walk. Allow 2-3 hours to enjoy the scenery and take photos. Watch for wild monkeys along the path."
      }
    ],
    food: [
      {
        name: "Sour Fish Soup",
        description: "A spicy and sour fish soup, a local specialty of the Tujia ethnic group.",
        where: "Local restaurants near the park entrance",
        price: "$$"
      },
      {
        name: "Tujia Bacon",
        description: "Smoked pork belly, a traditional delicacy of the Tujia people.",
        where: "Traditional Tujia restaurants",
        price: "$$"
      },
      {
        name: "Wild Mushroom Hotpot",
        description: "Hotpot featuring a variety of wild mushrooms from the surrounding mountains.",
        where: "Hotpot restaurants in Zhangjiajie city",
        price: "$$"
      }
    ],
    guides: [
      {
        title: "3-Day Zhangjiajie Highlights",
        days: [
          {
            day: 1,
            activities: "Zhangjiajie National Forest Park → Tianmen Mountain → Golden Whip Stream"
          },
          {
            day: 2,
            activities: "Glass Bridge → Zhangjiajie Grand Canyon → Baofeng Lake"
          },
          {
            day: 3,
            activities: "Golden Whip Stream → Glass Skywalk → Explore Zhangjiajie city"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Emily Z.",
        date: "October 2023",
        rating: 5,
        comment: "The scenery is out of this world! The glass bridge was both terrifying and amazing. Highly recommend visiting in autumn."
      },
      {
        name: "Leo F.",
        date: "July 2023",
        rating: 4.8,
        comment: "Zhangjiajie is a must-see for nature lovers. The cable car ride up Tianmen Mountain is unforgettable."
      }
    ],
    transportation: {
      airport: "Zhangjiajie Hehua International Airport (DYG)",
      localTransport: "Buses, taxis, and cable cars are the main ways to get around. Many attractions are spread out, so plan your route in advance.",
      tips: "Bring rain gear as weather can change quickly. Some trails can be steep—wear good shoes."
    },
    bestTimeToVisit: "September to November for clear skies and comfortable temperatures."
  },
  "yangshuo": {
    title: "Yangshuo",
    location: "China",
    image: "/images/yangshuo/1.jpg", // 主图替换为本地图片
    rating: 4.8,
    description: "Enjoy Yangshuo's stunning scenery, outdoor adventures, and vibrant West Street. Cycle through rice paddies and explore caves along the Yulong River.",
    category: "Mountains",
    attractions: [
      {
        name: "Yulong River",
        description: "Famous for bamboo rafting and picturesque scenery.",
        images: [
          "/images/yangshuo/2.jpg",
          "/images/yangshuo/3.jpg"
        ],
        tips: "Best experienced early morning or late afternoon."
      },
      {
        name: "West Street",
        description: "The oldest street in Yangshuo, full of shops, bars, and restaurants.",
        images: [
          "/images/yangshuo/4.jpg"
        ],
        tips: "Great for nightlife and souvenirs."
      }
      // 可以继续补充更多景点和图片
    ],
    food: [
      {
        name: "Beer Fish",
        description: "Yangshuo's signature dish—fresh river fish cooked with local beer, vegetables, and spices.",
        where: "Local restaurants along West Street",
        price: "$$"
      },
      {
        name: "Stuffed Li River Snails",
        description: "Snails stuffed with pork and spices, a unique local delicacy.",
        where: "Farmhouse restaurants in the countryside",
        price: "$"
      },
      {
        name: "Guilin Rice Noodles",
        description: "Popular rice noodles served with various toppings and a savory broth.",
        where: "Street vendors and noodle shops",
        price: "$"
      }
    ],
    guides: [
      {
        title: "2-Day Yangshuo Adventure",
        days: [
          {
            day: 1,
            activities: "Li River Cruise → West Street exploration → Impression Liu Sanjie light show"
          },
          {
            day: 2,
            activities: "Yulong River cycling → Moon Hill hike → Local countryside visit"
          }
        ]
      }
    ],
    reviews: [
      {
        name: "Anna L.",
        date: "September 2023",
        rating: 5,
        comment: "Yangshuo is a paradise for nature lovers! Cycling along the Yulong River was unforgettable. The Beer Fish is a must-try."
      },
      {
        name: "David W.",
        date: "June 2023",
        rating: 4.5,
        comment: "The scenery is breathtaking and the town is very lively at night. Highly recommend the river cruise."
      }
    ],
    transportation: {
      airport: "Guilin Liangjiang International Airport (KWL)",
      localTransport: "Buses and taxis in Guilin city. Bicycle, motorbike rental, or guided tours in Yangshuo.",
      tips: "Consider taking the bus back from Yangshuo to Guilin instead of the boat to save time and money."
    },
    bestTimeToVisit: "April to October is ideal. April-May and September-October offer pleasant weather and good visibility. Avoid the rainy season in June-August when flooding can occur."
  }
};

// Component for attraction cards with images
const AttractionCard = ({ attraction }) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={attraction.images[0]}
          alt={attraction.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg font-semibold text-gray-900">{attraction.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{attraction.description}</p>
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
          <h4 className="text-sm font-medium text-amber-800 flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            {t('tips')}:
          </h4>
          <p className="text-sm text-amber-700 mt-1">{attraction.tips}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Food recommendation component
const FoodItem = ({ food }) => {
  const { t } = useLanguage();

  return (
    <div className="flex border-b border-gray-100 py-4 hover:bg-gray-50 transition-colors duration-200 px-2">
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900">{t(food.name)}</h3>
        <p className="text-sm text-gray-600 mt-1 mb-3">{t(food.description)}</p>
        <div className="mt-2 flex items-center gap-4">
          <span className="text-xs bg-travel-blue/10 px-3 py-1.5 rounded-full text-travel-blue flex items-center">
            <Utensils className="h-3 w-3 mr-1.5" />
            {t('where')}: {t(food.where)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Review component
const ReviewCard = ({ review }) => {
  const { t } = useLanguage();

  return (
    <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900">{review.name}</h3>
        <div className="flex items-center gap-1 bg-amber-100 px-2.5 py-1 rounded-full">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          <span className="text-xs font-medium text-amber-700">{review.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{review.date}</div>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{t(review.comment)}</p>
    </div>
  );
};

// Main destination detail component
const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<any>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    // 如果有id参数，则获取目的地数据
    if (id) {
      // 从destinationsData中获取目的地数据
      const destinationData = destinationsData[id as keyof typeof destinationsData];
      if (destinationData) {
        // 根据当前语言处理目的地数据
        const localizedDestination = {
          ...destinationData,
          title: t(id), // 使用翻译后的标题
          location: t(destinationData.location.toLowerCase()), // 翻译位置
          description: t(`${id}_description`) || destinationData.description, // 尝试获取翻译后的描述
        };

        // 处理景点名称、描述和提示的翻译
        if (localizedDestination.attractions) {
          localizedDestination.attractions = localizedDestination.attractions.map((attraction: any) => {
            // 从景点名称中提取关键词作为翻译键
            // 例如："Avatar Hallelujah Mountain" -> "avatar_hallelujah_mountain"
            // "Zhangjiajie Glass Bridge" -> "glass_bridge"
            // "Tianmen Mountain" -> "tianmen_mountain"
            let translationKey = attraction.name.toLowerCase().replace(/\s+/g, '_');

            // 移除目的地名称前缀，避免重复
            // 例如："zhangjiajie_glass_bridge" -> "glass_bridge"
            if (translationKey.startsWith(`${id}_`)) {
              translationKey = translationKey.substring(id.length + 1);
            }

            // 尝试使用翻译键获取翻译
            const nameKey = `${id}_attraction_${translationKey}`;
            const descKey = `${id}_attraction_${translationKey}_desc`;
            const tipsKey = `${id}_attraction_${translationKey}_tips`;

            // 调试信息
            console.log(`Attraction name: ${attraction.name}, Translation key: ${nameKey}`);

            // 获取翻译内容
            const translatedName = t(nameKey);
            const translatedDesc = t(descKey);
            const translatedTips = t(tipsKey);

            // 调试信息
            console.log(`Translated name: ${translatedName}`);

            return {
              ...attraction,
              name: translatedName !== nameKey ? translatedName : attraction.name,
              description: translatedDesc !== descKey ? translatedDesc : attraction.description,
              tips: translatedTips !== tipsKey ? translatedTips : attraction.tips,
            };
          });
        }

        // 处理美食名称、描述和where属性的翻译
        if (localizedDestination.food) {
          localizedDestination.food = localizedDestination.food.map((food: any) => ({
            ...food,
            name: t(`${id}_food_${food.name.toLowerCase().replace(/\s+/g, '_')}`) || food.name,
            description: t(`${id}_food_${food.name.toLowerCase().replace(/\s+/g, '_')}_desc`) || food.description,
            where: t(food.where) || food.where, // 添加where属性的翻译
          }));
        }

        setDestination(localizedDestination);
      }
    }
  }, [id, language, t]); // 添加language作为依赖项，这样语言变化时会重新获取数据

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-1">{t('Destination not found')}</h3>
            <p className="text-gray-500 mb-6">{t('The requested destination could not be found')}</p>
            <Button asChild>
              <Link to="/destinations">{t('Back to destinations')}</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 py-12 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Link to="/destinations" className="text-sm text-white/80 hover:text-white flex items-center">
                {t('Destinations')}
              </Link>
              <span className="text-white/60">›</span>
              <span className="text-sm text-white/80">{t(destination.location)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{t(id)}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {t(destination.location)}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                {destination.rating.toFixed(1)}
              </span>
              <span className="bg-travel-blue/90 text-white text-xs px-2 py-1 rounded-full">
                {t(destination.category)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 mb-12">
        <div className="max-w-4xl mx-auto">
          {/* Description section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('about')} {t(id)}</h2>
            <p className="text-lg text-gray-700">{t(destination.description)}</p>
          </div>

          {/* Travel guide tabs */}
          <div className="mt-12">
            <Tabs defaultValue="attractions">
              <TabsList className="w-full grid grid-cols-4 mb-8 bg-white border border-gray-200 p-0 rounded-md overflow-hidden">
                <TabsTrigger value="attractions" className="flex items-center justify-center gap-2 data-[state=active]:bg-travel-blue data-[state=active]:text-white py-3 rounded-none border-r border-gray-200">
                  <Camera className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('attractions')}</span>
                </TabsTrigger>
                <TabsTrigger value="food" className="flex items-center justify-center gap-2 data-[state=active]:bg-travel-blue data-[state=active]:text-white py-3 rounded-none border-r border-gray-200">
                  <Utensils className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('food')}</span>
                </TabsTrigger>
                <TabsTrigger value="guides" className="flex items-center justify-center gap-2 data-[state=active]:bg-travel-blue data-[state=active]:text-white py-3 rounded-none border-r border-gray-200">
                  <Map className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('travel guides')}</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center justify-center gap-2 data-[state=active]:bg-travel-blue data-[state=active]:text-white py-3 rounded-none">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('reviews')}</span>
                </TabsTrigger>
              </TabsList>

              {/* Attractions tab */}
              <TabsContent value="attractions">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('top attractions in')} {t(id)}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.attractions.map((attraction) => (
                    <AttractionCard key={attraction.name} attraction={attraction} />
                  ))}
                </div>
              </TabsContent>

              {/* Food tab */}
              <TabsContent value="food">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('what to eat in')} {t(id)}</h2>
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border">
                  <div className="mb-4">
                    <p className="text-gray-600">
                      {t('local cuisine is an essential part of experiencing')} {t(id)} {t('here are some must-try dishes and where to find them:')}
                    </p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {destination.food.map((food) => (
                      <FoodItem key={food.name} food={food} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Travel guides tab */}
              <TabsContent value="guides">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('travel itineraries for')} {t(id)}</h2>

                <Accordion type="single" collapsible className="mb-8">
                  {destination.guides.map((guide, index) => (
                    <AccordionItem key={index} value={`guide-${index}`} className="border border-gray-200 rounded-md mb-3 overflow-hidden">
                      <AccordionTrigger className="text-lg font-medium px-4 py-3 bg-gray-50 hover:bg-gray-100 data-[state=open]:bg-travel-blue data-[state=open]:text-white transition-colors duration-200">
                        {t(guide.title)}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-4 border-t border-gray-200">
                        <div className="space-y-6 pt-2">
                          {guide.days.map((day) => (
                            <div key={day.day} className="flex gap-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-travel-blue rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                                {t('day')} {day.day}
                              </div>
                              <div className="flex-grow pt-1">
                                <p className="text-gray-700 leading-relaxed">{t(day.activities)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Travel info table */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t('practical information')}</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableBody>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900 bg-gray-50 w-1/3">{t('best time to visit')}</TableCell>
                          <TableCell className="text-gray-700">{t(destination.bestTimeToVisit)}</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900 bg-gray-50 w-1/3">{t('getting there')}</TableCell>
                          <TableCell className="text-gray-700">{t(destination.transportation.airport)}</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900 bg-gray-50 w-1/3">{t('local transportation')}</TableCell>
                          <TableCell className="text-gray-700">{t(destination.transportation.localTransport)}</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900 bg-gray-50 w-1/3">{t('travel tips')}</TableCell>
                          <TableCell className="text-gray-700">{t(destination.transportation.tips)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Reviews tab */}
              <TabsContent value="reviews">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('traveler reviews')}</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {destination.reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Back to destinations */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="mr-4">
              <Link to="/destinations">
                {t('back to all destinations')}
              </Link>
            </Button>
            <Button asChild>
              <a href="#" className="bg-travel-blue hover:bg-travel-blue/90">
                {t('plan your trip')}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
