
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Settings, Building, Mail, Bell, Shield, Palette, Globe, Upload, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminSettings = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings, loadCompanySettings } = useAdmin();
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    company: {
      company_name: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      tax_id: "",
      registration_number: "",
      logo_url: "",
      description: ""
    },
    financial: {
      currency_symbol: "KSh",
      tax_rate: "16",
      payment_terms: "30",
      invoice_prefix: "INV",
      quote_prefix: "QTE"
    },
    notifications: {
      email_notifications: true,
      project_updates: true,
      payment_reminders: true,
      quote_expiry_alerts: true,
      system_maintenance: false
    },
    system: {
      timezone: "Africa/Nairobi",
      date_format: "DD/MM/YYYY",
      language: "en",
      backup_frequency: "daily",
      auto_archive: true
    },
    security: {
      two_factor_auth: false,
      session_timeout: "60",
      password_policy: "medium",
      login_attempts: "5",
      ip_restrictions: false
    },
    appearance: {
      theme: "light",
      primary_color: "#f97316",
      sidebar_collapsed: false,
      compact_mode: false,
      show_animations: true
    }
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('company_settings')
        .select('*');

      if (error) throw error;

      // Convert array to object for easier access
      const settingsObj = {};
      data?.forEach(setting => {
        settingsObj[setting.setting_key] = setting.setting_value;
      });

      // Update state with loaded settings
      setSettings(prev => ({
        company: {
          ...prev.company,
          company_name: settingsObj.company_name || "",
          address: settingsObj.address || "",
          phone: settingsObj.phone || "",
          email: settingsObj.email || "",
          website: settingsObj.website || "",
          tax_id: settingsObj.tax_id || "",
          registration_number: settingsObj.registration_number || "",
          logo_url: settingsObj.logo_url || "",
          description: settingsObj.description || ""
        },
        financial: {
          ...prev.financial,
          currency_symbol: settingsObj.currency_symbol || "KSh",
          tax_rate: settingsObj.tax_rate || "16",
          payment_terms: settingsObj.payment_terms || "30",
          invoice_prefix: settingsObj.invoice_prefix || "INV",
          quote_prefix: settingsObj.quote_prefix || "QTE"
        },
        notifications: {
          ...prev.notifications,
          email_notifications: settingsObj.email_notifications === "true",
          project_updates: settingsObj.project_updates === "true",
          payment_reminders: settingsObj.payment_reminders === "true",
          quote_expiry_alerts: settingsObj.quote_expiry_alerts === "true",
          system_maintenance: settingsObj.system_maintenance === "true"
        },
        system: {
          ...prev.system,
          timezone: settingsObj.timezone || "Africa/Nairobi",
          date_format: settingsObj.date_format || "DD/MM/YYYY",
          language: settingsObj.language || "en",
          backup_frequency: settingsObj.backup_frequency || "daily",
          auto_archive: settingsObj.auto_archive === "true"
        },
        security: {
          ...prev.security,
          two_factor_auth: settingsObj.two_factor_auth === "true",
          session_timeout: settingsObj.session_timeout || "60",
          password_policy: settingsObj.password_policy || "medium",
          login_attempts: settingsObj.login_attempts || "5",
          ip_restrictions: settingsObj.ip_restrictions === "true"
        },
        appearance: {
          ...prev.appearance,
          theme: settingsObj.theme || "light",
          primary_color: settingsObj.primary_color || "#f97316",
          sidebar_collapsed: settingsObj.sidebar_collapsed === "true",
          compact_mode: settingsObj.compact_mode === "true",
          show_animations: settingsObj.show_animations === "true"
        }
      }));
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      });
    }
  };

  const saveSettings = async (category) => {
    setLoading(true);
    try {
      const settingsToSave = settings[category];
      const updates = [];

      Object.entries(settingsToSave).forEach(([key, value]) => {
        updates.push({
          setting_key: key,
          setting_value: typeof value === 'boolean' ? value.toString() : value.toString(),
          description: `${category} setting for ${key}`
        });
      });

      // Upsert settings
      const { error } = await supabase
        .from('company_settings')
        .upsert(updates, { 
          onConflict: 'setting_key',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: `${category} settings have been updated successfully.`,
      });

      // Reload company settings context
      loadCompanySettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            System Settings
          </h1>
          <p className="text-gray-600 mt-2">Configure your company settings and system preferences</p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <span>💰</span>
              Financial
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* Company Settings */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Information
                </CardTitle>
                <CardDescription>
                  Update your company details and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={settings.company.company_name}
                      onChange={(e) => updateSetting('company', 'company_name', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Company Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.company.email}
                      onChange={(e) => updateSetting('company', 'email', e.target.value)}
                      placeholder="Enter company email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.company.phone}
                      onChange={(e) => updateSetting('company', 'phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={settings.company.website}
                      onChange={(e) => updateSetting('company', 'website', e.target.value)}
                      placeholder="Enter website URL"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={settings.company.address}
                    onChange={(e) => updateSetting('company', 'address', e.target.value)}
                    placeholder="Enter company address"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      value={settings.company.tax_id}
                      onChange={(e) => updateSetting('company', 'tax_id', e.target.value)}
                      placeholder="Enter tax ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="regNumber">Registration Number</Label>
                    <Input
                      id="regNumber"
                      value={settings.company.registration_number}
                      onChange={(e) => updateSetting('company', 'registration_number', e.target.value)}
                      placeholder="Enter registration number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={settings.company.description}
                    onChange={(e) => updateSetting('company', 'description', e.target.value)}
                    placeholder="Enter company description"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="logo">Company Logo</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <span className="text-sm text-gray-500">
                      Recommended size: 200x60px, PNG or JPG
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => saveSettings('company')} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Settings */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💰 Financial Settings
                </CardTitle>
                <CardDescription>
                  Configure financial and invoicing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currency">Currency Symbol</Label>
                    <Select
                      value={settings.financial.currency_symbol}
                      onValueChange={(value) => updateSetting('financial', 'currency_symbol', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KSh">KSh (Kenyan Shilling)</SelectItem>
                        <SelectItem value="$">$ (US Dollar)</SelectItem>
                        <SelectItem value="€">€ (Euro)</SelectItem>
                        <SelectItem value="£">£ (British Pound)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={settings.financial.tax_rate}
                      onChange={(e) => updateSetting('financial', 'tax_rate', e.target.value)}
                      placeholder="16"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="paymentTerms">Default Payment Terms (days)</Label>
                    <Input
                      id="paymentTerms"
                      type="number"
                      value={settings.financial.payment_terms}
                      onChange={(e) => updateSetting('financial', 'payment_terms', e.target.value)}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
                    <Input
                      id="invoicePrefix"
                      value={settings.financial.invoice_prefix}
                      onChange={(e) => updateSetting('financial', 'invoice_prefix', e.target.value)}
                      placeholder="INV"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="quotePrefix">Quote Number Prefix</Label>
                  <Input
                    id="quotePrefix"
                    value={settings.financial.quote_prefix}
                    onChange={(e) => updateSetting('financial', 'quote_prefix', e.target.value)}
                    placeholder="QTE"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => saveSettings('financial')} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.notifications.email_notifications}
                      onCheckedChange={(checked) => updateSetting('notifications', 'email_notifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="projectUpdates">Project Updates</Label>
                      <p className="text-sm text-gray-500">Get notified about project status changes</p>
                    </div>
                    <Switch
                      id="projectUpdates"
                      checked={settings.notifications.project_updates}
                      onCheckedChange={(checked) => updateSetting('notifications', 'project_updates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paymentReminders">Payment Reminders</Label>
                      <p className="text-sm text-gray-500">Reminders for overdue invoices</p>
                    </div>
                    <Switch
                      id="paymentReminders"
                      checked={settings.notifications.payment_reminders}
                      onCheckedChange={(checked) => updateSetting('notifications', 'payment_reminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="quoteExpiry">Quote Expiry Alerts</Label>
                      <p className="text-sm text-gray-500">Alerts when quotes are about to expire</p>
                    </div>
                    <Switch
                      id="quoteExpiry"
                      checked={settings.notifications.quote_expiry_alerts}
                      onCheckedChange={(checked) => updateSetting('notifications', 'quote_expiry_alerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="systemMaintenance">System Maintenance</Label>
                      <p className="text-sm text-gray-500">Notifications about system updates</p>
                    </div>
                    <Switch
                      id="systemMaintenance"
                      checked={settings.notifications.system_maintenance}
                      onCheckedChange={(checked) => updateSetting('notifications', 'system_maintenance', checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => saveSettings('notifications')} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.system.timezone}
                      onValueChange={(value) => updateSetting('system', 'timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={settings.system.date_format}
                      onValueChange={(value) => updateSetting('system', 'date_format', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={settings.system.language}
                      onValueChange={(value) => updateSetting('system', 'language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="sw">Swahili</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="backupFreq">Backup Frequency</Label>
                    <Select
                      value={settings.system.backup_frequency}
                      onValueChange={(value) => updateSetting('system', 'backup_frequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select backup frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoArchive">Auto Archive Completed Projects</Label>
                    <p className="text-sm text-gray-500">Automatically archive projects after completion</p>
                  </div>
                  <Switch
                    id="autoArchive"
                    checked={settings.system.auto_archive}
                    onCheckedChange={(checked) => updateSetting('system', 'auto_archive', checked)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => saveSettings('system')} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={settings.security.two_factor_auth}
                    onCheckedChange={(checked) => updateSetting('security', 'two_factor_auth', checked)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.security.session_timeout}
                      onChange={(e) => updateSetting('security', 'session_timeout', e.target.value)}
                      placeholder="60"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={settings.security.login_attempts}
                      onChange={(e) => updateSetting('security', 'login_attempts', e.target.value)}
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select
                    value={settings.security.password_policy}
                    onValueChange={(value) => updateSetting('security', 'password_policy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select password policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (8+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, numbers)</SelectItem>
                      <SelectItem value="high">High (8+ chars, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ipRestrictions">IP Address Restrictions</Label>
                    <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
                  </div>
                  <Switch
                    id="ipRestrictions"
                    checked={settings.security.ip_restrictions}
                    onCheckedChange={(checked) => updateSetting('security', 'ip_restrictions', checked)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => saveSettings('security')} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your admin panel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={settings.appearance.theme}
                      onValueChange={(value) => updateSetting('appearance', 'theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.appearance.primary_color}
                        onChange={(e) => updateSetting('appearance', 'primary_color', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={settings.appearance.primary_color}
                        onChange={(e) => updateSetting('appearance', 'primary_color', e.target.value)}
                        placeholder="#f97316"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sidebarCollapsed">Collapsed Sidebar by Default</Label>
                      <p className="text-sm text-gray-500">Start with a collapsed sidebar</p>
                    </div>
                    <Switch
                      id="sidebarCollapsed"
                      checked={settings.appearance.sidebar_collapsed}
                      onCheckedChange={(checked) => updateSetting('appearance', 'sidebar_collapsed', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compactMode">Compact Mode</Label>
                      <p className="text-sm text-gray-500">Reduce spacing for more content</p>
                    </div>
                    <Switch
                      id="compactMode"
                      checked={settings.appearance.compact_mode}
                      onCheckedChange={(checked) => updateSetting('appearance', 'compact_mode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showAnimations">Show Animations</Label>
                      <p className="text-sm text-gray-500">Enable smooth transitions and animations</p>
                    </div>
                    <Switch
                      id="showAnimations"
                      checked={settings.appearance.show_animations}
                      onCheckedChange={(checked) => updateSetting('appearance', 'show_animations', checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => saveSettings('appearance')} disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSettings;
