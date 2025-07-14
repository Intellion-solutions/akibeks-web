import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import React from "react";
import Index from "./Index";
import About from "./About";
import AdminAccess from "./AdminAccess";


const queryClient = new QueryClient();

const PublicPage = () => (
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={< About/>} />
                <Route path="/admin-access" element={<AdminAccess />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />
                <Route path="/" element={<Index />} />

              </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);

export default PublicPage;
