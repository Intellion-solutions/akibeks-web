
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, FileText, Copy, Edit, Trash2, Eye, Download, Filter, Calendar } from "lucide-react";
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
}

interface FilterState {
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  valueRange: string;
  dateRange: string;
}

const AdminTemplates = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings } = useAdmin();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([]);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
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
    const templateWithItems = {
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

        {/* Stats Cards */}
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

        {/* Create Template Button */}
        <div className="mb-6">
          <Button onClick={() => setShowCreateTemplate(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Template
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
