
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminContextType {
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  companySettings: Record<string, string>;
  refreshSettings: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companySettings, setCompanySettings] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken === 'admin_authenticated') {
      setIsAdmin(true);
      setIsAuthenticated(true);
    }
    
    // Load company settings
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('company_settings')
        .select('*');

      if (error) throw error;
      
      const settingsObj: Record<string, string> = {};
      data?.forEach(setting => {
        settingsObj[setting.setting_key] = setting.setting_value || '';
      });
      
      // Set default values if not in database
      const defaultSettings = {
        company_name: 'AKIBEKS Engineering Solutions',
        company_email: 'info@akibeks.co.ke',
        company_phone: '+254 710 245 118',
        whatsapp_number: '+254 710 245 118',
        company_address: 'Nairobi, Kenya',
        business_hours: 'Monday - Friday: 8:00 AM - 6:00 PM',
        emergency_contact: '+254 710 245 118',
        default_quote_terms: 'Quote valid for 30 days. All prices are in KSH and exclude VAT unless otherwise stated.',
        default_payment_terms: 'Payment due within 30 days of invoice date.'
      };
      
      setCompanySettings({ ...defaultSettings, ...settingsObj });
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const login = async (password: string): Promise<boolean> => {
    // Simple password check - in production, this should be more secure
    if (password === 'admin123') {
      setIsAdmin(true);
      setIsAuthenticated(true);
      localStorage.setItem('admin_token', 'admin_authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
  };

  const refreshSettings = async () => {
    await fetchSettings();
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      isAuthenticated,
      login,
      logout,
      companySettings,
      refreshSettings
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
