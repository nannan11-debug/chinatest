import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ConfuciusQuote } from './components/TravelEasterEggs'
import { LoadingAnimation } from './components/LoadingAnimations'
import useStructuredData from './hooks/useStructuredData'
import Index from './pages/Index'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetail from './pages/DestinationDetail'
import TravelGuidesPage from './pages/TravelGuidesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQsPage from './pages/FAQsPage'
import NotFound from './pages/NotFound'
import './App.css'

// 结构化数据包装器
function StructuredDataProvider({ children }: { children: React.ReactNode }) {
  useStructuredData()
  return <>{children}</>
}

function App() {
  const { i18n } = useTranslation()

  return (
    <Router>
      <div className="min-h-screen flex flex-col chinese-paper" key={i18n.language}>
        <StructuredDataProvider>
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><LoadingAnimation type="scroll" text="Unfolding your journey..." /></div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destination/:id" element={<DestinationDetail />} />
                <Route path="/travel-guides" element={<TravelGuidesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ConfuciusQuote />
        </StructuredDataProvider>
      </div>
    </Router>
  )
}

export default App
