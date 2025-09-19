import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, BookOpen, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const TrainingAttended = () => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    courseName: "",
    trainingType: "",
    faculty: "",
    totalDuration: "",
  })

  const [trainings, setTrainings] = useState([
    {
      id: 1,
      courseName: "React Advanced Concepts",
      trainingType: "Technical",
      faculty: "John Smith",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      duration: "5 days",
      status: "Completed"
    },
    {
      id: 2,
      courseName: "Leadership Skills",
      trainingType: "Soft Skills",
      faculty: "Jane Doe",
      startDate: "2023-12-10",
      endDate: "2023-12-12",
      duration: "3 days",
      status: "Completed"
    }
  ])

  const courseNames = [
    "React Advanced Concepts", "Node.js Development", "Python Programming", 
    "Leadership Skills", "Communication Skills", "Project Management",
    "DevOps Practices", "Database Design", "Security Best Practices"
  ]

  const trainingTypes = [
    "Technical", "Soft Skills", "Management", "Compliance", "Safety", "Other"
  ]

  const faculties = [
    "John Smith", "Jane Doe", "Mike Johnson", "Sarah Wilson", "David Brown", "External Trainer"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!formData.courseName || !formData.trainingType || !formData.faculty || !startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      })
      return
    }

    const newTraining = {
      id: trainings.length + 1,
      courseName: formData.courseName,
      trainingType: formData.trainingType,
      faculty: formData.faculty,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      duration: formData.totalDuration,
      status: "Completed"
    }

    setTrainings(prev => [...prev, newTraining])
    
    // Reset form
    setFormData({
      courseName: "",
      trainingType: "",
      faculty: "",
      totalDuration: "",
    })
    setStartDate(undefined)
    setEndDate(undefined)

    toast({
      title: "Success",
      description: "Training record added successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Training Attended</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Training Form */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Training Record
            </CardTitle>
            <CardDescription>
              Record a training session you have attended
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name *</Label>
              <Select
                value={formData.courseName}
                onValueChange={(value) => handleInputChange("courseName", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courseNames.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainingType">Training Type</Label>
              <Select
                value={formData.trainingType}
                onValueChange={(value) => handleInputChange("trainingType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {trainingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty</Label>
              <Select
                value={formData.faculty}
                onValueChange={(value) => handleInputChange("faculty", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MMM dd") : <span>Start</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "MMM dd") : <span>End</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalDuration">Total Duration</Label>
              <Input
                id="totalDuration"
                value={formData.totalDuration}
                onChange={(e) => handleInputChange("totalDuration", e.target.value)}
                placeholder="e.g., 5 days, 40 hours"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full bg-gradient-primary hover:shadow-hover">
              Add Training Record
            </Button>
          </CardContent>
        </Card>

        {/* Training Records Table */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary">Training History</CardTitle>
            <CardDescription>
              Your training attendance record
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainings.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell className="font-medium">{training.courseName}</TableCell>
                    <TableCell>{training.trainingType}</TableCell>
                    <TableCell>{training.faculty}</TableCell>
                    <TableCell>{training.duration}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-pastel-mint text-accent-foreground">
                        {training.status}
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

export default TrainingAttended