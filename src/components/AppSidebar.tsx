import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Home,
  User,
  Award,
  GraduationCap,
  FolderKanban,
  Settings,
  ChevronDown,
  ChevronRight,
  UserCheck,
  UserX,
  Users,
  UserCog,
  Database,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Certification", url: "/certification", icon: Award },
  {
    title: "Training",
    icon: GraduationCap,
    subItems: [
      { title: "Training Attended", url: "/training/attended" },
      { title: "Training Imparted", url: "/training/imparted" },
    ],
  },
  {
    title: "Project Management",
    icon: FolderKanban,
    subItems: [
      { title: "Roll On", url: "/project/roll-on" },
      { title: "Roll Off", url: "/project/roll-off" },
      { title: "Team Movement", url: "/project/team-movement" },
    ],
  },
  {
    title: "Admin",
    icon: Settings,
    subItems: [
      { title: "Update Employee Data", url: "/admin/employee-data" },
      { title: "Update Roll On", url: "/admin/roll-on" },
      { title: "Update Roll Off", url: "/admin/roll-off" },
      { title: "System Settings", url: "/admin/settings" },
    ],
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [openGroups, setOpenGroups] = useState<string[]>([])
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const isGroupActive = (subItems: { url: string }[]) =>
    subItems?.some((item) => isActive(item.url))

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const getNavClass = (isActive: boolean) =>
    isActive
      ? "bg-gradient-primary text-primary-foreground font-medium shadow-soft"
      : "hover:bg-pastel-lavender/50 hover:shadow-soft transition-all duration-200"

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-gradient-primary`}>
      <SidebarContent className="bg-gradient-primary">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/80 font-semibold px-4 py-2">
            {!collapsed && "Employee Portal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openGroups.includes(item.title)}
                      onOpenChange={() => toggleGroup(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`${getNavClass(
                            isGroupActive(item.subItems)
                          )} text-primary-foreground`}
                        >
                          <item.icon className="h-4 w-4" />
                          {!collapsed && (
                            <>
                              <span>{item.title}</span>
                              {openGroups.includes(item.title) ? (
                                <ChevronDown className="ml-auto h-4 w-4" />
                              ) : (
                                <ChevronRight className="ml-auto h-4 w-4" />
                              )}
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!collapsed && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subItem.url}
                                    className={getNavClass(isActive(subItem.url))}
                                  >
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`${getNavClass(isActive(item.url))} text-primary-foreground`}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}