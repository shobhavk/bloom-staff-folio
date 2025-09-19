import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Users, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const TrainingImparted = () => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    trainingType: "",
    totalDays: "",
    durationPerDay: "",
    trainingName: "",
    abcEducationEquivalent: "",
    cuser: "",
    remarks: "",
  })

  const [trainingsImparted, setTrainingsImparted] = useState([
    {
      id: 1,
      trainingName: "React Fundamentals",
      trainingType: "Technical",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      totalDays: "5",
      durationPerDay: "8",
      attendees: 15,
      status: "Completed"
    },
    {
      id: 2,
      trainingName: "Team Leadership",
      trainingType: "Soft Skills",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      totalDays: "3",
      durationPerDay: "6",
      attendees: 12,
      status: "Completed"
    }
  ])

  const trainingTypes = [
    "Technical", "Soft Skills", "Management", "Compliance", "Safety", "Other"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!formData.trainingType || !startDate || !endDate || !formData.totalDays || !formData.durationPerDay || !formData.trainingName) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      })
      return
    }

    const newTraining = {
      id: trainingsImparted.length + 1,
      trainingName: formData.trainingName,
      trainingType: formData.trainingType,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      totalDays: formData.totalDays,
      durationPerDay: formData.durationPerDay,
      attendees: Math.floor(Math.random() * 20) + 5, // Random attendees for demo
      status: "Scheduled"
    }

    setTrainingsImparted(prev => [...prev, newTraining])
    
    // Reset form
    setFormData({
      trainingType: "",
      totalDays: "",
      durationPerDay: "",
      trainingName: "",
      abcEducationEquivalent: "",
      cuser: "",
      remarks: "",
    })
    setStartDate(undefined)
    setEndDate(undefined)

    toast({
      title: "Success",
      description: "Training session scheduled successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Training Imparted</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Training Form */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Schedule Training Session
            </CardTitle>
            <CardDescription>
              Create a new training session that you will conduct
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trainingType">Training Type *</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
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
                <Label>End Date *</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalDays">Total Days *</Label>
                <Input
                  id="totalDays"
                  type="number"
                  value={formData.totalDays}
                  onChange={(e) => handleInputChange("totalDays", e.target.value)}
                  placeholder="Number of days"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="durationPerDay">Duration per Day (hrs) *</Label>
                <Input
                  id="durationPerDay"
                  type="number"
                  value={formData.durationPerDay}
                  onChange={(e) => handleInputChange("durationPerDay", e.target.value)}
                  placeholder="Hours per day"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainingName">Training Name *</Label>
              <Input
                id="trainingName"
                value={formData.trainingName}
                onChange={(e) => handleInputChange("trainingName", e.target.value)}
                placeholder="Enter training name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abcEducationEquivalent">ABC Education Equivalent</Label>
              <Input
                id="abcEducationEquivalent"
                value={formData.abcEducationEquivalent}
                onChange={(e) => handleInputChange("abcEducationEquivalent", e.target.value)}
                placeholder="Education equivalent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cuser">CUser</Label>
              <Input
                id="cuser"
                value={formData.cuser}
                onChange={(e) => handleInputChange("cuser", e.target.value)}
                placeholder="CUser ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                placeholder="Additional remarks"
                className="min-h-[80px]"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full bg-gradient-primary hover:shadow-hover">
              Schedule Training
            </Button>
          </CardContent>
        </Card>

        {/* Training Sessions Table */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="text-primary">Training Sessions</CardTitle>
            <CardDescription>
              Training sessions you have conducted or scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Training Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingsImparted.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell className="font-medium">{training.trainingName}</TableCell>
                    <TableCell>{training.trainingType}</TableCell>
                    <TableCell>{training.totalDays} days</TableCell>
                    <TableCell>{training.attendees}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        training.status === "Completed" 
                          ? "bg-pastel-mint text-accent-foreground" 
                          : "bg-pastel-sky text-foreground"
                      }`}>
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

export default TrainingImparted