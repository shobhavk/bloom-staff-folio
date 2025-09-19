import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, TrendingUp, Calendar, UserCheck, UserX } from "lucide-react"
import dashboardHero from "@/assets/dashboard-hero.jpg"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "147",
      description: "Active employees",
      icon: Users,
      trend: "+12 this month",
      color: "text-primary"
    },
    {
      title: "Certifications",
      value: "89",
      description: "Total certifications earned",
      icon: Award,
      trend: "+7 this month",
      color: "text-accent-foreground"
    },
    {
      title: "Roll On (This Month)",
      value: "23",
      description: "New joiners",
      icon: UserCheck,
      trend: "+5 from last month",
      color: "text-secondary-foreground"
    },
    {
      title: "Roll Off (This Month)",
      value: "8",
      description: "Departures",
      icon: UserX,
      trend: "-2 from last month",
      color: "text-destructive"
    }
  ]

  const teamStats = [
    { team: "Development", count: 45, color: "bg-primary" },
    { team: "QA", count: 28, color: "bg-secondary" },
    { team: "DevOps", count: 15, color: "bg-accent" },
    { team: "Design", count: 12, color: "bg-pastel-peach" },
    { team: "Management", count: 18, color: "bg-pastel-mint" },
    { team: "Support", count: 29, color: "bg-pastel-sky" }
  ]

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-6 text-primary-foreground">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardHero})` }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-primary-foreground/80">
            Welcome back, Shruthi! Here's your team's performance at a glance.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-hover transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span className="text-xs text-primary font-medium">
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Team Distribution
            </CardTitle>
            <CardDescription>
              Current headcount across different teams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamStats.map((team, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${team.color}`} />
                    <span className="text-sm font-medium">{team.team}</span>
                  </div>
                  <Badge variant="secondary" className="bg-pastel-lavender text-foreground">
                    {team.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Today:</span>
                <span>3 new certifications added</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-muted-foreground">Yesterday:</span>
                <span>2 employees joined Development team</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-muted-foreground">This week:</span>
                <span>5 training sessions completed</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-pastel-peach" />
                <span className="text-muted-foreground">This month:</span>
                <span>23 new employee registrations</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard