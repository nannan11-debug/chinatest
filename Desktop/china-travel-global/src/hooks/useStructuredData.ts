import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { destinations } from '@/data/destinations'

// 结构化数据生成器
export function useStructuredData() {
  const location = useLocation()

  useEffect(() => {
    // 移除旧的结构化数据
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]')
    oldScripts.forEach(script => script.remove())

    // 生成基础结构化数据
    const baseData: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Discover China",
        "url": "https://travelspot.hk.cn",
        "description": "Ultimate travel guide for exploring China - destinations, travel tips, local cuisine, and cultural insights for global travelers",
        "inLanguage": ["en", "zh", "ja", "ko"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://travelspot.hk.cn/destinations?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Discover China",
        "url": "https://travelspot.hk.cn",
        "logo": "https://travelspot.hk.cn/images/destinations/new/logo.jpg",
        "sameAs": [
          "https://www.tiktok.com/@china.travel66",
          "https://www.youtube.com/@chinatravel-e4v"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+8615617692113",
          "email": "nannancheerup@gmail.com",
          "contactType": "customer service",
          "areaServed": ["CN", "US", "JP", "KR", "GB", "AU"],
          "availableLanguage": ["en", "Chinese", "Japanese", "Korean"]
        },
        "description": "Your trusted guide to traveling in China — curated destinations, local insights, and bespoke itineraries"
      }
    ]

    // 检查是否是目的地详情页
    const destinationMatch = location.pathname.match(/\/destination\/(.+)/)
    if (destinationMatch) {
      const destinationId = destinationMatch[1]
      const destination = destinations.find(d => d.id === destinationId)

      if (destination) {
        // 添加完整的 TouristDestination 结构化数据（包含 aggregateRating）
        baseData.push({
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          "name": destination.name,
          "description": destination.description.en,
          "url": `https://travelspot.hk.cn/destination/${destination.id}`,
          "image": destination.imageUrl,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CN",
            "addressLocality": destination.location
          },
          "touristType": ["Cultural Tourism", "Historical Tourism", "Nature Tourism", "Food Tourism", "Family Travel"],
          "publicAccess": "True",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": String(destination.rating),
            "bestRating": "5",
            "reviewCount": String(Math.floor(destination.rating * 100))
          }
        })

        // 添加 ImageObject
        baseData.push({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "contentUrl": destination.imageUrl,
          "name": `${destination.name} - Discover China`,
          "description": `Discover the beauty of ${destination.name}`,
          "representativeOfPage": "True"
        })

        // 添加 BreadcrumbList
        baseData.push({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Discover China",
              "item": "https://travelspot.hk.cn"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Destinations",
              "item": "https://travelspot.hk.cn/destinations"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": destination.name,
              "item": `https://travelspot.hk.cn/destination/${destination.id}`
            }
          ]
        })

        // 添加 FAQPage
        baseData.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `What is the best time to visit ${destination.name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": destination.bestTimeToVisit.en
              }
            },
            {
              "@type": "Question",
              "name": `What are the must-see attractions in ${destination.name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": destination.highlights.join(", ")
              }
            },
            {
              "@type": "Question",
              "name": `What local food should I try in ${destination.name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": destination.localFood.join(", ")
              }
            }
          ]
        })
      }
    }

    // 注入结构化数据
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(baseData)
    document.head.appendChild(script)

  }, [location.pathname])
}

export default useStructuredData
