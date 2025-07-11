
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import RequestQuote from './pages/RequestQuote';
import Resources from './pages/Resources';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInvoices from './pages/admin/AdminInvoices';
import AdminClients from './pages/admin/AdminClients';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminInventory from './pages/admin/AdminInventory';
import AdminProjects from './pages/admin/AdminProjects';
import SecurityHeaders from './components/SecurityHeaders';
import ScrollToTop from './components/ScrollToTop';
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import AdminLetterheads from "./pages/admin/AdminLetterheads";
import SubmitTestimonial from "./pages/SubmitTestimonial";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <SecurityHeaders />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/invoices" element={<AdminInvoices />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/templates" element={<AdminTemplates />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/admin/letterheads" element={<AdminLetterheads />} />
          <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
