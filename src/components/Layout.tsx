import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ProfileDropdown } from "@/components/ProfileDropdown"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { UserPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const employeeName = "Shruthi"
  const navigate = useNavigate()

  const handleRegistrationClick = () => {
    navigate("/registration")
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-pastel-lavender via-pastel-sky to-pastel-mint">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 bg-card/80 backdrop-blur-sm border-b border-border shadow-soft">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-foreground hover:bg-pastel-lavender/50 rounded-md" />
              <h1 className="text-xl font-semibold text-foreground">Employee Management System</h1>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRegistrationClick}
                    className="hover:bg-pastel-mint/50 hover:shadow-soft transition-all duration-200"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Employee Registration</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-sm text-muted-foreground">Welcome, {employeeName}</span>
              <ProfileDropdown employeeName={employeeName} />
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}