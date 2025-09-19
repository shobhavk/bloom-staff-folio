import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, UserPlus, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const ProjectRollOn = () => {
  const [rollOnDate, setRollOnDate] = useState<Date>()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    projectName: "",
    clientName: "",
    role: "",
    reportingManager: "",
    location: "",
  })

  const [rollOns, setRollOns] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      employeeId: "EMP001",
      projectName: "E-Commerce Platform",
      clientName: "TechCorp Inc",
      role: "Frontend Developer",
      rollOnDate: "2024-03-01",
      status: "Active"
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      projectName: "Mobile Banking App",
      clientName: "FinanceBank",
      role: "Backend Developer",
      rollOnDate: "2024-02-15",
      status: "Active"
    }
  ])

  const projects = [
    "E-Commerce Platform", "Mobile Banking App", "Healthcare Portal", 
    "Education Management System", "CRM Dashboard", "Analytics Platform"
  ]

  const clients = [
    "TechCorp Inc", "FinanceBank", "HealthcarePlus", "EduTech Solutions", 
    "BusinessPro", "DataInsights Co"
  ]

  const roles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", 
    "UI/UX Designer", "DevOps Engineer", "QA Engineer", "Project Manager"
  ]

  const locations = [
    "Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Remote"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!formData.employeeName || !formData.employeeId || !formData.projectName || !formData.clientName || !rollOnDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      })
      return
    }

    const newRollOn = {
      id: rollOns.length + 1,
      employeeName: formData.employeeName,
      employeeId: formData.employeeId,
      projectName: formData.projectName,
      clientName: formData.clientName,
      role: formData.role,
      rollOnDate: format(rollOnDate, "yyyy-MM-dd"),
      status: "Active"
    }

    setRollOns(prev => [...prev, newRollOn])
    
    // Reset form
    setFormData({
      employeeName: "",
      employeeId: "",
      projectName: "",
      clientName: "",
      role: "",
      reportingManager: "",
      location: "",
    })
    setRollOnDate(undefined)

    toast({
      title: "Success",
      description: "Employee rolled on to project successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserPlus className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Project Roll On</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roll On Form */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Roll On Employee
            </CardTitle>
            <CardDescription>
              Assign an employee to a new project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeName">Employee Name *</Label>
                <Input
                  id="employeeName"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange("employeeName", e.target.value)}
                  placeholder="Enter employee name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange("employeeId", e.target.value)}
                  placeholder="Enter employee ID"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Select
                value={formData.projectName}
                onValueChange={(value) => handleInputChange("projectName", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Select
                value={formData.clientName}
                onValueChange={(value) => handleInputChange("clientName", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportingManager">Reporting Manager</Label>
              <Input
                id="reportingManager"
                value={formData.reportingManager}
                onChange={(e) => handleInputChange("reportingManager", e.target.value)}
                placeholder="Enter reporting manager"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => handleInputChange("location", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Roll On Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !rollOnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {rollOnDate ? format(rollOnDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={rollOnDate}
                    onSelect={setRollOnDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-gradient-primary hover:shadow-hover">
              Roll On Employee
            </Button>
          </CardContent>
        </Card>

        {/* Roll Ons Table */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary">Recent Roll Ons</CardTitle>
            <CardDescription>
              Employees recently rolled on to projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Roll On Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rollOns.map((rollOn) => (
                  <TableRow key={rollOn.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{rollOn.employeeName}</div>
                        <div className="text-xs text-muted-foreground">{rollOn.employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{rollOn.projectName}</TableCell>
                    <TableCell>{rollOn.clientName}</TableCell>
                    <TableCell>{format(new Date(rollOn.rollOnDate), "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-pastel-mint text-accent-foreground">
                        {rollOn.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectRollOn