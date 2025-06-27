
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Building, Calendar, Users, MapPin, Edit } from "lucide-react";

const AdminProjects = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateProject, setShowCreateProject] = useState(false);

  const [projects] = useState([
    {
      id: 1,
      name: "Westlands Residential Complex",
      client: "John Doe",
      location: "Westlands, Nairobi",
      type: "Residential",
      status: "in_progress",
      progress: 75,
      startDate: "2023-09-01",
      endDate: "2024-03-15",
      budget: 4500000,
      spent: 3375000,
      teamMembers: ["Engineer A", "Foreman B", "Architect C"],
      description: "3-bedroom house with modern amenities and landscaping"
    },
    {
      id: 2,
      name: "Kilimani Office Tower",
      client: "Jane Smith",
      location: "Kilimani, Nairobi",
      type: "Commercial",
      status: "in_progress",
      progress: 45,
      startDate: "2023-11-01",
      endDate: "2024-06-20",
      budget: 8500000,
      spent: 3825000,
      teamMembers: ["Engineer D", "Project Manager E"],
      description: "20-unit office complex with modern facilities"
    },
    {
      id: 3,
      name: "Karen Villa Renovation",
      client: "Mike Wilson",
      location: "Karen, Nairobi",
      type: "Renovation",
      status: "completed",
      progress: 100,
      startDate: "2023-10-01",
      endDate: "2023-12-15",
      budget: 1800000,
      spent: 1750000,
      teamMembers: ["Interior Designer F", "Contractor G"],
      description: "Complete kitchen and bathroom renovation"
    },
    {
      id: 4,
      name: "Kiambu Civil Works",
      client: "Sarah Mwangi",
      location: "Kiambu",
      type: "Civil Works",
      status: "planning",
      progress: 15,
      startDate: "2024-02-01",
      endDate: "2024-08-30",
      budget: 15000000,
      spent: 2250000,
      teamMembers: ["Civil Engineer H", "Surveyor I"],
      description: "Road construction and drainage system"
    }
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    location: "",
    type: "",
    budget: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "outline";
      case "in_progress": return "default";
      case "completed": return "secondary";
      case "on_hold": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "planning": return "📋";
      case "in_progress": return "🏗️";
      case "completed": return "✅";
      case "on_hold": return "⏸️";
      default: return "📋";
    }
  };

  const handleCreateProject = () => {
    console.log("Creating new project:", newProject);
    toast({
      title: "Project Created",
      description: "New project has been added successfully.",
    });
    setShowCreateProject(false);
    setNewProject({
      name: "",
      client: "",
      location: "",
      type: "",
      budget: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
              <p className="text-gray-600">Monitor and manage all construction projects</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <a href="/admin">Back to Dashboard</a>
              </Button>
              <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                      Add a new construction project to your portfolio
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                          id="name"
                          value={newProject.name}
                          onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="client">Client Name</Label>
                        <Input
                          id="client"
                          value={newProject.client}
                          onChange={(e) => setNewProject(prev => ({ ...prev, client: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newProject.location}
                          onChange={(e) => setNewProject(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Project Type</Label>
                        <Select onValueChange={(value) => setNewProject(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Residential">Residential</SelectItem>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                            <SelectItem value="Renovation">Renovation</SelectItem>
                            <SelectItem value="Civil Works">Civil Works</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget">Budget (KSh)</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={newProject.budget}
                          onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={newProject.startDate}
                            onChange={(e) => setNewProject(prev => ({ ...prev, startDate: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={newProject.endDate}
                            onChange={(e) => setNewProject(prev => ({ ...prev, endDate: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the project scope and requirements..."
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowCreateProject(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateProject}>
                        Create Project
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {projects.filter(p => p.status === "in_progress").length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {projects.filter(p => p.status === "completed").length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold">
                    KSh {projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                  </p>
                </div>
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects by name, client, or location..."
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
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{getStatusIcon(project.status)}</span>
                      <div>
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <p className="text-gray-600">{project.client}</p>
                      </div>
                      <Badge variant={getStatusColor(project.status)} className="ml-auto">
                        {project.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-600">Location:</span>
                        <p className="font-medium">{project.location}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Type:</span>
                        <p className="font-medium">{project.type}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Budget:</span>
                        <p className="font-medium">KSh {project.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Start Date:</span>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">End Date:</span>
                        <p className="font-medium">{project.endDate}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Spent:</span>
                        <p className="font-medium">KSh {project.spent.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div>
                      <span className="text-sm text-gray-600">Team Members:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project.teamMembers.map((member, index) => (
                          <Badge key={index} variant="outline">{member}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:w-48">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Project
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      View Timeline
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "No projects have been created yet"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
