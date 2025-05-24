
import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Globe } from 'lucide-react';

// Define available languages
export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ko';

// Create context for language
export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Language Provider Component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // 从本地存储中获取语言设置，如果没有则使用默认值 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // 当语言变化时，保存到本地存储
  useEffect(() => {
    localStorage.setItem('language', language);
    console.log('Language saved to localStorage:', language);
  }, [language]);

  const translations: Record<Language, Record<string, string>> = {
    'en': {
      // Navigation Links
      'nav_home': 'Home',
      'nav_destinations': 'Destinations',
      'nav_about': 'About',
      'nav_contact': 'Contact',

      // Common words
      'about': 'About',
      'tips': 'Tips',
      'top attractions in': 'Top Attractions in',
      'what to eat in': 'What to Eat in',
      'travel itineraries for': 'Travel Itineraries for',
      'local cuisine is an essential part of experiencing': 'Local cuisine is an essential part of experiencing',
      'here are some must-try dishes and where to find them:': 'Here are some must-try dishes and where to find them:',

      // Navigation and UI elements
      'attractions': 'Attractions',
      'food': 'Food',
      'travel guides': 'Travel Guides',
      'reviews': 'Reviews',
      'back to all destinations': 'Back to All Destinations',
      'plan your trip': 'Plan Your Trip',
      'day': 'Day',
      'traveler reviews': 'Traveler Reviews',
      'practical information': 'Practical Information',
      'best time to visit': 'Best time to visit',
      'getting there': 'Getting there',
      'local transportation': 'Local transportation',
      'travel tips': 'Travel tips',

      // Hero Section Translations
      'hero_title': 'Discover Your Next Adventure',
      'hero_subtitle': 'Explore breathtaking destinations and create unforgettable memories.',
      'hero_search_placeholder': 'Search for destinations (e.g., Beijing, Guilin)...',
      'hero_search_button': 'Search',

      // Terms of Service Page Translations
      'terms_page_title': 'Terms of Service',
      'terms_page_subtitle': 'Please read these terms carefully before using our services.',
      'terms_section1_title': 'Acceptance of Terms',
      'terms_section1_content': 'By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
      'terms_section2_title': 'Use License',
      'terms_section2_content': 'Permission is granted to temporarily download one copy of the materials on TravelSpot for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained on TravelSpot; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.',
      'terms_section3_title': 'Disclaimer',
      'terms_section3_content': 'The materials on TravelSpot are provided on an "as is" basis. TravelSpot makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
      'terms_section4_title': 'Limitations',
      'terms_section4_content': 'In no event shall TravelSpot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TravelSpot, even if TravelSpot or a TravelSpot authorized representative has been notified orally or in writing of the possibility of such damage.',
      'terms_section5_title': 'Revisions and Errata',
      'terms_section5_content': 'The materials appearing on TravelSpot could include technical, typographical, or photographic errors. TravelSpot does not warrant that any of the materials on its website are accurate, complete or current. TravelSpot may make changes to the materials contained on its website at any time without notice.',
      'terms_section6_title': 'Contact Us',
      'terms_section6_content': 'If you have any questions about these Terms of Service, please contact us at {email}.',

      // Privacy Policy Page Translations
      'privacy_page_title': 'Privacy Policy',
      'privacy_page_subtitle': 'We value your privacy and are committed to protecting your personal information.',
      'privacy_section1_title': '1. Information We Collect',
      'privacy_section1_content': 'When you use our services, we may collect your personal information such as your name, email address, phone number, payment information, and travel preferences. We may also collect non-personal information about how you use our website, such as your IP address, browser type, and access times.',
      'privacy_section2_title': '2. How We Use Your Information',
      'privacy_section2_content': 'We use the information we collect to provide and improve our services, process your bookings, communicate with you, personalize your experience, and for marketing purposes (with your consent).',
      'privacy_section3_title': '3. Information Sharing and Disclosure',
      'privacy_section3_content': 'We may share your information with third-party service providers (such as hotels, airlines) to complete your bookings. We will not sell or rent your personal information to third parties unless required by law or to protect our rights.',
      'privacy_section4_title': '4. Data Security',
      'privacy_section4_content': 'We take reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.',
      'privacy_section5_title': '5. Cookie Policy',
      'privacy_section5_content': 'Our website uses cookies to enhance your user experience. Cookies are small text files stored on your device. You can configure your browser to refuse cookies, but this may affect your experience using certain features of our website.',
      'privacy_section6_title': '6. Your Rights',
      'privacy_section6_content': 'You have the right to access, correct, or delete your personal information. You can also object to or limit the processing of your information. To exercise these rights, please contact us using the contact information provided below.',
      'privacy_section7_title': '7. Policy Changes',
      'privacy_section7_content': 'We may update this Privacy Policy from time to time. Any changes will be posted on this page, and significant changes will be notified to you via email. We encourage you to review this policy regularly.',
      'privacy_section8_title': '8. Contact Us',
      'privacy_section8_content': 'If you have any questions or concerns about this Privacy Policy, please contact us at {email}.',

      // Category Section Translations
      'category_section_title': 'Explore by Category',
      'category_section_subtitle': 'Find your perfect trip based on your interests.',
      'category_beaches': 'Beaches',
      'category_mountains': 'Mountains',
      'category_cities': 'Cities',
      'category_forests': 'Forests',
      'category_adventures': 'Adventures',
      'category_destinations_count': 'Destinations',

      'explore_destinations': 'Explore Destinations',
      'discover_places': 'Discover amazing places around the world',
      'featured_destinations_title': 'Featured Destinations',
      'featured_destinations_subtitle': 'Explore our handpicked selection of stunning destinations from around the world',
      'testimonials_title': 'What Our Travelers Say',
      'testimonials_subtitle': 'Real experiences from real travelers',

      // Testimonial 1
      'testimonial_1_name': 'Zhao Lei',
      'testimonial_1_location': 'China',
      'testimonial_1_text': 'Booking a Zhangjiajie tour through this platform was amazing! The booking process was simple and smooth, and the recommended itineraries and experiences were professional. The arrangements for the Glass Bridge and Tianmen Mountain were reasonable, with fresh air perfect for hiking. I will definitely use this platform again!',

      // Testimonial 2
      'testimonial_2_name': 'Wang Wei',
      'testimonial_2_location': 'China',
      'testimonial_2_text': 'The Xi\'an travel guide was very comprehensive, helping me discover many hidden food treasures. The itinerary arrangements for the Terracotta Warriors and Ancient City Wall were reasonable, and the Muslim Street food recommendations were especially great. The local food guide here is truly professional!',

      // Testimonial 3
      'testimonial_3_name': 'Zhang Ting',
      'testimonial_3_location': 'China',
      'testimonial_3_text': 'Planning a family trip to Guilin through this platform saved me a lot of trouble. The Li River cruise and Elephant Trunk Hill itinerary were particularly suitable for bringing children, and the service was very thoughtful. The landscape was like a painting, leaving beautiful memories for the whole family.',
      'search_destinations': 'Search destinations...',
      'no_destinations': 'No destinations found',
      'try_changing': 'Try changing your search or filter criteria',
      'all': 'All',
      'beaches': 'Beaches',
      'mountains': 'Mountains',
      'cities': 'Cities',
      'beijing': 'Beijing',
      'henan': 'Henan',
      'xian': "Xi'an",
      'forests': 'Forests',
      'adventures': 'Adventures',
      'shanghai': 'Shanghai',
      'qingdao': 'Qingdao',
      'guilin': 'Guilin',
      'yangshuo': 'Yangshuo',
      'zhangjiajie': 'Zhangjiajie',
      'china': 'China',
      'english': 'English',
      'zh_simple': 'Simplified Chinese',
      'zh_traditional': 'Traditional Chinese',
      'korean': 'Korean',

      // Destinations page translations
      'destinations_page_title': 'Explore Amazing Destinations',
      'destinations_page_subtitle': 'Discover breathtaking places and plan your next adventure',
      'destinations_search_placeholder': 'Search for destinations...',
      'destinations_not_found_title': 'No destinations found',
      'destinations_not_found_message': 'Try changing your search or filter criteria',
      'explore destination': 'Explore destination',

      // Destination descriptions
      'beijing_description': 'Explore Beijing with its iconic Great Wall, Forbidden City, and Temple of Heaven. Experience the rich history and culture of China\'s capital city while enjoying delicious cuisine.',
      'henan_description': 'Visit Henan, the cradle of Chinese civilization, with highlights like the Shaolin Temple, Longmen Grottoes, and ancient capitals Luoyang and Kaifeng.',

      // Beijing attractions
      'beijing_attraction_great_wall_of_china': 'Great Wall of China',
      'beijing_attraction_great_wall_of_china_desc': 'One of the world\'s most iconic structures, the Great Wall stretches over 13,000 miles. The Badaling and Mutianyu sections near Beijing are the most visited parts.',
      'beijing_attraction_great_wall_of_china_tips': 'Visit early in the morning to avoid crowds. Wear comfortable shoes as there\'s a lot of walking and steps.',

      'beijing_attraction_forbidden_city': 'Forbidden City',
      'beijing_attraction_forbidden_city_desc': 'The former Chinese imperial palace from the Ming to Qing dynasties, this massive complex features 980 buildings spanning 180 acres.',
      'beijing_attraction_forbidden_city_tips': 'Buy tickets online in advance. Plan to spend at least 3 hours exploring. Audio guides are available in multiple languages.',

      'beijing_attraction_temple_of_heaven': 'Temple of Heaven',
      'beijing_attraction_temple_of_heaven_desc': 'A complex of religious buildings where emperors of the Ming and Qing dynasties performed ceremonies to pray for good harvests.',
      'beijing_attraction_temple_of_heaven_tips': 'Visit in the early morning to see locals practicing tai chi, dancing, and playing traditional instruments in the surrounding park.',
      'xian_description': 'Discover Xi\'an, home to the world-famous Terracotta Army, ancient city wall, and rich Silk Road history. Enjoy authentic Shaanxi cuisine and vibrant local culture.',
      'shanghai_description': 'Visit Shanghai, China\'s vibrant modern metropolis with its impressive skyline, historic Bund, and charming old neighborhoods. Experience the blend of traditional and contemporary China.',

      // Henan attractions
      'henan_attraction_shaolin_temple': 'Shaolin Temple',
      'henan_attraction_shaolin_temple_desc': 'Famous for martial arts and Zen Buddhism, the Shaolin Temple is a must-visit for those interested in Chinese culture.',
      'henan_attraction_shaolin_temple_tips': 'Visit early to avoid crowds and enjoy the peaceful environment.',

      'henan_attraction_longmen_grottoes': 'Longmen Grottoes',
      'henan_attraction_longmen_grottoes_desc': 'A UNESCO World Heritage site with thousands of Buddha and disciple statues carved into the rock face.',
      'henan_attraction_longmen_grottoes_tips': 'Wear comfortable shoes as there is a lot of walking involved.',

      // Xi'an attractions
      'xian_attraction_terracotta_army': 'Terracotta Army',
      'xian_attraction_terracotta_army_desc': 'One of the greatest archaeological discoveries of the 20th century - thousands of life-sized warriors and horses created to protect Emperor Qin Shi Huang in the afterlife.',
      'xian_attraction_terracotta_army_tips': 'Hire a guide to help understand the significance of what you\'re seeing. Visit Pit 1 last as it\'s the most impressive.',

      'xian_attraction_xi\'an_city_wall': 'Xi\'an City Wall',
      'xian_attraction_xi\'an_city_wall_desc': 'The most complete ancient city wall in China, offering bicycle rentals to ride around the entire 14km perimeter.',
      'xian_attraction_xi\'an_city_wall_tips': 'Rent a bicycle to tour the entire wall - it takes about 2 hours at a leisurely pace.',

      'xian_attraction_muslim_quarter': 'Muslim Quarter',
      'xian_attraction_muslim_quarter_desc': 'A historic neighborhood with narrow alleys filled with food stalls, souvenir shops, and the Great Mosque.',
      'xian_attraction_muslim_quarter_tips': 'Visit in the evening when it\'s most lively. Come hungry and try as many street foods as possible!',

      'xian_attraction_big_wild_goose_pagoda': 'Big Wild Goose Pagoda',
      'xian_attraction_big_wild_goose_pagoda_desc': 'A famous Buddhist pagoda and landmark of Xi\'an, originally built in 652 during the Tang Dynasty.',
      'xian_attraction_big_wild_goose_pagoda_tips': 'The square in front of the pagoda features a beautiful musical fountain show in the evening.',

      // Shanghai attractions
      'shanghai_attraction_the_bund': 'The Bund',
      'shanghai_attraction_the_bund_desc': 'Famous waterfront area with colonial-era buildings on one side and the futuristic Pudong skyline on the other. Especially beautiful at night.',
      'shanghai_attraction_the_bund_tips': 'Visit both during the day and night for different perspectives. Take a river cruise for panoramic views.',

      'shanghai_attraction_yu_garden': 'Yu Garden',
      'shanghai_attraction_yu_garden_desc': 'A traditional Chinese garden from the Ming Dynasty with pavilions, rockeries, and ponds in the heart of the old city.',
      'shanghai_attraction_yu_garden_tips': 'Combine with a visit to the nearby City God Temple and the bustling bazaar area for shopping and snacks.',

      'shanghai_attraction_shanghai_tower': 'Shanghai Tower',
      'shanghai_attraction_shanghai_tower_desc': 'One of the tallest buildings in the world with an observation deck offering magnificent views of the city.',
      'shanghai_attraction_shanghai_tower_tips': 'Purchase tickets in advance to avoid lines. Visit on a clear day for the best visibility.',

      'qingdao_description': 'Explore Qingdao with its beautiful beaches, German colonial architecture, and world-famous beer. Enjoy fresh seafood and stunning coastal views.',

      // Qingdao attractions
      'qingdao_attraction_badaguan_scenic_area': 'Badaguan Scenic Area',
      'qingdao_attraction_badaguan_scenic_area_desc': 'Historic area with unique architecture, beautiful gardens, and eight roads named after the famous eight passes of the Great Wall.',
      'qingdao_attraction_badaguan_scenic_area_tips': 'Best visited in spring when flowers bloom or autumn when leaves change color.',

      'qingdao_attraction_tsingtao_brewery_museum': 'Tsingtao Brewery Museum',
      'qingdao_attraction_tsingtao_brewery_museum_desc': 'Museum showcasing the history of China\'s most famous beer, founded by German settlers in 1903. Includes beer tasting.',
      'qingdao_attraction_tsingtao_brewery_museum_tips': 'Visit in the morning to avoid crowds. Admission includes beer samples.',

      'qingdao_attraction_no._1_bathing_beach': 'No. 1 Bathing Beach',
      'qingdao_attraction_no._1_bathing_beach_desc': 'Popular sandy beach with clear water and views of the iconic Zhanqiao Pier.',
      'qingdao_attraction_no._1_bathing_beach_tips': 'Early morning is the best time for swimming when it\'s less crowded. Bring your own towel.',

      'guilin_description': 'Marvel at Guilin\'s breathtaking karst landscapes, picturesque rivers, and lush countryside. Take a Li River cruise and experience traditional rural life.',

      // Guilin attractions
      'guilin_attraction_li_river_cruise': 'Li River Cruise',
      'guilin_attraction_li_river_cruise_desc': 'Scenic cruise from Guilin to Yangshuo offering spectacular views of karst mountains, rural villages, and fishermen with cormorants.',
      'guilin_attraction_li_river_cruise_tips': 'The 4-5 hour cruise is better than shorter options. Sit on the right side of the boat for the best views.',

      'guilin_attraction_reed_flute_cave': 'Reed Flute Cave',
      'guilin_attraction_reed_flute_cave_desc': 'A natural limestone cave with multicolored lighting, creating a stunning display of stalactites and stalagmites.',
      'guilin_attraction_reed_flute_cave_tips': 'Bring a light jacket as it can be cool inside the cave. Photography is allowed but tripods may not be permitted.',

      'guilin_attraction_elephant_trunk_hill': 'Elephant Trunk Hill',
      'guilin_attraction_elephant_trunk_hill_desc': 'A natural rock formation resembling an elephant drinking from the Li River, one of Guilin\'s most iconic landmarks.',
      'guilin_attraction_elephant_trunk_hill_tips': 'Best viewed from across the river. Visit during sunset for beautiful photography opportunities.',

      'yangshuo_description': 'Enjoy Yangshuo\'s stunning scenery, outdoor adventures, and vibrant West Street. Cycle through rice paddies and explore caves along the Yulong River.',

      // Yangshuo attractions
      'yangshuo_attraction_yulong_river': 'Yulong River',
      'yangshuo_attraction_yulong_river_desc': 'Known for bamboo rafting and picturesque scenery.',
      'yangshuo_attraction_yulong_river_tips': 'Early morning or late afternoon offers the best experience.',

      'yangshuo_attraction_west_street': 'West Street',
      'yangshuo_attraction_west_street_desc': 'The oldest street in Yangshuo, filled with shops, bars, and restaurants.',
      'yangshuo_attraction_west_street_tips': 'Great place for nightlife and souvenir shopping.',

      'zhangjiajie_description': 'Explore Zhangjiajie National Forest Park with its unique pillar-like formations that inspired the \'Avatar\' movie. Experience the breathtaking glass bridge and Tianmen Mountain.',

      // Zhangjiajie attractions
      'zhangjiajie_attraction_tianmen_mountain': 'Tianmen Mountain',
      'zhangjiajie_attraction_tianmen_mountain_desc': 'Famous for its natural arch (Heaven\'s Gate), cliff-hanging walkways, and the world\'s longest cable car ride.',
      'zhangjiajie_attraction_tianmen_mountain_tips': 'Wear comfortable shoes for the 999 steps to Heaven\'s Gate. Check weather forecasts as fog can obstruct views.',

      'zhangjiajie_attraction_golden_whip_stream': 'Golden Whip Stream',
      'zhangjiajie_attraction_golden_whip_stream_desc': 'A picturesque 7.5 km stream winding through Zhangjiajie National Forest Park, surrounded by towering peaks and lush vegetation.',
      'zhangjiajie_attraction_golden_whip_stream_tips': 'The trail is relatively flat and easy to walk. Allow 2-3 hours to enjoy the scenery and take photos. Watch for wild monkeys along the path.',

      'zhangjiajie_attraction_glass_bridge': 'Zhangjiajie Glass Bridge',
      'zhangjiajie_attraction_glass_bridge_desc': 'The world\'s highest and longest glass-bottomed bridge, suspended between two mountain cliffs in the Grand Canyon area.',
      'zhangjiajie_attraction_glass_bridge_tips': 'Visit on weekdays to avoid crowds. Special shoe covers are provided to protect the glass surface.',

      // Zhangjiajie food
      'zhangjiajie_food_sour_fish_soup': 'Sour Fish Soup',
      'zhangjiajie_food_sour_fish_soup_desc': 'A spicy and sour fish soup, a local specialty of the Tujia ethnic group.',

      'zhangjiajie_food_tujia_bacon': 'Tujia Bacon',
      'zhangjiajie_food_tujia_bacon_desc': 'Smoked pork belly, a traditional delicacy of the Tujia people.',

      'zhangjiajie_food_wild_mushroom_hotpot': 'Wild Mushroom Hotpot',
      'zhangjiajie_food_wild_mushroom_hotpot_desc': 'Hotpot featuring a variety of wild mushrooms from the surrounding mountains.',

      // Zhangjiajie guides
      'zhangjiajie_guide_3-day_zhangjiajie_highlights': '3-Day Zhangjiajie Highlights',

      // Zhangjiajie reviews
      'the scenery is out of this world! the glass bridge was both terrifying and amazing. highly recommend visiting in autumn.': 'The scenery is out of this world! The glass bridge was both terrifying and amazing. Highly recommend visiting in autumn.',
      'zhangjiajie is a must-see for nature lovers. the cable car ride up tianmen mountain is unforgettable.': 'Zhangjiajie is a must-see for nature lovers. The cable car ride up Tianmen Mountain is unforgettable.',

      // Yangshuo food
      'yangshuo_food_beer_fish': 'Beer Fish',
      'yangshuo_food_beer_fish_desc': 'Yangshuo\'s signature dish—fresh river fish cooked with local beer, vegetables, and spices.',

      'yangshuo_food_stuffed_li_river_snails': 'Stuffed Li River Snails',
      'yangshuo_food_stuffed_li_river_snails_desc': 'Snails stuffed with pork and spices, a unique local delicacy.',

      'yangshuo_food_guilin_rice_noodles': 'Guilin Rice Noodles',
      'yangshuo_food_guilin_rice_noodles_desc': 'Popular rice noodles served with various toppings and a savory broth.',

      // Yangshuo guides
      'yangshuo_guide_2-day_yangshuo_adventure': '2-Day Yangshuo Adventure',

      // Yangshuo reviews
      'yangshuo is a paradise for nature lovers! cycling along the yulong river was unforgettable. the beer fish is a must-try.': 'Yangshuo is a paradise for nature lovers! Cycling along the Yulong River was unforgettable. The Beer Fish is a must-try.',
      'the scenery is breathtaking and the town is very lively at night. highly recommend the river cruise.': 'The scenery is breathtaking and the town is very lively at night. Highly recommend the river cruise.',

      // Beijing food
      'beijing_food_peking_duck': 'Peking Duck',
      'beijing_food_peking_duck_desc': 'Beijing\'s signature dish - duck roasted to crisp perfection, served with thin pancakes, cucumber, spring onion and sweet bean sauce.',

      'beijing_food_zhajiangmian': 'Zhajiangmian',
      'beijing_food_zhajiangmian_desc': 'Fresh hand-pulled noodles topped with a savory sauce made from ground pork and fermented soybean paste.',

      'beijing_food_jianbing': 'Jianbing',
      'beijing_food_jianbing_desc': 'Popular breakfast street food - a crepe-like pancake filled with egg, crispy wonton, sauce, and herbs.',

      // Beijing guides
      'beijing_guide_3-day_beijing_highlights': '3-Day Beijing Highlights',
      'beijing_guide_beijing_culture_tour': 'Beijing Culture Tour',

      // Beijing reviews
      'beijing exceeded my expectations! the great wall was breathtaking, and the food was incredible. i highly recommend hiring a local guide for the forbidden city to fully appreciate its history.': 'Beijing exceeded my expectations! The Great Wall was breathtaking, and the food was incredible. I highly recommend hiring a local guide for the Forbidden City to fully appreciate its history.',
      'amazing historical sites but be prepared for crowds. the subway system is efficient and easy to navigate. don\'t miss the night market food stalls!': 'Amazing historical sites but be prepared for crowds. The subway system is efficient and easy to navigate. Don\'t miss the night market food stalls!',
      'visiting the great wall at mutianyu was the highlight of my trip. less crowded than badaling and the toboggan ride down was fun! beijing duck at da dong was outstanding.': 'Visiting the Great Wall at Mutianyu was the highlight of my trip. Less crowded than Badaling and the toboggan ride down was fun! Beijing duck at Da Dong was outstanding.',

      // Xi'an food
      'xian_food_roujiamo': 'Roujiamo',
      'xian_food_roujiamo_desc': 'Often called \'Chinese hamburger\' - flatbread filled with slow-cooked spiced meat (usually pork).',

      'xian_food_biangbiang_noodles': 'Biangbiang Noodles',
      'xian_food_biangbiang_noodles_desc': 'Extra wide, hand-pulled noodles topped with chili, vegetables and meat. The character for \'biang\' is one of the most complex Chinese characters.',

      'xian_food_yang_rou_pao_mo': 'Yang Rou Pao Mo',
      'xian_food_yang_rou_pao_mo_desc': 'Signature Xi\'an dish - flatbread soaked in mutton stew with vermicelli noodles and pickled garlic.',

      // Xi'an guides
      'xian_guide_2-day_xi\'an_essential_tour': '2-Day Xi\'an Essential Tour',
      'xian_guide_historical_xi\'an_tour': 'Historical Xi\'an Tour',

      // Xi'an reviews
      'the terracotta warriors are even more impressive in person! don\'t miss the muslim quarter for amazing food - the spiced lamb skewers and roujiamo were delicious.': 'The Terracotta Warriors are even more impressive in person! Don\'t miss the Muslim Quarter for amazing food - the spiced lamb skewers and Roujiamo were delicious.',
      'cycling on the city wall was a highlight of our china trip. visit the terracotta army early to avoid the worst of the crowds.': 'Cycling on the city wall was a highlight of our China trip. Visit the Terracotta Army early to avoid the worst of the crowds.',
      'as a chinese person from the south, xi\'an\'s food culture amazed me. the history is rich and the locals are very friendly. biangbiang noodles are a must-try!': 'As a Chinese person from the south, Xi\'an\'s food culture amazed me. The history is rich and the locals are very friendly. Biangbiang noodles are a must-try!',

      // Shanghai food
      'shanghai_food_xiaolongbao': 'Xiaolongbao',
      'shanghai_food_xiaolongbao_desc': 'Shanghai\'s famous soup dumplings filled with pork and flavorful broth.',

      'shanghai_food_shengjianbao': 'Shengjianbao',
      'shanghai_food_shengjianbao_desc': 'Pan-fried pork buns with crispy bottoms and juicy fillings.',

      'shanghai_food_hairy_crab': 'Hairy Crab',
      'shanghai_food_hairy_crab_desc': 'Seasonal delicacy (autumn) - steamed crab prized for its roe, eaten with vinegar and ginger.',

      // Shanghai guides
      'shanghai_guide_3-day_shanghai_experience': '3-Day Shanghai Experience',
      'shanghai_guide_art_&_culture_tour': 'Art & Culture Tour',

      // Shanghai reviews
      'shanghai is a perfect blend of old and new china. don\'t miss the view from the bund at night when all the pudong skyscrapers are lit up. the metro system is world-class and makes getting around easy.': 'Shanghai is a perfect blend of old and new China. Don\'t miss the view from the Bund at night when all the Pudong skyscrapers are lit up. The metro system is world-class and makes getting around easy.',
      'incredible city with amazing food! xiaolongbao at din tai fung was worth the wait. the contrast between ultra-modern pudong and traditional areas like yu garden is fascinating.': 'Incredible city with amazing food! Xiaolongbao at Din Tai Fung was worth the wait. The contrast between ultra-modern Pudong and traditional areas like Yu Garden is fascinating.',
      'as someone who visits shanghai regularly for business, i always discover something new. the food scene is constantly evolving. try the speakeasies in the former french concession for great cocktails.': 'As someone who visits Shanghai regularly for business, I always discover something new. The food scene is constantly evolving. Try the speakeasies in the Former French Concession for great cocktails.',

      // Qingdao food
      'qingdao_food_fresh_seafood': 'Fresh Seafood',
      'qingdao_food_fresh_seafood_desc': 'Clams, oysters, sea urchins and various fish prepared in local style - often simply steamed to preserve natural flavors.',

      'qingdao_food_tsingtao_beer': 'Tsingtao Beer',
      'qingdao_food_tsingtao_beer_desc': 'The city\'s famous beer, best enjoyed fresh from the source. Try dark and white beer varieties.',

      'qingdao_food_jiaozi': 'Jiaozi (Dumplings)',
      'qingdao_food_jiaozi_desc': 'Qingdao style dumplings often filled with seafood like mackerel or fresh vegetables.',

      // Qingdao guides
      'qingdao_guide_2-day_qingdao_coastal_tour': '2-Day Qingdao Coastal Tour',
      'qingdao_guide_nature_&_beach_tour': 'Nature & Beach Tour',

      // Qingdao reviews
      'qingdao is a hidden gem! the beaches are clean, the beer is excellent, and the german architecture gives the city a unique character. don\'t miss the seafood at pichaiyuan market.': 'Qingdao is a hidden gem! The beaches are clean, the beer is excellent, and the German architecture gives the city a unique character. Don\'t miss the seafood at Pichaiyuan market.',
      'perfect summer destination with great beaches and amazing food. the city is clean and well-organized. try the fresh seafood - it\'s some of the best in china!': 'Perfect summer destination with great beaches and amazing food. The city is clean and well-organized. Try the fresh seafood - it\'s some of the best in China!',
      'loved the mix of european and chinese influences. the badaguan area is beautiful for walking. tsingtao beer tastes even better at the source!': 'Loved the mix of European and Chinese influences. The Badaguan area is beautiful for walking. Tsingtao beer tastes even better at the source!',

      // Guilin food
      'guilin_food_guilin_rice_noodles': 'Guilin Rice Noodles',
      'guilin_food_guilin_rice_noodles_desc': 'Local specialty - rice noodles in broth topped with pickled vegetables, peanuts, and various meats.',

      'guilin_food_beer_fish': 'Beer Fish',
      'guilin_food_beer_fish_desc': 'Fresh river fish cooked with beer, tomatoes, pickled vegetables and chili - a signature Yangshuo dish.',

      'guilin_food_stuffed_li_river_snails': 'Stuffed Li River Snails',
      'guilin_food_stuffed_li_river_snails_desc': 'River snails filled with pork, garlic and spices - a distinctive local dish.',

      // Guilin guides
      'guilin_guide_3-day_guilin_&_yangshuo_highlights': '3-Day Guilin & Yangshuo Highlights',
      'guilin_guide_photography_tour': 'Photography Tour',

      // Guilin reviews
      'the landscape around guilin is simply magical! the li river cruise was worth every penny - it feels like sailing through a traditional chinese painting. don\'t miss the countryside around yangshuo as well.': 'The landscape around Guilin is simply magical! The Li River cruise was worth every penny - it feels like sailing through a traditional Chinese painting. Don\'t miss the countryside around Yangshuo as well.',
      'one of the most beautiful places i\'ve visited in china. the rice noodles are delicious and very cheap. i recommend renting a bicycle in yangshuo to explore the surrounding villages.': 'One of the most beautiful places I\'ve visited in China. The rice noodles are delicious and very cheap. I recommend renting a bicycle in Yangshuo to explore the surrounding villages.',
      'the natural scenery is outstanding, though guilin city itself is quite ordinary. the highlight was definitely the li river cruise and the beautiful villages around yangshuo.': 'The natural scenery is outstanding, though Guilin city itself is quite ordinary. The highlight was definitely the Li River cruise and the beautiful villages around Yangshuo.',

      // Henan food
      'henan_food_luoyang_water_banquet': 'Luoyang Water Banquet',
      'henan_food_luoyang_water_banquet_desc': 'A traditional feast featuring a variety of soups and dishes, known for its unique flavors.',

      // Henan guides
      'henan_guide_2-day_henan_highlights': '2-Day Henan Highlights',

      // Henan reviews
      'henan is a fascinating place with rich history and culture. the shaolin temple was a highlight of my trip!': 'Henan is a fascinating place with rich history and culture. The Shaolin Temple was a highlight of my trip!',

      // Translations for AboutPage
      'about_page_title': 'About TravelSpot',
      'about_page_subtitle': 'Explore the world, discover the meaning of travel. We are committed to providing you with the best travel experience.',
      'about_our_mission_title': 'Our Mission',
      'about_our_mission_text': 'Our mission is to connect people and cultures through meticulously planned travel experiences, inspire a spirit of exploration, and create unforgettable memories. We believe travel broadens horizons and enriches lives.',
      'about_our_story_title': 'Our Story',
      'about_our_story_text1': 'TravelSpot began with a group of adventurers passionate about travel. Understanding the complexities of travel planning, we decided to create a platform where everyone can easily discover and book the perfect journey. Starting with just a few destinations, we have grown into a trusted travel partner serving travelers worldwide.',
      'about_our_story_text2': 'We focus on unique destinations in China, committed to showcasing its rich culture, magnificent landscapes, and hospitable people.',
      'about_team_image_alt': 'Team or company scene',
      'about_why_choose_us_title': 'Why Choose Us?',
      'about_feature_curated_destinations_title': 'Curated Destinations',
      'about_feature_curated_destinations_text': 'We carefully select and curate every destination to ensure you have a unique and authentic experience.',
      'about_feature_expert_team_title': 'Expert Team',
      'about_feature_expert_team_text': 'Our experienced team of travel experts is always ready to provide you with personalized advice and support.',
      'about_feature_customer_first_title': 'Customer First',
      'about_feature_customer_first_text': 'Your satisfaction is our top priority. We are committed to providing excellent service that exceeds your expectations.',
      // Translations for ContactPage
      'contact_us_title': 'Contact Us',
      'contact_us_subtitle': 'Have any questions or suggestions? Feel free to contact us anytime!',
      'contact_methods_title': 'Contact Methods',
      'contact_email_label': 'Email',
      'contact_phone_label': 'Phone',
      'contact_address_label': 'Address',
      'contact_address_value': '88 Example Road, Chaoyang District, Beijing, China',
      'contact_online_message_title': 'Online Message',
      'contact_online_message_text': 'For quick feedback, please send an email or call us, and we will reply to you as soon as possible.',
      // Footer Translations
      'footer_description': "Discover the world's most breathtaking destinations with our expertly curated travel guides and resources.",
      'footer_destinations_title': 'Destinations',
      'footer_beaches': 'Beaches',
      'footer_mountains': 'Mountains',
      'footer_cities': 'Cities',
      'footer_quick_links_title': 'Quick Links',
      'footer_about_us': 'About Us',
      'footer_destinations_link': 'Destinations',
      'footer_travel_guides': 'Travel Guides',
      'footer_faqs': 'FAQs',
      'footer_privacy_policy': 'Privacy Policy',
      'footer_terms_of_service': 'Terms of Service',
      'footer_contact_us_title': 'Contact Us',
      'footer_contact': 'Contact',
      'footer_rights_reserved': 'All rights reserved.',
      'footer_privacy': 'Privacy',
      'footer_terms': 'Terms',
      'footer_sitemap': 'Sitemap',

      // Newsletter Translations
      'newsletter_title': 'Get Travel Inspiration',
      'newsletter_subtitle': 'Subscribe to our newsletter and receive exclusive deals, travel guides, and tips for your next adventure.',
      'newsletter_email_placeholder': 'Your email address',
      'newsletter_subscribe_button': 'Subscribe',
      'newsletter_privacy_notice': 'By subscribing, you agree to our Privacy Policy and consent to receive travel-related emails.',

      // Travel Guides Page Translations
      'travelguides_page_title': 'Travel Guides',
      'travelguides_page_subtitle': 'Discover expert tips and detailed itineraries for your next adventure',
      'travelguides_section_title': 'Explore Our Travel Guides',
      'travelguides_section_subtitle': 'Find inspiration and practical advice for your journey',
      'travelguides_read_guide_button': 'Read Guide',

      // Travel Guide Categories
      'travelguide_category_city': 'City Guide',
      'travelguide_category_photography': 'Photography Guide',
      'travelguide_category_food': 'Food Guide',
      'travelguide_category_outdoor': 'Outdoor Adventure',

      // Travel Guide Titles and Descriptions
      'travelguide_beijing_title': 'Beijing City Explorer',
      'travelguide_beijing_desc': 'A comprehensive guide to exploring Beijing\'s ancient wonders and modern attractions, with insider tips on avoiding crowds.',
      'travelguide_guilin_title': 'Guilin Photography Guide',
      'travelguide_guilin_desc': 'Capture the breathtaking karst landscapes of Guilin with our expert photography tips and best shooting locations.',
      'travelguide_xian_title': 'Xi\'an Food Explorer',
      'travelguide_xian_desc': 'Taste authentic Xi\'an cuisine, from Roujiamo to Yang Rou Pao Mo, discovering hidden culinary gems in the city\'s streets and alleys.',
      'travelguide_zhangjiajie_title': 'Zhangjiajie Hiking Adventure',
      'travelguide_zhangjiajie_desc': 'Navigate the stunning trails of Zhangjiajie National Forest Park with our detailed hiking routes and practical tips.',

      // FAQ Page Translations
      'faq_page_title': 'Frequently Asked Questions',
      'faq_page_subtitle': 'Find answers to your questions about travel bookings, itineraries, and more.',
      'faq_section_title': 'How can we help you?',
      'faq_q1': 'How to book a travel package?',
      'faq_a1': 'You can directly select your interested destination and package on our website and follow the prompts to complete the booking process. You can also contact our customer service team for assistance.',
      'faq_q2': 'Can I customize my itinerary?',
      'faq_a2': 'Yes, we offer customized travel services. Please contact our travel consultants with your needs and preferences, and we will tailor an exclusive itinerary for you.',
      'faq_q3': 'What payment methods do you accept?',
      'faq_a3': 'We accept multiple payment methods, including major credit cards (Visa, MasterCard, American Express), Alipay, and WeChat Pay. Please check the supported options on the payment page.',
      'faq_q4': 'What if I need to cancel my booking?',
      'faq_a4': 'Cancellation policies vary depending on the package and booking time. Please refer to the specific cancellation terms in your booking confirmation email or contact our customer service for details.',
      'faq_q5': 'Is insurance included in the travel package?',
      'faq_a5': 'Some travel packages may include basic travel insurance, but we strongly recommend purchasing additional comprehensive travel insurance based on your personal needs. Please consult customer service or check the package description for details.',
      'faq_q6': 'Do I need a visa to travel to China?',
      'faq_a6': 'Visa requirements depend on your nationality. Please check the official website of the Chinese embassy or consulate in your country or consult our visa service department for the latest information.'
    },
    'zh-CN': { // CORRECTED Simplified Chinese
      // Navigation Links
      'nav_home': '首页',
      'nav_destinations': '目的地',
      'nav_about': '关于我们',
      'nav_contact': '联系我们',

      // Common words
      'about': '关于',
      'tips': '小贴士',
      'top attractions in': '热门景点 - ',
      'what to eat in': '美食推荐 - ',
      'travel itineraries for': '旅行行程 - ',
      'local cuisine is an essential part of experiencing': '当地美食是体验',
      'here are some must-try dishes and where to find them:': '的重要部分。以下是一些必尝美食及其所在地：',

      // Navigation and UI elements
      'attractions': '景点',
      'food': '美食',
      'travel guides': '旅行指南',
      'reviews': '评论',
      'back to all destinations': '返回所有目的地',
      'plan your trip': '规划您的旅行',
      'day': '天',
      'traveler reviews': '旅行者评论',
      'practical information': '实用信息',
      'best time to visit': '最佳访问时间',
      'getting there': '如何到达',
      'local transportation': '当地交通',
      'travel tips': '旅行提示',

      // Hero Section Translations
      'hero_title': '发现您的下一次探险',
      'hero_subtitle': '探索令人惊叹的目的地，创造难忘的回忆。',
      'hero_search_placeholder': '搜索目的地（例如：北京、桂林）...',
      'hero_search_button': '搜索',

      // Terms of Service Page Translations
      'terms_page_title': '服务条款',
      'terms_page_subtitle': '在使用我们的服务前，请仔细阅读这些条款。',
      'terms_section1_title': '条款接受',
      'terms_section1_content': '通过访问或使用我们的服务，您同意受这些服务条款以及所有适用法律和法规的约束。如果您不同意这些条款中的任何一条，您将被禁止使用或访问本网站。',
      'terms_section2_title': '使用许可',
      'terms_section2_content': '允许临时下载TravelSpot上的材料的一份副本，仅供个人、非商业性的临时查看。这是授予许可，而非所有权转让，根据此许可，您不得修改或复制材料；将材料用于任何商业目的；试图反编译或逆向工程TravelSpot上包含的任何软件；从材料中删除任何版权或其他专有标记；或将材料转让给他人或在任何其他服务器上"镜像"材料。',
      'terms_section3_title': '免责声明',
      'terms_section3_content': 'TravelSpot上的材料按"原样"提供。TravelSpot不作任何明示或暗示的保证，并特此否认和否定所有其他保证，包括但不限于适销性、特定用途适用性或不侵犯知识产权或其他权利的暗示保证或条件。',
      'terms_section4_title': '责任限制',
      'terms_section4_content': '在任何情况下，TravelSpot或其供应商均不对因使用或无法使用TravelSpot上的材料而产生的任何损害（包括但不限于数据丢失或利润损失，或由于业务中断）负责，即使TravelSpot或TravelSpot授权代表已被口头或书面告知可能发生此类损害。',
      'terms_section5_title': '修订和勘误',
      'terms_section5_content': 'TravelSpot上出现的材料可能包含技术、排版或摄影错误。TravelSpot不保证其网站上的任何材料准确、完整或最新。TravelSpot可能随时更改其网站上包含的材料，恕不另行通知。',
      'terms_section6_title': '联系我们',
      'terms_section6_content': '如果您对这些服务条款有任何疑问，请通过{email}联系我们。',

      // Privacy Policy Page Translations
      'privacy_page_title': '隐私政策',
      'privacy_page_subtitle': '我们重视您的隐私并致力于保护您的个人信息。',
      'privacy_section1_title': '1. 我们收集的信息',
      'privacy_section1_content': '当您使用我们的服务时，我们可能会收集您的个人信息，例如您的姓名、电子邮件地址、电话号码、付款信息以及旅行偏好。我们还可能收集有关您如何使用我们网站的非个人信息，例如您的 IP 地址、浏览器类型和访问时间。',
      'privacy_section2_title': '2. 我们如何使用您的信息',
      'privacy_section2_content': '我们使用收集到的信息来提供和改进我们的服务，处理您的预订，与您沟通，个性化您的体验，以及用于营销目的（在您同意的情况下）。',
      'privacy_section3_title': '3. 信息共享与披露',
      'privacy_section3_content': '我们可能与第三方服务提供商（例如酒店、航空公司）共享您的信息，以完成您的预订。除非法律要求或为了保护我们的权利，否则我们不会将您的个人信息出售或出租给第三方。',
      'privacy_section4_title': '4. 数据安全',
      'privacy_section4_content': '我们采取合理的安全措施来保护您的个人信息免遭未经授权的访问、使用或泄露。但是，没有任何通过互联网传输或电子存储的方法是 100% 安全的。',
      'privacy_section5_title': '5. Cookie政策',
      'privacy_section5_content': '我们的网站使用 Cookie 来增强您的用户体验。Cookie 是存储在您设备上的小文本文件。您可以配置浏览器拒绝 Cookie，但这可能会影响您使用我们网站某些功能的体验。',
      'privacy_section6_title': '6. 您的权利',
      'privacy_section6_content': '您有权访问、更正或删除您的个人信息。您也可以反对或限制对您信息的处理。如需行使这些权利，请通过下面提供的联系方式与我们联系。',
      'privacy_section7_title': '7. 政策变更',
      'privacy_section7_content': '我们可能会不时更新本隐私政策。任何更改都将发布在此页面上，重大更改将通过电子邮件通知您。我们鼓励您定期查看本政策。',
      'privacy_section8_title': '8. 联系我们',
      'privacy_section8_content': '如果您对本隐私政策有任何疑问或疑虑，请通过{email}与我们联系。',

      // Category Section Translations
      'category_section_title': '按类别浏览',
      'category_section_subtitle': '根据您的兴趣找到完美的旅行。',
      'category_beaches': '海滩',
      'category_mountains': '山脉',
      'category_cities': '城市',
      'category_forests': '森林',
      'category_adventures': '探险',
      'category_destinations_count': '个目的地',

      'explore_destinations': '探索目的地',
      'discover_places': '发现世界各地的精彩景点',
      'featured_destinations_title': '精选目的地',
      'featured_destinations_subtitle': '探索我们精心挑选的世界各地令人惊叹的目的地',
      'testimonials_title': '旅行者怎么说',
      'testimonials_subtitle': '来自真实旅行者的真实体验',

      // Testimonial 1
      'testimonial_1_name': '赵磊',
      'testimonial_1_location': '中国',
      'testimonial_1_text': '通过这个平台预订张家界之旅真是太棒了！预订过程简单顺畅，推荐的行程和体验都很专业。玻璃桥和天门山的安排都很合理，空气清新，适合徒步。一定会再次使用这个平台！',

      // Testimonial 2
      'testimonial_2_name': '王伟',
      'testimonial_2_location': '中国',
      'testimonial_2_text': '西安旅游攻略非常全面，帮我发现了很多隐藏的美食宝藏。兵马俑和古城墙的行程安排很合理，回民街的小吃推荐特别棒。这里的本地美食指南真的很专业！',

      // Testimonial 3
      'testimonial_3_name': '张婷',
      'testimonial_3_location': '中国',
      'testimonial_3_text': '通过这个平台规划桂林家庭游省去了很多麻烦。漓江漂流和象鼻山的行程安排特别适合带孩子，服务也很贴心。山水风景如画，给全家人留下了美好的回忆。',
      'search_destinations': '搜索目的地...',
      'no_destinations': '未找到目的地',
      'try_changing': '尝试更改您的搜索或过滤条件',
      'all': '全部',
      'beaches': '海滩',
      'mountains': '山脉',
      'cities': '城市',
      'beijing': '北京',
      'henan': '河南',
      'xian': '西安',
      'forests': '森林',
      'adventures': '探险',
      'shanghai': '上海',
      'qingdao': '青岛',
      'guilin': '桂林',
      'yangshuo': '阳朔',
      'zhangjiajie': '张家界',
      'china': '中国',
      'english': '英文',
      'zh_simple': '简体中文',
      'zh_traditional': '繁体中文',
      'korean': '韩语',

      // Destinations page translations
      'destinations_page_title': '探索精彩目的地',
      'destinations_page_subtitle': '发现令人惊叹的地方，规划您的下一次冒险',
      'destinations_search_placeholder': '搜索目的地...',
      'destinations_not_found_title': '未找到目的地',
      'destinations_not_found_message': '尝试更改您的搜索或过滤条件',
      'explore destination': '探索目的地',

      // Destination descriptions
      'beijing_description': '探索北京，游览标志性的长城、紫禁城和天坛。体验中国首都丰富的历史文化，同时享用美味的中国菜。',
      'henan_description': '参观河南，中国文明的摇篮，亮点包括少林寺、龙门石窟和古都洛阳、开封。',

      // Beijing attractions
      'beijing_attraction_great_wall_of_china': '长城',
      'beijing_attraction_great_wall_of_china_desc': '作为世界上最具标志性的建筑之一，长城绵延超过13,000英里。北京附近的八达岭和慕田峪段是最受游客欢迎的部分。',
      'beijing_attraction_great_wall_of_china_tips': '清晨参观可避开人群。穿舒适的鞋子，因为需要大量行走和爬楼梯。',

      'beijing_attraction_forbidden_city': '紫禁城',
      'beijing_attraction_forbidden_city_desc': '这座曾经的中国明清两朝皇家宫殿，是一个庞大的建筑群，拥有980座建筑，占地180英亩。',
      'beijing_attraction_forbidden_city_tips': '提前在线购票。计划至少花3小时游览。有多种语言的语音导览可供使用。',

      'beijing_attraction_temple_of_heaven': '天坛',
      'beijing_attraction_temple_of_heaven_desc': '一组宗教建筑，明清两朝皇帝在此举行祈求丰收的仪式。',
      'beijing_attraction_temple_of_heaven_tips': '清晨参观可以看到当地人在周围的公园里练太极、跳舞和演奏传统乐器。',
      'xian_description': '探索西安，世界著名的兵马俑、古城墙和丰富的丝绸之路历史的所在地。享受正宗的陕西美食和充满活力的当地文化。',
      'shanghai_description': '参观上海，中国充满活力的现代大都市，拥有令人印象深刻的天际线、历史悠久的外滩和迷人的老街区。体验传统与现代中国的融合。',

      // Henan attractions
      'henan_attraction_shaolin_temple': '少林寺',
      'henan_attraction_shaolin_temple_desc': '以武术和禅宗佛教闻名，少林寺是对中国文化感兴趣的人必访之地。',
      'henan_attraction_shaolin_temple_tips': '早点参观可以避开人群，享受宁静的环境。',

      'henan_attraction_longmen_grottoes': '龙门石窟',
      'henan_attraction_longmen_grottoes_desc': '联合国教科文组织世界遗产，岩壁上雕刻着数千尊佛像和弟子像。',
      'henan_attraction_longmen_grottoes_tips': '穿舒适的鞋子，因为需要大量步行。',

      // Xi'an attractions
      'xian_attraction_terracotta_army': '兵马俑',
      'xian_attraction_terracotta_army_desc': '20世纪最伟大的考古发现之一 - 数千个真人大小的战士和马匹，为秦始皇在来世提供保护。',
      'xian_attraction_terracotta_army_tips': '请导游帮助理解您所看到的意义。最后参观一号坑，因为它最令人印象深刻。',

      'xian_attraction_xi\'an_city_wall': '西安城墙',
      'xian_attraction_xi\'an_city_wall_desc': '中国最完整的古城墙，提供自行车租赁服务，可以骑行整个14公里的周长。',
      'xian_attraction_xi\'an_city_wall_tips': '租一辆自行车环城墙骑行 - 以悠闲的速度大约需要2小时。',

      'xian_attraction_muslim_quarter': '回民街',
      'xian_attraction_muslim_quarter_desc': '历史悠久的街区，狭窄的巷道里布满了食品摊位、纪念品商店和大清真寺。',
      'xian_attraction_muslim_quarter_tips': '晚上参观最热闹。带着饥饿的胃来，尽可能多地尝试各种街头美食！',

      'xian_attraction_big_wild_goose_pagoda': '大雁塔',
      'xian_attraction_big_wild_goose_pagoda_desc': '西安著名的佛塔和地标，最初建于唐朝652年。',
      'xian_attraction_big_wild_goose_pagoda_tips': '塔前的广场在晚上有美丽的音乐喷泉表演。',

      // Shanghai attractions
      'shanghai_attraction_the_bund': '外滩',
      'shanghai_attraction_the_bund_desc': '著名的滨水区，一侧是殖民时期的建筑，另一侧是未来主义的浦东天际线。夜晚尤其美丽。',
      'shanghai_attraction_the_bund_tips': '白天和夜晚都值得参观，可以看到不同的景色。乘坐游船可以欣赏全景。',

      'shanghai_attraction_yu_garden': '豫园',
      'shanghai_attraction_yu_garden_desc': '明朝时期的传统中国园林，在老城区中心有亭台楼阁、假山和池塘。',
      'shanghai_attraction_yu_garden_tips': '可以结合附近的城隍庙和热闹的集市区一起游览，购物和品尝小吃。',

      'shanghai_attraction_shanghai_tower': '上海中心大厦',
      'shanghai_attraction_shanghai_tower_desc': '世界最高建筑之一，设有观景台，可欣赏城市的壮丽景色。',
      'shanghai_attraction_shanghai_tower_tips': '提前购票可避免排队。在晴朗的日子参观，能见度最佳。',
      'qingdao_description': '探索青岛，欣赏美丽的海滩、德国殖民时期的建筑和世界著名的啤酒。享受新鲜的海鲜和令人惊叹的海岸风光。',

      // Qingdao attractions
      'qingdao_attraction_badaguan_scenic_area': '八大关风景区',
      'qingdao_attraction_badaguan_scenic_area_desc': '历史悠久的区域，拥有独特的建筑、美丽的花园，以及以长城八大关命名的八条道路。',
      'qingdao_attraction_badaguan_scenic_area_tips': '春季花开或秋季叶变色时最适合参观。',

      'qingdao_attraction_tsingtao_brewery_museum': '青岛啤酒博物馆',
      'qingdao_attraction_tsingtao_brewery_museum_desc': '展示中国最著名啤酒历史的博物馆，由德国定居者于1903年创立。包括啤酒品尝。',
      'qingdao_attraction_tsingtao_brewery_museum_tips': '上午参观可避开人群。入场票包含啤酒样品。',

      'qingdao_attraction_no._1_bathing_beach': '第一海水浴场',
      'qingdao_attraction_no._1_bathing_beach_desc': '受欢迎的沙滩，水质清澈，可以看到标志性的栈桥。',
      'qingdao_attraction_no._1_bathing_beach_tips': '清晨是游泳的最佳时间，人少。请自带毛巾。',
      'guilin_description': '惊叹于桂林令人叹为观止的喀斯特地貌、如画的河流和茂密的乡村。乘坐漓江游船，体验传统的乡村生活。',

      // Guilin attractions
      'guilin_attraction_li_river_cruise': '漓江游船',
      'guilin_attraction_li_river_cruise_desc': '从桂林到阳朔的风景游船，提供喀斯特山脉、乡村村庄和渔民与鸬鹚的壮观景色。',
      'guilin_attraction_li_river_cruise_tips': '4-5小时的游船比较短的选择更好。坐在船的右侧可以获得最佳视角。',

      'guilin_attraction_reed_flute_cave': '芦笛岩',
      'guilin_attraction_reed_flute_cave_desc': '一个天然的石灰岩洞穴，配有多彩的灯光，创造出令人惊叹的钟乳石和石笋展示。',
      'guilin_attraction_reed_flute_cave_tips': '带一件轻便外套，因为洞内可能较凉。允许拍照，但可能不允许使用三脚架。',

      'guilin_attraction_elephant_trunk_hill': '象鼻山',
      'guilin_attraction_elephant_trunk_hill_desc': '一个形似大象从漓江饮水的天然岩石形态，是桂林最具标志性的地标之一。',
      'guilin_attraction_elephant_trunk_hill_tips': '最好从河对岸观赏。日落时分参观可获得美丽的摄影机会。',
      'yangshuo_description': '享受阳朔令人惊叹的风景、户外冒险和充满活力的西街。骑自行车穿越稻田，沿着遇龙河探索洞穴。',

      // Yangshuo attractions
      'yangshuo_attraction_yulong_river': '遇龙河',
      'yangshuo_attraction_yulong_river_desc': '以竹筏漂流和如画的风景而闻名。',
      'yangshuo_attraction_yulong_river_tips': '清晨或傍晚体验最佳。',

      'yangshuo_attraction_west_street': '西街',
      'yangshuo_attraction_west_street_desc': '阳朔最古老的街道，满是商店、酒吧和餐馆。',
      'yangshuo_attraction_west_street_tips': '夜生活和购买纪念品的好地方。',
      'zhangjiajie_description': '探索张家界国家森林公园，欣赏其独特的柱状地貌，这些地貌启发了《阿凡达》电影。体验令人惊叹的玻璃桥和天门山。',

      // Zhangjiajie attractions
      'zhangjiajie_attraction_tianmen_mountain': '天门山',
      'zhangjiajie_attraction_tianmen_mountain_desc': '以其自然拱门（天门）、悬崖栈道和世界上最长的索道而闻名。',
      'zhangjiajie_attraction_tianmen_mountain_tips': '穿舒适的鞋子攀登通往天门的999级台阶。查看天气预报，因为雾可能会遮挡视线。',

      'zhangjiajie_attraction_golden_whip_stream': '金鞭溪',
      'zhangjiajie_attraction_golden_whip_stream_desc': '一条风景如画的7.5公里长溪流，蜿蜒穿过张家界国家森林公园，周围是高耸的山峰和茂密的植被。',
      'zhangjiajie_attraction_golden_whip_stream_tips': '步道相对平坦，易于行走。留出2-3小时欣赏风景和拍照。注意路边的野生猴子。',

      'zhangjiajie_attraction_glass_bridge': '张家界玻璃桥',
      'zhangjiajie_attraction_glass_bridge_desc': '世界上最高最长的玻璃底桥，悬挂在大峡谷区域的两座山崖之间。',
      'zhangjiajie_attraction_glass_bridge_tips': '工作日参观可避开人群。提供特殊的鞋套以保护玻璃表面。',

      // Zhangjiajie food
      'zhangjiajie_food_sour_fish_soup': '酸鱼汤',
      'zhangjiajie_food_sour_fish_soup_desc': '一种辣而酸的鱼汤，是土家族的地方特色。',

      'zhangjiajie_food_tujia_bacon': '土家腊肉',
      'zhangjiajie_food_tujia_bacon_desc': '烟熏猪肉，土家族的传统美食。',

      'zhangjiajie_food_wild_mushroom_hotpot': '野生菌火锅',
      'zhangjiajie_food_wild_mushroom_hotpot_desc': '以周围山区的各种野生蘑菇为特色的火锅。',

      // Zhangjiajie guides
      'zhangjiajie_guide_3-day_zhangjiajie_highlights': '张家界3日精华游',

      // Zhangjiajie reviews
      'the scenery is out of this world! the glass bridge was both terrifying and amazing. highly recommend visiting in autumn.': '风景美得不像话！玻璃桥既令人恐惧又令人惊叹。强烈推荐秋季参观。',
      'zhangjiajie is a must-see for nature lovers. the cable car ride up tianmen mountain is unforgettable.': '张家界是自然爱好者必去之地。乘坐缆车上天门山的体验令人难忘。',

      // Yangshuo food
      'yangshuo_food_beer_fish': '啤酒鱼',
      'yangshuo_food_beer_fish_desc': '阳朔的招牌菜——新鲜的江鱼用当地啤酒、蔬菜和香料烹制。',

      'yangshuo_food_stuffed_li_river_snails': '漓江酿田螺',
      'yangshuo_food_stuffed_li_river_snails_desc': '用猪肉和香料酿制的田螺，是当地独特的美食。',

      'yangshuo_food_guilin_rice_noodles': '桂林米粉',
      'yangshuo_food_guilin_rice_noodles_desc': '受欢迎的米粉，配以各种配料和美味的汤底。',

      // Yangshuo guides
      'yangshuo_guide_2-day_yangshuo_adventure': '阳朔2日冒险之旅',

      // Yangshuo reviews
      'yangshuo is a paradise for nature lovers! cycling along the yulong river was unforgettable. the beer fish is a must-try.': '阳朔是自然爱好者的天堂！沿着遇龙河骑行的体验令人难忘。啤酒鱼是必尝的美食。',
      'the scenery is breathtaking and the town is very lively at night. highly recommend the river cruise.': '风景令人叹为观止，夜晚的小镇非常热闹。强烈推荐漓江游船。',

      // Beijing food
      'beijing_food_peking_duck': '北京烤鸭',
      'beijing_food_peking_duck_desc': '北京的招牌菜——烤至酥脆的鸭子，配以薄饼、黄瓜、葱和甜面酱。',

      'beijing_food_zhajiangmian': '炸酱面',
      'beijing_food_zhajiangmian_desc': '新鲜手工拉面，上面浇有用肉末和发酵豆瓣酱制成的美味酱汁。',

      'beijing_food_jianbing': '煎饼',
      'beijing_food_jianbing_desc': '受欢迎的早餐街头小吃——类似可丽饼的煎饼，内馅有鸡蛋、脆馄饨皮、酱料和香草。',

      // Beijing food where
      'da dong roast duck, quanjude': '大董烤鸭店、全聚德',
      'old beijing zhajiang noodle king, hai wan ju': '老北京炸酱面大王、海碗居',
      'street vendors around wangfujing area': '王府井地区的街头小贩',

      // Xi'an food where
      'laosunjia, muslim quarter food stalls': '老孙家、回民街小吃摊',
      'wei jia biangbiang mian, hi noodle': '魏家油泼扯面、嗨面馆',
      'lao sun jia, tong sheng xiang': '老孙家、同盛祥',

      // Shanghai food where
      'din tai fung, jia jia tang bao': '鼎泰丰、佳家汤包',
      'yang\'s fry dumplings, da hu chun': '小杨生煎、大壶春',
      'wang bao he, jardin de jade': '王宝和、苏浙汇',

      // Qingdao food where
      'pichaiyuan seafood market, dengzhou road': '劈柴院海鲜市场、登州路',
      'beer street (dengzhou road), tsingtao beer museum': '啤酒街（登州路）、青岛啤酒博物馆',
      'dianshi soup dumpling, tonghe xiaolong': '点石汤包、同和小笼',

      // Guilin & Yangshuo food where
      'local restaurants along west street': '西街沿线的当地餐馆',
      'farmhouse restaurants in the countryside': '乡村农家餐馆',
      'street vendors and noodle shops': '街头小贩和面馆',

      // Zhangjiajie food where
      'local restaurants near the park entrance': '公园入口附近的当地餐馆',
      'traditional tujia restaurants': '传统土家族餐馆',
      'hotpot restaurants in zhangjiajie city': '张家界市内的火锅餐馆',

      // Henan food where
      'local restaurants in luoyang': '洛阳当地餐馆',

      // Beijing guides
      'beijing_guide_3-day_beijing_highlights': '北京3日精华游',
      'beijing_guide_beijing_culture_tour': '北京文化之旅',

      // Beijing reviews
      'beijing exceeded my expectations! the great wall was breathtaking, and the food was incredible. i highly recommend hiring a local guide for the forbidden city to fully appreciate its history.': '北京超出了我的期望！长城令人叹为观止，食物也非常美味。我强烈建议为紫禁城雇佣当地导游，以充分了解其历史。',
      'amazing historical sites but be prepared for crowds. the subway system is efficient and easy to navigate. don\'t miss the night market food stalls!': '令人惊叹的历史遗迹，但要做好应对人群的准备。地铁系统高效且易于导航。不要错过夜市的美食摊位！',
      'visiting the great wall at mutianyu was the highlight of my trip. less crowded than badaling and the toboggan ride down was fun! beijing duck at da dong was outstanding.': '参观慕田峪长城是我旅行的亮点。比八达岭人少，滑道下山很有趣！大董的北京烤鸭非常出色。',

      // Xi'an food
      'xian_food_roujiamo': '肉夹馍',
      'xian_food_roujiamo_desc': '常被称为"中国汉堡"——饼夹慢炖的调味肉（通常是猪肉）。',

      'xian_food_biangbiang_noodles': '油泼扯面',
      'xian_food_biangbiang_noodles_desc': '超宽的手工拉面，上面浇有辣椒、蔬菜和肉。"biang"字是最复杂的汉字之一。',

      'xian_food_yang_rou_pao_mo': '羊肉泡馍',
      'xian_food_yang_rou_pao_mo_desc': '西安特色菜——饼泡在羊肉汤中，配以粉丝和腌制大蒜。',

      // Xi'an guides
      'xian_guide_2-day_xi\'an_essential_tour': '西安2日精华游',
      'xian_guide_historical_xi\'an_tour': '西安历史之旅',

      // Xi'an reviews
      'the terracotta warriors are even more impressive in person! don\'t miss the muslim quarter for amazing food - the spiced lamb skewers and roujiamo were delicious.': '兵马俑亲眼看更加令人印象深刻！不要错过回民街的美食——调味羊肉串和肉夹馍都很美味。',
      'cycling on the city wall was a highlight of our china trip. visit the terracotta army early to avoid the worst of the crowds.': '在城墙上骑自行车是我们中国之行的亮点。早点参观兵马俑可以避开最拥挤的人群。',
      'as a chinese person from the south, xi\'an\'s food culture amazed me. the history is rich and the locals are very friendly. biangbiang noodles are a must-try!': '作为一个南方人，西安的食物文化让我惊叹。这里历史丰富，当地人非常友好。油泼扯面是必尝的美食！',

      // Shanghai food
      'shanghai_food_xiaolongbao': '小笼包',
      'shanghai_food_xiaolongbao_desc': '上海著名的汤包，内馅是猪肉和美味的汤汁。',

      'shanghai_food_shengjianbao': '生煎包',
      'shanghai_food_shengjianbao_desc': '底部酥脆、内馅多汁的煎猪肉包。',

      'shanghai_food_hairy_crab': '大闸蟹',
      'shanghai_food_hairy_crab_desc': '季节性美食（秋季）——蒸制的螃蟹，以其蟹黄为珍品，配醋和姜食用。',

      // Shanghai guides
      'shanghai_guide_3-day_shanghai_experience': '上海3日体验',
      'shanghai_guide_art_&_culture_tour': '艺术与文化之旅',

      // Shanghai reviews
      'shanghai is a perfect blend of old and new china. don\'t miss the view from the bund at night when all the pudong skyscrapers are lit up. the metro system is world-class and makes getting around easy.': '上海是新旧中国的完美融合。不要错过夜晚从外滩看浦东摩天大楼亮灯的景色。地铁系统世界一流，让出行变得容易。',
      'incredible city with amazing food! xiaolongbao at din tai fung was worth the wait. the contrast between ultra-modern pudong and traditional areas like yu garden is fascinating.': '令人难以置信的城市，美食惊人！鼎泰丰的小笼包值得等待。超现代的浦东与豫园等传统区域之间的对比令人着迷。',
      'as someone who visits shanghai regularly for business, i always discover something new. the food scene is constantly evolving. try the speakeasies in the former french concession for great cocktails.': '作为经常因公务访问上海的人，我总能发现新事物。美食场景不断发展。尝试前法租界的隐藏酒吧，那里有很棒的鸡尾酒。',

      // Qingdao food
      'qingdao_food_fresh_seafood': '新鲜海鲜',
      'qingdao_food_fresh_seafood_desc': '蛤蜊、牡蛎、海胆和各种鱼类以当地风格烹制——通常简单蒸制以保留天然风味。',

      'qingdao_food_tsingtao_beer': '青岛啤酒',
      'qingdao_food_tsingtao_beer_desc': '这座城市著名的啤酒，最好在源头新鲜饮用。尝试黑啤和白啤品种。',

      'qingdao_food_jiaozi': '饺子',
      'qingdao_food_jiaozi_desc': '青岛风格的饺子通常填充鲭鱼等海鲜或新鲜蔬菜。',

      // Qingdao guides
      'qingdao_guide_2-day_qingdao_coastal_tour': '青岛2日海岸游',
      'qingdao_guide_nature_&_beach_tour': '自然与海滩之旅',

      // Qingdao reviews
      'qingdao is a hidden gem! the beaches are clean, the beer is excellent, and the german architecture gives the city a unique character. don\'t miss the seafood at pichaiyuan market.': '青岛是一个隐藏的宝石！海滩干净，啤酒优质，德国建筑赋予城市独特的特色。不要错过啤酒街海鲜市场的海鲜。',
      'perfect summer destination with great beaches and amazing food. the city is clean and well-organized. try the fresh seafood - it\'s some of the best in china!': '完美的夏季目的地，拥有美丽的海滩和美味的食物。城市干净且组织良好。尝试新鲜的海鲜——这是中国最好的海鲜之一！',
      'loved the mix of european and chinese influences. the badaguan area is beautiful for walking. tsingtao beer tastes even better at the source!': '喜欢欧洲和中国影响的混合。八大关地区非常适合散步。青岛啤酒在源头喝起来更美味！',

      // Guilin food
      'guilin_food_guilin_rice_noodles': '桂林米粉',
      'guilin_food_guilin_rice_noodles_desc': '当地特色——汤中的米粉，上面放有腌制蔬菜、花生和各种肉类。',

      'guilin_food_beer_fish': '啤酒鱼',
      'guilin_food_beer_fish_desc': '新鲜的江鱼用啤酒、番茄、腌制蔬菜和辣椒烹制——阳朔的招牌菜。',

      'guilin_food_stuffed_li_river_snails': '漓江酿田螺',
      'guilin_food_stuffed_li_river_snails_desc': '用猪肉、大蒜和香料填充的河螺——一道独特的当地菜。',

      // Guilin guides
      'guilin_guide_3-day_guilin_&_yangshuo_highlights': '桂林和阳朔3日精华游',
      'guilin_guide_photography_tour': '摄影之旅',

      // Guilin reviews
      'the landscape around guilin is simply magical! the li river cruise was worth every penny - it feels like sailing through a traditional chinese painting. don\'t miss the countryside around yangshuo as well.': '桂林周围的风景简直是魔幻！漓江游船值得每一分钱——感觉就像在传统中国画中航行。也不要错过阳朔周围的乡村。',
      'one of the most beautiful places i\'ve visited in china. the rice noodles are delicious and very cheap. i recommend renting a bicycle in yangshuo to explore the surrounding villages.': '这是我在中国参观过的最美丽的地方之一。米粉美味又便宜。我建议在阳朔租自行车探索周围的村庄。',
      'the natural scenery is outstanding, though guilin city itself is quite ordinary. the highlight was definitely the li river cruise and the beautiful villages around yangshuo.': '自然风景非常出色，尽管桂林市本身相当普通。亮点绝对是漓江游船和阳朔周围美丽的村庄。',

      // Henan food
      'henan_food_luoyang_water_banquet': '洛阳水席',
      'henan_food_luoyang_water_banquet_desc': '传统盛宴，以各种汤和菜肴为特色，以其独特的风味而闻名。',

      // Henan guides
      'henan_guide_2-day_henan_highlights': '河南2日精华游',

      // Henan reviews
      'henan is a fascinating place with rich history and culture. the shaolin temple was a highlight of my trip!': '河南是一个迷人的地方，拥有丰富的历史和文化。少林寺是我旅行的亮点！',

      // Travel Guide Titles
      '3-day beijing highlights': '北京3日精华游',
      'beijing culture tour': '北京文化之旅',
      '2-day xi\'an essential tour': '西安2日精华游',
      'historical xi\'an tour': '西安历史之旅',
      '3-day shanghai experience': '上海3日体验',
      'art & culture tour': '艺术与文化之旅',
      '2-day qingdao coastal tour': '青岛2日海岸游',
      'nature & beach tour': '自然与海滩之旅',
      '3-day guilin & yangshuo highlights': '桂林和阳朔3日精华游',
      'photography tour': '摄影之旅',
      '2-day yangshuo adventure': '阳朔2日冒险之旅',
      '3-day zhangjiajie highlights': '张家界3日精华游',
      '2-day henan highlights': '河南2日精华游',

      // Beijing Travel Guide Activities
      'tiananmen square → forbidden city → jingshan park → wangfujing street for dinner and shopping': '天安门广场 → 故宫 → 景山公园 → 王府井大街晚餐和购物',
      'great wall (mutianyu section) → olympic park → beijing national stadium (bird\'s nest) → water cube': '长城（慕田峪段）→ 奥林匹克公园 → 北京国家体育场（鸟巢）→ 水立方',
      'temple of heaven → summer palace → houhai lake area for evening relaxation': '天坛 → 颐和园 → 后海湖区晚间休闲',
      '798 art district → national museum of china → peking opera performance': '798艺术区 → 中国国家博物馆 → 京剧表演',
      'lama temple → confucius temple → hutong tour → kung fu show': '雍和宫 → 孔庙 → 胡同游 → 功夫表演',

      // Xi'an Travel Guide Activities
      'terracotta army → huaqing hot springs → tang dynasty show & dumpling dinner': '兵马俑 → 华清池 → 唐朝表演和饺子晚餐',
      'xi\'an city wall → bell tower → drum tower → muslim quarter → great mosque': '西安城墙 → 钟楼 → 鼓楼 → 回民街 → 大清真寺',
      'shaanxi history museum → small wild goose pagoda → xi\'an museum': '陕西历史博物馆 → 小雁塔 → 西安博物馆',

      // Shanghai Travel Guide Activities
      'the bund → nanjing road → people\'s square → shanghai museum': '外滩 → 南京路 → 人民广场 → 上海博物馆',
      'yu garden → city god temple → xintiandi → tianzifang': '豫园 → 城隍庙 → 新天地 → 田子坊',
      'shanghai tower → oriental pearl tower → shanghai disneyland or zhujiajiao water town': '上海中心大厦 → 东方明珠塔 → 上海迪士尼乐园或朱家角水乡',
      'power station of art → west bund art center → former french concession walking tour': '上海当代艺术博物馆 → 西岸艺术中心 → 前法租界步行游',

      // Qingdao Travel Guide Activities
      'zhanqiao pier → no. 1 bathing beach → badaguan scenic area → signal hill park (sunset view)': '栈桥 → 第一海水浴场 → 八大关风景区 → 信号山公园（日落景观）',
      'tsingtao beer museum → zhongshan park → st. michael\'s cathedral → beer street for dinner': '青岛啤酒博物馆 → 中山公园 → 圣弥厄尔大教堂 → 啤酒街晚餐',
      'laoshan mountain → shilaoren beach → polar ocean world': '崂山 → 石老人海滩 → 极地海洋世界',

      // Guilin Travel Guide Activities
      'elephant trunk hill → reed flute cave → seven star park → two rivers and four lakes night cruise': '象鼻山 → 芦笛岩 → 七星公园 → 两江四湖夜游',
      'li river cruise from guilin to yangshuo → west street exploration → yangshuo night show': '漓江游船（桂林至阳朔）→ 西街探索 → 阳朔夜间表演',
      'yulong river bamboo rafting → moon hill → bicycle tour of countryside → return to guilin': '遇龙河竹筏漂流 → 月亮山 → 乡村自行车游 → 返回桂林',
      'sunrise at xianggong mountain → xingping ancient town → nine horses fresco hill': '相公山日出 → 兴坪古镇 → 九马画山',

      // Yangshuo Travel Guide Activities
      'li river cruise → west street exploration → impression liu sanjie light show': '漓江游船 → 西街探索 → 印象刘三姐灯光秀',
      'yulong river cycling → moon hill hike → local countryside visit': '遇龙河骑行 → 月亮山徒步 → 当地乡村游览',

      // Zhangjiajie Travel Guide Activities
      'zhangjiajie national forest park → avatar hallelujah mountain → golden whip stream': '张家界国家森林公园 → 阿凡达哈利路亚山 → 金鞭溪',
      'glass bridge → zhangjiajie grand canyon → baofeng lake': '玻璃桥 → 张家界大峡谷 → 宝峰湖',
      'tianmen mountain → glass skywalk → explore zhangjiajie city': '天门山 → 玻璃栈道 → 探索张家界市',
      'golden whip stream → glass skywalk → explore zhangjiajie city': '金鞭溪 → 玻璃栈道 → 探索张家界市',

      // Zhangjiajie Practical Information (Exact matches)
      'september to november for clear skies and comfortable temperatures.': '9月至11月天空晴朗，温度舒适。',
      'zhangjiajie hehua international airport (dyg)': '张家界荷花国际机场（DYG）',
      'buses, taxis, and cable cars are the main ways to get around. many attractions are spread out, so plan your route in advance.': '巴士、出租车和缆车是主要的交通方式。许多景点分散各处，所以请提前规划路线。',
      'bring rain gear as weather can change quickly. some trails can be steep—wear good shoes.': '携带雨具，因为天气可能迅速变化。一些步道可能很陡峭——穿舒适的鞋子。',

      // Henan Travel Guide Activities
      'shaolin temple → longmen grottoes → luoyang old town': '少林寺 → 龙门石窟 → 洛阳古城',
      'kaifeng ancient city → iron pagoda → dragon pavilion': '开封古城 → 铁塔 → 龙亭',

      // Practical Information
      'spring (april-may) and autumn (september-october) offer the most pleasant weather. avoid national holidays when sites are extremely crowded.': '春季（4-5月）和秋季（9-10月）天气最宜人。避开景点极其拥挤的国家法定假日。',
      'beijing capital international airport (pek) and beijing daxing international airport (pkx)': '北京首都国际机场（PEK）和北京大兴国际机场（PKX）',
      'subway, buses, taxis, and bicycle rentals are all convenient options. the subway is particularly efficient and has english signage.': '地铁、公交车、出租车和自行车租赁都是便捷的选择。地铁特别高效，并有英文标识。',
      'consider purchasing a rechargeable transportation card for convenient access to subway and buses.': '考虑购买可充值的交通卡，方便乘坐地铁和公交车。',

      // Exact matches for Beijing page
      'spring (april-may) and autumn (september-october) offer the most pleasant weather.': '春季（4-5月）和秋季（9-10月）天气最宜人。',
      'avoid national holidays when sites are extremely crowded.': '避开景点极其拥挤的国家法定假日。',
      'beijing capital international airport (pek) and beijing daxing international airport (pkx)': '北京首都国际机场（PEK）和北京大兴国际机场（PKX）',
      'subway, buses, taxis, and bicycle rentals are all convenient options.': '地铁、公交车、出租车和自行车租赁都是便捷的选择。',
      'the subway is particularly efficient and has english signage.': '地铁特别高效，并有英文标识。',
      'consider purchasing a rechargeable transportation card for convenient access to subway and buses.': '考虑购买可充值的交通卡，方便乘坐地铁和公交车。',

      // Xi'an Practical Information
      'spring and autumn are ideal with mild temperatures. march to may and september to november are best.': '春季和秋季气温适中，最理想。3月至5月和9月至11月最佳。',
      'xi\'an xianyang international airport (xiy) connects to major cities. high-speed trains link xi\'an to beijing, shanghai, and other cities.': '西安咸阳国际机场（XIY）连接各大城市。高速列车将西安与北京、上海等城市相连。',
      'the city has an extensive bus network and a growing subway system. taxis are affordable.': '城市拥有广泛的公交网络和不断发展的地铁系统。出租车价格合理。',
      'the muslim quarter is best experienced at night. purchase a combination ticket for multiple terracotta warriors pits.': '回民街在夜间体验最佳。购买兵马俑多个坑的联票。',

      // Exact matches for Xi'an page
      'spring and autumn are ideal with mild temperatures.': '春季和秋季气温适中，最理想。',
      'march to may and september to november are best.': '3月至5月和9月至11月最佳。',
      'xi\'an xianyang international airport (xiy) connects to major cities.': '西安咸阳国际机场（XIY）连接各大城市。',
      'high-speed trains link xi\'an to beijing, shanghai, and other cities.': '高速列车将西安与北京、上海等城市相连。',
      'the city has an extensive bus network and a growing subway system.': '城市拥有广泛的公交网络和不断发展的地铁系统。',
      'taxis are affordable.': '出租车价格合理。',
      'the muslim quarter is best experienced at night.': '回民街在夜间体验最佳。',
      'purchase a combination ticket for multiple terracotta warriors pits.': '购买兵马俑多个坑的联票。',

      // Additional exact matches for Xi'an page
      'xi\'an xianyang international airport (xiy)': '西安咸阳国际机场（XIY）',

      // Additional exact matches for Shanghai page
      'spring (march-may) and autumn (september-november) offer mild temperatures. avoid summer for its high heat, humidity and occasional typhoons.': '春季（3-5月）和秋季（9-11月）气温温和。避开炎热、潮湿和偶有台风的夏季。',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha)': '上海浦东国际机场（PVG）和上海虹桥国际机场（SHA）',

      // Shanghai Practical Information
      'spring (march-may) and autumn (september-november) offer pleasant temperatures. avoid summer for its heat and humidity.': '春季（3-5月）和秋季（9-11月）气温宜人。避开炎热潮湿的夏季。',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha) serve domestic and international flights.': '上海浦东国际机场（PVG）和上海虹桥国际机场（SHA）提供国内和国际航班服务。',
      'the extensive metro system is the best way to navigate the city. taxis and didi (chinese uber) are also convenient.': '发达的地铁系统是游览城市的最佳方式。出租车和滴滴（中国的优步）也很方便。',
      'many attractions offer discounted tickets for evening visits. the shanghai metro app has english options and is very helpful.': '许多景点提供夜间参观的折扣票。上海地铁应用程序有英文选项，非常有用。',

      // Exact matches for Shanghai page
      'spring (march-may) and autumn (september-november) offer pleasant temperatures.': '春季（3-5月）和秋季（9-11月）气温宜人。',
      'avoid summer for its heat and humidity.': '避开炎热潮湿的夏季。',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha) serve domestic and international flights.': '上海浦东国际机场（PVG）和上海虹桥国际机场（SHA）提供国内和国际航班服务。',
      'the extensive metro system is the best way to navigate the city.': '发达的地铁系统是游览城市的最佳方式。',
      'taxis and didi (chinese uber) are also convenient.': '出租车和滴滴（中国的优步）也很方便。',
      'many attractions offer discounted tickets for evening visits.': '许多景点提供夜间参观的折扣票。',
      'the shanghai metro app has english options and is very helpful.': '上海地铁应用程序有英文选项，非常有用。',

      // Qingdao Practical Information
      'summer (june-august) is the peak season with warm temperatures perfect for beach activities. may and september offer pleasant weather with fewer crowds.': '夏季（6-8月）是气温温暖、适合海滩活动的旺季。5月和9月天气宜人，游客较少。',
      'qingdao liuting international airport (tao) connects to major chinese cities and some international destinations.': '青岛流亭国际机场（TAO）连接中国主要城市和一些国际目的地。',
      'buses and taxis are the main transportation options. the coastal areas are best explored on foot.': '公交车和出租车是主要的交通选择。沿海地区最好步行探索。',
      'try the fresh beer at the tsingtao brewery. seafood is best enjoyed at local markets rather than tourist restaurants.': '在青岛啤酒厂尝试新鲜啤酒。在当地市场而非旅游餐厅享用海鲜最佳。',

      // Exact matches for Qingdao page
      'may to october for beach activities. august for the international beer festival. avoid winter as it can be cold and windy.': '5月至10月适合海滩活动。8月有国际啤酒节。避开寒冷多风的冬季。',
      'qingdao liuting international airport (tao)': '青岛流亭国际机场（TAO）',
      'buses and taxis are the main transport options. the metro system is expanding but still limited.': '公交车和出租车是主要的交通选择。地铁系统正在扩建但仍有限。',
      'get a rechargeable transportation card for convenience on buses.': '购买可充值的交通卡，方便乘坐公交车。',

      // Guilin Practical Information
      'april to october is the best time to visit, with may to june being the rainy season which enhances the beauty of the karst mountains.': '4月至10月是最佳参观时间，5月至6月是雨季，雨季增强了喀斯特山脉的美丽。',
      'guilin liangjiang international airport (kwl) serves major chinese cities. trains connect guilin to major destinations.': '桂林两江国际机场（KWL）服务于中国主要城市。火车将桂林与主要目的地相连。',
      'buses and taxis are available in the city. boats are the main transportation for the li river.': '城市内有公交车和出租车。船是漓江的主要交通工具。',
      'book li river cruises in advance during peak season. yangshuo is worth staying overnight rather than as a day trip.': '旺季提前预订漓江游船。阳朔值得过夜，而不是作为一日游。',

      // Exact matches for Guilin page
      'april to october is the best time to visit, with may to june being the rainy season.': '4月至10月是最佳参观时间，5月至6月是雨季。',
      'the rain enhances the beauty of the karst mountains.': '雨水增强了喀斯特山脉的美丽。',
      'guilin liangjiang international airport (kwl) serves major chinese cities.': '桂林两江国际机场（KWL）服务于中国主要城市。',
      'trains connect guilin to major destinations.': '火车将桂林与主要目的地相连。',
      'buses and taxis are available in the city.': '城市内有公交车和出租车。',
      'boats are the main transportation for the li river.': '船是漓江的主要交通工具。',
      'book li river cruises in advance during peak season.': '旺季提前预订漓江游船。',
      'yangshuo is worth staying overnight rather than as a day trip.': '阳朔值得过夜，而不是作为一日游。',

      // Yangshuo Practical Information
      'april to october offers the best weather, though summer can be hot. spring and autumn are ideal for outdoor activities.': '4月至10月天气最佳，尽管夏季可能很热。春季和秋季是户外活动的理想时间。',
      'most visitors arrive via guilin. direct buses run from guilin airport and train station to yangshuo.': '大多数游客通过桂林到达。从桂林机场和火车站有直达阳朔的巴士。',
      'bicycles and electric scooters are popular for exploring the countryside. taxis and buses connect to nearby villages.': '自行车和电动摩托车是探索乡村的流行方式。出租车和公交车连接附近的村庄。',
      'negotiate prices for bamboo rafts and other activities. west street is touristy but comes alive at night.': '竹筏和其他活动要协商价格。西街很有旅游气息，但夜晚变得热闹。',

      // Exact matches for Yangshuo page
      'april to october offers the best weather, though summer can be hot.': '4月至10月天气最佳，尽管夏季可能很热。',
      'spring and autumn are ideal for outdoor activities.': '春季和秋季是户外活动的理想时间。',
      'most visitors arrive via guilin.': '大多数游客通过桂林到达。',
      'direct buses run from guilin airport and train station to yangshuo.': '从桂林机场和火车站有直达阳朔的巴士。',
      'bicycles and electric scooters are popular for exploring the countryside.': '自行车和电动摩托车是探索乡村的流行方式。',
      'taxis and buses connect to nearby villages.': '出租车和公交车连接附近的村庄。',
      'negotiate prices for bamboo rafts and other activities.': '竹筏和其他活动要协商价格。',
      'west street is touristy but comes alive at night.': '西街很有旅游气息，但夜晚变得热闹。',

      // Zhangjiajie Practical Information
      'april to october is ideal, with september and october offering the best views. avoid summer holidays when it\'s crowded.': '4月至10月是理想时间，9月和10月提供最佳景观。避开拥挤的暑假。',
      'zhangjiajie hehua airport (dyx) connects to major chinese cities. high-speed trains link to changsha, then transfer.': '张家界荷花机场（DYX）连接中国主要城市。高铁连接长沙，然后转乘。',
      'park shuttles connect major attractions within zhangjiajie national forest park. cable cars and elevators save hiking time.': '园内班车连接张家界国家森林公园内的主要景点。缆车和电梯节省徒步时间。',
      'plan at least 2-3 days for the national park. buy multi-day tickets for better value. wear comfortable hiking shoes.': '国家公园至少计划2-3天。购买多日票更划算。穿舒适的徒步鞋。',

      // Exact matches for Zhangjiajie page
      'april to october is ideal, with september and october offering the best views.': '4月至10月是理想时间，9月和10月提供最佳景观。',
      'avoid summer holidays when it\'s crowded.': '避开拥挤的暑假。',
      'zhangjiajie hehua airport (dyx) connects to major chinese cities.': '张家界荷花机场（DYX）连接中国主要城市。',
      'high-speed trains link to changsha, then transfer.': '高铁连接长沙，然后转乘。',
      'park shuttles connect major attractions within zhangjiajie national forest park.': '园内班车连接张家界国家森林公园内的主要景点。',
      'cable cars and elevators save hiking time.': '缆车和电梯节省徒步时间。',
      'plan at least 2-3 days for the national park.': '国家公园至少计划2-3天。',
      'buy multi-day tickets for better value.': '购买多日票更划算。',
      'wear comfortable hiking shoes.': '穿舒适的徒步鞋。',

      // Henan Practical Information
      'spring and autumn offer the most comfortable temperatures. avoid national holidays when sites like shaolin temple are crowded.': '春季和秋季气温最舒适。避开少林寺等景点拥挤的国家假日。',
      'zhengzhou xinzheng international airport (cgo) is the main gateway. high-speed trains connect henan to major cities.': '郑州新郑国际机场（CGO）是主要门户。高铁将河南与主要城市相连。',
      'trains and buses connect major cities within henan. taxis and ride-sharing services are available in cities.': '火车和公交车连接河南省内主要城市。城市内有出租车和共享乘车服务。',
      'plan separate days for shaolin temple and longmen grottoes as they are in different cities. luoyang water banquet requires advance booking.': '少林寺和龙门石窟在不同城市，需要分开安排。洛阳水席需提前预订。',

      // Additional exact matches for all destinations
      'april to october is ideal. april-may and september-october offer pleasant weather and good visibility. avoid the rainy season in june-august when flooding can occur.': '4月至10月是理想时间。4-5月和9-10月天气宜人，能见度好。避开6-8月可能发生洪水的雨季。',
      'guilin liangjiang international airport (kwl)': '桂林两江国际机场（KWL）',
      'buses and taxis in guilin city. bicycle, motorbike rental, or guided tours in yangshuo.': '桂林市内有公交车和出租车。阳朔有自行车、摩托车租赁或导游服务。',
      'consider taking the bus back from yangshuo to guilin instead of the boat to save time and money.': '考虑从阳朔乘坐巴士返回桂林，而不是乘船，以节省时间和金钱。',

      'april to october for pleasant weather and lush scenery.': '4月至10月天气宜人，景色葱郁。',
      'guilin liangjiang international airport (kwl), then bus or taxi to yangshuo': '桂林两江国际机场（KWL），然后乘坐巴士或出租车前往阳朔',
      'bicycles, scooters, taxis, and local buses are common. many attractions are best explored by bike.': '自行车、电动车、出租车和当地巴士很常见。许多景点最好骑自行车探索。',
      'book accommodation in advance during peak season. bring cash for small vendors.': '旺季提前预订住宿。为小商贩准备现金。',

      'spring (march-may) and autumn (september-november) for mild temperatures and less rain. winters are cold but less crowded.': '春季（3-5月）和秋季（9-11月）温度适中，雨水较少。冬季寒冷但游客较少。',
      'subway, buses, and taxis are plentiful. the subway connects major attractions and is easy to navigate.': '地铁、公交车和出租车很多。地铁连接主要景点，易于导航。',
      'use the subway to avoid traffic jams. line 2 connects the train station with the bell tower area.': '使用地铁避免交通堵塞。2号线连接火车站和钟楼区域。',

      'the metro is extensive, clean, efficient and has english signage. taxis are plentiful but may get stuck in traffic during peak hours.': '地铁网络广泛、干净、高效，并有英文标识。出租车很多，但高峰时段可能会堵车。',
      'use the maglev train from pudong airport for a fast ride into the city at speeds up to 430 km/h.': '从浦东机场乘坐磁悬浮列车，以高达430公里/小时的速度快速进入市区。',

      // Exact matches for Henan page
      'spring and autumn offer the most comfortable temperatures.': '春季和秋季气温最舒适。',
      'avoid national holidays when sites like shaolin temple are crowded.': '避开少林寺等景点拥挤的国家假日。',
      'zhengzhou xinzheng international airport (cgo) is the main gateway.': '郑州新郑国际机场（CGO）是主要门户。',
      'high-speed trains connect henan to major cities.': '高铁将河南与主要城市相连。',
      'trains and buses connect major cities within henan.': '火车和公交车连接河南省内主要城市。',
      'taxis and ride-sharing services are available in cities.': '城市内有出租车和共享乘车服务。',
      'plan separate days for shaolin temple and longmen grottoes as they are in different cities.': '少林寺和龙门石窟在不同城市，需要分开安排。',
      'luoyang water banquet requires advance booking.': '洛阳水席需提前预订。',

      // Additional exact matches for Henan page
      'spring and autumn offer the most pleasant weather.': '春季和秋季天气最宜人。',
      'zhengzhou xinzheng international airport (cgo)': '郑州新郑国际机场（CGO）',
      'buses, taxis, and trains are available for convenient travel.': '公交车、出租车和火车提供便捷的交通。',
      'consider hiring a local guide for a more in-depth experience.': '考虑雇佣当地导游以获得更深入的体验。',

      // Translations for AboutPage
      'about_page_title': '关于 TravelSpot',
      'about_page_subtitle': '探索世界，发现旅行的意义。我们致力于为您提供最佳的旅行体验。',
      'about_our_mission_title': '我们的使命',
      'about_our_mission_text': '我们的使命是通过精心策划的旅行体验，连接人与文化，激发探索精神，并创造难忘的回忆。我们相信旅行能够开阔视野，丰富人生。',
      'about_our_story_title': '我们的故事',
      'about_our_story_text1': 'TravelSpot 始于一群对旅行充满热情的探险家。我们深知旅行规划的复杂性，因此决定创建一个平台，让每个人都能轻松发现和预订完美的旅程。从最初的几个目的地开始，我们已发展成为一个值得信赖的旅行伙伴，为全球旅行者提供服务。',
      'about_our_story_text2': '我们专注于中国独特的旅游目的地，致力于展现其丰富的文化、壮丽的风景和热情好客的人民。',
      'about_team_image_alt': '团队或公司场景',
      'about_why_choose_us_title': '为什么选择我们？',
      'about_feature_curated_destinations_title': '精选目的地',
      'about_feature_curated_destinations_text': '我们精心挑选和策划每个目的地，确保为您带来独特而真实的体验。',
      'about_feature_expert_team_title': '专业团队',
      'about_feature_expert_team_text': '我们经验丰富的旅行专家团队随时准备为您提供个性化的建议和支持。',
      'about_feature_customer_first_title': '客户至上',
      'about_feature_customer_first_text': '您的满意是我们的首要任务。我们致力于提供卓越的服务，超越您的期望。',
      // Translations for ContactPage
      'contact_us_title': '联系我们',
      'contact_us_subtitle': '有任何问题或建议？欢迎随时与我们联系！',
      'contact_methods_title': '联系方式',
      'contact_email_label': '邮箱',
      'contact_phone_label': '电话',
      'contact_address_label': '地址',
      'contact_address_value': '中国北京市朝阳区示例路88号',
      'contact_online_message_title': '在线留言',
      'contact_online_message_text': '如需快速反馈，请发送邮件或拨打电话，我们会尽快回复您。',
      // Footer Translations
      'footer_description': '通过我们精心策划的旅游指南和资源，发现世界上最令人惊叹的目的地。',
      'footer_destinations_title': '目的地',
      'footer_beaches': '海滩',
      'footer_mountains': '山脉',
      'footer_cities': '城市',
      'footer_quick_links_title': '快速链接',
      'footer_about_us': '关于我们',
      'footer_destinations_link': '目的地',
      'footer_travel_guides': '旅行指南',
      'footer_faqs': '常见问题',
      'footer_privacy_policy': '隐私政策',
      'footer_terms_of_service': '服务条款',
      'footer_contact_us_title': '联系我们',
      'footer_contact': '联系方式',
      'footer_rights_reserved': '版权所有。',
      'footer_privacy': '隐私',
      'footer_terms': '条款', // Corrected from '항관'
      'footer_sitemap': '网站地图',

      // Newsletter Translations
      'newsletter_title': '获取旅行灵感',
      'newsletter_subtitle': '订阅我们的通讯，获取独家优惠、旅行指南和下一次冒险的提示。',
      'newsletter_email_placeholder': '您的电子邮箱地址',
      'newsletter_subscribe_button': '订阅',
      'newsletter_privacy_notice': '通过订阅，您同意我们的隐私政策并同意接收与旅行相关的电子邮件。',

      // Travel Guides Page Translations
      'travelguides_page_title': '旅行指南',
      'travelguides_page_subtitle': '发现专家提示和详细行程，规划您的下一次冒险',
      'travelguides_section_title': '探索我们的旅行指南',
      'travelguides_section_subtitle': '为您的旅程寻找灵感和实用建议',
      'travelguides_read_guide_button': '阅读指南',

      // Travel Guide Categories
      'travelguide_category_city': '城市指南',
      'travelguide_category_photography': '摄影指南',
      'travelguide_category_food': '美食指南',
      'travelguide_category_outdoor': '户外冒险',

      // Travel Guide Titles and Descriptions
      'travelguide_beijing_title': '北京城市探索者',
      'travelguide_beijing_desc': '全面探索北京古老奇迹和现代景点的指南，包含避开人群的内部提示。',
      'travelguide_guilin_title': '桂林摄影指南',
      'travelguide_guilin_desc': '通过我们的专业摄影技巧和最佳拍摄地点，捕捉桂林令人惊叹的喀斯特地貌。',
      'travelguide_xian_title': '西安美食探索之旅',
      'travelguide_xian_desc': '品尝西安地道美食，从肉夹馍到羊肉泡馍，发现隐藏在街头巷尾的美味。',
      'travelguide_zhangjiajie_title': '张家界徒步冒险',
      'travelguide_zhangjiajie_desc': '通过我们详细的徒步路线和实用提示，探索张家界国家森林公园的壮丽小径。',

      // FAQ Page Translations
      'faq_page_title': '常见问题解答',
      'faq_page_subtitle': '在这里找到您关于旅行预订、行程安排等问题的答案。',
      'faq_section_title': '我们能帮您什么？',
      'faq_q1': '如何预订旅行套餐？',
      'faq_a1': '您可以通过我们的网站直接选择您感兴趣的目的地和套餐，然后按照提示完成预订流程。您也可以联系我们的客服团队寻求帮助。',
      'faq_q2': '我可以自定义我的行程吗？',
      'faq_a2': '是的，我们提供定制化的旅行服务。请联系我们的旅行顾问，告知您的需求和偏好，我们将为您量身打造专属行程。',
      'faq_q3': '你们接受哪些付款方式？',
      'faq_a3': '我们接受多种付款方式，包括主要的信用卡（Visa, MasterCard, American Express）、支付宝和微信支付。请检查付款页面中的支持的选项。',
      'faq_q4': '如果我需要取消预订怎么办？',
      'faq_a4': '取消政策因套餐和预订时间而异。请查阅您预订确认邮件中的具体取消条款，或联系我们的客服了解详情。',
      'faq_q5': '旅行套餐中包含保险吗？',
      'faq_a5': '部分旅行套餐可能包含基础旅行保险，但我们强烈建议您根据个人需求购买额外的综合旅行保险。详情请咨询客服或查看套餐说明。',
      'faq_q6': '我需要签证才能前往中国吗？',
      'faq_a6': '签证要求取决于您的国籍。请查询中国驻您所在国家大使馆或领事馆的官方网站，或咨询我们的签证服务部门获取最新信息。'
    },
    'zh-TW': { // CORRECTED Traditional Chinese
      // Navigation Links
      'nav_home': '首頁',
      'nav_destinations': '目的地',
      'nav_about': '關於我們',
      'nav_contact': '聯絡我們',

      // Common words
      'about': '關於',
      'tips': '小提示',
      'top attractions in': '熱門景點 - ',
      'what to eat in': '美食推薦 - ',
      'travel itineraries for': '旅行行程 - ',
      'local cuisine is an essential part of experiencing': '當地美食是體驗',
      'here are some must-try dishes and where to find them:': '的重要部分。以下是一些必嚐美食及其所在地：',
      'where': '地點',

      // Navigation and UI elements
      'attractions': '景點',
      'food': '美食',
      'travel guides': '旅行指南',
      'reviews': '評論',
      'back to all destinations': '返回所有目的地',
      'plan your trip': '規劃您的旅行',
      'day': '天',
      'traveler reviews': '旅行者評論',
      'practical information': '實用信息',
      'best time to visit': '最佳訪問時間',
      'getting there': '如何到達',
      'local transportation': '當地交通',
      'travel tips': '旅行提示',

      // Hero Section Translations
      'hero_title': '發現您的下一次探險',
      'hero_subtitle': '探索令人驚嘆的目的地，創造難忘的回憶。',
      'hero_search_placeholder': '搜尋目的地（例如：北京、桂林）...',
      'hero_search_button': '搜尋',

      // Terms of Service Page Translations
      'terms_page_title': '服務條款',
      'terms_page_subtitle': '在使用我們的服務前，請仔細閱讀這些條款。',
      'terms_section1_title': '條款接受',
      'terms_section1_content': '通過訪問或使用我們的服務，您同意受這些服務條款以及所有適用法律和法規的約束。如果您不同意這些條款中的任何一條，您將被禁止使用或訪問本網站。',
      'terms_section2_title': '使用許可',
      'terms_section2_content': '允許臨時下載TravelSpot上的材料的一份副本，僅供個人、非商業性的臨時查看。這是授予許可，而非所有權轉讓，根據此許可，您不得修改或複製材料；將材料用於任何商業目的；試圖反編譯或逆向工程TravelSpot上包含的任何軟件；從材料中刪除任何版權或其他專有標記；或將材料轉讓給他人或在任何其他服務器上"鏡像"材料。',
      'terms_section3_title': '免責聲明',
      'terms_section3_content': 'TravelSpot上的材料按"原樣"提供。TravelSpot不作任何明示或暗示的保證，並特此否認和否定所有其他保證，包括但不限於適銷性、特定用途適用性或不侵犯知識產權或其他權利的暗示保證或條件。',
      'terms_section4_title': '責任限制',
      'terms_section4_content': '在任何情況下，TravelSpot或其供應商均不對因使用或無法使用TravelSpot上的材料而產生的任何損害（包括但不限於數據丟失或利潤損失，或由於業務中斷）負責，即使TravelSpot或TravelSpot授權代表已被口頭或書面告知可能發生此類損害。',
      'terms_section5_title': '修訂和勘誤',
      'terms_section5_content': 'TravelSpot上出現的材料可能包含技術、排版或攝影錯誤。TravelSpot不保證其網站上的任何材料準確、完整或最新。TravelSpot可能隨時更改其網站上包含的材料，恕不另行通知。',
      'terms_section6_title': '聯絡我們',
      'terms_section6_content': '如果您對這些服務條款有任何疑問，請通過{email}聯絡我們。',

      // Privacy Policy Page Translations
      'privacy_page_title': '隱私政策',
      'privacy_page_subtitle': '我們重視您的隱私並致力於保護您的個人信息。',
      'privacy_section1_title': '1. 我們收集的信息',
      'privacy_section1_content': '當您使用我們的服務時，我們可能會收集您的個人信息，例如您的姓名、電子郵件地址、電話號碼、付款信息以及旅行偏好。我們還可能收集有關您如何使用我們網站的非個人信息，例如您的 IP 地址、瀏覽器類型和訪問時間。',
      'privacy_section2_title': '2. 我們如何使用您的信息',
      'privacy_section2_content': '我們使用收集到的信息來提供和改進我們的服務，處理您的預訂，與您溝通，個性化您的體驗，以及用於營銷目的（在您同意的情況下）。',
      'privacy_section3_title': '3. 信息共享與披露',
      'privacy_section3_content': '我們可能與第三方服務提供商（例如酒店、航空公司）共享您的信息，以完成您的預訂。除非法律要求或為了保護我們的權利，否則我們不會將您的個人信息出售或出租給第三方。',
      'privacy_section4_title': '4. 數據安全',
      'privacy_section4_content': '我們採取合理的安全措施來保護您的個人信息免遭未經授權的訪問、使用或洩露。但是，沒有任何通過互聯網傳輸或電子存儲的方法是 100% 安全的。',
      'privacy_section5_title': '5. Cookie政策',
      'privacy_section5_content': '我們的網站使用 Cookie 來增強您的用戶體驗。Cookie 是存儲在您設備上的小文本文件。您可以配置瀏覽器拒絕 Cookie，但這可能會影響您使用我們網站某些功能的體驗。',
      'privacy_section6_title': '6. 您的權利',
      'privacy_section6_content': '您有權訪問、更正或刪除您的個人信息。您也可以反對或限制對您信息的處理。如需行使這些權利，請通過下面提供的聯絡方式與我們聯絡。',
      'privacy_section7_title': '7. 政策變更',
      'privacy_section7_content': '我們可能會不時更新本隱私政策。任何更改都將發布在此頁面上，重大更改將通過電子郵件通知您。我們鼓勵您定期查看本政策。',
      'privacy_section8_title': '8. 聯絡我們',
      'privacy_section8_content': '如果您對本隱私政策有任何疑問或疑慮，請通過{email}與我們聯絡。',

      // Category Section Translations
      'category_section_title': '按類別瀏覽',
      'category_section_subtitle': '根據您的興趣找到完美的旅行。',
      'category_beaches': '海灘',
      'category_mountains': '山脈',
      'category_cities': '城市',
      'category_forests': '森林',
      'category_adventures': '探險',
      'category_destinations_count': '個目的地',

      'explore_destinations': '探索目的地',
      'discover_places': '發現世界各地的精彩景點',
      'featured_destinations_title': '精選目的地',
      'featured_destinations_subtitle': '探索我們精心挑選的世界各地令人驚嘆的目的地',
      'testimonials_title': '旅行者怎麼說',
      'testimonials_subtitle': '來自真實旅行者的真實體驗',

      // Testimonial 1
      'testimonial_1_name': '趙磊',
      'testimonial_1_location': '中國',
      'testimonial_1_text': '通過這個平台預訂張家界之旅真是太棒了！預訂過程簡單順暢，推薦的行程和體驗都很專業。玻璃橋和天門山的安排都很合理，空氣清新，適合徒步。一定會再次使用這個平台！',

      // Testimonial 2
      'testimonial_2_name': '王偉',
      'testimonial_2_location': '中國',
      'testimonial_2_text': '西安旅遊攻略非常全面，幫我發現了很多隱藏的美食寶藏。兵馬俑和古城牆的行程安排很合理，回民街的小吃推薦特別棒。這裡的本地美食指南真的很專業！',

      // Testimonial 3
      'testimonial_3_name': '張婷',
      'testimonial_3_location': '中國',
      'testimonial_3_text': '通過這個平台規劃桂林家庭遊省去了很多麻煩。漓江漂流和象鼻山的行程安排特別適合帶孩子，服務也很貼心。山水風景如畫，給全家人留下了美好的回憶。',
      'search_destinations': '搜尋目的地...',
      'no_destinations': '未找到目的地',
      'try_changing': '嘗試更改您的搜尋或篩選條件',
      'all': '全部',
      'beaches': '海灘',
      'mountains': '山脈',
      'cities': '城市',
      'beijing': '北京',
      'henan': '河南',
      'xian': '西安',
      'forests': '森林',
      'adventures': '探險',
      'shanghai': '上海',
      'qingdao': '青島',
      'guilin': '桂林',
      'yangshuo': '陽朔',
      'zhangjiajie': '張家界',
      'china': '中國',
      'english': '英文',
      'zh_simple': '簡體中文', // Corrected from '中文字體'
      'zh_traditional': '繁體中文',
      'korean': '韓語',

      // Destinations page translations
      'destinations_page_title': '探索精彩目的地',
      'destinations_page_subtitle': '發現令人驚嘆的地方，規劃您的下一次冒險',
      'destinations_search_placeholder': '搜尋目的地...',
      'destinations_not_found_title': '未找到目的地',
      'destinations_not_found_message': '嘗試更改您的搜尋或篩選條件',
      'explore destination': '探索目的地',

      // Destination descriptions
      'beijing_description': '探索北京，遊覽標誌性的長城、紫禁城和天壇。體驗中國首都豐富的歷史文化，同時享用美味的中國菜。',
      'henan_description': '參觀河南，中國文明的搖籃，亮點包括少林寺、龍門石窟和古都洛陽、開封。',

      // Beijing attractions
      'beijing_attraction_great_wall_of_china': '長城',
      'beijing_attraction_great_wall_of_china_desc': '作為世界上最具標誌性的建築之一，長城綿延超過13,000英里。北京附近的八達嶺和慕田峪段是最受遊客歡迎的部分。',
      'beijing_attraction_great_wall_of_china_tips': '清晨參觀可避開人群。穿舒適的鞋子，因為需要大量行走和爬樓梯。',

      'beijing_attraction_forbidden_city': '紫禁城',
      'beijing_attraction_forbidden_city_desc': '這座曾經的中國明清兩朝皇家宮殿，是一個龐大的建築群，擁有980座建築，占地180英畝。',
      'beijing_attraction_forbidden_city_tips': '提前在線購票。計劃至少花3小時遊覽。有多種語言的語音導覽可供使用。',

      'beijing_attraction_temple_of_heaven': '天壇',
      'beijing_attraction_temple_of_heaven_desc': '一組宗教建築，明清兩朝皇帝在此舉行祈求豐收的儀式。',
      'beijing_attraction_temple_of_heaven_tips': '清晨參觀可以看到當地人在周圍的公園裡練太極、跳舞和演奏傳統樂器。',
      'xian_description': '探索西安，世界著名的兵馬俑、古城牆和豐富的絲綢之路歷史的所在地。享受正宗的陝西美食和充滿活力的當地文化。',
      'shanghai_description': '參觀上海，中國充滿活力的現代大都市，擁有令人印象深刻的天際線、歷史悠久的外灘和迷人的老街區。體驗傳統與現代中國的融合。',

      // Henan attractions
      'henan_attraction_shaolin_temple': '少林寺',
      'henan_attraction_shaolin_temple_desc': '以武術和禪宗佛教聞名，少林寺是對中國文化感興趣的人必訪之地。',
      'henan_attraction_shaolin_temple_tips': '早點參觀可以避開人群，享受寧靜的環境。',

      'henan_attraction_longmen_grottoes': '龍門石窟',
      'henan_attraction_longmen_grottoes_desc': '聯合國教科文組織世界遺產，岩壁上雕刻著數千尊佛像和弟子像。',
      'henan_attraction_longmen_grottoes_tips': '穿舒適的鞋子，因為需要大量步行。',

      // Xi'an attractions
      'xian_attraction_terracotta_army': '兵馬俑',
      'xian_attraction_terracotta_army_desc': '20世紀最偉大的考古發現之一 - 數千個真人大小的戰士和馬匹，為秦始皇在來世提供保護。',
      'xian_attraction_terracotta_army_tips': '請導遊幫助理解您所看到的意義。最後參觀一號坑，因為它最令人印象深刻。',

      'xian_attraction_xi\'an_city_wall': '西安城牆',
      'xian_attraction_xi\'an_city_wall_desc': '中國最完整的古城牆，提供自行車租賃服務，可以騎行整個14公里的周長。',
      'xian_attraction_xi\'an_city_wall_tips': '租一輛自行車環城牆騎行 - 以悠閒的速度大約需要2小時。',

      'xian_attraction_muslim_quarter': '回民街',
      'xian_attraction_muslim_quarter_desc': '歷史悠久的街區，狹窄的巷道裡布滿了食品攤位、紀念品商店和大清真寺。',
      'xian_attraction_muslim_quarter_tips': '晚上參觀最熱鬧。帶著飢餓的胃來，盡可能多地嘗試各種街頭美食！',

      'xian_attraction_big_wild_goose_pagoda': '大雁塔',
      'xian_attraction_big_wild_goose_pagoda_desc': '西安著名的佛塔和地標，最初建於唐朝652年。',
      'xian_attraction_big_wild_goose_pagoda_tips': '塔前的廣場在晚上有美麗的音樂噴泉表演。',

      // Shanghai attractions
      'shanghai_attraction_the_bund': '外灘',
      'shanghai_attraction_the_bund_desc': '著名的濱水區，一側是殖民時期的建築，另一側是未來主義的浦東天際線。夜晚尤其美麗。',
      'shanghai_attraction_the_bund_tips': '白天和夜晚都值得參觀，可以看到不同的景色。乘坐遊船可以欣賞全景。',

      'shanghai_attraction_yu_garden': '豫園',
      'shanghai_attraction_yu_garden_desc': '明朝時期的傳統中國園林，在老城區中心有亭台樓閣、假山和池塘。',
      'shanghai_attraction_yu_garden_tips': '可以結合附近的城隍廟和熱鬧的集市區一起遊覽，購物和品嚐小吃。',

      'shanghai_attraction_shanghai_tower': '上海中心大廈',
      'shanghai_attraction_shanghai_tower_desc': '世界最高建築之一，設有觀景台，可欣賞城市的壯麗景色。',
      'shanghai_attraction_shanghai_tower_tips': '提前購票可避免排隊。在晴朗的日子參觀，能見度最佳。',
      'qingdao_description': '探索青島，欣賞美麗的海灘、德國殖民時期的建築和世界著名的啤酒。享受新鮮的海鮮和令人驚嘆的海岸風光。',

      // Qingdao attractions
      'qingdao_attraction_badaguan_scenic_area': '八大關風景區',
      'qingdao_attraction_badaguan_scenic_area_desc': '歷史悠久的區域，擁有獨特的建築、美麗的花園，以及以長城八大關命名的八條道路。',
      'qingdao_attraction_badaguan_scenic_area_tips': '春季花開或秋季葉變色時最適合參觀。',

      'qingdao_attraction_tsingtao_brewery_museum': '青島啤酒博物館',
      'qingdao_attraction_tsingtao_brewery_museum_desc': '展示中國最著名啤酒歷史的博物館，由德國定居者於1903年創立。包括啤酒品嚐。',
      'qingdao_attraction_tsingtao_brewery_museum_tips': '上午參觀可避開人群。入場票包含啤酒樣品。',

      'qingdao_attraction_no._1_bathing_beach': '第一海水浴場',
      'qingdao_attraction_no._1_bathing_beach_desc': '受歡迎的沙灘，水質清澈，可以看到標誌性的棧橋。',
      'qingdao_attraction_no._1_bathing_beach_tips': '清晨是游泳的最佳時間，人少。請自帶毛巾。',
      'guilin_description': '驚嘆於桂林令人嘆為觀止的喀斯特地貌、如畫的河流和茂密的鄉村。乘坐漓江遊船，體驗傳統的鄉村生活。',

      // Guilin attractions
      'guilin_attraction_li_river_cruise': '漓江遊船',
      'guilin_attraction_li_river_cruise_desc': '從桂林到陽朔的風景遊船，提供喀斯特山脈、鄉村村莊和漁民與鸕鶿的壯觀景色。',
      'guilin_attraction_li_river_cruise_tips': '4-5小時的遊船比較短的選擇更好。坐在船的右側可以獲得最佳視角。',

      'guilin_attraction_reed_flute_cave': '蘆笛岩',
      'guilin_attraction_reed_flute_cave_desc': '一個天然的石灰岩洞穴，配有多彩的燈光，創造出令人驚嘆的鐘乳石和石筍展示。',
      'guilin_attraction_reed_flute_cave_tips': '帶一件輕便外套，因為洞內可能較涼。允許拍照，但可能不允許使用三腳架。',

      'guilin_attraction_elephant_trunk_hill': '象鼻山',
      'guilin_attraction_elephant_trunk_hill_desc': '一個形似大象從漓江飲水的天然岩石形態，是桂林最具標誌性的地標之一。',
      'guilin_attraction_elephant_trunk_hill_tips': '最好從河對岸觀賞。日落時分參觀可獲得美麗的攝影機會。',
      'yangshuo_description': '享受陽朔令人驚嘆的風景、戶外冒險和充滿活力的西街。騎自行車穿越稻田，沿著遇龍河探索洞穴。',

      // Yangshuo attractions
      'yangshuo_attraction_yulong_river': '遇龍河',
      'yangshuo_attraction_yulong_river_desc': '以竹筏漂流和如畫的風景而聞名。',
      'yangshuo_attraction_yulong_river_tips': '清晨或傍晚體驗最佳。',

      'yangshuo_attraction_west_street': '西街',
      'yangshuo_attraction_west_street_desc': '陽朔最古老的街道，滿是商店、酒吧和餐館。',
      'yangshuo_attraction_west_street_tips': '夜生活和購買紀念品的好地方。',
      'zhangjiajie_description': '探索張家界國家森林公園，欣賞其獨特的柱狀地貌，這些地貌啟發了《阿凡達》電影。體驗令人驚嘆的玻璃橋和天門山。',

      // Zhangjiajie attractions
      'zhangjiajie_attraction_tianmen_mountain': '天門山',
      'zhangjiajie_attraction_tianmen_mountain_desc': '以其自然拱門（天門）、懸崖棧道和世界上最長的索道而聞名。',
      'zhangjiajie_attraction_tianmen_mountain_tips': '穿舒適的鞋子攀登通往天門的999級台階。查看天氣預報，因為霧可能會遮擋視線。',

      'zhangjiajie_attraction_golden_whip_stream': '金鞭溪',
      'zhangjiajie_attraction_golden_whip_stream_desc': '一條風景如畫的7.5公里長溪流，蜿蜒穿過張家界國家森林公園，周圍是高聳的山峰和茂密的植被。',
      'zhangjiajie_attraction_golden_whip_stream_tips': '步道相對平坦，易於行走。留出2-3小時欣賞風景和拍照。注意路邊的野生猴子。',

      'zhangjiajie_attraction_glass_bridge': '張家界玻璃橋',
      'zhangjiajie_attraction_glass_bridge_desc': '世界上最高最長的玻璃底橋，懸掛在大峽谷區域的兩座山崖之間。',
      'zhangjiajie_attraction_glass_bridge_tips': '工作日參觀可避開人群。提供特殊的鞋套以保護玻璃表面。',

      // Zhangjiajie food
      'zhangjiajie_food_sour_fish_soup': '酸魚湯',
      'zhangjiajie_food_sour_fish_soup_desc': '一種辣而酸的魚湯，是土家族的地方特色。',

      'zhangjiajie_food_tujia_bacon': '土家臘肉',
      'zhangjiajie_food_tujia_bacon_desc': '煙熏豬肉，土家族的傳統美食。',

      'zhangjiajie_food_wild_mushroom_hotpot': '野生菌火鍋',
      'zhangjiajie_food_wild_mushroom_hotpot_desc': '以周圍山區的各種野生蘑菇為特色的火鍋。',

      // Zhangjiajie guides
      'zhangjiajie_guide_3-day_zhangjiajie_highlights': '張家界3日精華遊',

      // Zhangjiajie reviews
      'the scenery is out of this world! the glass bridge was both terrifying and amazing. highly recommend visiting in autumn.': '風景美得不像話！玻璃橋既令人恐懼又令人驚嘆。強烈推薦秋季參觀。',
      'zhangjiajie is a must-see for nature lovers. the cable car ride up tianmen mountain is unforgettable.': '張家界是自然愛好者必去之地。乘坐纜車上天門山的體驗令人難忘。',

      // Yangshuo food
      'yangshuo_food_beer_fish': '啤酒魚',
      'yangshuo_food_beer_fish_desc': '陽朔的招牌菜——新鮮的江魚用當地啤酒、蔬菜和香料烹製。',

      'yangshuo_food_stuffed_li_river_snails': '漓江釀田螺',
      'yangshuo_food_stuffed_li_river_snails_desc': '用豬肉和香料釀製的田螺，是當地獨特的美食。',

      'yangshuo_food_guilin_rice_noodles': '桂林米粉',
      'yangshuo_food_guilin_rice_noodles_desc': '受歡迎的米粉，配以各種配料和美味的湯底。',

      // Yangshuo guides
      'yangshuo_guide_2-day_yangshuo_adventure': '陽朔2日冒險之旅',

      // Yangshuo reviews
      'yangshuo is a paradise for nature lovers! cycling along the yulong river was unforgettable. the beer fish is a must-try.': '陽朔是自然愛好者的天堂！沿著遇龍河騎行的體驗令人難忘。啤酒魚是必嚐的美食。',
      'the scenery is breathtaking and the town is very lively at night. highly recommend the river cruise.': '風景令人嘆為觀止，夜晚的小鎮非常熱鬧。強烈推薦漓江遊船。',

      // Beijing food
      'beijing_food_peking_duck': '北京烤鴨',
      'beijing_food_peking_duck_desc': '北京的招牌菜——烤至酥脆的鴨子，配以薄餅、黃瓜、蔥和甜麵醬。',

      'beijing_food_zhajiangmian': '炸醬麵',
      'beijing_food_zhajiangmian_desc': '新鮮手工拉麵，上面澆有用肉末和發酵豆瓣醬製成的美味醬汁。',

      'beijing_food_jianbing': '煎餅',
      'beijing_food_jianbing_desc': '受歡迎的早餐街頭小吃——類似可麗餅的煎餅，內餡有雞蛋、脆餛飩皮、醬料和香草。',

      // Beijing food where
      'da dong roast duck, quanjude': '大董烤鴨店、全聚德',
      'old beijing zhajiang noodle king, hai wan ju': '老北京炸醬麵大王、海碗居',
      'street vendors around wangfujing area': '王府井地區的街頭小販',

      // Xi'an food where
      'laosunjia, muslim quarter food stalls': '老孫家、回民街小吃攤',
      'wei jia biangbiang mian, hi noodle': '魏家油潑扯麵、嗨麵館',
      'lao sun jia, tong sheng xiang': '老孫家、同盛祥',

      // Shanghai food where
      'din tai fung, jia jia tang bao': '鼎泰豐、佳家湯包',
      'yang\'s fry dumplings, da hu chun': '小楊生煎、大壺春',
      'wang bao he, jardin de jade': '王寶和、蘇浙匯',

      // Qingdao food where
      'pichaiyuan seafood market, dengzhou road': '劈柴院海鮮市場、登州路',
      'beer street (dengzhou road), tsingtao beer museum': '啤酒街（登州路）、青島啤酒博物館',
      'dianshi soup dumpling, tonghe xiaolong': '點石湯包、同和小籠',

      // Guilin & Yangshuo food where
      'local restaurants along west street': '西街沿線的當地餐館',
      'farmhouse restaurants in the countryside': '鄉村農家餐館',
      'street vendors and noodle shops': '街頭小販和麵館',

      // Zhangjiajie food where
      'local restaurants near the park entrance': '公園入口附近的當地餐館',
      'traditional tujia restaurants': '傳統土家族餐館',
      'hotpot restaurants in zhangjiajie city': '張家界市內的火鍋餐館',

      // Henan food where
      'local restaurants in luoyang': '洛陽當地餐館',

      // Beijing guides
      'beijing_guide_3-day_beijing_highlights': '北京3日精華遊',
      'beijing_guide_beijing_culture_tour': '北京文化之旅',

      // Beijing reviews
      'beijing exceeded my expectations! the great wall was breathtaking, and the food was incredible. i highly recommend hiring a local guide for the forbidden city to fully appreciate its history.': '北京超出了我的期望！長城令人嘆為觀止，食物也非常美味。我強烈建議為紫禁城僱傭當地導遊，以充分了解其歷史。',
      'amazing historical sites but be prepared for crowds. the subway system is efficient and easy to navigate. don\'t miss the night market food stalls!': '令人驚嘆的歷史遺跡，但要做好應對人群的準備。地鐵系統高效且易於導航。不要錯過夜市的美食攤位！',
      'visiting the great wall at mutianyu was the highlight of my trip. less crowded than badaling and the toboggan ride down was fun! beijing duck at da dong was outstanding.': '參觀慕田峪長城是我旅行的亮點。比八達嶺人少，滑道下山很有趣！大董的北京烤鴨非常出色。',

      // Xi'an food
      'xian_food_roujiamo': '肉夾饃',
      'xian_food_roujiamo_desc': '常被稱為"中國漢堡"——餅夾慢燉的調味肉（通常是豬肉）。',

      'xian_food_biangbiang_noodles': '油潑扯麵',
      'xian_food_biangbiang_noodles_desc': '超寬的手工拉麵，上面澆有辣椒、蔬菜和肉。"biang"字是最複雜的漢字之一。',

      'xian_food_yang_rou_pao_mo': '羊肉泡饃',
      'xian_food_yang_rou_pao_mo_desc': '西安特色菜——餅泡在羊肉湯中，配以粉絲和醃製大蒜。',

      // Xi'an guides
      'xian_guide_2-day_xi\'an_essential_tour': '西安2日精華遊',
      'xian_guide_historical_xi\'an_tour': '西安歷史之旅',

      // Xi'an reviews
      'the terracotta warriors are even more impressive in person! don\'t miss the muslim quarter for amazing food - the spiced lamb skewers and roujiamo were delicious.': '兵馬俑親眼看更加令人印象深刻！不要錯過回民街的美食——調味羊肉串和肉夾饃都很美味。',
      'cycling on the city wall was a highlight of our china trip. visit the terracotta army early to avoid the worst of the crowds.': '在城牆上騎自行車是我們中國之行的亮點。早點參觀兵馬俑可以避開最擁擠的人群。',
      'as a chinese person from the south, xi\'an\'s food culture amazed me. the history is rich and the locals are very friendly. biangbiang noodles are a must-try!': '作為一個南方人，西安的食物文化讓我驚嘆。這裡歷史豐富，當地人非常友好。油潑扯麵是必嚐的美食！',

      // Shanghai food
      'shanghai_food_xiaolongbao': '小籠包',
      'shanghai_food_xiaolongbao_desc': '上海著名的湯包，內餡是豬肉和美味的湯汁。',

      'shanghai_food_shengjianbao': '生煎包',
      'shanghai_food_shengjianbao_desc': '底部酥脆、內餡多汁的煎豬肉包。',

      'shanghai_food_hairy_crab': '大閘蟹',
      'shanghai_food_hairy_crab_desc': '季節性美食（秋季）——蒸製的螃蟹，以其蟹黃為珍品，配醋和薑食用。',

      // Shanghai guides
      'shanghai_guide_3-day_shanghai_experience': '上海3日體驗',
      'shanghai_guide_art_&_culture_tour': '藝術與文化之旅',

      // Shanghai reviews
      'shanghai is a perfect blend of old and new china. don\'t miss the view from the bund at night when all the pudong skyscrapers are lit up. the metro system is world-class and makes getting around easy.': '上海是新舊中國的完美融合。不要錯過夜晚從外灘看浦東摩天大樓亮燈的景色。地鐵系統世界一流，讓出行變得容易。',
      'incredible city with amazing food! xiaolongbao at din tai fung was worth the wait. the contrast between ultra-modern pudong and traditional areas like yu garden is fascinating.': '令人難以置信的城市，美食驚人！鼎泰豐的小籠包值得等待。超現代的浦東與豫園等傳統區域之間的對比令人著迷。',
      'as someone who visits shanghai regularly for business, i always discover something new. the food scene is constantly evolving. try the speakeasies in the former french concession for great cocktails.': '作為經常因公務訪問上海的人，我總能發現新事物。美食場景不斷發展。嘗試前法租界的隱藏酒吧，那裡有很棒的雞尾酒。',

      // Qingdao food
      'qingdao_food_fresh_seafood': '新鮮海鮮',
      'qingdao_food_fresh_seafood_desc': '蛤蜊、牡蠣、海膽和各種魚類以當地風格烹製——通常簡單蒸製以保留天然風味。',

      'qingdao_food_tsingtao_beer': '青島啤酒',
      'qingdao_food_tsingtao_beer_desc': '這座城市著名的啤酒，最好在源頭新鮮飲用。嘗試黑啤和白啤品種。',

      'qingdao_food_jiaozi': '餃子',
      'qingdao_food_jiaozi_desc': '青島風格的餃子通常填充鯖魚等海鮮或新鮮蔬菜。',

      // Qingdao guides
      'qingdao_guide_2-day_qingdao_coastal_tour': '青島2日海岸遊',
      'qingdao_guide_nature_&_beach_tour': '自然與海灘之旅',

      // Qingdao reviews
      'qingdao is a hidden gem! the beaches are clean, the beer is excellent, and the german architecture gives the city a unique character. don\'t miss the seafood at pichaiyuan market.': '青島是一個隱藏的寶石！海灘乾淨，啤酒優質，德國建築賦予城市獨特的特色。不要錯過啤酒街海鮮市場的海鮮。',
      'perfect summer destination with great beaches and amazing food. the city is clean and well-organized. try the fresh seafood - it\'s some of the best in china!': '完美的夏季目的地，擁有美麗的海灘和美味的食物。城市乾淨且組織良好。嘗試新鮮的海鮮——這是中國最好的海鮮之一！',
      'loved the mix of european and chinese influences. the badaguan area is beautiful for walking. tsingtao beer tastes even better at the source!': '喜歡歐洲和中國影響的混合。八大關地區非常適合散步。青島啤酒在源頭喝起來更美味！',

      // Guilin food
      'guilin_food_guilin_rice_noodles': '桂林米粉',
      'guilin_food_guilin_rice_noodles_desc': '當地特色——湯中的米粉，上面放有醃製蔬菜、花生和各種肉類。',

      'guilin_food_beer_fish': '啤酒魚',
      'guilin_food_beer_fish_desc': '新鮮的江魚用啤酒、番茄、醃製蔬菜和辣椒烹製——陽朔的招牌菜。',

      'guilin_food_stuffed_li_river_snails': '漓江釀田螺',
      'guilin_food_stuffed_li_river_snails_desc': '用豬肉、大蒜和香料填充的河螺——一道獨特的當地菜。',

      // Guilin guides
      'guilin_guide_3-day_guilin_&_yangshuo_highlights': '桂林和陽朔3日精華遊',
      'guilin_guide_photography_tour': '攝影之旅',

      // Guilin reviews
      'the landscape around guilin is simply magical! the li river cruise was worth every penny - it feels like sailing through a traditional chinese painting. don\'t miss the countryside around yangshuo as well.': '桂林周圍的風景簡直是魔幻！漓江遊船值得每一分錢——感覺就像在傳統中國畫中航行。也不要錯過陽朔周圍的鄉村。',
      'one of the most beautiful places i\'ve visited in china. the rice noodles are delicious and very cheap. i recommend renting a bicycle in yangshuo to explore the surrounding villages.': '這是我在中國參觀過的最美麗的地方之一。米粉美味又便宜。我建議在陽朔租自行車探索周圍的村莊。',
      'the natural scenery is outstanding, though guilin city itself is quite ordinary. the highlight was definitely the li river cruise and the beautiful villages around yangshuo.': '自然風景非常出色，儘管桂林市本身相當普通。亮點絕對是漓江遊船和陽朔周圍美麗的村莊。',

      // Henan food
      'henan_food_luoyang_water_banquet': '洛陽水席',
      'henan_food_luoyang_water_banquet_desc': '傳統盛宴，以各種湯和菜餚為特色，以其獨特的風味而聞名。',

      // Henan guides
      'henan_guide_2-day_henan_highlights': '河南2日精華遊',

      // Henan reviews
      'henan is a fascinating place with rich history and culture. the shaolin temple was a highlight of my trip!': '河南是一個迷人的地方，擁有豐富的歷史和文化。少林寺是我旅行的亮點！',

      // Travel Guide Titles
      '3-day beijing highlights': '北京3日精華遊',
      'beijing culture tour': '北京文化之旅',
      '2-day xi\'an essential tour': '西安2日精華遊',
      'historical xi\'an tour': '西安歷史之旅',
      '3-day shanghai experience': '上海3日體驗',
      'art & culture tour': '藝術與文化之旅',
      '2-day qingdao coastal tour': '青島2日海岸遊',
      'nature & beach tour': '自然與海灘之旅',
      '3-day guilin & yangshuo highlights': '桂林和陽朔3日精華遊',
      'photography tour': '攝影之旅',
      '2-day yangshuo adventure': '陽朔2日冒險之旅',
      '3-day zhangjiajie highlights': '張家界3日精華遊',
      '2-day henan highlights': '河南2日精華遊',

      // Beijing Travel Guide Activities
      'tiananmen square → forbidden city → jingshan park → wangfujing street for dinner and shopping': '天安門廣場 → 故宮 → 景山公園 → 王府井大街晚餐和購物',
      'great wall (mutianyu section) → olympic park → beijing national stadium (bird\'s nest) → water cube': '長城（慕田峪段）→ 奧林匹克公園 → 北京國家體育場（鳥巢）→ 水立方',
      'temple of heaven → summer palace → houhai lake area for evening relaxation': '天壇 → 頤和園 → 後海湖區晚間休閒',
      '798 art district → national museum of china → peking opera performance': '798藝術區 → 中國國家博物館 → 京劇表演',
      'lama temple → confucius temple → hutong tour → kung fu show': '雍和宮 → 孔廟 → 胡同遊 → 功夫表演',

      // Xi'an Travel Guide Activities
      'terracotta army → huaqing hot springs → tang dynasty show & dumpling dinner': '兵馬俑 → 華清池 → 唐朝表演和餃子晚餐',
      'xi\'an city wall → bell tower → drum tower → muslim quarter → great mosque': '西安城牆 → 鐘樓 → 鼓樓 → 回民街 → 大清真寺',
      'shaanxi history museum → small wild goose pagoda → xi\'an museum': '陝西歷史博物館 → 小雁塔 → 西安博物館',

      // Shanghai Travel Guide Activities
      'the bund → nanjing road → people\'s square → shanghai museum': '外灘 → 南京路 → 人民廣場 → 上海博物館',
      'yu garden → city god temple → xintiandi → tianzifang': '豫園 → 城隍廟 → 新天地 → 田子坊',
      'shanghai tower → oriental pearl tower → shanghai disneyland or zhujiajiao water town': '上海中心大廈 → 東方明珠塔 → 上海迪士尼樂園或朱家角水鄉',
      'power station of art → west bund art center → former french concession walking tour': '上海當代藝術博物館 → 西岸藝術中心 → 前法租界步行遊',

      // Qingdao Travel Guide Activities
      'zhanqiao pier → no. 1 bathing beach → badaguan scenic area → signal hill park (sunset view)': '棧橋 → 第一海水浴場 → 八大關風景區 → 信號山公園（日落景觀）',
      'tsingtao beer museum → zhongshan park → st. michael\'s cathedral → beer street for dinner': '青島啤酒博物館 → 中山公園 → 聖彌厄爾大教堂 → 啤酒街晚餐',
      'laoshan mountain → shilaoren beach → polar ocean world': '嶗山 → 石老人海灘 → 極地海洋世界',

      // Guilin Travel Guide Activities
      'elephant trunk hill → reed flute cave → seven star park → two rivers and four lakes night cruise': '象鼻山 → 蘆笛岩 → 七星公園 → 兩江四湖夜遊',
      'li river cruise from guilin to yangshuo → west street exploration → yangshuo night show': '漓江遊船（桂林至陽朔）→ 西街探索 → 陽朔夜間表演',
      'yulong river bamboo rafting → moon hill → bicycle tour of countryside → return to guilin': '遇龍河竹筏漂流 → 月亮山 → 鄉村自行車遊 → 返回桂林',
      'sunrise at xianggong mountain → xingping ancient town → nine horses fresco hill': '相公山日出 → 興坪古鎮 → 九馬畫山',

      // Yangshuo Travel Guide Activities
      'li river cruise → west street exploration → impression liu sanjie light show': '漓江遊船 → 西街探索 → 印象劉三姐燈光秀',
      'yulong river cycling → moon hill hike → local countryside visit': '遇龍河騎行 → 月亮山徒步 → 當地鄉村遊覽',

      // Zhangjiajie Travel Guide Activities
      'zhangjiajie national forest park → avatar hallelujah mountain → golden whip stream': '張家界國家森林公園 → 阿凡達哈利路亞山 → 金鞭溪',
      'glass bridge → zhangjiajie grand canyon → baofeng lake': '玻璃橋 → 張家界大峽谷 → 寶峰湖',
      'tianmen mountain → glass skywalk → explore zhangjiajie city': '天門山 → 玻璃棧道 → 探索張家界市',
      'golden whip stream → glass skywalk → explore zhangjiajie city': '金鞭溪 → 玻璃棧道 → 探索張家界市',

      // Zhangjiajie Practical Information (Exact matches)
      'september to november for clear skies and comfortable temperatures.': '9月至11月天空晴朗，溫度舒適。',
      'zhangjiajie hehua international airport (dyg)': '張家界荷花國際機場（DYG）',
      'buses, taxis, and cable cars are the main ways to get around. many attractions are spread out, so plan your route in advance.': '巴士、出租車和纜車是主要的交通方式。許多景點分散各處，所以請提前規劃路線。',
      'bring rain gear as weather can change quickly. some trails can be steep—wear good shoes.': '攜帶雨具，因為天氣可能迅速變化。一些步道可能很陡峭——穿舒適的鞋子。',

      // Henan Travel Guide Activities
      'shaolin temple → longmen grottoes → luoyang old town': '少林寺 → 龍門石窟 → 洛陽古城',
      'kaifeng ancient city → iron pagoda → dragon pavilion': '開封古城 → 鐵塔 → 龍亭',

      // Practical Information
      'spring (april-may) and autumn (september-october) offer the most pleasant weather. avoid national holidays when sites are extremely crowded.': '春季（4-5月）和秋季（9-10月）天氣最宜人。避開景點極其擁擠的國家法定假日。',
      'beijing capital international airport (pek) and beijing daxing international airport (pkx)': '北京首都國際機場（PEK）和北京大興國際機場（PKX）',
      'subway, buses, taxis, and bicycle rentals are all convenient options. the subway is particularly efficient and has english signage.': '地鐵、公交車、出租車和自行車租賃都是便捷的選擇。地鐵特別高效，並有英文標識。',
      'consider purchasing a rechargeable transportation card for convenient access to subway and buses.': '考慮購買可充值的交通卡，方便乘坐地鐵和公交車。',

      // Exact matches for Beijing page
      'spring (april-may) and autumn (september-october) offer the most pleasant weather.': '春季（4-5月）和秋季（9-10月）天氣最宜人。',
      'avoid national holidays when sites are extremely crowded.': '避開景點極其擁擠的國家法定假日。',
      'beijing capital international airport (pek) and beijing daxing international airport (pkx)': '北京首都國際機場（PEK）和北京大興國際機場（PKX）',
      'subway, buses, taxis, and bicycle rentals are all convenient options.': '地鐵、公交車、出租車和自行車租賃都是便捷的選擇。',
      'the subway is particularly efficient and has english signage.': '地鐵特別高效，並有英文標識。',
      'consider purchasing a rechargeable transportation card for convenient access to subway and buses.': '考慮購買可充值的交通卡，方便乘坐地鐵和公交車。',

      // Xi'an Practical Information
      'spring and autumn are ideal with mild temperatures. march to may and september to november are best.': '春季和秋季氣溫適中，最理想。3月至5月和9月至11月最佳。',
      'xi\'an xianyang international airport (xiy) connects to major cities. high-speed trains link xi\'an to beijing, shanghai, and other cities.': '西安咸陽國際機場（XIY）連接各大城市。高速列車將西安與北京、上海等城市相連。',
      'the city has an extensive bus network and a growing subway system. taxis are affordable.': '城市擁有廣泛的公交網絡和不斷發展的地鐵系統。出租車價格合理。',
      'the muslim quarter is best experienced at night. purchase a combination ticket for multiple terracotta warriors pits.': '回民街在夜間體驗最佳。購買兵馬俑多個坑的聯票。',

      // Exact matches for Xi'an page
      'spring and autumn are ideal with mild temperatures.': '春季和秋季氣溫適中，最理想。',
      'march to may and september to november are best.': '3月至5月和9月至11月最佳。',
      'xi\'an xianyang international airport (xiy) connects to major cities.': '西安咸陽國際機場（XIY）連接各大城市。',
      'high-speed trains link xi\'an to beijing, shanghai, and other cities.': '高速列車將西安與北京、上海等城市相連。',
      'the city has an extensive bus network and a growing subway system.': '城市擁有廣泛的公交網絡和不斷發展的地鐵系統。',
      'taxis are affordable.': '出租車價格合理。',
      'the muslim quarter is best experienced at night.': '回民街在夜間體驗最佳。',
      'purchase a combination ticket for multiple terracotta warriors pits.': '購買兵馬俑多個坑的聯票。',

      // Additional exact matches for Xi'an page
      'xi\'an xianyang international airport (xiy)': '西安咸陽國際機場（XIY）',

      // Additional exact matches for Shanghai page
      'spring (march-may) and autumn (september-november) offer mild temperatures. avoid summer for its high heat, humidity and occasional typhoons.': '春季（3-5月）和秋季（9-11月）氣溫溫和。避開炎熱、潮濕和偶有颱風的夏季。',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha)': '上海浦東國際機場（PVG）和上海虹橋國際機場（SHA）',

      // Shanghai Practical Information
      'spring (march-may) and autumn (september-november) offer pleasant temperatures. avoid summer for its heat and humidity.': '春季（3-5月）和秋季（9-11月）氣溫宜人。避開炎熱潮濕的夏季。',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha) serve domestic and international flights.': '上海浦東國際機場（PVG）和上海虹橋國際機場（SHA）提供國內和國際航班服務。',
      'the extensive metro system is the best way to navigate the city. taxis and didi (chinese uber) are also convenient.': '發達的地鐵系統是遊覽城市的最佳方式。出租車和滴滴（中國的優步）也很方便。',
      'many attractions offer discounted tickets for evening visits. the shanghai metro app has english options and is very helpful.': '許多景點提供夜間參觀的折扣票。上海地鐵應用程序有英文選項，非常有用。',

      // Exact matches for Shanghai page
      'spring (march-may) and autumn (september-november) offer pleasant temperatures.': '春季（3-5月）和秋季（9-11月）氣溫宜人。',
      'avoid summer for its heat and humidity.': '避開炎熱潮濕的夏季。',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha) serve domestic and international flights.': '上海浦東國際機場（PVG）和上海虹橋國際機場（SHA）提供國內和國際航班服務。',
      'the extensive metro system is the best way to navigate the city.': '發達的地鐵系統是遊覽城市的最佳方式。',
      'taxis and didi (chinese uber) are also convenient.': '出租車和滴滴（中國的優步）也很方便。',
      'many attractions offer discounted tickets for evening visits.': '許多景點提供夜間參觀的折扣票。',
      'the shanghai metro app has english options and is very helpful.': '上海地鐵應用程序有英文選項，非常有用。',

      // Qingdao Practical Information
      'summer (june-august) is the peak season with warm temperatures perfect for beach activities. may and september offer pleasant weather with fewer crowds.': '夏季（6-8月）是氣溫溫暖、適合海灘活動的旺季。5月和9月天氣宜人，遊客較少。',
      'qingdao liuting international airport (tao) connects to major chinese cities and some international destinations.': '青島流亭國際機場（TAO）連接中國主要城市和一些國際目的地。',
      'buses and taxis are the main transportation options. the coastal areas are best explored on foot.': '公交車和出租車是主要的交通選擇。沿海地區最好步行探索。',
      'try the fresh beer at the tsingtao brewery. seafood is best enjoyed at local markets rather than tourist restaurants.': '在青島啤酒廠嘗試新鮮啤酒。在當地市場而非旅遊餐廳享用海鮮最佳。',

      // Exact matches for Qingdao page
      'may to october for beach activities. august for the international beer festival. avoid winter as it can be cold and windy.': '5月至10月適合海灘活動。8月有國際啤酒節。避開寒冷多風的冬季。',
      'qingdao liuting international airport (tao)': '青島流亭國際機場（TAO）',
      'buses and taxis are the main transport options. the metro system is expanding but still limited.': '公交車和出租車是主要的交通選擇。地鐵系統正在擴建但仍有限。',
      'get a rechargeable transportation card for convenience on buses.': '購買可充值的交通卡，方便乘坐公交車。',

      // Guilin Practical Information
      'april to october is the best time to visit, with may to june being the rainy season which enhances the beauty of the karst mountains.': '4月至10月是最佳參觀時間，5月至6月是雨季，雨季增強了喀斯特山脈的美麗。',
      'guilin liangjiang international airport (kwl) serves major chinese cities. trains connect guilin to major destinations.': '桂林兩江國際機場（KWL）服務於中國主要城市。火車將桂林與主要目的地相連。',
      'buses and taxis are available in the city. boats are the main transportation for the li river.': '城市內有公交車和出租車。船是漓江的主要交通工具。',
      'book li river cruises in advance during peak season. yangshuo is worth staying overnight rather than as a day trip.': '旺季提前預訂漓江遊船。陽朔值得過夜，而不是作為一日遊。',

      // Exact matches for Guilin page
      'april to october is the best time to visit, with may to june being the rainy season.': '4月至10月是最佳參觀時間，5月至6月是雨季。',
      'the rain enhances the beauty of the karst mountains.': '雨水增強了喀斯特山脈的美麗。',
      'guilin liangjiang international airport (kwl) serves major chinese cities.': '桂林兩江國際機場（KWL）服務於中國主要城市。',
      'trains connect guilin to major destinations.': '火車將桂林與主要目的地相連。',
      'buses and taxis are available in the city.': '城市內有公交車和出租車。',
      'boats are the main transportation for the li river.': '船是漓江的主要交通工具。',
      'book li river cruises in advance during peak season.': '旺季提前預訂漓江遊船。',
      'yangshuo is worth staying overnight rather than as a day trip.': '陽朔值得過夜，而不是作為一日遊。',

      // Yangshuo Practical Information
      'april to october offers the best weather, though summer can be hot. spring and autumn are ideal for outdoor activities.': '4月至10月天氣最佳，儘管夏季可能很熱。春季和秋季是戶外活動的理想時間。',
      'most visitors arrive via guilin. direct buses run from guilin airport and train station to yangshuo.': '大多數遊客通過桂林到達。從桂林機場和火車站有直達陽朔的巴士。',
      'bicycles and electric scooters are popular for exploring the countryside. taxis and buses connect to nearby villages.': '自行車和電動摩托車是探索鄉村的流行方式。出租車和公交車連接附近的村莊。',
      'negotiate prices for bamboo rafts and other activities. west street is touristy but comes alive at night.': '竹筏和其他活動要協商價格。西街很有旅遊氣息，但夜晚變得熱鬧。',

      // Exact matches for Yangshuo page
      'april to october offers the best weather, though summer can be hot.': '4月至10月天氣最佳，儘管夏季可能很熱。',
      'spring and autumn are ideal for outdoor activities.': '春季和秋季是戶外活動的理想時間。',
      'most visitors arrive via guilin.': '大多數遊客通過桂林到達。',
      'direct buses run from guilin airport and train station to yangshuo.': '從桂林機場和火車站有直達陽朔的巴士。',
      'bicycles and electric scooters are popular for exploring the countryside.': '自行車和電動摩托車是探索鄉村的流行方式。',
      'taxis and buses connect to nearby villages.': '出租車和公交車連接附近的村莊。',
      'negotiate prices for bamboo rafts and other activities.': '竹筏和其他活動要協商價格。',
      'west street is touristy but comes alive at night.': '西街很有旅遊氣息，但夜晚變得熱鬧。',

      // Zhangjiajie Practical Information
      'april to october is ideal, with september and october offering the best views. avoid summer holidays when it\'s crowded.': '4月至10月是理想時間，9月和10月提供最佳景觀。避開擁擠的暑假。',
      'zhangjiajie hehua airport (dyx) connects to major chinese cities. high-speed trains link to changsha, then transfer.': '張家界荷花機場（DYX）連接中國主要城市。高鐵連接長沙，然後轉乘。',
      'park shuttles connect major attractions within zhangjiajie national forest park. cable cars and elevators save hiking time.': '園內班車連接張家界國家森林公園內的主要景點。纜車和電梯節省徒步時間。',
      'plan at least 2-3 days for the national park. buy multi-day tickets for better value. wear comfortable hiking shoes.': '國家公園至少計劃2-3天。購買多日票更劃算。穿舒適的徒步鞋。',

      // Exact matches for Zhangjiajie page
      'april to october is ideal, with september and october offering the best views.': '4月至10月是理想時間，9月和10月提供最佳景觀。',
      'avoid summer holidays when it\'s crowded.': '避開擁擠的暑假。',
      'zhangjiajie hehua airport (dyx) connects to major chinese cities.': '張家界荷花機場（DYX）連接中國主要城市。',
      'high-speed trains link to changsha, then transfer.': '高鐵連接長沙，然後轉乘。',
      'park shuttles connect major attractions within zhangjiajie national forest park.': '園內班車連接張家界國家森林公園內的主要景點。',
      'cable cars and elevators save hiking time.': '纜車和電梯節省徒步時間。',
      'plan at least 2-3 days for the national park.': '國家公園至少計劃2-3天。',
      'buy multi-day tickets for better value.': '購買多日票更劃算。',
      'wear comfortable hiking shoes.': '穿舒適的徒步鞋。',

      // Henan Practical Information
      'spring and autumn offer the most comfortable temperatures. avoid national holidays when sites like shaolin temple are crowded.': '春季和秋季氣溫最舒適。避開少林寺等景點擁擠的國家假日。',
      'zhengzhou xinzheng international airport (cgo) is the main gateway. high-speed trains connect henan to major cities.': '鄭州新鄭國際機場（CGO）是主要門戶。高鐵將河南與主要城市相連。',
      'trains and buses connect major cities within henan. taxis and ride-sharing services are available in cities.': '火車和公交車連接河南省內主要城市。城市內有出租車和共享乘車服務。',
      'plan separate days for shaolin temple and longmen grottoes as they are in different cities. luoyang water banquet requires advance booking.': '少林寺和龍門石窟在不同城市，需要分開安排。洛陽水席需提前預訂。',

      // Additional exact matches for all destinations
      'april to october is ideal. april-may and september-october offer pleasant weather and good visibility. avoid the rainy season in june-august when flooding can occur.': '4月至10月是理想時間。4-5月和9-10月天氣宜人，能見度好。避開6-8月可能發生洪水的雨季。',
      'guilin liangjiang international airport (kwl)': '桂林兩江國際機場（KWL）',
      'buses and taxis in guilin city. bicycle, motorbike rental, or guided tours in yangshuo.': '桂林市內有公交車和出租車。陽朔有自行車、摩托車租賃或導遊服務。',
      'consider taking the bus back from yangshuo to guilin instead of the boat to save time and money.': '考慮從陽朔乘坐巴士返回桂林，而不是乘船，以節省時間和金錢。',

      'april to october for pleasant weather and lush scenery.': '4月至10月天氣宜人，景色蔥鬱。',
      'guilin liangjiang international airport (kwl), then bus or taxi to yangshuo': '桂林兩江國際機場（KWL），然後乘坐巴士或出租車前往陽朔',
      'bicycles, scooters, taxis, and local buses are common. many attractions are best explored by bike.': '自行車、電動車、出租車和當地巴士很常見。許多景點最好騎自行車探索。',
      'book accommodation in advance during peak season. bring cash for small vendors.': '旺季提前預訂住宿。為小商販準備現金。',

      'spring (march-may) and autumn (september-november) for mild temperatures and less rain. winters are cold but less crowded.': '春季（3-5月）和秋季（9-11月）溫度適中，雨水較少。冬季寒冷但遊客較少。',
      'subway, buses, and taxis are plentiful. the subway connects major attractions and is easy to navigate.': '地鐵、公交車和出租車很多。地鐵連接主要景點，易於導航。',
      'use the subway to avoid traffic jams. line 2 connects the train station with the bell tower area.': '使用地鐵避免交通堵塞。2號線連接火車站和鐘樓區域。',

      'the metro is extensive, clean, efficient and has english signage. taxis are plentiful but may get stuck in traffic during peak hours.': '地鐵網絡廣泛、乾淨、高效，並有英文標識。出租車很多，但高峰時段可能會堵車。',
      'use the maglev train from pudong airport for a fast ride into the city at speeds up to 430 km/h.': '從浦東機場乘坐磁懸浮列車，以高達430公里/小時的速度快速進入市區。',

      // Exact matches for Henan page
      'spring and autumn offer the most comfortable temperatures.': '春季和秋季氣溫最舒適。',
      'avoid national holidays when sites like shaolin temple are crowded.': '避開少林寺等景點擁擠的國家假日。',
      'zhengzhou xinzheng international airport (cgo) is the main gateway.': '鄭州新鄭國際機場（CGO）是主要門戶。',
      'high-speed trains connect henan to major cities.': '高鐵將河南與主要城市相連。',
      'trains and buses connect major cities within henan.': '火車和公交車連接河南省內主要城市。',
      'taxis and ride-sharing services are available in cities.': '城市內有出租車和共享乘車服務。',
      'plan separate days for shaolin temple and longmen grottoes as they are in different cities.': '少林寺和龍門石窟在不同城市，需要分開安排。',
      'luoyang water banquet requires advance booking.': '洛陽水席需提前預訂。',

      // Additional exact matches for Henan page
      'spring and autumn offer the most pleasant weather.': '春季和秋季天氣最宜人。',
      'zhengzhou xinzheng international airport (cgo)': '鄭州新鄭國際機場（CGO）',
      'buses, taxis, and trains are available for convenient travel.': '公交車、出租車和火車提供便捷的交通。',
      'consider hiring a local guide for a more in-depth experience.': '考慮僱傭當地導遊以獲得更深入的體驗。',

      // Translations for AboutPage
      'about_page_title': '關於 TravelSpot',
      'about_page_subtitle': '探索世界，發現旅行的意義。我們致力於為您提供最佳的旅行體驗。',
      'about_our_mission_title': '我們的使命',
      'about_our_mission_text': '我們的使命是透過精心策劃的旅行體驗，連接人與文化，激發探索精神，並創造難忘的回憶。我們相信旅行能夠開闊視野，豐富人生。',
      'about_our_story_title': '我們的story',
      'about_our_story_text1': 'TravelSpot 是從一群充滿熱情的探險家開始的。我們深知旅行規劃的複雜性，因此決定創建一個平台，讓每個人都能輕鬆發現和預訂完美的旅程。從最初的幾個目的地開始，我們已發展成為一個值得信任的旅行同伴，為全球旅行者提供服務。',
      'about_our_story_text2': '我們專注於中國獨特的旅遊目的地，致力於展現其豐富的文化、壯麗的風景和熱情好客的人民。',
      'about_team_image_alt': '團隊或公司場景',
      'about_why_choose_us_title': '為什麼選擇我們？',
      'about_feature_curated_destinations_title': '精选目的地',
      'about_feature_curated_destinations_text': '我們jingpick和策劃每一個目的地，確保為您帶來獨特而真實的體驗。',
      'about_feature_expert_team_title': '專業團隊',
      'about_feature_expert_team_text': '我們經驗豐富的旅行專家團隊隨時準備為您提供個性化的建議和支持。',
      'about_feature_customer_first_title': '客戶至上',
      'about_feature_customer_first_text': '您的滿意是我們的首要任務。我們致力於提供卓越的服務，超越您的期望。',
      // Translations for ContactPage
      'contact_us_title': '聯絡我們',
      'contact_us_subtitle': '有任何問題或建議嗎？歡迎隨時與我們聯絡！',
      'contact_methods_title': '联系方式',
      'contact_email_label': '電子郵件',
      'contact_phone_label': '電話',
      'contact_address_label': '地址',
      'contact_address_value': '中國北京市朝陽區範例路88號', // Corrected from Korean address
      'contact_online_message_title': '線上訊息',
      'contact_online_message_text': '如需快速回覆，請發送電子郵件或致電給我們，我們將盡快回覆您。', // Corrected from Korean
      // Footer Translations
      'footer_description': '透過我們精心策劃的旅行指南和資源，發現世界上最令人驚嘆的目的地。',
      'footer_destinations_title': '目的地',
      'footer_beaches': '海灘',
      'footer_mountains': '山脈',
      'footer_cities': '城市',
      'footer_quick_links_title': '快速連結',
      'footer_about_us': '關於我們',
      'footer_destinations_link': '目的地',
      'footer_travel_guides': '旅行指南',
      'footer_faqs': '常見問題',
      'footer_privacy_policy': '隱私政策',
      'footer_terms_of_service': '服務條款',
      'footer_contact_us_title': '聯絡我們',
      'footer_contact': '聯絡方式',
      'footer_rights_reserved': '版權所有。',
      'footer_privacy': '隱私',
      'footer_terms': '條款', // Corrected from '항관'
      'footer_sitemap': '網站地圖',

      // Newsletter Translations
      'newsletter_title': '獲取旅行靈感',
      'newsletter_subtitle': '訂閱我們的通訊，獲取獨家優惠、旅行指南和下一次冒險的提示。',
      'newsletter_email_placeholder': '您的電子郵箱地址',
      'newsletter_subscribe_button': '訂閱',
      'newsletter_privacy_notice': '通過訂閱，您同意我們的隱私政策並同意接收與旅行相關的電子郵件。',

      // Travel Guides Page Translations
      'travelguides_page_title': '旅行指南',
      'travelguides_page_subtitle': '發現專家提示和詳細行程，規劃您的下一次冒險',
      'travelguides_section_title': '探索我們的旅行指南',
      'travelguides_section_subtitle': '為您的旅程尋找靈感和實用建議',
      'travelguides_read_guide_button': '閱讀指南',

      // Travel Guide Categories
      'travelguide_category_city': '城市指南',
      'travelguide_category_photography': '攝影指南',
      'travelguide_category_food': '美食指南',
      'travelguide_category_outdoor': '戶外冒險',

      // Travel Guide Titles and Descriptions
      'travelguide_beijing_title': '北京城市探索者',
      'travelguide_beijing_desc': '全面探索北京古老奇蹟和現代景點的指南，包含避開人群的內部提示。',
      'travelguide_guilin_title': '桂林攝影指南',
      'travelguide_guilin_desc': '通過我們的專業攝影技巧和最佳拍攝地點，捕捉桂林令人驚嘆的喀斯特地貌。',
      'travelguide_xian_title': '西安美食探索之旅',
      'travelguide_xian_desc': '品嚐西安地道美食，從肉夾饃到羊肉泡饃，發現隱藏在街頭巷尾的美味。',
      'travelguide_zhangjiajie_title': '張家界徒步冒險',
      'travelguide_zhangjiajie_desc': '通過我們詳細的徒步路線和實用提示，探索張家界國家森林公園的壯麗小徑。',

      // FAQ Page Translations
      'faq_page_title': '常見問題解答',
      'faq_page_subtitle': '在這裡找到您關於旅行預訂、行程安排等問題的答案。',
      'faq_section_title': '我們能幫您什麼？',
      'faq_q1': '如何預訂旅行套餐？',
      'faq_a1': '您可以透過我們的網站直接選擇您感興趣的目的地和套餐，然後按照提示完成預訂流程。您也可以聯絡我們的客服團隊尋求協助。',
      'faq_q2': '我可以自訂我的行程嗎？',
      'faq_a2': '是的，我們提供客製化的旅行服務。請聯絡我們的旅行顧問，告知您的需求和偏好，我們將為您量身打造專屬行程。',
      'faq_q3': '你們接受哪些付款方式？',
      'faq_a3': '我們接受多種付款方式，包括主要的信用卡（Visa, MasterCard, American Express）、支付寶和微信支付。具體請在付款頁面查看支援的選項。',
      'faq_q4': '如果我需要取消預訂怎麼辦？',
      'faq_a4': '取消政策因套餐和預訂時間而異。請查閱您預訂確認郵件中的具體取消條款，或聯絡我們的客服了解詳情。',
      'faq_q5': '旅行套餐中包含保險嗎？',
      'faq_a5': '部分旅行套餐可能包含基礎旅行保險，但我們強烈建議您根據個人需求購買額外的綜合旅行保險。詳情請諮詢客服或查看套餐說明。',
      'faq_q6': '我需要簽證才能前往中國嗎？',
      'faq_a6': '簽證要求取決於您的國籍。請查詢中國駐您所在國家大使館或領事館的官方網站，或諮詢我們的簽證服務部門獲取最新資訊。'
    },
    'ko': { // Korean translations (ensure this block is complete and correct in your file)
      // Navigation Links
      'nav_home': '홈',
      'nav_destinations': '목적지',
      'nav_about': '소개',
      'nav_contact': '문의하기',

      // Common words
      'about': '소개',
      'tips': '팁',
      'top attractions in': '주요 명소 - ',
      'what to eat in': '먹거리 - ',
      'travel itineraries for': '여행 일정 - ',
      'local cuisine is an essential part of experiencing': '현지 요리는',
      'here are some must-try dishes and where to find them:': '를 경험하는 데 필수적인 부분입니다. 다음은 꼭 맛봐야 할 요리와 그 위치입니다:',
      'where': '위치',

      // Navigation and UI elements
      'attractions': '명소',
      'food': '음식',
      'travel guides': '여행 가이드',
      'reviews': '리뷰',
      'back to all destinations': '모든 목적지로 돌아가기',
      'plan your trip': '여행 계획하기',
      'day': '일차',
      'traveler reviews': '여행자 리뷰',
      'practical information': '실용 정보',
      'best time to visit': '최적의 방문 시기',
      'getting there': '가는 방법',
      'local transportation': '현지 교통',
      'travel tips': '여행 팁',

      // Travel Guides Page Translations
      'travelguides_page_title': '여행 가이드',
      'travelguides_page_subtitle': '다음 모험을 위한 전문가 팁과 상세 일정을 발견하세요',
      'travelguides_section_title': '여행 가이드 탐색',
      'travelguides_section_subtitle': '여행을 위한 영감과 실용적인 조언을 찾아보세요',
      'travelguides_read_guide_button': '가이드 읽기',

      // Travel Guide Categories
      'travelguide_category_city': '도시 가이드',
      'travelguide_category_photography': '사진 가이드',
      'travelguide_category_food': '음식 가이드',
      'travelguide_category_outdoor': '야외 모험',

      // Travel Guide Titles and Descriptions
      'travelguide_beijing_title': '베이징 도시 탐험가',
      'travelguide_beijing_desc': '베이징의 고대 유적과 현대 명소를 탐험하는 종합 가이드로, 인파를 피하는 내부자 팁을 포함합니다.',
      'travelguide_guilin_title': '구이린 사진 가이드',
      'travelguide_guilin_desc': '전문 사진 기술과 최고의 촬영 장소로 구이린의 숨막히는 카르스트 지형을 포착하세요.',
      'travelguide_xian_title': '시안 음식 탐험',
      'travelguide_xian_desc': '로우지아모에서 양로우 파오모까지 시안의 정통 요리를 맛보고, 도시의 거리와 골목에 숨겨진 맛집을 발견하세요.',
      'travelguide_zhangjiajie_title': '장자제 하이킹 모험',
      'travelguide_zhangjiajie_desc': '상세한 하이킹 경로와 실용적인 팁으로 장자제 국립 산림 공원의 멋진 트레일을 탐험하세요.',

      // Hero Section Translations
      'hero_title': '다음 모험을 발견하세요',
      'hero_subtitle': '숨막히는 목적지를 탐험하고 잊을 수 없는 추억을 만드세요.',
      'hero_search_placeholder': '목적지 검색 (예: 베이징, 구이린)...',
      'hero_search_button': '검색',

      // Terms of Service Page Translations
      'terms_page_title': '서비스 약관',
      'terms_page_subtitle': '서비스를 이용하기 전에 이 약관을 주의 깊게 읽어주세요.',
      'terms_section1_title': '약관 수락',
      'terms_section1_content': '당사의 서비스에 접속하거나 이용함으로써, 귀하는 이 서비스 약관 및 모든 관련 법률과 규정에 구속되는 것에 동의합니다. 이 약관 중 어느 하나라도 동의하지 않는 경우, 이 사이트를 이용하거나 접속하는 것이 금지됩니다.',
      'terms_section2_title': '사용 라이선스',
      'terms_section2_content': 'TravelSpot의 자료를 개인적, 비상업적 일시적 보기 용도로만 일시적으로 한 부 다운로드할 수 있는 권한이 부여됩니다. 이는 소유권 이전이 아닌 라이선스 부여이며, 이 라이선스에 따라 귀하는 자료를 수정하거나 복사할 수 없습니다; 자료를 상업적 목적으로 사용할 수 없습니다; TravelSpot에 포함된 소프트웨어를 역컴파일하거나 역설계하려고 시도할 수 없습니다; 자료에서 저작권 또는 기타 소유권 표시를 제거할 수 없습니다; 또는 자료를 다른 사람에게 전송하거나 다른 서버에 "미러링"할 수 없습니다.',
      'terms_section3_title': '면책 조항',
      'terms_section3_content': 'TravelSpot의 자료는 "있는 그대로" 제공됩니다. TravelSpot은 명시적이든 묵시적이든 어떠한 보증도 하지 않으며, 상품성, 특정 목적에의 적합성, 또는 지적 재산권 또는 기타 권리 침해에 대한 묵시적 보증이나 조건을 포함하되 이에 국한되지 않는 모든 다른 보증을 부인하고 부정합니다.',
      'terms_section4_title': '책임 제한',
      'terms_section4_content': 'TravelSpot 또는 그 공급업체는 TravelSpot 또는 TravelSpot 공인 대표자가 그러한 손해의 가능성에 대해 구두 또는 서면으로 통보받았더라도, TravelSpot의 자료 사용 또는 사용 불능으로 인해 발생하는 어떠한 손해(데이터 손실 또는 이익 손실, 또는 사업 중단으로 인한 손해를 포함하되 이에 국한되지 않음)에 대해서도 책임을 지지 않습니다.',
      'terms_section5_title': '개정 및 정정',
      'terms_section5_content': 'TravelSpot에 나타나는 자료에는 기술적, 인쇄상, 또는 사진상의 오류가 포함될 수 있습니다. TravelSpot은 웹사이트의 자료가 정확하거나 완전하거나 최신 상태임을 보증하지 않습니다. TravelSpot은 언제든지 사전 통지 없이 웹사이트에 포함된 자료를 변경할 수 있습니다.',
      'terms_section6_title': '문의하기',
      'terms_section6_content': '이 서비스 약관에 대해 질문이 있으시면 {email}로 문의해 주세요.',

      // Privacy Policy Page Translations
      'privacy_page_title': '개인정보 보호정책',
      'privacy_page_subtitle': '당사는 귀하의 개인정보를 소중히 여기며 보호하기 위해 최선을 다하고 있습니다.',
      'privacy_section1_title': '1. 수집하는 정보',
      'privacy_section1_content': '당사 서비스를 이용할 때, 당사는 귀하의 이름, 이메일 주소, 전화번호, 결제 정보 및 여행 선호도와 같은 개인 정보를 수집할 수 있습니다. 또한 IP 주소, 브라우저 유형 및 접속 시간과 같이 귀하가 당사 웹사이트를 이용하는 방법에 관한 비개인 정보도 수집할 수 있습니다.',
      'privacy_section2_title': '2. 정보 사용 방법',
      'privacy_section2_content': '당사는 수집한 정보를 서비스 제공 및 개선, 예약 처리, 귀하와의 소통, 경험 개인화, 그리고 마케팅 목적(귀하의 동의 하에)으로 사용합니다.',
      'privacy_section3_title': '3. 정보 공유 및 공개',
      'privacy_section3_content': '당사는 귀하의 예약을 완료하기 위해 제3자 서비스 제공업체(호텔, 항공사 등)와 귀하의 정보를 공유할 수 있습니다. 법적 요구사항이 있거나 당사의 권리를 보호하기 위한 경우를 제외하고, 당사는 귀하의 개인 정보를 제3자에게 판매하거나 대여하지 않습니다.',
      'privacy_section4_title': '4. 데이터 보안',
      'privacy_section4_content': '당사는 귀하의 개인 정보를 무단 접근, 사용 또는 공개로부터 보호하기 위해 합리적인 보안 조치를 취합니다. 그러나 인터넷을 통한 전송이나 전자 저장 방법은 100% 안전하지 않습니다.',
      'privacy_section5_title': '5. 쿠키 정책',
      'privacy_section5_content': '당사 웹사이트는 사용자 경험을 향상시키기 위해 쿠키를 사용합니다. 쿠키는 귀하의 기기에 저장되는 작은 텍스트 파일입니다. 브라우저를 설정하여 쿠키를 거부할 수 있지만, 이는 당사 웹사이트의 특정 기능을 사용하는 경험에 영향을 미칠 수 있습니다.',
      'privacy_section6_title': '6. 귀하의 권리',
      'privacy_section6_content': '귀하는 개인 정보에 접근, 수정 또는 삭제할 권리가 있습니다. 또한 정보 처리에 반대하거나 제한할 수도 있습니다. 이러한 권리를 행사하려면 아래 제공된 연락처 정보를 통해 당사에 문의하십시오.',
      'privacy_section7_title': '7. 정책 변경',
      'privacy_section7_content': '당사는 이 개인정보 보호정책을 수시로 업데이트할 수 있습니다. 모든 변경 사항은 이 페이지에 게시되며, 중요한 변경 사항은 이메일을 통해 알려드립니다. 정기적으로 이 정책을 검토하시기 바랍니다.',
      'privacy_section8_title': '8. 문의하기',
      'privacy_section8_content': '이 개인정보 보호정책에 관한 질문이나 우려 사항이 있으시면 {email}로 문의해 주세요.',

      // Category Section Translations
      'category_section_title': '카테고리별로 탐색',
      'category_section_subtitle': '관심사에 따라 완벽한 여행을 찾아보세요.',
      'category_beaches': '해변',
      'category_mountains': '산',
      'category_cities': '도시',
      'category_forests': '숲',
      'category_adventures': '모험',
      'category_destinations_count': '개의 목적지',

      'explore_destinations': '목적지 탐색',
      'discover_places': '전 세계의 놀라운 장소 발견하기',
      'featured_destinations_title': '추천 목적지',
      'featured_destinations_subtitle': '세계 각지에서 엄선한 멋진 목적지를 탐험해보세요',
      'testimonials_title': '여행자들의 이야기',
      'testimonials_subtitle': '실제 여행자들의 진솔한 경험',

      // Testimonial 1
      'testimonial_1_name': '자오 레이',
      'testimonial_1_location': '중국',
      'testimonial_1_text': '이 플랫폼을 통해 장자제 여행을 예약한 것은 정말 멋졌습니다! 예약 과정이 간단하고 원활했으며, 추천된 일정과 체험은 모두 전문적이었습니다. 유리 다리와 톈먼산의 일정은 합리적이었고, 신선한 공기는 하이킹에 완벽했습니다. 이 플랫폼을 다시 사용할 것입니다!',

      // Testimonial 2
      'testimonial_2_name': '왕 웨이',
      'testimonial_2_location': '중국',
      'testimonial_2_text': '시안 여행 가이드는 매우 포괄적이어서 많은 숨겨진 음식 보물을 발견하는 데 도움이 되었습니다. 병마용과 고대 성벽의 일정은 합리적이었고, 무슬림 거리 음식 추천은 특히 좋았습니다. 이곳의 현지 음식 가이드는 정말 전문적입니다!',

      // Testimonial 3
      'testimonial_3_name': '장 팅',
      'testimonial_3_location': '중국',
      'testimonial_3_text': '이 플랫폼을 통해 구이린 가족 여행을 계획하면서 많은 번거로움을 덜었습니다. 리강 크루즈와 코끼리 코 언덕 일정은 아이들과 함께하기에 특히 적합했고, 서비스도 매우 세심했습니다. 풍경은 그림 같았고, 온 가족에게 아름다운 추억을 남겼습니다.',
      'search_destinations': '목적지 검색...',
      'no_destinations': '목적지를 찾을 수 없습니다',
      'try_changing': '검색 또는 필터 기준을 변경해 보세요',
      'all': '전체',
      'beaches': '해변',
      'mountains': '산',
      'cities': '도시',
      'beijing': '베이징',
      'henan': '허난',
      'xian': '시안',
      'forests': '숲',
      'adventures': '모험',
      'shanghai': '상하이',
      'qingdao': '칭다오',
      'guilin': '구이린',
      'yangshuo': '양쑤오',
      'zhangjiajie': '장자제',
      'china': '중국',
      'english': '영어',
      'zh_simple': '중국어 간체',
      'zh_traditional': '중국어 번체',
      'korean': '한국어',

      // Destinations page translations
      'destinations_page_title': '놀라운 목적지 탐색',
      'destinations_page_subtitle': '숨막히는 장소를 발견하고 다음 모험을 계획하세요',
      'destinations_search_placeholder': '목적지 검색...',
      'destinations_not_found_title': '목적지를 찾을 수 없습니다',
      'destinations_not_found_message': '검색 또는 필터 기준을 변경해 보세요',
      'explore destination': '목적지 탐색',

      // Destination descriptions
      'beijing_description': '베이징의 상징적인 만리장성, 자금성, 천단을 탐험하세요. 중국 수도의 풍부한 역사와 문화를 경험하며 맛있는 요리를 즐기세요.',
      'henan_description': '중국 문명의 요람인 허난을 방문하여 소림사, 룽먼 석굴, 고대 수도 뤄양과 카이펑 등의 명소를 둘러보세요.',

      // Beijing attractions
      'beijing_attraction_great_wall_of_china': '만리장성',
      'beijing_attraction_great_wall_of_china_desc': '세계에서 가장 상징적인 건축물 중 하나로, 만리장성은 13,000마일 이상 뻗어 있습니다. 베이징 근처의 바달링과 무티안유 구간이 가장 많이 방문하는 부분입니다.',
      'beijing_attraction_great_wall_of_china_tips': '인파를 피하려면 이른 아침에 방문하세요. 많은 걷기와 계단이 있으므로 편안한 신발을 착용하세요.',

      'beijing_attraction_forbidden_city': '자금성',
      'beijing_attraction_forbidden_city_desc': '명나라부터 청나라까지 중국 황실의 궁전이었던 이 거대한 단지는 180에이커에 걸쳐 980개의 건물을 갖추고 있습니다.',
      'beijing_attraction_forbidden_city_tips': '미리 온라인으로 티켓을 구매하세요. 최소 3시간 이상 탐험할 계획을 세우세요. 여러 언어로 된 오디오 가이드가 제공됩니다.',

      'beijing_attraction_temple_of_heaven': '천단',
      'beijing_attraction_temple_of_heaven_desc': '명나라와 청나라 황제들이 풍년을 기원하는 의식을 수행했던 종교 건물 단지입니다.',
      'beijing_attraction_temple_of_heaven_tips': '이른 아침에 방문하면 주변 공원에서 태극권을 연습하고, 춤을 추고, 전통 악기를 연주하는 현지인들을 볼 수 있습니다.',
      'xian_description': '세계적으로 유명한 병마용, 고대 성벽, 풍부한 실크로드 역사가 있는 시안을 발견하세요. 정통 산시 요리와 활기찬 지역 문화를 즐기세요.',
      'shanghai_description': '인상적인 스카이라인, 역사적인 외탄, 매력적인 구시가지가 있는 중국의 활기찬 현대 대도시 상하이를 방문하세요. 전통과 현대 중국의 조화를 경험하세요.',

      // Henan attractions
      'henan_attraction_shaolin_temple': '소림사',
      'henan_attraction_shaolin_temple_desc': '무술과 선불교로 유명한 소림사는 중국 문화에 관심 있는 사람들이 꼭 방문해야 할 곳입니다.',
      'henan_attraction_shaolin_temple_tips': '혼잡을 피하고 평화로운 환경을 즐기려면 일찍 방문하세요.',

      'henan_attraction_longmen_grottoes': '룽먼 석굴',
      'henan_attraction_longmen_grottoes_desc': '유네스코 세계 문화유산으로, 절벽에 수천 개의 부처와 제자 조각상이 새겨져 있습니다.',
      'henan_attraction_longmen_grottoes_tips': '많은 걷기가 필요하므로 편안한 신발을 착용하세요.',

      // Xi'an attractions
      'xian_attraction_terracotta_army': '병마용',
      'xian_attraction_terracotta_army_desc': '20세기 가장 위대한 고고학적 발견 중 하나로, 진시황제의 사후 세계를 보호하기 위해 만들어진 수천 개의 실물 크기 전사와 말 조각상입니다.',
      'xian_attraction_terracotta_army_tips': '보고 있는 것의 의미를 이해하기 위해 가이드를 고용하세요. 가장 인상적인 1호 갱을 마지막에 방문하세요.',

      'xian_attraction_xi\'an_city_wall': '시안 성벽',
      'xian_attraction_xi\'an_city_wall_desc': '중국에서 가장 완벽하게 보존된 고대 성벽으로, 전체 14km 둘레를 자전거로 돌아볼 수 있는 대여 서비스를 제공합니다.',
      'xian_attraction_xi\'an_city_wall_tips': '전체 성벽을 돌아보기 위해 자전거를 대여하세요 - 여유롭게 타면 약 2시간이 소요됩니다.',

      'xian_attraction_muslim_quarter': '무슬림 쿼터',
      'xian_attraction_muslim_quarter_desc': '음식 노점, 기념품 상점, 그리고 대청진사가 있는 좁은 골목이 있는 역사적인 지역입니다.',
      'xian_attraction_muslim_quarter_tips': '가장 활기찬 저녁 시간에 방문하세요. 배고픈 상태로 와서 가능한 많은 길거리 음식을 시도해보세요!',

      'xian_attraction_big_wild_goose_pagoda': '대안탑',
      'xian_attraction_big_wild_goose_pagoda_desc': '시안의 유명한 불탑이자 랜드마크로, 원래 당나라 652년에 건립되었습니다.',
      'xian_attraction_big_wild_goose_pagoda_tips': '탑 앞 광장에서는 저녁에 아름다운 음악 분수 쇼가 열립니다.',

      // Shanghai attractions
      'shanghai_attraction_the_bund': '외탄',
      'shanghai_attraction_the_bund_desc': '한쪽에는 식민지 시대 건물이, 다른 쪽에는 미래적인 푸동 스카이라인이 있는 유명한 해안가입니다. 특히 밤에 아름답습니다.',
      'shanghai_attraction_the_bund_tips': '다양한 관점을 위해 낮과 밤 모두 방문하세요. 파노라마 전망을 위해 강 크루즈를 이용하세요.',

      'shanghai_attraction_yu_garden': '위위안',
      'shanghai_attraction_yu_garden_desc': '구시가지 중심부에 정자, 바위 정원, 연못이 있는 명나라 시대의 전통 중국 정원입니다.',
      'shanghai_attraction_yu_garden_tips': '근처의 도시신 사원과 쇼핑과 간식을 즐길 수 있는 번화한 시장 지역을 함께 방문하세요.',

      'shanghai_attraction_shanghai_tower': '상하이 타워',
      'shanghai_attraction_shanghai_tower_desc': '도시의 멋진 전망을 제공하는 전망대가 있는 세계에서 가장 높은 건물 중 하나입니다.',
      'shanghai_attraction_shanghai_tower_tips': '줄을 피하기 위해 미리 티켓을 구매하세요. 가시성이 가장 좋은 맑은 날에 방문하세요.',
      'qingdao_description': '아름다운 해변, 독일 식민지 시대 건축물, 세계적으로 유명한 맥주가 있는 칭다오를 탐험하세요. 신선한 해산물과 멋진 해안 경관을 즐기세요.',

      // Qingdao attractions
      'qingdao_attraction_badaguan_scenic_area': '바다관 경관구',
      'qingdao_attraction_badaguan_scenic_area_desc': '독특한 건축물, 아름다운 정원, 그리고 만리장성의 유명한 8개 관문의 이름을 딴 8개의 도로가 있는 역사적인 지역입니다.',
      'qingdao_attraction_badaguan_scenic_area_tips': '꽃이 피는 봄이나 단풍이 드는 가을에 방문하는 것이 가장 좋습니다.',

      'qingdao_attraction_tsingtao_brewery_museum': '칭다오 맥주 박물관',
      'qingdao_attraction_tsingtao_brewery_museum_desc': '1903년 독일 정착민들이 설립한 중국에서 가장 유명한 맥주의 역사를 보여주는 박물관입니다. 맥주 시음이 포함되어 있습니다.',
      'qingdao_attraction_tsingtao_brewery_museum_tips': '혼잡을 피하려면 오전에 방문하세요. 입장권에 맥주 샘플이 포함되어 있습니다.',

      'qingdao_attraction_no._1_bathing_beach': '제1해수욕장',
      'qingdao_attraction_no._1_bathing_beach_desc': '깨끗한 물과 상징적인 잔교 피어의 전망을 갖춘 인기 있는 모래 해변입니다.',
      'qingdao_attraction_no._1_bathing_beach_tips': '사람이 적은 이른 아침이 수영하기 가장 좋은 시간입니다. 수건을 직접 가져오세요.',
      'guilin_description': '구이린의 숨막히는 카르스트 지형, 그림 같은 강, 울창한 시골 풍경에 감탄하세요. 리강 크루즈를 타고 전통적인 시골 생활을 경험하세요.',

      // Guilin attractions
      'guilin_attraction_li_river_cruise': '리강 크루즈',
      'guilin_attraction_li_river_cruise_desc': '구이린에서 양쑤오까지 카르스트 산맥, 시골 마을, 그리고 가마우지를 데리고 낚시하는 어부들의 장관을 볼 수 있는 경치 좋은 크루즈입니다.',
      'guilin_attraction_li_river_cruise_tips': '4-5시간 크루즈가 더 짧은 옵션보다 낫습니다. 최고의 전망을 위해 배의 오른쪽에 앉으세요.',

      'guilin_attraction_reed_flute_cave': '갈대 피리 동굴',
      'guilin_attraction_reed_flute_cave_desc': '다채로운 조명이 있는 자연 석회암 동굴로, 종유석과 석순의 멋진 전시를 만들어냅니다.',
      'guilin_attraction_reed_flute_cave_tips': '동굴 내부는 서늘할 수 있으니 가벼운 재킷을 가져오세요. 사진 촬영은 허용되지만 삼각대는 허용되지 않을 수 있습니다.',

      'guilin_attraction_elephant_trunk_hill': '코끼리 코 언덕',
      'guilin_attraction_elephant_trunk_hill_desc': '리강에서 물을 마시는 코끼리를 닮은 자연 암석 형태로, 구이린의 가장 상징적인 랜드마크 중 하나입니다.',
      'guilin_attraction_elephant_trunk_hill_tips': '강 건너편에서 가장 잘 보입니다. 아름다운 사진 촬영 기회를 위해 일몰 시간에 방문하세요.',
      'yangshuo_description': '양쑤오의 멋진 풍경, 야외 모험, 활기찬 서쪽 거리를 즐기세요. 논을 가로질러 자전거를 타고 위룽강을 따라 동굴을 탐험하세요.',

      // Yangshuo attractions
      'yangshuo_attraction_yulong_river': '위룽강',
      'yangshuo_attraction_yulong_river_desc': '대나무 뗏목 타기와 그림 같은 풍경으로 유명합니다.',
      'yangshuo_attraction_yulong_river_tips': '이른 아침이나 늦은 오후에 방문하는 것이 가장 좋습니다.',

      'yangshuo_attraction_west_street': '서쪽 거리',
      'yangshuo_attraction_west_street_desc': '양쑤오에서 가장 오래된 거리로, 상점, 바, 레스토랑이 가득합니다.',
      'yangshuo_attraction_west_street_tips': '밤문화와 기념품 쇼핑에 좋은 곳입니다.',
      'zhangjiajie_description': '\'아바타\' 영화에 영감을 준 독특한 기둥 형태의 지형이 있는 장자제 국립 산림 공원을 탐험하세요. 숨막히는 유리 다리와 톈먼산을 경험하세요.',

      // Zhangjiajie attractions
      'zhangjiajie_attraction_tianmen_mountain': '톈먼산',
      'zhangjiajie_attraction_tianmen_mountain_desc': '자연 아치(천문, 하늘의 문), 절벽에 매달린 산책로, 세계에서 가장 긴 케이블카 라이드로 유명합니다.',
      'zhangjiajie_attraction_tianmen_mountain_tips': '천문으로 가는 999개의 계단을 오르기 위해 편안한 신발을 착용하세요. 안개가 시야를 가릴 수 있으니 날씨 예보를 확인하세요.',

      'zhangjiajie_attraction_golden_whip_stream': '골든 위프 스트림',
      'zhangjiajie_attraction_golden_whip_stream_desc': '장자제 국립 산림 공원을 가로지르는 7.5km 길이의 그림 같은 개울로, 높은 봉우리와 울창한 식물로 둘러싸여 있습니다.',
      'zhangjiajie_attraction_golden_whip_stream_tips': '산책로는 비교적 평평하고 걷기 쉽습니다. 경치를 감상하고 사진을 찍기 위해 2-3시간을 할애하세요. 길가의 야생 원숭이들을 주의하세요.',

      'zhangjiajie_attraction_glass_bridge': '장자제 유리 다리',
      'zhangjiajie_attraction_glass_bridge_desc': '그랜드 캐니언 지역의 두 산 절벽 사이에 매달린 세계에서 가장 높고 긴 유리 바닥 다리입니다.',
      'zhangjiajie_attraction_glass_bridge_tips': '혼잡을 피하기 위해 평일에 방문하세요. 유리 표면을 보호하기 위한 특수 신발 커버가 제공됩니다.',

      // Zhangjiajie food
      'zhangjiajie_food_sour_fish_soup': '산 생선 수프',
      'zhangjiajie_food_sour_fish_soup_desc': '매콤하고 신맛이 나는 생선 수프로, 투자족의 지역 특산품입니다.',

      'zhangjiajie_food_tujia_bacon': '투자 베이컨',
      'zhangjiajie_food_tujia_bacon_desc': '훈제 돼지 삼겹살로, 투자족의 전통 별미입니다.',

      'zhangjiajie_food_wild_mushroom_hotpot': '야생 버섯 훠궈',
      'zhangjiajie_food_wild_mushroom_hotpot_desc': '주변 산에서 자라는 다양한 야생 버섯을 특징으로 하는 훠궈입니다.',

      // Zhangjiajie guides
      'zhangjiajie_guide_3-day_zhangjiajie_highlights': '장자제 3일 하이라이트',

      // Zhangjiajie reviews
      'the scenery is out of this world! the glass bridge was both terrifying and amazing. highly recommend visiting in autumn.': '풍경이 정말 환상적입니다! 유리 다리는 무섭기도 하고 놀랍기도 했습니다. 가을에 방문하는 것을 강력히 추천합니다.',
      'zhangjiajie is a must-see for nature lovers. the cable car ride up tianmen mountain is unforgettable.': '장자제는 자연 애호가들이 꼭 방문해야 할 곳입니다. 톈먼산으로 올라가는 케이블카 여행은 잊을 수 없는 경험입니다.',

      // Zhangjiajie Practical Information (Exact matches)
      'september to november for clear skies and comfortable temperatures.': '9월부터 11월까지는 맑은 하늘과 쾌적한 기온을 제공합니다.',
      'zhangjiajie hehua international airport (dyg)': '장자제 허화 국제공항(DYG)',
      'buses, taxis, and cable cars are the main ways to get around. many attractions are spread out, so plan your route in advance.': '버스, 택시, 케이블카가 주요 이동 수단입니다. 많은 명소들이 넓게 분포되어 있으므로 미리 경로를 계획하세요.',
      'bring rain gear as weather can change quickly. some trails can be steep—wear good shoes.': '날씨가 빠르게 변할 수 있으니 우비를 준비하세요. 일부 등산로는 가파를 수 있으니 좋은 신발을 착용하세요.',

      // Yangshuo food
      'yangshuo_food_beer_fish': '맥주 생선',
      'yangshuo_food_beer_fish_desc': '양쑤오의 대표 요리—현지 맥주, 채소, 향신료로 조리한 신선한 강 생선.',

      'yangshuo_food_stuffed_li_river_snails': '리강 달팽이 요리',
      'yangshuo_food_stuffed_li_river_snails_desc': '돼지고기와 향신료로 속을 채운 달팽이, 독특한 현지 별미.',

      'yangshuo_food_guilin_rice_noodles': '구이린 쌀국수',
      'yangshuo_food_guilin_rice_noodles_desc': '다양한 토핑과 맛있는 국물과 함께 제공되는 인기 있는 쌀국수.',

      // Yangshuo guides
      'yangshuo_guide_2-day_yangshuo_adventure': '양쑤오 2일 모험',

      // Yangshuo reviews
      'yangshuo is a paradise for nature lovers! cycling along the yulong river was unforgettable. the beer fish is a must-try.': '양쑤오는 자연 애호가들의 천국입니다! 위룽강을 따라 자전거를 타는 것은 잊을 수 없는 경험이었습니다. 맥주 생선은 꼭 맛봐야 합니다.',
      'the scenery is breathtaking and the town is very lively at night. highly recommend the river cruise.': '풍경이 숨막히게 아름답고 밤에는 마을이 매우 활기찹니다. 강 크루즈를 강력히 추천합니다.',

      // Beijing food
      'beijing_food_peking_duck': '베이징 덕',
      'beijing_food_peking_duck_desc': '베이징의 대표 요리 - 바삭하게 구운 오리를 얇은 피, 오이, 파, 단 콩 소스와 함께 제공합니다.',

      'beijing_food_zhajiangmian': '자장면',
      'beijing_food_zhajiangmian_desc': '신선한 수제 면에 다진 돼지고기와 발효된 콩 페이스트로 만든 맛있는 소스를 얹은 요리.',

      'beijing_food_jianbing': '젠빙',
      'beijing_food_jianbing_desc': '인기 있는 아침 길거리 음식 - 크레페와 비슷한 팬케이크에 계란, 바삭한 완탕, 소스, 허브를 넣은 요리.',

      // Beijing food where
      'da dong roast duck, quanjude': '다동 로스트 덕, 취안주더',
      'old beijing zhajiang noodle king, hai wan ju': '올드 베이징 자장면 킹, 하이완쥐',
      'street vendors around wangfujing area': '왕푸징 지역 주변의 길거리 음식점',

      // Xi'an food where
      'laosunjia, muslim quarter food stalls': '라오순자, 무슬림 쿼터 음식 노점',
      'wei jia biangbiang mian, hi noodle': '웨이자 비앙비앙면, 하이 누들',
      'lao sun jia, tong sheng xiang': '라오순자, 통성샹',

      // Shanghai food where
      'din tai fung, jia jia tang bao': '딘타이펑, 자자탕바오',
      'yang\'s fry dumplings, da hu chun': '양스 프라이 덤플링, 다후춘',
      'wang bao he, jardin de jade': '왕바오허, 자딘 드 자드',

      // Qingdao food where
      'pichaiyuan seafood market, dengzhou road': '피차이위안 해산물 시장, 덩저우 로드',
      'beer street (dengzhou road), tsingtao beer museum': '비어 스트리트(덩저우 로드), 칭다오 맥주 박물관',
      'dianshi soup dumpling, tonghe xiaolong': '디안스 수프 덤플링, 통허 샤오롱',

      // Guilin & Yangshuo food where
      'local restaurants along west street': '서쪽 거리를 따라 있는 현지 레스토랑',
      'farmhouse restaurants in the countryside': '시골의 농가 레스토랑',
      'street vendors and noodle shops': '길거리 음식점과 국수 가게',

      // Zhangjiajie food where
      'local restaurants near the park entrance': '공원 입구 근처의 현지 레스토랑',
      'traditional tujia restaurants': '전통 투자족 레스토랑',
      'hotpot restaurants in zhangjiajie city': '장자제 시내의 훠궈 레스토랑',

      // Henan food where
      'local restaurants in luoyang': '뤄양의 현지 레스토랑',

      // Beijing guides
      'beijing_guide_3-day_beijing_highlights': '베이징 3일 하이라이트',
      'beijing_guide_beijing_culture_tour': '베이징 문화 투어',

      // Beijing reviews
      'beijing exceeded my expectations! the great wall was breathtaking, and the food was incredible. i highly recommend hiring a local guide for the forbidden city to fully appreciate its history.': '베이징은 제 기대를 뛰어넘었습니다! 만리장성은 숨이 멎을 정도로 아름다웠고, 음식도 놀라웠습니다. 자금성의 역사를 충분히 이해하기 위해 현지 가이드를 고용하는 것을 강력히 추천합니다.',
      'amazing historical sites but be prepared for crowds. the subway system is efficient and easy to navigate. don\'t miss the night market food stalls!': '놀라운 역사적 명소들이지만 사람들이 많다는 것을 대비하세요. 지하철 시스템은 효율적이고 탐색하기 쉽습니다. 야시장 음식 가판대를 놓치지 마세요!',
      'visiting the great wall at mutianyu was the highlight of my trip. less crowded than badaling and the toboggan ride down was fun! beijing duck at da dong was outstanding.': '무티안유 만리장성 방문은 제 여행의 하이라이트였습니다. 바달링보다 덜 붐비고 토보간을 타고 내려오는 것이 재미있었습니다! 다동의 베이징 덕은 훌륭했습니다.',

      // Xi'an food
      'xian_food_roujiamo': '로우자모',
      'xian_food_roujiamo_desc': '종종 \'중국식 햄버거\'라고 불리는 - 천천히 조리된 양념 고기(보통 돼지고기)를 넣은 납작한 빵.',

      'xian_food_biangbiang_noodles': '비앙비앙 면',
      'xian_food_biangbiang_noodles_desc': '매우 넓은 수제 면에 고추, 채소, 고기를 얹은 요리. \'비앙\'이라는 글자는 가장 복잡한 중국 글자 중 하나입니다.',

      'xian_food_yang_rou_pao_mo': '양로우 파오모',
      'xian_food_yang_rou_pao_mo_desc': '시안의 대표 요리 - 납작한 빵을 양고기 스튜에 담가 당면과 절인 마늘과 함께 제공.',

      // Xi'an guides
      'xian_guide_2-day_xi\'an_essential_tour': '시안 2일 필수 투어',
      'xian_guide_historical_xi\'an_tour': '시안 역사 투어',

      // Xi'an reviews
      'the terracotta warriors are even more impressive in person! don\'t miss the muslim quarter for amazing food - the spiced lamb skewers and roujiamo were delicious.': '병마용은 직접 보면 더욱 인상적입니다! 무슬림 거리의 놀라운 음식을 놓치지 마세요 - 양념된 양고기 꼬치와 로우자모가 맛있었습니다.',
      'cycling on the city wall was a highlight of our china trip. visit the terracotta army early to avoid the worst of the crowds.': '성벽에서 자전거 타기는 우리 중국 여행의 하이라이트였습니다. 가장 붐비는 시간을 피하기 위해 병마용을 일찍 방문하세요.',
      'as a chinese person from the south, xi\'an\'s food culture amazed me. the history is rich and the locals are very friendly. biangbiang noodles are a must-try!': '남부 출신 중국인으로서, 시안의 음식 문화는 저를 놀라게 했습니다. 역사가 풍부하고 현지인들은 매우 친절합니다. 비앙비앙 면은 꼭 맛봐야 합니다!',

      // Shanghai food
      'shanghai_food_xiaolongbao': '샤오롱바오',
      'shanghai_food_xiaolongbao_desc': '상하이의 유명한 수프 만두로 돼지고기와 맛있는 육수가 들어 있습니다.',

      'shanghai_food_shengjianbao': '생젠바오',
      'shanghai_food_shengjianbao_desc': '바삭한 바닥과 즙이 많은 속을 가진 팬에 구운 돼지고기 만두.',

      'shanghai_food_hairy_crab': '털게',
      'shanghai_food_hairy_crab_desc': '계절 별미(가을) - 알이 귀한 찐 게로, 식초와 생강과 함께 먹습니다.',

      // Shanghai guides
      'shanghai_guide_3-day_shanghai_experience': '상하이 3일 체험',
      'shanghai_guide_art_&_culture_tour': '예술 및 문화 투어',

      // Shanghai reviews
      'shanghai is a perfect blend of old and new china. don\'t miss the view from the bund at night when all the pudong skyscrapers are lit up. the metro system is world-class and makes getting around easy.': '상하이는 중국의 옛것과 새것이 완벽하게 조화를 이룹니다. 밤에 푸동의 모든 고층 빌딩이 불을 밝힐 때 외탄에서 보는 전망을 놓치지 마세요. 지하철 시스템은 세계적 수준으로 이동이 쉽습니다.',
      'incredible city with amazing food! xiaolongbao at din tai fung was worth the wait. the contrast between ultra-modern pudong and traditional areas like yu garden is fascinating.': '놀라운 음식이 있는 믿을 수 없는 도시! 딘타이펑의 샤오롱바오는 기다릴 가치가 있었습니다. 초현대적인 푸동과 위위안 같은 전통 지역 사이의 대비가 매력적입니다.',
      'as someone who visits shanghai regularly for business, i always discover something new. the food scene is constantly evolving. try the speakeasies in the former french concession for great cocktails.': '비즈니스로 상하이를 정기적으로 방문하는 사람으로서, 저는 항상 새로운 것을 발견합니다. 음식 문화는 계속 발전하고 있습니다. 훌륭한 칵테일을 위해 구 프랑스 조계지의 스피크이지를 시도해보세요.',

      // Qingdao food
      'qingdao_food_fresh_seafood': '신선한 해산물',
      'qingdao_food_fresh_seafood_desc': '조개, 굴, 성게 및 다양한 생선을 현지 스타일로 준비 - 종종 자연 풍미를 보존하기 위해 간단히 찐 요리.',

      'qingdao_food_tsingtao_beer': '칭다오 맥주',
      'qingdao_food_tsingtao_beer_desc': '이 도시의 유명한 맥주로, 원산지에서 신선하게 즐기는 것이 가장 좋습니다. 흑맥주와 백맥주 종류를 시도해보세요.',

      'qingdao_food_jiaozi': '만두',
      'qingdao_food_jiaozi_desc': '칭다오 스타일 만두는 주로 고등어와 같은 해산물이나 신선한 채소로 속을 채웁니다.',

      // Qingdao guides
      'qingdao_guide_2-day_qingdao_coastal_tour': '칭다오 2일 해안 투어',
      'qingdao_guide_nature_&_beach_tour': '자연 및 해변 투어',

      // Qingdao reviews
      'qingdao is a hidden gem! the beaches are clean, the beer is excellent, and the german architecture gives the city a unique character. don\'t miss the seafood at pichaiyuan market.': '칭다오는 숨겨진 보석입니다! 해변은 깨끗하고, 맥주는 훌륭하며, 독일 건축물이 도시에 독특한 특성을 부여합니다. 피차이위안 시장의 해산물을 놓치지 마세요.',
      'perfect summer destination with great beaches and amazing food. the city is clean and well-organized. try the fresh seafood - it\'s some of the best in china!': '훌륭한 해변과 놀라운 음식이 있는 완벽한 여름 목적지. 도시는 깨끗하고 잘 정돈되어 있습니다. 신선한 해산물을 시도해보세요 - 중국에서 가장 좋은 해산물 중 하나입니다!',
      'loved the mix of european and chinese influences. the badaguan area is beautiful for walking. tsingtao beer tastes even better at the source!': '유럽과 중국의 영향이 혼합된 것이 좋았습니다. 바다관 지역은 걷기에 아름답습니다. 칭다오 맥주는 원산지에서 마시면 더 맛있습니다!',

      // Guilin food
      'guilin_food_guilin_rice_noodles': '구이린 쌀국수',
      'guilin_food_guilin_rice_noodles_desc': '현지 특산품 - 절인 채소, 땅콩, 다양한 고기가 올라간 국물에 쌀국수.',

      'guilin_food_beer_fish': '맥주 생선',
      'guilin_food_beer_fish_desc': '맥주, 토마토, 절인 채소, 고추와 함께 조리한 신선한 강 생선 - 양쑤오의 대표 요리.',

      'guilin_food_stuffed_li_river_snails': '리강 달팽이 요리',
      'guilin_food_stuffed_li_river_snails_desc': '돼지고기, 마늘, 향신료로 속을 채운 강 달팽이 - 독특한 현지 요리.',

      // Guilin guides
      'guilin_guide_3-day_guilin_&_yangshuo_highlights': '구이린 및 양쑤오 3일 하이라이트',
      'guilin_guide_photography_tour': '사진 투어',

      // Guilin reviews
      'the landscape around guilin is simply magical! the li river cruise was worth every penny - it feels like sailing through a traditional chinese painting. don\'t miss the countryside around yangshuo as well.': '구이린 주변의 풍경은 정말 마법 같습니다! 리강 크루즈는 모든 비용이 아깝지 않았습니다 - 전통 중국 그림 속을 항해하는 느낌입니다. 양쑤오 주변의 시골도 놓치지 마세요.',
      'one of the most beautiful places i\'ve visited in china. the rice noodles are delicious and very cheap. i recommend renting a bicycle in yangshuo to explore the surrounding villages.': '중국에서 방문한 가장 아름다운 곳 중 하나입니다. 쌀국수는 맛있고 매우 저렴합니다. 주변 마을을 탐험하기 위해 양쑤오에서 자전거를 빌리는 것을 추천합니다.',
      'the natural scenery is outstanding, though guilin city itself is quite ordinary. the highlight was definitely the li river cruise and the beautiful villages around yangshuo.': '구이린 도시 자체는 꽤 평범하지만 자연 경관은 뛰어납니다. 하이라이트는 확실히 리강 크루즈와 양쑤오 주변의 아름다운 마을들이었습니다.',

      // Henan food
      'henan_food_luoyang_water_banquet': '뤄양 워터 뱅큇',
      'henan_food_luoyang_water_banquet_desc': '다양한 수프와 요리가 특징인 전통 축제로, 독특한 맛으로 유명합니다.',

      // Henan guides
      'henan_guide_2-day_henan_highlights': '허난 2일 하이라이트',

      // Henan reviews
      'henan is a fascinating place with rich history and culture. the shaolin temple was a highlight of my trip!': '허난은 풍부한 역사와 문화가 있는 매혹적인 곳입니다. 소림사는 제 여행의 하이라이트였습니다!',

      // Travel Guide Titles
      '3-day beijing highlights': '베이징 3일 하이라이트',
      'beijing culture tour': '베이징 문화 투어',
      '2-day xi\'an essential tour': '시안 2일 필수 투어',
      'historical xi\'an tour': '시안 역사 투어',
      '3-day shanghai experience': '상하이 3일 체험',
      'art & culture tour': '예술 및 문화 투어',
      '2-day qingdao coastal tour': '칭다오 2일 해안 투어',
      'nature & beach tour': '자연 및 해변 투어',
      '3-day guilin & yangshuo highlights': '구이린 및 양쑤오 3일 하이라이트',
      'photography tour': '사진 투어',
      '2-day yangshuo adventure': '양쑤오 2일 모험 투어',
      '3-day zhangjiajie highlights': '장자제 3일 하이라이트',
      '2-day henan highlights': '허난 2일 하이라이트',

      // Practical Information
      'spring (april-may) and autumn (september-october) offer the most pleasant weather. avoid national holidays when sites are extremely crowded.': '봄(4-5월)과 가을(9-10월)은 가장 쾌적한 날씨를 제공합니다. 관광지가 매우 붐비는 국경일은 피하세요.',
      'beijing capital international airport (pek) and beijing daxing international airport (pkx)': '베이징 수도 국제공항(PEK)과 베이징 다싱 국제공항(PKX)',
      'subway, buses, taxis, and bicycle rentals are all convenient options. the subway is particularly efficient and has english signage.': '지하철, 버스, 택시, 자전거 대여는 모두 편리한 옵션입니다. 특히 지하철은 효율적이며 영어 표지판이 있습니다.',
      'consider purchasing a rechargeable transportation card for convenient access to subway and buses.': '지하철과 버스를 편리하게 이용하려면 충전식 교통카드 구매를 고려하세요.',

      // Exact matches for Beijing page
      'spring (april-may) and autumn (september-october) offer the most pleasant weather.': '봄(4-5월)과 가을(9-10월)은 가장 쾌적한 날씨를 제공합니다.',
      'avoid national holidays when sites are extremely crowded.': '관광지가 매우 붐비는 국경일은 피하세요.',
      'beijing capital international airport (pek) and beijing daxing international airport (pkx)': '베이징 수도 국제공항(PEK)과 베이징 다싱 국제공항(PKX)',
      'subway, buses, taxis, and bicycle rentals are all convenient options.': '지하철, 버스, 택시, 자전거 대여는 모두 편리한 옵션입니다.',
      'the subway is particularly efficient and has english signage.': '특히 지하철은 효율적이며 영어 표지판이 있습니다.',
      'consider purchasing a rechargeable transportation card for convenient access to subway and buses.': '지하철과 버스를 편리하게 이용하려면 충전식 교통카드 구매를 고려하세요.',

      // Xi'an Practical Information
      'spring and autumn are ideal with mild temperatures. march to may and september to november are best.': '온화한 기온의 봄과 가을이 이상적입니다. 3월에서 5월, 9월에서 11월이 가장 좋습니다.',
      'xi\'an xianyang international airport (xiy) connects to major cities. high-speed trains link xi\'an to beijing, shanghai, and other cities.': '시안 셴양 국제공항(XIY)은 주요 도시와 연결됩니다. 고속철도는 시안을 베이징, 상하이 및 기타 도시와 연결합니다.',
      'the city has an extensive bus network and a growing subway system. taxis are affordable.': '도시는 광범위한 버스 네트워크와 성장하는 지하철 시스템을 갖추고 있습니다. 택시는 저렴합니다.',
      'the muslim quarter is best experienced at night. purchase a combination ticket for multiple terracotta warriors pits.': '무슬림 거리는 밤에 방문하는 것이 가장 좋습니다. 병마용 여러 구덩이를 위한 통합 티켓을 구매하세요.',

      // Exact matches for Xi'an page
      'spring and autumn are ideal with mild temperatures.': '온화한 기온의 봄과 가을이 이상적입니다.',
      'march to may and september to november are best.': '3월에서 5월, 9월에서 11월이 가장 좋습니다.',
      'xi\'an xianyang international airport (xiy) connects to major cities.': '시안 셴양 국제공항(XIY)은 주요 도시와 연결됩니다.',
      'high-speed trains link xi\'an to beijing, shanghai, and other cities.': '고속철도는 시안을 베이징, 상하이 및 기타 도시와 연결합니다.',
      'the city has an extensive bus network and a growing subway system.': '도시는 광범위한 버스 네트워크와 성장하는 지하철 시스템을 갖추고 있습니다.',
      'taxis are affordable.': '택시는 저렴합니다.',
      'the muslim quarter is best experienced at night.': '무슬림 거리는 밤에 방문하는 것이 가장 좋습니다.',
      'purchase a combination ticket for multiple terracotta warriors pits.': '병마용 여러 구덩이를 위한 통합 티켓을 구매하세요.',

      // Additional exact matches for Xi'an page
      'xi\'an xianyang international airport (xiy)': '시안 셴양 국제공항(XIY)',

      // Additional exact matches for Shanghai page
      'spring (march-may) and autumn (september-november) offer mild temperatures. avoid summer for its high heat, humidity and occasional typhoons.': '봄(3-5월)과 가을(9-11월)은 온화한 기온을 제공합니다. 무더위, 습기, 간헐적인 태풍이 있는 여름은 피하세요.',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha)': '상하이 푸동 국제공항(PVG)과 상하이 홍차오 국제공항(SHA)',

      // Shanghai Practical Information
      'spring (march-may) and autumn (september-november) offer pleasant temperatures. avoid summer for its heat and humidity.': '봄(3-5월)과 가을(9-11월)은 쾌적한 기온을 제공합니다. 더위와 습기가 있는 여름은 피하세요.',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha) serve domestic and international flights.': '상하이 푸동 국제공항(PVG)과 상하이 홍차오 국제공항(SHA)은 국내 및 국제 항공편을 제공합니다.',
      'the extensive metro system is the best way to navigate the city. taxis and didi (chinese uber) are also convenient.': '광범위한 지하철 시스템이 도시를 탐색하는 가장 좋은 방법입니다. 택시와 디디(중국의 우버)도 편리합니다.',
      'many attractions offer discounted tickets for evening visits. the shanghai metro app has english options and is very helpful.': '많은 명소들이 저녁 방문을 위한 할인 티켓을 제공합니다. 상하이 지하철 앱은 영어 옵션이 있어 매우 유용합니다.',

      // Exact matches for Shanghai page
      'spring (march-may) and autumn (september-november) offer pleasant temperatures.': '봄(3-5월)과 가을(9-11월)은 쾌적한 기온을 제공합니다.',
      'avoid summer for its heat and humidity.': '더위와 습기가 있는 여름은 피하세요.',
      'shanghai pudong international airport (pvg) and shanghai hongqiao international airport (sha) serve domestic and international flights.': '상하이 푸동 국제공항(PVG)과 상하이 홍차오 국제공항(SHA)은 국내 및 국제 항공편을 제공합니다.',
      'the extensive metro system is the best way to navigate the city.': '광범위한 지하철 시스템이 도시를 탐색하는 가장 좋은 방법입니다.',
      'taxis and didi (chinese uber) are also convenient.': '택시와 디디(중국의 우버)도 편리합니다.',
      'many attractions offer discounted tickets for evening visits.': '많은 명소들이 저녁 방문을 위한 할인 티켓을 제공합니다.',
      'the shanghai metro app has english options and is very helpful.': '상하이 지하철 앱은 영어 옵션이 있어 매우 유용합니다.',

      // Qingdao Practical Information
      'summer (june-august) is the peak season with warm temperatures perfect for beach activities. may and september offer pleasant weather with fewer crowds.': '여름(6-8월)은 해변 활동에 완벽한 따뜻한 기온의 성수기입니다. 5월과 9월은 사람이 적고 쾌적한 날씨를 제공합니다.',
      'qingdao liuting international airport (tao) connects to major chinese cities and some international destinations.': '칭다오 류팅 국제공항(TAO)은 중국 주요 도시 및 일부 국제 목적지와 연결됩니다.',
      'buses and taxis are the main transportation options. the coastal areas are best explored on foot.': '버스와 택시가 주요 교통 수단입니다. 해안 지역은 도보로 탐험하는 것이 가장 좋습니다.',
      'try the fresh beer at the tsingtao brewery. seafood is best enjoyed at local markets rather than tourist restaurants.': '칭다오 맥주 공장에서 신선한 맥주를 시도해보세요. 해산물은 관광객 레스토랑보다 지역 시장에서 즐기는 것이 가장 좋습니다.',

      // Exact matches for Qingdao page
      'may to october for beach activities. august for the international beer festival. avoid winter as it can be cold and windy.': '5월부터 10월까지는 해변 활동에 적합합니다. 8월에는 국제 맥주 축제가 열립니다. 춥고 바람이 많은 겨울은 피하세요.',
      'qingdao liuting international airport (tao)': '칭다오 류팅 국제공항(TAO)',
      'buses and taxis are the main transport options. the metro system is expanding but still limited.': '버스와 택시가 주요 교통 수단입니다. 지하철 시스템은 확장 중이지만 아직 제한적입니다.',
      'get a rechargeable transportation card for convenience on buses.': '버스 이용의 편의를 위해 충전식 교통카드를 구매하세요.',

      // Guilin Practical Information
      'april to october is the best time to visit, with may to june being the rainy season which enhances the beauty of the karst mountains.': '4월부터 10월까지가 방문하기 가장 좋은 시기이며, 5월부터 6월까지는 카르스트 산의 아름다움을 더해주는 우기입니다.',
      'guilin liangjiang international airport (kwl) serves major chinese cities. trains connect guilin to major destinations.': '구이린 량장 국제공항(KWL)은 중국 주요 도시를 연결합니다. 기차는 구이린을 주요 목적지와 연결합니다.',
      'buses and taxis are available in the city. boats are the main transportation for the li river.': '도시 내에는 버스와 택시가 있습니다. 리강의 주요 교통수단은 보트입니다.',
      'book li river cruises in advance during peak season. yangshuo is worth staying overnight rather than as a day trip.': '성수기에는 리강 크루즈를 미리 예약하세요. 양쑤오는 당일치기보다 하룻밤 머무를 가치가 있습니다.',

      // Exact matches for Guilin page
      'april to october is the best time to visit, with may to june being the rainy season.': '4월부터 10월까지가 방문하기 가장 좋은 시기이며, 5월부터 6월까지는 우기입니다.',
      'the rain enhances the beauty of the karst mountains.': '비는 카르스트 산의 아름다움을 더해줍니다.',
      'guilin liangjiang international airport (kwl) serves major chinese cities.': '구이린 량장 국제공항(KWL)은 중국 주요 도시를 연결합니다.',
      'trains connect guilin to major destinations.': '기차는 구이린을 주요 목적지와 연결합니다.',
      'buses and taxis are available in the city.': '도시 내에는 버스와 택시가 있습니다.',
      'boats are the main transportation for the li river.': '리강의 주요 교통수단은 보트입니다.',
      'book li river cruises in advance during peak season.': '성수기에는 리강 크루즈를 미리 예약하세요.',
      'yangshuo is worth staying overnight rather than as a day trip.': '양쑤오는 당일치기보다 하룻밤 머무를 가치가 있습니다.',

      // Yangshuo Practical Information
      'april to october offers the best weather, though summer can be hot. spring and autumn are ideal for outdoor activities.': '4월부터 10월까지 날씨가 가장 좋지만, 여름은 더울 수 있습니다. 봄과 가을은 야외 활동에 이상적입니다.',
      'most visitors arrive via guilin. direct buses run from guilin airport and train station to yangshuo.': '대부분의 방문객은 구이린을 통해 도착합니다. 구이린 공항과 기차역에서 양쑤오까지 직행 버스가 운행됩니다.',
      'bicycles and electric scooters are popular for exploring the countryside. taxis and buses connect to nearby villages.': '자전거와 전동 스쿠터는 시골을 탐험하는 데 인기 있는 방법입니다. 택시와 버스는 인근 마을과 연결됩니다.',
      'negotiate prices for bamboo rafts and other activities. west street is touristy but comes alive at night.': '대나무 뗏목과 기타 활동의 가격을 협상하세요. 서쪽 거리는 관광지이지만 밤에 활기를 띱니다.',

      // Exact matches for Yangshuo page
      'april to october offers the best weather, though summer can be hot.': '4월부터 10월까지 날씨가 가장 좋지만, 여름은 더울 수 있습니다.',
      'spring and autumn are ideal for outdoor activities.': '봄과 가을은 야외 활동에 이상적입니다.',
      'most visitors arrive via guilin.': '대부분의 방문객은 구이린을 통해 도착합니다.',
      'direct buses run from guilin airport and train station to yangshuo.': '구이린 공항과 기차역에서 양쑤오까지 직행 버스가 운행됩니다.',
      'bicycles and electric scooters are popular for exploring the countryside.': '자전거와 전동 스쿠터는 시골을 탐험하는 데 인기 있는 방법입니다.',
      'taxis and buses connect to nearby villages.': '택시와 버스는 인근 마을과 연결됩니다.',
      'negotiate prices for bamboo rafts and other activities.': '대나무 뗏목과 기타 활동의 가격을 협상하세요.',
      'west street is touristy but comes alive at night.': '서쪽 거리는 관광지이지만 밤에 활기를 띱니다.',

      // Zhangjiajie Practical Information
      'april to october is ideal, with september and october offering the best views. avoid summer holidays when it\'s crowded.': '4월부터 10월까지가 이상적이며, 9월과 10월에 가장 좋은 전망을 제공합니다. 붐비는 여름 휴가 시즌은 피하세요.',
      'zhangjiajie hehua airport (dyx) connects to major chinese cities. high-speed trains link to changsha, then transfer.': '장자제 허화 공항(DYX)은 중국 주요 도시와 연결됩니다. 고속철도는 창사와 연결되며, 그 후 환승합니다.',
      'park shuttles connect major attractions within zhangjiajie national forest park. cable cars and elevators save hiking time.': '공원 셔틀은 장자제 국립 산림 공원 내 주요 명소를 연결합니다. 케이블카와 엘리베이터는 하이킹 시간을 절약합니다.',
      'plan at least 2-3 days for the national park. buy multi-day tickets for better value. wear comfortable hiking shoes.': '국립공원을 위해 최소 2-3일을 계획하세요. 더 나은 가치를 위해 다일 티켓을 구매하세요. 편안한 하이킹 신발을 착용하세요.',

      // Exact matches for Zhangjiajie page
      'april to october is ideal, with september and october offering the best views.': '4월부터 10월까지가 이상적이며, 9월과 10월에 가장 좋은 전망을 제공합니다.',
      'avoid summer holidays when it\'s crowded.': '붐비는 여름 휴가 시즌은 피하세요.',
      'zhangjiajie hehua airport (dyx) connects to major chinese cities.': '장자제 허화 공항(DYX)은 중국 주요 도시와 연결됩니다.',
      'high-speed trains link to changsha, then transfer.': '고속철도는 창사와 연결되며, 그 후 환승합니다.',
      'park shuttles connect major attractions within zhangjiajie national forest park.': '공원 셔틀은 장자제 국립 산림 공원 내 주요 명소를 연결합니다.',
      'cable cars and elevators save hiking time.': '케이블카와 엘리베이터는 하이킹 시간을 절약합니다.',
      'plan at least 2-3 days for the national park.': '국립공원을 위해 최소 2-3일을 계획하세요.',
      'buy multi-day tickets for better value.': '더 나은 가치를 위해 다일 티켓을 구매하세요.',
      'wear comfortable hiking shoes.': '편안한 하이킹 신발을 착용하세요.',

      // Henan Practical Information
      'spring and autumn offer the most comfortable temperatures. avoid national holidays when sites like shaolin temple are crowded.': '봄과 가을은 가장 쾌적한 기온을 제공합니다. 소림사와 같은 명소가 붐비는 국경일은 피하세요.',
      'zhengzhou xinzheng international airport (cgo) is the main gateway. high-speed trains connect henan to major cities.': '정저우 신정 국제공항(CGO)이 주요 관문입니다. 고속철도는 허난을 주요 도시와 연결합니다.',
      'trains and buses connect major cities within henan. taxis and ride-sharing services are available in cities.': '기차와 버스는 허난 내 주요 도시를 연결합니다. 도시 내에는 택시와 승차 공유 서비스가 있습니다.',
      'plan separate days for shaolin temple and longmen grottoes as they are in different cities. luoyang water banquet requires advance booking.': '소림사와 룽먼 석굴은 다른 도시에 있으므로 별도의 날을 계획하세요. 뤄양 워터 뱅큇은 사전 예약이 필요합니다.',

      // Additional exact matches for all destinations
      'april to october is ideal. april-may and september-october offer pleasant weather and good visibility. avoid the rainy season in june-august when flooding can occur.': '4월부터 10월까지가 이상적입니다. 4-5월과 9-10월은 쾌적한 날씨와 좋은 가시성을 제공합니다. 홍수가 발생할 수 있는 6-8월 우기는 피하세요.',
      'guilin liangjiang international airport (kwl)': '구이린 량장 국제공항(KWL)',
      'buses and taxis in guilin city. bicycle, motorbike rental, or guided tours in yangshuo.': '구이린 시내에는 버스와 택시가 있습니다. 양쑤오에서는 자전거, 오토바이 대여 또는 가이드 투어가 가능합니다.',
      'consider taking the bus back from yangshuo to guilin instead of the boat to save time and money.': '시간과 비용을 절약하려면 배 대신 양쑤오에서 구이린으로 돌아가는 버스를 이용하는 것을 고려하세요.',

      'april to october for pleasant weather and lush scenery.': '쾌적한 날씨와 울창한 경치를 위해 4월부터 10월까지가 좋습니다.',
      'guilin liangjiang international airport (kwl), then bus or taxi to yangshuo': '구이린 량장 국제공항(KWL), 그 후 버스나 택시로 양쑤오까지',
      'bicycles, scooters, taxis, and local buses are common. many attractions are best explored by bike.': '자전거, 스쿠터, 택시, 현지 버스가 일반적입니다. 많은 명소는 자전거로 탐험하는 것이 가장 좋습니다.',
      'book accommodation in advance during peak season. bring cash for small vendors.': '성수기에는 숙소를 미리 예약하세요. 소규모 상인을 위해 현금을 준비하세요.',

      'spring (march-may) and autumn (september-november) for mild temperatures and less rain. winters are cold but less crowded.': '온화한 기온과 적은 강우량을 위해 봄(3-5월)과 가을(9-11월)이 좋습니다. 겨울은 춥지만 사람이 적습니다.',
      'subway, buses, and taxis are plentiful. the subway connects major attractions and is easy to navigate.': '지하철, 버스, 택시가 풍부합니다. 지하철은 주요 명소를 연결하고 탐색하기 쉽습니다.',
      'use the subway to avoid traffic jams. line 2 connects the train station with the bell tower area.': '교통 체증을 피하려면 지하철을 이용하세요. 2호선은 기차역과 종루 지역을 연결합니다.',

      'the metro is extensive, clean, efficient and has english signage. taxis are plentiful but may get stuck in traffic during peak hours.': '지하철은 광범위하고, 깨끗하며, 효율적이고 영어 표지판이 있습니다. 택시는 많지만 피크 시간에는 교통 체증에 걸릴 수 있습니다.',
      'use the maglev train from pudong airport for a fast ride into the city at speeds up to 430 km/h.': '푸동 공항에서 시속 430km까지 속도를 내는 자기부상열차를 이용하여 빠르게 도시로 이동하세요.',

      // Exact matches for Henan page
      'spring and autumn offer the most comfortable temperatures.': '봄과 가을은 가장 쾌적한 기온을 제공합니다.',
      'avoid national holidays when sites like shaolin temple are crowded.': '소림사와 같은 명소가 붐비는 국경일은 피하세요.',
      'zhengzhou xinzheng international airport (cgo) is the main gateway.': '정저우 신정 국제공항(CGO)이 주요 관문입니다.',
      'high-speed trains connect henan to major cities.': '고속철도는 허난을 주요 도시와 연결합니다.',
      'trains and buses connect major cities within henan.': '기차와 버스는 허난 내 주요 도시를 연결합니다.',
      'taxis and ride-sharing services are available in cities.': '도시 내에는 택시와 승차 공유 서비스가 있습니다.',
      'plan separate days for shaolin temple and longmen grottoes as they are in different cities.': '소림사와 룽먼 석굴은 다른 도시에 있으므로 별도의 날을 계획하세요.',
      'luoyang water banquet requires advance booking.': '뤄양 워터 뱅큇은 사전 예약이 필요합니다.',

      // Additional exact matches for Henan page
      'spring and autumn offer the most pleasant weather.': '봄과 가을은 가장 쾌적한 날씨를 제공합니다.',
      'zhengzhou xinzheng international airport (cgo)': '정저우 신정 국제공항(CGO)',
      'buses, taxis, and trains are available for convenient travel.': '버스, 택시, 기차가 편리한 여행을 위해 제공됩니다.',
      'consider hiring a local guide for a more in-depth experience.': '더 깊이 있는 경험을 위해 현지 가이드를 고용하는 것을 고려하세요.',

      // Translations for AboutPage
      'about_page_title': 'TravelSpot 정보',
      'about_page_subtitle': '세계를 탐험하고 여행의 의미를 발견하세요. 최고의 여행 경험을 제공하기 위해 최선을 다하고 있습니다.',
      'about_our_mission_title': '우리의 미션',
      'about_our_mission_text': '우리의 미션은 세심하게 계획된 여행 경험을 통해 사람과 문화를 연결하고, 탐험 정신을 고취시키며, 잊을 수 없는 추억을 만드세요. 우리는 여행이 시야를 넓히고 삶을 풍요롭게 한다고 믿습니다.',
      'about_our_story_title': 'TravelSpot은 여행에 대한 열정이 넘치는 탐험가 그룹에서 시작되었습니다. 여행 계획의 복잡성을 이해하고, 모든 사람이 완벽한 여행을 쉽게 발견하고 예약할 수 있는 플랫폼을 만들기로 결정했습니다. 처음 몇 개의 목적지에서 시작하여, 우리는 전 세계 여행자에게 서비스를 제공하는 신뢰할 수 있는 여행 파트너로 성장했습니다.',
      'about_our_story_text2': '우리는 중국의 독특한 목적지에 중점을 두고 있으며, 풍부한 문화, 장엄한 풍경, 그리고 따뜻한 환대를 보여주기 위해 최선을 다하고 있습니다.',
      'about_team_image_alt': '팀 또는 회사 장면',
      'about_why_choose_us_title': '왜 우리를 선택해야 하는가?',
      'about_feature_curated_destinations_title': '엄선된 목적지',
      'about_feature_curated_destinations_text': '우리는 독특하고 진정한 경험을 제공하기 위해 모든 목적지를 신중하게 선택하고 기획합니다.',
      'about_feature_expert_team_title': '전문 팀',
      'about_feature_expert_team_text': '경험이 풍부한 여행 전문가 팀이 항상 맞춤형 조언과 지원을 제공할 준비가 되어 있습니다.',
      'about_feature_customer_first_title': '고객 우선',
      'about_feature_customer_first_text': '고객님의 만족이 최우선입니다. 우리는 기대치를 뛰어넘는 훌륭한 서비스를 제공하기 위해 최선을 다합니다.',
      // Translations for ContactPage
      'contact_us_title': '문의하기',
      'contact_us_subtitle': '질문이나 제안 사항이 있으신가요? 언제든지 저희에게 연락해주세요!',
      'contact_methods_title': '연락 방법',
      'contact_email_label': '이메일',
      'contact_phone_label': '전화',
      'contact_address_label': '주소',
      'contact_address_value': '중국 베이징시 조양구 예시로 88번지',
      'contact_online_message_title': '온라인 메시지',
      'contact_online_message_text': '빠른 피드백을 원하시면 이메일을 보내거나 전화해 주시면 최대한 빨리 답변해 드리겠습니다.',
      // Footer Translations
      'footer_description': '전문적으로 선별된 여행 가이드와 리소스를 통해 세계에서 가장 숨막히는 목적지를 발견하십시오.',
      'footer_destinations_title': '목적지',
      'footer_beaches': '해변',
      'footer_mountains': '산',
      'footer_cities': '도시',
      'footer_quick_links_title': '빠른 링크',
      'footer_about_us': '회사 소개',
      'footer_destinations_link': '목적지',
      'footer_travel_guides': '여행 가이드',
      'footer_faqs': '자주 묻는 질문',
      'footer_privacy_policy': '개인 정보 정책',
      'footer_terms_of_service': '서비스 약관',
      'footer_contact_us_title': '문의하기',
      'footer_contact': '연락처',
      'footer_rights_reserved': '모든 권리 보유.',
      'footer_privacy': '개인 정보',
      'footer_terms': '항관',
      'footer_sitemap': '사이트맵',

      // Newsletter Translations
      'newsletter_title': '여행 영감 얻기',
      'newsletter_subtitle': '뉴스레터를 구독하고 독점 할인, 여행 가이드 및 다음 모험을 위한 팁을 받아보세요.',
      'newsletter_email_placeholder': '이메일 주소',
      'newsletter_subscribe_button': '구독하기',
      'newsletter_privacy_notice': '구독함으로써 개인정보 보호정책에 동의하고 여행 관련 이메일을 수신하는 데 동의합니다.',

      // FAQ Page Translations
      'faq_page_title': '자주 묻는 질문',
      'faq_page_subtitle': '여행 예약, 일정 등에 대한 질문의 답변을 여기에서 찾아보세요.',
      'faq_section_title': '무엇을 도와드릴까요?',
      'faq_q1': '여행 패키지는 어떻게 예약하나요?',
      'faq_a1': '저희 웹사이트에서 관심 있는 목적지와 패키지를 직접 선택하고 안내에 따라 예약 절차를 완료할 수 있습니다. 도움이 필요하시면 고객 서비스 팀에 문의할 수도 있습니다.',
      'faq_q2': '일정을 맞춤 설정할 수 있나요?',
      'faq_a2': '네, 맞춤형 여행 서비스를 제공합니다. 여행 컨설턴트에게 필요 사항과 선호도를 알려주시면 전용 일정을 만들어 드립니다.',
      'faq_q3': '어떤 결제 수단을 사용할 수 있나요?',
      'faq_a3': '주요 신용카드(Visa, MasterCard, American Express), 알리페이, 위챗페이 등 다양한 결제 수단을 사용할 수 있습니다. 결제 페이지에서 지원되는 옵션을 확인하세요.',
      'faq_q4': '예약을 취소해야 하는 경우 어떻게 하나요?',
      'faq_a4': '취소 정책은 패키지 및 예약 시간에 따라 다릅니다. 예약 확인 이메일의 특정 취소 약관을 참조하거나 고객 서비스에 문의하여 자세한 내용을 확인하세요.',
      'faq_q5': '여행 패키지에 보험이 포함되어 있나요?',
      'faq_a5': '일부 여행 패키지에는 기본 여행자 보험이 포함될 수 있지만, 개인의 필요에 따라 추가 종합 여행자 보험에 가입하는 것이 좋습니다. 자세한 내용은 고객 서비스에 문의하거나 패키지 설명을 확인하세요.',
      'faq_q6': '중국으로 여행하려면 비자가 필요한가요?',
      'faq_a6': '비자 요건은 국적에 따라 다릅니다. 해당 국가의 중국 대사관 또는 영사관 공식 웹사이트를 확인하거나 비자 서비스 부서에 문의하여 최신 정보를 확인하세요.'
    }
  };

  const t = (key: string, params?: Record<string, string>): string => {
      const lowerKey = key.toLowerCase();
      // 添加调试信息
      console.log(`Current language: ${language}, Trying to translate key: ${lowerKey}`);
      console.log('Translation found:', translations[language]?.[lowerKey] || 'NOT FOUND');

      let translatedText = translations[language]?.[lowerKey] || key;

      // 处理参数替换，例如 {email}
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          translatedText = translatedText.replace(`{${paramKey}}`, paramValue);
        });
      }

      return translatedText;
    };
    // Line 857: Ensure this line is either blank OR DOES NOT CONTAIN an erroneous `};`
    // An extra `};` here would prematurely close LanguageProvider, causing the errors.
    // This is the main return statement for the LanguageProvider component (starts at line 858)
    return (
      <LanguageContext.Provider value={{ language, setLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    ); // This is line 862, closing the JSX return.
  }; // This is line 863, correctly closing the LanguageProvider component.

  // Hook for using language
  export const useLanguage = () => useContext(LanguageContext);

  // Language Switcher Component
  const LanguageSwitcher = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-gray-600 hover:text-travel-blue">
              <Globe className="mr-2 h-4 w-4" />
              {language === 'en' && t('english')}
              {language === 'zh-CN' && t('zh_simple')}
              {language === 'zh-TW' && t('zh_traditional')}
              {language === 'ko' && t('korean')}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-2 w-40">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setLanguage('en');
                    console.log('Language switched to: en');
                    // 强制刷新页面以确保翻译生效
                    window.location.reload();
                  }}
                >
                  {t('english')}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setLanguage('zh-CN');
                    console.log('Language switched to: zh-CN');
                    // 强制刷新页面以确保翻译生效
                    window.location.reload();
                  }}
                >
                  {t('zh_simple')}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setLanguage('zh-TW');
                    console.log('Language switched to: zh-TW');
                    // 强制刷新页面以确保翻译生效
                    window.location.reload();
                  }}
                >
                  {t('zh_traditional')}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setLanguage('ko');
                    console.log('Language switched to: ko');
                    // 强制刷新页面以确保翻译生效
                    window.location.reload();
                  }}
                >
                  {t('korean')}
                </Button>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  export default LanguageSwitcher;
