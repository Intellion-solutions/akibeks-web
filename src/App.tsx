
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminProvider } from '@/contexts/AdminContext';

import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Projects from '@/pages/Projects';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import AdminAccess from '@/pages/AdminAccess';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminClients from '@/pages/admin/AdminClients';
import AdminInvoices from '@/pages/admin/AdminInvoices';
import AdminQuotes from '@/pages/admin/AdminQuotes';
import AdminTasks from '@/pages/admin/AdminTasks';
import AdminInventory from '@/pages/admin/AdminInventory';
import AdminDocuments from '@/pages/admin/AdminDocuments';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminTestimonials from '@/pages/admin/AdminTestimonials';
import AdminReports from '@/pages/admin/AdminReports';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminTemplates from '@/pages/admin/AdminTemplates';
import AdminLetterheads from '@/pages/admin/AdminLetterheads';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminBackup from '@/pages/admin/AdminBackup';
import AuthGuard from '@/components/AuthGuard';
import AdminServices from '@/pages/admin/AdminServices';
import AdminProjects from '@/pages/admin/AdminProjects';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AdminProvider>
          <div className="min-h-screen bg-background">
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin-access" element={
                <AuthGuard requireAuth={false}>
                  <AdminAccess />
                </AuthGuard>
              } />
              <Route path="/admin/*" element={
                <AuthGuard requireAuth={true}>
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="clients" element={<AdminClients />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="invoices" element={<AdminInvoices />} />
                    <Route path="quotes" element={<AdminQuotes />} />
                    <Route path="tasks" element={<AdminTasks />} />
                    <Route path="inventory" element={<AdminInventory />} />
                    <Route path="documents" element={<AdminDocuments />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="testimonials" element={<AdminTestimonials />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="reports" element={<AdminReports />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="templates" element={<AdminTemplates />} />
                    <Route path="letterheads" element={<AdminLetterheads />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="backup" element={<AdminBackup />} />
                  </Routes>
                </AuthGuard>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
            <Toaster />
          </div>
        </AdminProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
