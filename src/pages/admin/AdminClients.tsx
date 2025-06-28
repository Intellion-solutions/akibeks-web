
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Eye, Phone, Mail, MapPin, User, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminClients = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: "Failed to load clients",
        variant: "destructive"
      });
    }
  };

  const filteredClients = clients.filter((client: any) =>
    client.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <User className="w-6 h-6 mr-2" />
                Client Management
              </h1>
              <p className="text-gray-600">Manage your client database and relationships</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Client
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client: any) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{client.full_name}</CardTitle>
                  <Badge variant="secondary">Active</Badge>
                </div>
                {client.company_name && (
                  <CardDescription>{client.company_name}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {client.phone}
                </div>
                {client.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                )}
                {client.address && (
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{client.address}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {new Date(client.created_at).toLocaleDateString()}
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedClient(client)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Client Details</DialogTitle>
                        <DialogDescription>
                          Complete information for {selectedClient?.full_name}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedClient && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="font-medium">Full Name</Label>
                              <p className="text-sm text-gray-600">{selectedClient.full_name}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Company</Label>
                              <p className="text-sm text-gray-600">{selectedClient.company_name || 'N/A'}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Phone</Label>
                              <p className="text-sm text-gray-600">{selectedClient.phone}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Email</Label>
                              <p className="text-sm text-gray-600">{selectedClient.email || 'N/A'}</p>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="font-medium">Address</Label>
                            <p className="text-sm text-gray-600 mt-1">{selectedClient.address || 'N/A'}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="font-medium">Client Since</Label>
                              <p className="text-sm text-gray-600">{new Date(selectedClient.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <Label className="font-medium">Last Updated</Label>
                              <p className="text-sm text-gray-600">{new Date(selectedClient.updated_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search criteria" : "Start by adding your first client"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminClients;
