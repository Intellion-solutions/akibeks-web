import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, FileText, Copy, Edit, Trash2, Eye, Download, Filter, Calendar, Building, Home, Wrench, Paintbrush, Zap, Car, Trees, Droplets } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";
import TemplateEditor from "@/components/admin/TemplateEditor";
import TemplateFilters from "@/components/admin/TemplateFilters";
import BulkTemplateActions from "@/components/admin/BulkTemplateActions";

interface TemplateItem {
  id: string;
  template_id: string;
  item_number: number;
  description: string;
  unit: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

interface Template {
  id: string;
  template_id: string;
  template_name: string;
  material_cost: number;
  labor_charge: number;
  tax_amount: number;
  grand_total: number;
  terms_conditions: string;
  notes: string;
  created_at: string;
  updated_at: string;
  items?: TemplateItem[]; // Make items optional since we fetch them separately
}

// Template interface for TemplateEditor - matches what it expects
interface EditableTemplate {
  id?: string;
  template_id: string;
  template_name: string;
  material_cost: number;
  labor_charge: number;
  tax_amount: number;
  grand_total: number;
  terms_conditions: string;
  notes: string;
  items: {
    id?: string;
    item_number: number;
    description: string;
    unit: string;
    quantity: number;
    unit_price: number;
    amount: number;
  }[];
}

interface FilterState {
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  valueRange: string;
  dateRange: string;
}

// Enhanced predefined templates with more categories
const predefinedTemplates = [
  {
    category: "Residential Construction",
    icon: Home,
    color: "from-blue-500 to-blue-600",
    templates: [
      {
        name: "3-Bedroom House Standard",
        description: "Complete 3-bedroom house construction package",
        items: [
          { description: "Site preparation and excavation", unit: "m²", quantity: 200, unit_price: 800 },
          { description: "Foundation (concrete strip)", unit: "m³", quantity: 25, unit_price: 15000 },
          { description: "Walling (stone masonry)", unit: "m²", quantity: 180, unit_price: 2500 },
          { description: "Roofing (iron sheets + timber)", unit: "m²", quantity: 120, unit_price: 1800 },
          { description: "Flooring (ceramic tiles)", unit: "m²", quantity: 100, unit_price: 2200 },
          { description: "Electrical installation", unit: "points", quantity: 25, unit_price: 1500 },
          { description: "Plumbing (complete)", unit: "set", quantity: 1, unit_price: 180000 },
          { description: "Windows and doors", unit: "set", quantity: 1, unit_price: 220000 },
          { description: "Painting (interior & exterior)", unit: "m²", quantity: 400, unit_price: 350 }
        ]
      },
      {
        name: "Luxury Villa Package",
        description: "High-end villa construction with premium finishes",
        items: [
          { description: "Site preparation & landscaping", unit: "m²", quantity: 500, unit_price: 1200 },
          { description: "Foundation (reinforced concrete)", unit: "m³", quantity: 45, unit_price: 22000 },
          { description: "Structural works (steel & concrete)", unit: "m³", quantity: 80, unit_price: 18000 },
          { description: "Premium walling (natural stone)", unit: "m²", quantity: 250, unit_price: 4500 },
          { description: "Designer roofing system", unit: "m²", quantity: 200, unit_price: 3500 },
          { description: "Luxury flooring (marble/hardwood)", unit: "m²", quantity: 180, unit_price: 5500 },
          { description: "Smart home electrical system", unit: "set", quantity: 1, unit_price: 450000 },
          { description: "Premium plumbing fixtures", unit: "set", quantity: 1, unit_price: 380000 },
          { description: "Custom carpentry work", unit: "set", quantity: 1, unit_price: 320000 },
          { description: "Swimming pool construction", unit: "set", quantity: 1, unit_price: 800000 }
        ]
      }
    ]
  },
  {
    category: "Commercial Construction",
    icon: Building,
    color: "from-purple-500 to-purple-600",
    templates: [
      {
        name: "Office Complex Standard",
        description: "Multi-story office building construction",
        items: [
          { description: "Site clearance & preparation", unit: "m²", quantity: 1000, unit_price: 600 },
          { description: "Deep foundation works", unit: "m³", quantity: 120, unit_price: 25000 },
          { description: "Structural frame (concrete)", unit: "m³", quantity: 200, unit_price: 20000 },
          { description: "Curtain wall system", unit: "m²", quantity: 800, unit_price: 8500 },
          { description: "Commercial HVAC system", unit: "set", quantity: 1, unit_price: 1200000 },
          { description: "Fire safety systems", unit: "set", quantity: 1, unit_price: 650000 },
          { description: "Elevator installation", unit: "units", quantity: 2, unit_price: 1500000 },
          { description: "Commercial electrical (3-phase)", unit: "set", quantity: 1, unit_price: 800000 },
          { description: "Parking area construction", unit: "m²", quantity: 500, unit_price: 1200 }
        ]
      },
      {
        name: "Retail Shopping Center",
        description: "Modern shopping complex with multiple units",
        items: [
          { description: "Large scale excavation", unit: "m³", quantity: 2000, unit_price: 450 },
          { description: "Commercial foundation", unit: "m³", quantity: 180, unit_price: 23000 },
          { description: "Steel frame structure", unit: "tons", quantity: 50, unit_price: 180000 },
          { description: "Precast concrete panels", unit: "m²", quantity: 1200, unit_price: 3200 },
          { description: "Commercial roofing", unit: "m²", quantity: 2000, unit_price: 2800 },
          { description: "Retail fit-out package", unit: "units", quantity: 12, unit_price: 350000 },
          { description: "Central air conditioning", unit: "set", quantity: 1, unit_price: 2500000 },
          { description: "Commercial security systems", unit: "set", quantity: 1, unit_price: 450000 }
        ]
      }
    ]
  },
  {
    category: "Infrastructure",
    icon: Wrench,
    color: "from-green-500 to-green-600",
    templates: [
      {
        name: "Road Construction Package",
        description: "Complete road construction with drainage",
        items: [
          { description: "Road survey & design", unit: "km", quantity: 5, unit_price: 250000 },
          { description: "Land clearing & grubbing", unit: "ha", quantity: 2, unit_price: 180000 },
          { description: "Earthworks & compaction", unit: "m³", quantity: 5000, unit_price: 850 },
          { description: "Sub-base layer", unit: "m³", quantity: 1500, unit_price: 1200 },
          { description: "Base course construction", unit: "m³", quantity: 1200, unit_price: 1800 },
          { description: "Asphalt wearing course", unit: "m²", quantity: 8000, unit_price: 2200 },
          { description: "Drainage culverts", unit: "m", quantity: 200, unit_price: 4500 },
          { description: "Road signage & markings", unit: "set", quantity: 1, unit_price: 320000 }
        ]
      },
      {
        name: "Water Treatment Plant",
        description: "Small-scale water treatment facility",
        items: [
          { description: "Site preparation & fencing", unit: "m²", quantity: 2000, unit_price: 800 },
          { description: "Treatment plant foundation", unit: "m³", quantity: 60, unit_price: 28000 },
          { description: "Concrete treatment tanks", unit: "m³", quantity: 150, unit_price: 25000 },
          { description: "Filtration equipment", unit: "set", quantity: 1, unit_price: 1800000 },
          { description: "Pumping systems", unit: "set", quantity: 3, unit_price: 450000 },
          { description: "Control room construction", unit: "m²", quantity: 50, unit_price: 12000 },
          { description: "Electrical & automation", unit: "set", quantity: 1, unit_price: 850000 },
          { description: "Pipeline installation", unit: "m", quantity: 500, unit_price: 2200 }
        ]
      }
    ]
  },
  {
    category: "Renovation & Maintenance",
    icon: Paintbrush,
    color: "from-orange-500 to-orange-600",
    templates: [
      {
        name: "Complete House Renovation",
        description: "Full house makeover package",
        items: [
          { description: "Demolition & removal", unit: "m²", quantity: 120, unit_price: 650 },
          { description: "Structural repairs", unit: "m²", quantity: 80, unit_price: 1800 },
          { description: "New electrical rewiring", unit: "points", quantity: 30, unit_price: 1200 },
          { description: "Plumbing upgrades", unit: "set", quantity: 1, unit_price: 150000 },
          { description: "New flooring installation", unit: "m²", quantity: 100, unit_price: 2800 },
          { description: "Kitchen renovation", unit: "set", quantity: 1, unit_price: 280000 },
          { description: "Bathroom upgrades", unit: "units", quantity: 2, unit_price: 120000 },
          { description: "Interior & exterior painting", unit: "m²", quantity: 350, unit_price: 420 }
        ]
      },
      {
        name: "Office Space Refurbishment",
        description: "Modern office space upgrade",
        items: [
          { description: "Space planning & design", unit: "m²", quantity: 300, unit_price: 800 },
          { description: "Partition walls (drywall)", unit: "m²", quantity: 150, unit_price: 1500 },
          { description: "Suspended ceiling system", unit: "m²", quantity: 300, unit_price: 1200 },
          { description: "LED lighting upgrade", unit: "points", quantity: 40, unit_price: 2500 },
          { description: "Carpet flooring", unit: "m²", quantity: 300, unit_price: 1800 },
          { description: "HVAC system upgrade", unit: "set", quantity: 1, unit_price: 450000 },
          { description: "Network cabling", unit: "points", quantity: 50, unit_price: 1800 },
          { description: "Glass partitions", unit: "m²", quantity: 60, unit_price: 4500 }
        ]
      }
    ]
  },
  {
    category: "Specialized Projects",
    icon: Zap,
    color: "from-red-500 to-red-600",
    templates: [
      {
        name: "Solar Power Installation",
        description: "Complete solar energy system",
        items: [
          { description: "Site assessment & design", unit: "kW", quantity: 10, unit_price: 15000 },
          { description: "Solar panels (mono-crystalline)", unit: "units", quantity: 40, unit_price: 25000 },
          { description: "Inverter system", unit: "units", quantity: 2, unit_price: 180000 },
          { description: "Battery storage system", unit: "kWh", quantity: 20, unit_price: 35000 },
          { description: "Mounting structure", unit: "set", quantity: 1, unit_price: 120000 },
          { description: "Electrical connections", unit: "set", quantity: 1, unit_price: 85000 },
          { description: "Monitoring system", unit: "set", quantity: 1, unit_price: 65000 },
          { description: "Installation & commissioning", unit: "set", quantity: 1, unit_price: 150000 }
        ]
      },
      {
        name: "Swimming Pool Complex",
        description: "Commercial swimming pool facility",
        items: [
          { description: "Pool excavation", unit: "m³", quantity: 400, unit_price: 1200 },
          { description: "Reinforced concrete shell", unit: "m³", quantity: 80, unit_price: 22000 },
          { description: "Pool finishing (tiles)", unit: "m²", quantity: 250, unit_price: 3500 },
          { description: "Filtration system", unit: "set", quantity: 1, unit_price: 450000 },
          { description: "Pool lighting (LED)", unit: "points", quantity: 12, unit_price: 8500 },
          { description: "Pool deck construction", unit: "m²", quantity: 200, unit_price: 2800 },
          { description: "Chemical treatment system", unit: "set", quantity: 1, unit_price: 220000 },
          { description: "Safety equipment", unit: "set", quantity: 1, unit_price: 95000 }
        ]
      }
    ]
  }
];

const AdminTemplates = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings } = useAdmin();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([]);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EditableTemplate | null>(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    sortBy: 'created_at',
    sortOrder: 'desc',
    valueRange: 'all',
    dateRange: 'all'
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data: settingsData, error: settingsError } = await supabase
        .from('template_settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (settingsError) throw settingsError;

      const { data: itemsData, error: itemsError } = await supabase
        .from('template_items')
        .select('*')
        .order('item_number');

      if (itemsError) throw itemsError;

      setTemplates(settingsData || []);
      setTemplateItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive"
      });
    }
  };

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    let filtered = [...templates];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(template =>
        template.template_name?.toLowerCase().includes(searchLower) ||
        template.template_id?.toLowerCase().includes(searchLower)
      );
    }

    // Value range filter
    if (filters.valueRange !== 'all') {
      const ranges = {
        '0-100000': [0, 100000],
        '100000-500000': [100000, 500000],
        '500000-1000000': [500000, 1000000],
        '1000000-5000000': [1000000, 5000000],
        '5000000+': [5000000, Infinity]
      };

      const [min, max] = ranges[filters.valueRange as keyof typeof ranges] || [0, Infinity];
      filtered = filtered.filter(template => {
        const total = parseFloat(template.grand_total.toString());
        return total >= min && total <= max;
      });
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const ranges = {
        'today': new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        'week': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        'month': new Date(now.getFullYear(), now.getMonth(), 1),
        'quarter': new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1),
        'year': new Date(now.getFullYear(), 0, 1)
      };

      const startDate = ranges[filters.dateRange as keyof typeof ranges];
      if (startDate) {
        filtered = filtered.filter(template => 
          new Date(template.created_at) >= startDate
        );
      }
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[filters.sortBy as keyof Template];
      let bValue: any = b[filters.sortBy as keyof Template];

      if (filters.sortBy === 'grand_total') {
        aValue = parseFloat(aValue.toString());
        bValue = parseFloat(bValue.toString());
      } else if (filters.sortBy.includes('_at')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [templates, filters]);

  const deleteTemplate = async (templateId: string) => {
    if (!confirm("Are you sure you want to delete this template? This action cannot be undone.")) {
      return;
    }

    try {
      await supabase
        .from('template_items')
        .delete()
        .eq('template_id', templateId);

      await supabase
        .from('template_settings')
        .delete()
        .eq('template_id', templateId);

      toast({
        title: "Template Deleted",
        description: "Template has been deleted successfully.",
      });
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive"
      });
    }
  };

  const duplicateTemplate = async (template: Template) => {
    try {
      const newTemplateId = 'TPL' + Date.now().toString().slice(-6);
      const items = templateItems.filter(item => item.template_id === template.template_id);
      
      const { error: settingsError } = await supabase
        .from('template_settings')
        .insert([{
          template_id: newTemplateId,
          template_name: `${template.template_name} (Copy)`,
          material_cost: template.material_cost,
          labor_charge: template.labor_charge,
          tax_amount: template.tax_amount,
          grand_total: template.grand_total,
          terms_conditions: template.terms_conditions,
          notes: template.notes
        }]);

      if (settingsError) throw settingsError;

      if (items.length > 0) {
        const itemsToInsert = items.map(item => ({
          template_id: newTemplateId,
          item_number: item.item_number,
          description: item.description,
          unit: item.unit,
          quantity: item.quantity,
          unit_price: item.unit_price,
          amount: item.amount
        }));

        const { error: itemsError } = await supabase
          .from('template_items')
          .insert(itemsToInsert);

        if (itemsError) throw itemsError;
      }

      toast({
        title: "Template Duplicated",
        description: "Template has been duplicated successfully.",
      });
      fetchTemplates();
    } catch (error) {
      console.error('Error duplicating template:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate template",
        variant: "destructive"
      });
    }
  };

  const getTemplateItems = (templateId: string) => {
    return templateItems.filter(item => item.template_id === templateId);
  };

  const handleEditTemplate = (template: Template) => {
    const items = getTemplateItems(template.template_id);
    const templateWithItems: EditableTemplate = {
      ...template,
      items: items.map(item => ({
        id: item.id,
        item_number: item.item_number,
        description: item.description,
        unit: item.unit,
        quantity: parseFloat(item.quantity.toString()),
        unit_price: parseFloat(item.unit_price.toString()),
        amount: parseFloat(item.amount.toString())
      }))
    };
    setEditingTemplate(templateWithItems);
  };

  const createTemplateFromPredefined = async (templateData: any, categoryName: string) => {
    try {
      const templateId = 'TPL' + Date.now().toString().slice(-6);
      
      // Calculate totals
      const materialCost = templateData.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unit_price * 0.7), 0);
      const laborCharge = templateData.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unit_price * 0.3), 0);
      const taxAmount = (materialCost + laborCharge) * 0.16;
      const grandTotal = materialCost + laborCharge + taxAmount;

      // Create template settings
      const { error: settingsError } = await supabase
        .from('template_settings')
        .insert([{
          template_id: templateId,
          template_name: `${templateData.name} - ${categoryName}`,
          material_cost: materialCost,
          labor_charge: laborCharge,
          tax_amount: taxAmount,
          grand_total: grandTotal,
          terms_conditions: "Payment terms: 30% advance, 40% on 50% completion, 30% on completion. All materials to be approved by client before procurement.",
          notes: `${templateData.description}. This template includes all standard requirements for ${categoryName.toLowerCase()} projects.`
        }]);

      if (settingsError) throw settingsError;

      // Create template items
      const itemsToInsert = templateData.items.map((item: any, index: number) => ({
        template_id: templateId,
        item_number: index + 1,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.quantity * item.unit_price
      }));

      const { error: itemsError } = await supabase
        .from('template_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      toast({
        title: "Template Created",
        description: `${templateData.name} template has been created successfully.`,
      });
      
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive"
      });
    }
  };

  const currencySymbol = companySettings.currency_symbol || 'KSh';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 mr-3" />
            Template Management
          </h1>
          <p className="text-gray-600 mt-2">Create and manage document templates for quotes and invoices</p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Templates</p>
                  <p className="text-2xl font-bold">{templates.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Template Items</p>
                  <p className="text-2xl font-bold">{templateItems.length}</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Template Value</p>
                  <p className="text-2xl font-bold">
                    {currencySymbol} {templates.length > 0 ? Math.round(templates.reduce((sum, t) => sum + (parseFloat(t.grand_total.toString()) || 0), 0) / templates.length).toLocaleString() : 0}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Filtered Results</p>
                  <p className="text-2xl font-bold">{filteredTemplates.length}</p>
                </div>
                <Filter className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predefined Templates Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Templates</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {predefinedTemplates.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className={`bg-gradient-to-r ${category.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="w-6 h-6" />
                    {category.category}
                  </CardTitle>
                  <CardDescription className="text-white/90">
                    {category.templates.length} professional templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {category.templates.map((template, templateIndex) => (
                      <div key={templateIndex} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{template.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{template.items.length} items</span>
                              <span>Est. KSh {template.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0).toLocaleString()}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => createTemplateFromPredefined(template, category.category)}
                            className="ml-2"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Use
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Template Button */}
        <div className="mb-6 flex gap-4">
          <Button onClick={() => setShowCreateTemplate(true)} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Template
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TemplateFilters
            filters={filters}
            onFiltersChange={setFilters}
            totalTemplates={templates.length}
            filteredCount={filteredTemplates.length}
          />
        </div>

        {/* Bulk Actions */}
        <div className="mb-6">
          <BulkTemplateActions
            templates={filteredTemplates}
            selectedTemplates={selectedTemplates}
            onSelectionChange={setSelectedTemplates}
            onActionComplete={fetchTemplates}
          />
        </div>

        {/* Templates Grid */}
        <div className="grid gap-6">
          {filteredTemplates.map((template) => {
            const items = getTemplateItems(template.template_id);
            const isSelected = selectedTemplates.includes(template.template_id);
            
            return (
              <Card key={template.template_id} className={isSelected ? 'ring-2 ring-blue-500' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTemplates([...selectedTemplates, template.template_id]);
                        } else {
                          setSelectedTemplates(selectedTemplates.filter(id => id !== template.template_id));
                        }
                      }}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{template.template_name}</h3>
                        <span className="text-sm text-gray-500">({template.template_id})</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Items:</span> {items.length}
                        </div>
                        <div>
                          <span className="font-medium">Material Cost:</span> {currencySymbol} {parseFloat(template.material_cost.toString()).toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Labor Charge:</span> {currencySymbol} {parseFloat(template.labor_charge.toString()).toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Grand Total:</span> {currencySymbol} {parseFloat(template.grand_total.toString()).toLocaleString()}
                        </div>
                      </div>

                      {items.length > 0 && (
                        <div className="mb-3">
                          <span className="font-medium text-sm">Sample Items:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {items.slice(0, 3).map((item, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                {item.description || `Item ${item.item_number}`}
                              </span>
                            ))}
                            {items.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                +{items.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          <span>Created: {new Date(template.created_at).toLocaleDateString()}</span>
                          <span>Updated: {new Date(template.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTemplate(template)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => duplicateTemplate(template)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTemplate(template.template_id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">
                {filters.search || filters.valueRange !== 'all' || filters.dateRange !== 'all'
                  ? "Try adjusting your search criteria or filters"
                  : "Create your first template to get started"
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Template Editor */}
        <TemplateEditor
          template={editingTemplate}
          open={showCreateTemplate || !!editingTemplate}
          onOpenChange={(open) => {
            if (!open) {
              setShowCreateTemplate(false);
              setEditingTemplate(null);
            }
          }}
          onSave={() => {
            fetchTemplates();
            setEditingTemplate(null);
          }}
          currencySymbol={currencySymbol}
        />
      </div>
    </div>
  );
};

export default AdminTemplates;
