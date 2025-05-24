
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetail from "./pages/DestinationDetail";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./components/LanguageSwitcher";
import AboutPage from "./pages/AboutPage";
import TravelGuidesPage from "./pages/TravelGuidesPage";
import FAQsPage from "./pages/FAQsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"; // <-- Import PrivacyPolicyPage
import TermsOfServicePage from "./pages/TermsOfServicePage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/travel-guides" element={<TravelGuidesPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> {/* <-- Add route for Privacy Policy */}
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
