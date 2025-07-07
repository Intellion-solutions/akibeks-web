
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AdminProvider } from "@/contexts/AdminContext";
import SecurityHeaders from "@/components/SecurityHeaders";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import Gallery from "./pages/Gallery";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import RequestQuote from "./pages/RequestQuote";
import BookVisit from "./pages/BookVisit";
import Testimonials from "./pages/Testimonials";
import SubmitTestimonial from "./pages/SubmitTestimonial";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Team from "./pages/Team";
import Career from "./pages/Career";
import FAQ from "./pages/FAQ";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import Consulting from "./pages/Services/Consulting";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminClients from "./pages/admin/AdminClients";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminTemplates from "./pages/admin/AdminTemplates";
import AdminBackup from "./pages/admin/AdminBackup";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SecurityHeaders />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/services/consulting" element={<Consulting />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request-quote" element={<RequestQuote />} />
              <Route path="/book-visit" element={<BookVisit />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/team" element={<Team />} />
              <Route path="/career" element={<Career />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/resources" element={<Resources />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/quotes" element={<AdminQuotes />} />
              <Route path="/admin/invoices" element={<AdminInvoices />} />
              <Route path="/admin/tasks" element={<AdminTasks />} />
              <Route path="/admin/inventory" element={<AdminInventory />} />
              <Route path="/admin/documents" element={<AdminDocuments />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/templates" element={<AdminTemplates />} />
              <Route path="/admin/backup" element={<AdminBackup />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
