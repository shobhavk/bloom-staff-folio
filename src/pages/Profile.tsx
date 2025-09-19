import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, Edit, User } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [rsaExpiry, setRsaExpiry] = useState<Date>()
  const [joiningDate, setJoiningDate] = useState<Date>()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Employee Details
    employeeName: "Shruthi",
    mobile: "+91 9876543210",
    gender: "Female",
    communicationAddress: "123 Tech Street",
    area: "Electronic City",
    landmark: "Near Metro Station",
    
    // Project Details
    cuserId: "CUSER001",
    primarySkill: "React Development",
    rsaCardNo: "RSA123456",
    projectExperience: "3 years",
    secondarySkills: "Node.js, TypeScript, MongoDB",
    clientEmailId: "client@company.com",
    availTransport: "Yes",
    
    // Company Details
    xyzEmployeeId: "XYZ001",
    designation: "Senior Software Engineer",
    grade: "L3",
    xyzEmailId: "shruthi@xyz.com",
    xyzCardNo: "XYZ789",
    itExperienceBeforeXyz: "24",
    abcExperienceOnRoll: "36"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={handleSave} className="bg-gradient-primary hover:shadow-hover">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleEdit} variant="outline" className="hover:bg-pastel-lavender/50">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Employee Details */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary">Employee Details</CardTitle>
            <CardDescription>Personal and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange("employeeName", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateOfBirth && "text-muted-foreground"
                      )}
                      disabled={!isEditing}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateOfBirth}
                      onSelect={setDateOfBirth}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  value={formData.landmark}
                  onChange={(e) => handleInputChange("landmark", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <Label htmlFor="communicationAddress">Communication Address</Label>
                <Textarea
                  id="communicationAddress"
                  value={formData.communicationAddress}
                  onChange={(e) => handleInputChange("communicationAddress", e.target.value)}
                  disabled={!isEditing}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary">Project Details</CardTitle>
            <CardDescription>Project-related information and skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cuserId">CUser ID</Label>
                <Input
                  id="cuserId"
                  value={formData.cuserId}
                  onChange={(e) => handleInputChange("cuserId", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primarySkill">Primary Skill</Label>
                <Input
                  id="primarySkill"
                  value={formData.primarySkill}
                  onChange={(e) => handleInputChange("primarySkill", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rsaCardNo">RSA Card No</Label>
                <Input
                  id="rsaCardNo"
                  value={formData.rsaCardNo}
                  onChange={(e) => handleInputChange("rsaCardNo", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>RSA Card Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !rsaExpiry && "text-muted-foreground"
                      )}
                      disabled={!isEditing}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {rsaExpiry ? format(rsaExpiry, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={rsaExpiry}
                      onSelect={setRsaExpiry}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectExperience">Project Experience</Label>
                <Input
                  id="projectExperience"
                  value={formData.projectExperience}
                  onChange={(e) => handleInputChange("projectExperience", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmailId">Client Email ID</Label>
                <Input
                  id="clientEmailId"
                  type="email"
                  value={formData.clientEmailId}
                  onChange={(e) => handleInputChange("clientEmailId", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availTransport">Avail Transport</Label>
                <Select
                  value={formData.availTransport}
                  onValueChange={(value) => handleInputChange("availTransport", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <Label htmlFor="secondarySkills">Secondary Skills/Tools</Label>
                <Textarea
                  id="secondarySkills"
                  value={formData.secondarySkills}
                  onChange={(e) => handleInputChange("secondarySkills", e.target.value)}
                  disabled={!isEditing}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Details */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary">Company Details</CardTitle>
            <CardDescription>Employment and organizational information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="xyzEmployeeId">XYZ Employee ID</Label>
                <Input
                  id="xyzEmployeeId"
                  value={formData.xyzEmployeeId}
                  onChange={(e) => handleInputChange("xyzEmployeeId", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>XYZ Joining Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !joiningDate && "text-muted-foreground"
                      )}
                      disabled={!isEditing}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {joiningDate ? format(joiningDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={joiningDate}
                      onSelect={setJoiningDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange("designation", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => handleInputChange("grade", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="xyzEmailId">XYZ Email ID</Label>
                <Input
                  id="xyzEmailId"
                  type="email"
                  value={formData.xyzEmailId}
                  onChange={(e) => handleInputChange("xyzEmailId", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="xyzCardNo">XYZ Card No</Label>
                <Input
                  id="xyzCardNo"
                  value={formData.xyzCardNo}
                  onChange={(e) => handleInputChange("xyzCardNo", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="itExperienceBeforeXyz">IT Experience Before XYZ (months)</Label>
                <Input
                  id="itExperienceBeforeXyz"
                  type="number"
                  value={formData.itExperienceBeforeXyz}
                  onChange={(e) => handleInputChange("itExperienceBeforeXyz", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="abcExperienceOnRoll">ABC Experience on Roll (months)</Label>
                <Input
                  id="abcExperienceOnRoll"
                  type="number"
                  value={formData.abcExperienceOnRoll}
                  onChange={(e) => handleInputChange("abcExperienceOnRoll", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile