import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Award, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const Certification = () => {
  const [certificationDate, setCertificationDate] = useState<Date>()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    certificationAuthority: "",
    certificationTitle: "",
    certificationType: "",
  })

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      authority: "AWS",
      title: "Solutions Architect Associate",
      type: "Cloud",
      date: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      authority: "Microsoft",
      title: "Azure Developer Associate",
      type: "Cloud",
      date: "2023-11-20",
      status: "Active"
    },
    {
      id: 3,
      authority: "Google",
      title: "Professional Cloud Architect",
      type: "Cloud",
      date: "2023-08-10",
      status: "Expired"
    }
  ])

  const certificationAuthorities = [
    "AWS", "Microsoft", "Google", "Oracle", "Salesforce", "VMware", "Cisco", "CompTIA", "Other"
  ]

  const certificationTypes = [
    "Cloud", "Security", "Database", "Networking", "Programming", "Project Management", "Other"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!formData.certificationAuthority || !formData.certificationTitle || !formData.certificationType || !certificationDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      })
      return
    }

    const newCertification = {
      id: certifications.length + 1,
      authority: formData.certificationAuthority,
      title: formData.certificationTitle,
      type: formData.certificationType,
      date: format(certificationDate, "yyyy-MM-dd"),
      status: "Active"
    }

    setCertifications(prev => [...prev, newCertification])
    
    // Reset form
    setFormData({
      certificationAuthority: "",
      certificationTitle: "",
      certificationType: "",
    })
    setCertificationDate(undefined)

    toast({
      title: "Success",
      description: "Certification added successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Award className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Certification Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Certification Form */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Certification
            </CardTitle>
            <CardDescription>
              Enter certification details to add to your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certificationAuthority">Certification Authority *</Label>
              <Select
                value={formData.certificationAuthority}
                onValueChange={(value) => handleInputChange("certificationAuthority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select authority" />
                </SelectTrigger>
                <SelectContent>
                  {certificationAuthorities.map((authority) => (
                    <SelectItem key={authority} value={authority}>
                      {authority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificationTitle">Certification Title *</Label>
              <Input
                id="certificationTitle"
                value={formData.certificationTitle}
                onChange={(e) => handleInputChange("certificationTitle", e.target.value)}
                placeholder="Enter certification title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificationType">Certification Type *</Label>
              <Select
                value={formData.certificationType}
                onValueChange={(value) => handleInputChange("certificationType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {certificationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Certification Acquired Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !certificationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {certificationDate ? format(certificationDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={certificationDate}
                    onSelect={setCertificationDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-gradient-primary hover:shadow-hover">
              Add Certification
            </Button>
          </CardContent>
        </Card>

        {/* Certifications Table */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary">My Certifications</CardTitle>
            <CardDescription>
              View all your certifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Authority</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.authority}</TableCell>
                    <TableCell>{cert.title}</TableCell>
                    <TableCell>{cert.type}</TableCell>
                    <TableCell>{format(new Date(cert.date), "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cert.status === "Active" 
                          ? "bg-pastel-mint text-accent-foreground" 
                          : "bg-pastel-peach text-destructive"
                      }`}>
                        {cert.status}
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

export default Certification