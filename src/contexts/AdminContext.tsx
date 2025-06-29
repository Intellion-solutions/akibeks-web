
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CompanySettings {
  company_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  tax_id?: string;
  registration_number?: string;
  logo_url?: string;
  description?: string;
  currency_symbol?: string;
  tax_rate?: number;
  payment_terms?: string;
  invoice_prefix?: string;
  quote_prefix?: string;
  email_notifications?: boolean;
  project_updates?: boolean;
  payment_reminders?: boolean;
  quote_expiry_alerts?: boolean;
  system_maintenance?: boolean;
  timezone?: string;
  date_format?: string;
  language?: string;
  backup_frequency?: string;
  auto_archive?: boolean;
  two_factor_auth?: boolean;
  session_timeout?: number;
  password_policy?: string;
  login_attempts?: number;
  ip_restrictions?: boolean;
  theme?: string;
  primary_color?: string;
  sidebar_collapsed?: boolean;
  compact_mode?: boolean;
  show_animations?: boolean;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  companySettings: CompanySettings;
  loadCompanySettings: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companySettings, setCompanySettings] = useState<CompanySettings>({});
  const { toast } = useToast();

  const loadCompanySettings = async () => {
    try {
      const { data, error } = await supabase
        .from('company_settings')
        .select('*');

      if (error) throw error;

      // Convert array of settings to object
      const settingsObj: CompanySettings = {};
      data?.forEach((setting) => {
        settingsObj[setting.setting_key as keyof CompanySettings] = setting.setting_value;
      });

      setCompanySettings(settingsObj);
    } catch (error) {
      console.error('Error loading company settings:', error);
      toast({
        title: "Error",
        description: "Failed to load company settings",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadCompanySettings();
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // Simple password check - in production, this should be more secure
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      await loadCompanySettings();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setCompanySettings({});
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      companySettings,
      loadCompanySettings
    }}>
      {children}
    </AdminContext.Provider>
  );
};
