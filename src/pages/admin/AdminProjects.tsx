import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Eye, 
  EyeOff, 
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Building2,
  DollarSign
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminPageHeader from '@/components/admin/AdminPageHeader';

interface ProjectShowcase {
  id: string;
  title: string;
  description: string | null;
  short_description: string | null;
  category: string;
  client_name: string | null;
  location: string | null;
  completion_date: string | null;
  duration_months: number | null;
  project_value: number | null;
  images: string[];
  features: string[];
  technologies: string[];
  is_active: boolean | null;
  is_featured: boolean | null;
  display_order: number | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const AdminProjects: React.FC = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<ProjectShowcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDialog, setShowDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectShowcase | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    category: '',
    client_name: '',
    location: '',
    completion_date: '',
    duration_months: '',
    project_value: '',
    features: '',
    technologies: '',
    is_active: true,
    is_featured: false,
    display_order: '',
    seo_title: '',
    seo_description: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects_showcase')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      // Transform the data to match the expected interface
      const transformedData = (data || []).map(item => ({
        ...item,
        images: Array.isArray(item.images) ? item.images.filter((img): img is string => typeof img === 'string') : [],
        features: Array.isArray(item.features) ? item.features.filter((f): f is string => typeof f === 'string') : [],
        technologies: Array.isArray(item.technologies) ? item.technologies.filter((t): t is string => typeof t === 'string') : [],
      }));
      
      setProjects(transformedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProjects = projects.filter(project => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(project.title) || searchRegex.test(project.description || '') || searchRegex.test(project.short_description || '');
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openDialog = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      short_description: '',
      category: '',
      client_name: '',
      location: '',
      completion_date: '',
      duration_months: '',
      project_value: '',
      features: '',
      technologies: '',
      is_active: true,
      is_featured: false,
      display_order: '',
      seo_title: '',
      seo_description: ''
    });
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setEditingProject(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { title, description, short_description, category, client_name, location, completion_date, duration_months, project_value, features, technologies, is_active, is_featured, display_order, seo_title, seo_description } = formData;
  
      const featuresArray = features.split(',').map(item => item.trim());
      const technologiesArray = technologies.split(',').map(item => item.trim());
  
      if (editingProject) {
        // Update existing project
        const { data, error } = await supabase
          .from('projects_showcase')
          .update({
            title,
            description,
            short_description,
            category,
            client_name,
            location,
            completion_date,
            duration_months: parseInt(duration_months),
            project_value: parseFloat(project_value),
            images: [], // Handle images separately if needed
            features: featuresArray,
            technologies: technologiesArray,
            is_active,
            is_featured,
            display_order: parseInt(display_order),
            seo_title,
            seo_description,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingProject.id);
  
        if (error) throw error;
  
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects_showcase')
          .insert([{
            title,
            description,
            short_description,
            category,
            client_name,
            location,
            completion_date,
            duration_months: parseInt(duration_months),
            project_value: parseFloat(project_value),
            images: [], // Handle images separately if needed
            features: featuresArray,
            technologies: technologiesArray,
            is_active,
            is_featured,
            display_order: parseInt(display_order),
            seo_title,
            seo_description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
  
        if (error) throw error;
  
        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }
  
      fetchProjects();
      closeDialog();
    } catch (error) {
      console.error('Error submitting project:', error);
      toast({
        title: "Error",
        description: "Failed to submit project",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (project: ProjectShowcase) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      short_description: project.short_description || '',
      category: project.category,
      client_name: project.client_name || '',
      location: project.location || '',
      completion_date: project.completion_date || '',
      duration_months: project.duration_months?.toString() || '',
      project_value: project.project_value?.toString() || '',
      features: project.features.join(', '),
      technologies: project.technologies.join(', '),
      is_active: project.is_active ?? true,
      is_featured: project.is_featured ?? false,
      display_order: project.display_order?.toString() || '',
      seo_title: project.seo_title || '',
      seo_description: project.seo_description || ''
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('projects_showcase')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string, is_active: boolean) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('projects_showcase')
        .update({ is_active: !is_active })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Project ${is_active ? 'hidden' : 'visible'} successfully`,
      });
      fetchProjects();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast({
        title: "Error",
        description: "Failed to toggle visibility",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id: string, is_featured: boolean) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('projects_showcase')
        .update({ is_featured: !is_featured })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Project ${is_featured ? 'unfeatured' : 'featured'} successfully`,
      });
      fetchProjects();
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast({
        title: "Error",
        description: "Failed to toggle featured",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(projects.map(project => project.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Projects Showcase"
        description="Manage and showcase your projects on the website."
      />

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} onClick={() => handleCategoryChange(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button onClick={openDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>
        <Separator />

        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <Card key={project.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">{project.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      {project.is_featured && (
                        <Badge variant="outline">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 line-clamp-3">{project.short_description || project.description || 'No description'}</div>
                    <div className="flex items-center space-x-4 mt-4">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(project)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleVisibility(project.id, project.is_active ?? true)}
                      >
                        {project.is_active ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-2" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Show
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleFeatured(project.id, project.is_featured ?? true)}
                      >
                        {project.is_featured ? (
                          <>
                            <Star className="w-4 h-4 mr-2" />
                            Unfeature
                          </>
                        ) : (
                          <>
                            <Star className="w-4 h-4 mr-2" />
                            Feature
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="short_description" className="text-right">
                Short Description
              </Label>
              <Textarea id="short_description" name="short_description" value={formData.short_description} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client_name" className="text-right">
                Client Name
              </Label>
              <Input type="text" id="client_name" name="client_name" value={formData.client_name} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="completion_date" className="text-right">
                Completion Date
              </Label>
              <Input type="date" id="completion_date" name="completion_date" value={formData.completion_date} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration_months" className="text-right">
                Duration (Months)
              </Label>
              <Input type="number" id="duration_months" name="duration_months" value={formData.duration_months} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project_value" className="text-right">
                Project Value
              </Label>
              <Input type="number" id="project_value" name="project_value" value={formData.project_value} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="features" className="text-right">
                Features (comma-separated)
              </Label>
              <Input type="text" id="features" name="features" value={formData.features} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technologies" className="text-right">
                Technologies (comma-separated)
              </Label>
              <Input type="text" id="technologies" name="technologies" value={formData.technologies} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="display_order" className="text-right">
                Display Order
              </Label>
              <Input type="number" id="display_order" name="display_order" value={formData.display_order} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="seo_title" className="text-right">
                SEO Title
              </Label>
              <Input type="text" id="seo_title" name="seo_title" value={formData.seo_title} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="seo_description" className="text-right">
                SEO Description
              </Label>
              <Textarea id="seo_description" name="seo_description" value={formData.seo_description} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_active" className="text-right">
                Active
              </Label>
              <Switch id="is_active" name="is_active" checked={formData.is_active} onCheckedChange={(checked) => handleSwitchChange('is_active', checked)} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_featured" className="text-right">
                Featured
              </Label>
              <Switch id="is_featured" name="is_featured" checked={formData.is_featured} onCheckedChange={(checked) => handleSwitchChange('is_featured', checked)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              {editingProject ? 'Update Project' : 'Create Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
