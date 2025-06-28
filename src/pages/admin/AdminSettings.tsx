
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, RefreshCw, Upload, Building, FileText, DollarSign, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings, refreshSettings } = useAdmin();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSettings(companySettings);
  }, [companySettings]);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        setting_key: key,
        setting_value: value || ''
      }));

      const { error } = await supabase
        .from('company_settings')
        .upsert(updates);

      if (error) throw error;

      await refreshSettings();

      toast({
        title: "Settings Saved",
        description: "Company settings updated successfully and applied across the website",
      });
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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to storage and get the URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSettings(prev => ({ ...prev, company_logo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            Company Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your company information, branding, and document preferences</p>
        </div>

        <div className="flex justify-end mb-6">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={refreshSettings}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleSave} disabled={loading} className="bg-orange-500 hover:bg-orange-600">
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="signatures" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Signatures
            </TabsTrigger>
          </TabsList>

          {/* Company Information Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic company details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      value={settings.company_name || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, company_name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_tagline">Company Tagline</Label>
                    <Input
                      id="company_tagline"
                      value={settings.company_tagline || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, company_tagline: e.target.value }))}
                      placeholder="e.g., Building Excellence Since 2009"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_email">Company Email</Label>
                    <Input
                      id="company_email"
                      type="email"
                      value={settings.company_email || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, company_email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_phone">Company Phone</Label>
                    <Input
                      id="company_phone"
                      value={settings.company_phone || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, company_phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                    <Input
                      id="whatsapp_number"
                      value={settings.whatsapp_number || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_website">Website</Label>
                    <Input
                      id="company_website"
                      value={settings.company_website || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, company_website: e.target.value }))}
                      placeholder="www.yourcompany.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company_address">Company Address</Label>
                  <Textarea
                    id="company_address"
                    value={settings.company_address || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, company_address: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company_registration">Registration Number</Label>
                    <Input
                      id="company_registration"
                      value={settings.company_registration || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, company_registration: e.target.value }))}
                      placeholder="e.g., NCA/REG/2009/001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_license">License Information</Label>
                    <Input
                      id="company_license"
                      value={settings.company_license || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, company_license: e.target.value }))}
                      placeholder="e.g., NCA License No. 12345"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding & Visual Identity</CardTitle>
                <CardDescription>Manage your company logo and visual elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="company_logo">Company Logo</Label>
                  <div className="mt-2 space-y-4">
                    {settings.company_logo && (
                      <div className="flex items-center space-x-4">
                        <img 
                          src={settings.company_logo} 
                          alt="Company Logo" 
                          className="w-20 h-20 object-contain border rounded-lg"
                        />
                        <div>
                          <p className="text-sm text-gray-600">Current logo</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSettings(prev => ({ ...prev, company_logo: '' }))}
                          >
                            Remove Logo
                          </Button>
                        </div>
                      </div>
                    )}
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500 mt-1">Upload a PNG, JPG, or SVG file (recommended: 200x200px)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Settings</CardTitle>
                <CardDescription>Configure pricing, taxes, and banking information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="currency_symbol">Currency Symbol</Label>
                    <Input
                      id="currency_symbol"
                      value={settings.currency_symbol || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, currency_symbol: e.target.value }))}
                      placeholder="KSh"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                    <Input
                      id="tax_rate"
                      type="number"
                      step="0.1"
                      value={settings.tax_rate || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, tax_rate: e.target.value }))}
                      placeholder="16"
                    />
                  </div>
                  <div>
                    <Label htmlFor="labor_charge_rate">Labor Charge Rate (%)</Label>
                    <Input
                      id="labor_charge_rate"
                      type="number"
                      step="0.1"
                      value={settings.labor_charge_rate || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, labor_charge_rate: e.target.value }))}
                      placeholder="36.5"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Banking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="bank_name">Bank Name</Label>
                      <Input
                        id="bank_name"
                        value={settings.bank_name || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, bank_name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bank_account">Account Number</Label>
                      <Input
                        id="bank_account"
                        value={settings.bank_account || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, bank_account: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bank_branch">Branch</Label>
                      <Input
                        id="bank_branch"
                        value={settings.bank_branch || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, bank_branch: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="swift_code">SWIFT Code</Label>
                      <Input
                        id="swift_code"
                        value={settings.swift_code || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, swift_code: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Document Settings</CardTitle>
                <CardDescription>Default terms and conditions for quotes and invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="default_quote_terms">Default Quote Terms</Label>
                  <Textarea
                    id="default_quote_terms"
                    value={settings.default_quote_terms || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, default_quote_terms: e.target.value }))}
                    rows={4}
                    placeholder="Enter default terms and conditions for quotes..."
                  />
                </div>
                <div>
                  <Label htmlFor="default_payment_terms">Default Payment Terms</Label>
                  <Textarea
                    id="default_payment_terms"
                    value={settings.default_payment_terms || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, default_payment_terms: e.target.value }))}
                    rows={3}
                    placeholder="Enter default payment terms..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="business_hours">Business Hours</Label>
                    <Input
                      id="business_hours"
                      value={settings.business_hours || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, business_hours: e.target.value }))}
                      placeholder="Mon-Fri: 8AM-6PM"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact">Emergency Contact</Label>
                    <Input
                      id="emergency_contact"
                      value={settings.emergency_contact || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, emergency_contact: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="footer_text">Document Footer Text</Label>
                  <Textarea
                    id="footer_text"
                    value={settings.footer_text || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, footer_text: e.target.value }))}
                    rows={2}
                    placeholder="Default footer text for documents"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signatures Tab */}
          <TabsContent value="signatures">
            <Card>
              <CardHeader>
                <CardTitle>Digital Signatures</CardTitle>
                <CardDescription>Configure default signature information for documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="signature_name">Signature Name</Label>
                    <Input
                      id="signature_name"
                      value={settings.signature_name || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, signature_name: e.target.value }))}
                      placeholder="John Kiprotich"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signature_title">Signature Title</Label>
                    <Input
                      id="signature_title"
                      value={settings.signature_title || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, signature_title: e.target.value }))}
                      placeholder="Project Manager"
                    />
                  </div>
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
