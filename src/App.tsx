import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AdminProvider } from "@/contexts/AdminContext";
import React from "react";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminInvoices from "@/pages/admin/AdminInvoices";
import AdminClients from "@/pages/admin/AdminClients";
import AdminServices from "@/pages/admin/AdminServices";
import AdminTemplates from "@/pages/admin/AdminTemplates";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminReports from "@/pages/admin/AdminReports";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminInventory from "@/pages/admin/AdminInventory";
import AdminTasks from "@/pages/admin/AdminTasks";
import AdminDocuments from "@/pages/admin/AdminDocuments";
import AdminLetterheads from "@/pages/admin/AdminLetterheads";
import AdminBackup from "@/pages/admin/AdminBackup";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminQuotations from "@/pages/admin/AdminQuotations";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminAccess from "./pages/AdminAccess";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BookVisit from "./pages/BookVisit";
import Career from "./pages/Career";
import Careers from "./pages/Careers";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";
import CreateProject from "./pages/CreateProject";
import FAQ from "./pages/FAQ";
import Gallery from "./pages/Gallery";
import Features from "./pages/Features";
import Index from "./pages/Index";
import Industries from "./pages/Industries";
import MilestoneViewer from "./pages/MilestoneViewer";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Projects from "./pages/Projects";
import PublicPage from "./pages/PublicPage";
import RequestQuote from "./pages/RequestQuote";
import Resources from "./pages/Resources";
import ServiceDetail from "./pages/ServiceDetail";
import Solutions from "./pages/Solutions";
import SubmitTestimonial from "./pages/SubmitTestimonial";
import Team from "./pages/Team";
import Terms from "./pages/Terms";
import Testimonials from "./pages/Testimonials";
import Consulting from "./pages/Services/Consulting";
import Services from "./pages/Services";


const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AdminProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin-access" element={<AdminAccess />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog-post" element={<BlogPost/>} />
                <Route path="/book-visit" element={<BookVisit />} />
                <Route path="/career" element={<Career />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/features" element={<Features />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/index" element={<Index />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/milestone-viewer" element={<MilestoneViewer />} />
                <Route path="/news" element={<News />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/public-page" element={<PublicPage />} />
                <Route path="/request-quote" element={<RequestQuote />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/services-detail" element={<ServiceDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
                <Route path="/team" element={<Team />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/services/consulting" element={<Consulting />} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/invoices" element={<AdminInvoices />} />
                <Route path="/admin/quotations" element={<AdminQuotations />} />
                <Route path="/admin/clients" element={<AdminClients />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/templates" element={<AdminTemplates />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/inventory" element={<AdminInventory />} />
                <Route path="/admin/tasks" element={<AdminTasks />} />
                <Route path="/admin/documents" element={<AdminDocuments />} />
                <Route path="/admin/letterheads" element={<AdminLetterheads />} />
                <Route path="/admin/backup" element={<AdminBackup />} />
                <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                <Route path="/admin/quotes" element={<AdminQuotations />} />
                
                {/* Add more routes as needed */}
              </Routes>
            </AdminProvider>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);

export default App;
