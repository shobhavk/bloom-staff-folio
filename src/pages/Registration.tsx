import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPlus } from "lucide-react"

const Registration = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserPlus className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Employee Registration</h1>
      </div>

      <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="text-primary">New Employee Registration</CardTitle>
          <CardDescription>
            Register new employees with comprehensive details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <UserPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Registration Module</h3>
              <p className="text-muted-foreground mb-4">
                This feature will be available once connected to a backend system.
              </p>
              <Badge variant="secondary" className="bg-pastel-sky text-foreground">
                Coming Soon
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Registration