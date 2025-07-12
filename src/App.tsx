import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";
import SecurityHeaders from "./components/SecurityHeaders";
import ScrollToTop from "./components/ScrollToTop";

// Main Pages
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import RequestQuote from "./pages/RequestQuote";
import BookVisit from "./pages/BookVisit";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Testimonials from "./pages/Testimonials";
import SubmitTestimonial from "./pages/SubmitTestimonial";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// New Pages
import News from "./pages/News";
import Careers from "./pages/Careers";
import CaseStudies from "./pages/CaseStudies";

// Service Detail Pages
import ServiceDetail from "./pages/ServiceDetail";
import Consulting from "./pages/Services/Consulting";

// Additional Pages
import Team from "./pages/Team";
import Career from "./pages/Career";
import FAQ from "./pages/FAQ";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import Resources from "./pages/Resources";
import Gallery from "./pages/Gallery";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminAccess from "./pages/AdminAccess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminClients from "./pages/admin/AdminClients";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminTemplates from "./pages/admin/AdminTemplates";
import AdminLetterheads from "./pages/admin/AdminLetterheads";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminBackup from "./pages/admin/AdminBackup";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <TooltipProvider>
          <SecurityHeaders />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/services/consulting" element={<Consulting />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quote" element={<RequestQuote />} />
              <Route path="/request-quote" element={<RequestQuote />} />
              <Route path="/book-visit" element={<BookVisit />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* New Routes */}
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<BlogPost />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:id" element={<CaseStudies />} />

              {/* Additional Pages */}
              <Route path="/team" element={<Team />} />
              <Route path="/career" element={<Career />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/create-project" element={<CreateProject />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminAccess />} />
              <Route path="/admin-access" element={<AdminAccess />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/invoices" element={<AdminInvoices />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/quotes" element={<AdminQuotes />} />
              <Route path="/admin/templates" element={<AdminTemplates />} />
              <Route path="/admin/letterheads" element={<AdminLetterheads />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/tasks" element={<AdminTasks />} />
              <Route path="/admin/documents" element={<AdminDocuments />} />
              <Route path="/admin/inventory" element={<AdminInventory />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/backup" element={<AdminBackup />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
