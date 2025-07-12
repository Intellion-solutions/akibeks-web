import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Consulting from './pages/Consulting';
import Projects from './pages/Projects';
import Portfolio from './pages/Portfolio';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import SubmitTestimonial from './pages/SubmitTestimonial';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import RequestQuote from './pages/RequestQuote';
import BookVisit from './pages/BookVisit';
import CreateProject from './pages/CreateProject';
import Career from './pages/Career';
import Careers from './pages/Careers';
import News from './pages/News';
import CaseStudies from './pages/CaseStudies';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Resources from './pages/Resources';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
import AdminAccess from './pages/AdminAccess';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminClients from './pages/admin/AdminClients';
import AdminInvoices from './pages/admin/AdminInvoices';
import AdminQuotes from './pages/admin/AdminQuotes';
import AdminTasks from './pages/admin/AdminTasks';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminInventory from './pages/admin/AdminInventory';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminReports from './pages/admin/AdminReports';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminLetterheads from './pages/admin/AdminLetterheads';
import AdminBackup from './pages/admin/AdminBackup';
import MilestoneViewer from './pages/MilestoneViewer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/consulting" element={<Consulting />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/book-visit" element={<BookVisit />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/career" element={<Career />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/news" element={<News />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin-access" element={<AdminAccess />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/invoices" element={<AdminInvoices />} />
          <Route path="/admin/quotes" element={<AdminQuotes />} />
          <Route path="/admin/tasks" element={<AdminTasks />} />
          <Route path="/admin/documents" element={<AdminDocuments />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/templates" element={<AdminTemplates />} />
          <Route path="/admin/letterheads" element={<AdminLetterheads />} />
          <Route path="/admin/backup" element={<AdminBackup />} />
          
          {/* Public milestone viewer */}
          <Route path="/milestone/:token" element={<MilestoneViewer />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
