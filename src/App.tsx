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
import PublicPage from "@/pages/PublicPage";
import AdminQuotations from "@/pages/admin/AdminQuotations";
import Quotes from "@/pages/Quotes";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicPage />} />
                <Route path="/quotes" element={<Quotes />} />
                
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
            </BrowserRouter>
          </TooltipProvider>
        </AdminProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);

export default App;
