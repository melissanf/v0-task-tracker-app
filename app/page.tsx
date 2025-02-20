"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { AddTaskDialog } from "@/components/add-task-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { TaskCard } from "@/components/task-card"

export default function HomePage() {
  const [filter, setFilter] = React.useState("all")

  const tasks = [
    {
      id: 1,
      title: "Design System Updates",
      description: "Update color palette and typography in Figma",
      dueDate: new Date("2024-03-01"),
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Write Documentation",
      description: "Document new API endpoints and update examples",
      dueDate: new Date("2024-03-05"),
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Review Pull Requests",
      description: "Review and merge team's pending PRs",
      dueDate: new Date("2024-02-28"),
      priority: "low",
      completed: false,
    },
  ] as const

  const stats = [
    { title: "Total Tasks", value: "12" },
    { title: "In Progress", value: "5" },
    { title: "Completed", value: "7" },
    { title: "Completion Rate", value: "58%" },
  ]

  return (
    <div className="container max-w-screen-2xl p-4 md:p-6">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Here's an overview of your tasks</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <AddTaskDialog
              trigger={
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              }
              onSubmit={(data) => {
                console.log("New task:", data)
              }}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex items-center justify-between space-y-0">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Recent Tasks</h2>
          <p className="text-sm text-muted-foreground">Your tasks for this week</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            priority={task.priority}
            completed={task.completed}
            onCompletedChange={(completed) => {
              console.log(`Task ${task.id} completion changed to:`, completed)
            }}
          />
        ))}
      </div>
    </div>
  )
}

