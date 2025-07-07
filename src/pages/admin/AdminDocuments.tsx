
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, FileText, Download, Eye, Upload, Folder, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminDocuments = () => {
  const { isAuthenticated } = useAdmin();
  const { toast } = useToast();
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      // Mock data since we don't have documents table yet
      const mockDocuments = [
        { 
          id: 1, 
          name: "Project Proposal - Riverside Complex.pdf", 
          type: "proposal", 
          size: "2.5 MB", 
          uploaded_by: "John Doe", 
          upload_date: "2024-01-10",
          project: "Riverside Complex",
          category: "Proposals",
          status: "approved"
        },
        { 
          id: 2, 
          name: "Building Permit Application.pdf", 
          type: "permit", 
          size: "1.2 MB", 
          uploaded_by: "Jane Smith", 
          upload_date: "2024-01-12",
          project: "Shopping Mall",
          category: "Legal Documents",
          status: "pending"
        },
        { 
          id: 3, 
          name: "Structural Analysis Report.pdf", 
          type: "report", 
          size: "5.8 MB", 
          uploaded_by: "Mike Johnson", 
          upload_date: "2024-01-08",
          project: "Office Building",
          category: "Technical Reports",
          status: "approved"
        },
        { 
          id: 4, 
          name: "Contract Agreement - Client ABC.pdf", 
          type: "contract", 
          size: "980 KB", 
          uploaded_by: "Sarah Wilson", 
          upload_date: "2024-01-15",
          project: "Residential Complex",
          category: "Contracts",
          status: "signed"
        },
        { 
          id: 5, 
          name: "Site Survey Photos.zip", 
          type: "images", 
          size: "15.2 MB", 
          uploaded_by: "Tom Brown", 
          upload_date: "2024-01-14",
          project: "Industrial Facility",
          category: "Site Documentation",
          status: "approved"
        }
      ];
      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter((doc: any) =>
    doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.project?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'signed': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'proposal':
      case 'contract':
      case 'report':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'images':
        return <Folder className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const totalDocuments = documents.length;
  const pendingDocuments = documents.filter((doc: any) => doc.status === 'pending').length;
  const approvedDocuments = documents.filter((doc: any) => doc.status === 'approved').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FileText className="w-8 h-8 mr-3" />
              Document Management
            </h1>
            <p className="text-gray-600 mt-2">Manage project documents and files</p>
          </div>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingDocuments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{approvedDocuments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Folder className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="proposals">Proposals</SelectItem>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="reports">Technical Reports</SelectItem>
                  <SelectItem value="legal">Legal Documents</SelectItem>
                  <SelectItem value="site">Site Documentation</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="signed">Signed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map((doc: any) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(doc.type)}
                    <div>
                      <h3 className="font-semibold text-lg">{doc.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Size: {doc.size}</span>
                        <span>•</span>
                        <span>Project: {doc.project}</span>
                        <span>•</span>
                        <span>Category: {doc.category}</span>
                        <span>•</span>
                        <span>Uploaded: {new Date(doc.upload_date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>By: {doc.uploaded_by}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search criteria" : "Start by uploading your first document"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDocuments;
