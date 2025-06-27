
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        setting_key: key,
        setting_value: value
      }));

      const { error } = await supabase
        .from('company_settings')
        .upsert(updates);

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: "Company settings updated successfully",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Company Settings
              </h1>
              <p className="text-gray-600">Manage your company information and preferences</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={fetchSettings}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic company details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={settings.company_name || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, company_name: e.target.value }))}
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
            </CardContent>
          </Card>

          {/* Quote Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Quote & Invoice Settings</CardTitle>
              <CardDescription>Default terms and conditions for quotes and invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
              <CardDescription>Operational settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
