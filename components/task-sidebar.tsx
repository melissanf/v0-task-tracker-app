"use client"

import { CheckCircle2, CircleDashed, ListTodo, Settings, Timer } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface TaskCount {
  all: number
  inProgress: number
  completed: number
}

interface TaskSidebarProps {
  taskCount: TaskCount
}

export function TaskSidebar({ taskCount }: TaskSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    {
      title: "All Tasks",
      href: "/",
      icon: ListTodo,
      count: taskCount.all,
      tooltip: "All Tasks",
    },
    {
      title: "In Progress",
      href: "/in-progress",
      icon: Timer,
      count: taskCount.inProgress,
      tooltip: "In Progress",
    },
    {
      title: "Completed",
      href: "/completed",
      icon: CheckCircle2,
      count: taskCount.completed,
      tooltip: "Completed",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      tooltip: "Settings",
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <CircleDashed className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Tasks</h1>
            <p className="text-sm text-muted-foreground">Task Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="w-full"
                    tooltip={item.tooltip}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.count !== undefined && (
                        <span
                          className={`ml-auto inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-2 text-xs font-medium 
                            ${
                              pathname === item.href
                                ? "border-primary-foreground/20 bg-primary-foreground/10"
                                : "border-muted bg-muted"
                            }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

