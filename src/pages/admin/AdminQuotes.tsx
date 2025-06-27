
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, FileText, DollarSign, Calendar, User } from "lucide-react";

const AdminQuotes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const [quotes] = useState([
    {
      id: 1,
      client: "John Doe",
      email: "john@example.com",
      phone: "+254 700 123 456",
      projectType: "House Construction",
      location: "Westlands, Nairobi",
      budget: "3m-5m",
      timeline: "3-6-months",
      description: "3-bedroom house with modern design, swimming pool, and landscaping",
      requirements: ["Architectural Plans", "Interior Design", "Swimming Pool"],
      status: "pending",
      submittedAt: "2024-01-15",
      estimatedAmount: 4200000
    },
    {
      id: 2,
      client: "Jane Smith",
      email: "jane@example.com",
      phone: "+254 701 234 567",
      projectType: "Commercial Building",
      location: "Kilimani, Nairobi",
      budget: "5m-10m",
      timeline: "6-12-months",
      description: "Office complex with 20 units, parking, and security systems",
      requirements: ["Security Systems", "CCTV Installation"],
      status: "approved",
      submittedAt: "2024-01-10",
      estimatedAmount: 8500000
    },
    {
      id: 3,
      client: "Mike Wilson",
      email: "mike@example.com",
      phone: "+254 702 345 678",
      projectType: "Renovation",
      location: "Karen, Nairobi",
      budget: "1m-3m",
      timeline: "1-3-months",
      description: "Kitchen and bathroom renovation with modern fixtures",
      requirements: ["Interior Design"],
      status: "under_review",
      submittedAt: "2024-01-12",
      estimatedAmount: 1800000
    },
    {
      id: 4,
      client: "Sarah Mwangi",
      email: "sarah@example.com",
      phone: "+254 703 456 789",
      projectType: "Civil Works",
      location: "Kiambu",
      budget: "over-10m",
      timeline: "6-12-months",
      description: "Road construction and drainage system for residential estate",
      requirements: ["Landscaping"],
      status: "rejected",
      submittedAt: "2024-01-08",
      estimatedAmount: 15000000
    }
  ]);

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || quote.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "approved": return "default";
      case "under_review": return "outline";
      case "rejected": return "destructive";
      default: return "secondary";
    }
  };

  const handleStatusUpdate = (quoteId: number, newStatus: string) => {
    console.log(`Updating quote ${quoteId} to status: ${newStatus}`);
    toast({
      title: "Status Updated",
      description: `Quote status changed to ${newStatus.replace("_", " ")}`,
    });
  };

  const generateQuote = (quote: any) => {
    console.log("Generating formal quote for:", quote);
    toast({
      title: "Quote Generated",
      description: "Formal quote document has been generated and sent to client.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quote Management</h1>
              <p className="text-gray-600">Review and manage client quote requests</p>
            </div>
            <Button asChild>
              <a href="/admin">Back to Dashboard</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search quotes by client, project type, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <div className="grid gap-6">
          {filteredQuotes.map((quote) => (
            <Card key={quote.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{quote.client}</h3>
                      <Badge variant={getStatusColor(quote.status)}>
                        {quote.status.replace("_", " ")}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{quote.projectType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>KSh {quote.estimatedAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{quote.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{quote.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mt-2 line-clamp-2">{quote.description}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedQuote(quote)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Quote Request Details</DialogTitle>
                          <DialogDescription>
                            Review the complete quote request from {selectedQuote?.client}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedQuote && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Client Name</Label>
                                <p className="text-sm text-gray-600">{selectedQuote.client}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Email</Label>
                                <p className="text-sm text-gray-600">{selectedQuote.email}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Phone</Label>
                                <p className="text-sm text-gray-600">{selectedQuote.phone}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Location</Label>
                                <p className="text-sm text-gray-600">{selectedQuote.location}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Project Type</Label>
                                <p className="text-sm text-gray-600">{selectedQuote.projectType}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Budget Range</Label>
                                <p className="text-sm text-gray-600">{selectedQuote.budget}</p>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="font-medium">Project Description</Label>
                              <p className="text-sm text-gray-600 mt-1">{selectedQuote.description}</p>
                            </div>
                            
                            <div>
                              <Label className="font-medium">Additional Requirements</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {selectedQuote.requirements.map((req: string) => (
                                  <Badge key={req} variant="secondary">{req}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex gap-2 pt-4">
                              <Select onValueChange={(value) => handleStatusUpdate(selectedQuote.id, value)}>
                                <SelectTrigger className="w-48">
                                  <SelectValue placeholder="Update status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="under_review">Under Review</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button onClick={() => generateQuote(selectedQuote)}>
                                Generate Quote
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    {quote.status === "approved" && (
                      <Button size="sm" onClick={() => generateQuote(quote)}>
                        Generate Quote
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuotes.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "No quote requests have been submitted yet"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminQuotes;
