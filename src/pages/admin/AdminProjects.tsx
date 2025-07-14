import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Star, 
  Eye, 
  EyeOff, 
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  ArrowLeft
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";
import CreateProjectDialog from "@/components/admin/projects/CreateProjectDialog";

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
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const { toast } = useToast();
  const [projects, setProjects] = useState<ProjectShowcase[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
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
    fetchClients();
    fetchUsers();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('full_name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('full_name');

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

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
    setShowCreateDialog(true);
  };

  const closeDialog = () => {
    setShowCreateDialog(false);
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
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Building2 className="w-8 h-8 mr-3" />
                Projects Management
              </h1>
              <p className="text-gray-600 mt-2">Create and manage your project portfolio</p>
            </div>
          </div>
          
          <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Project
          </Button>
        </div>

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
            </div>
          </div>

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
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
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

        <CreateProjectDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          clients={clients}
          users={users}
          onProjectCreated={fetchProjects}
        />
      </div>
    </div>
  );
};

export default AdminProjects;
