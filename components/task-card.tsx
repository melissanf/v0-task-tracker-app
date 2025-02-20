"use client"

import { format } from "date-fns"
import { Calendar, CheckCircle2, Circle, Clock, Tag } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  title: string
  description?: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  completed: boolean
  onCompletedChange: (completed: boolean) => void
  className?: string
}

export function TaskCard({
  title,
  description,
  dueDate,
  priority,
  completed,
  onCompletedChange,
  className,
}: TaskCardProps) {
  const priorityColors = {
    low: "bg-green-500/10 text-green-700 border-green-600/20 hover:bg-green-500/15",
    medium: "bg-yellow-500/10 text-yellow-700 border-yellow-600/20 hover:bg-yellow-500/15",
    high: "bg-red-500/10 text-red-700 border-red-600/20 hover:bg-red-500/15",
  }

  const isOverdue = new Date() > dueDate && !completed

  return (
    <Card className={cn("group relative transition-all hover:shadow-md", completed && "opacity-75", className)}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <button
          onClick={() => onCompletedChange(!completed)}
          className="mt-1 rounded-full transition-colors hover:bg-muted/50"
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
          <span className="sr-only">{completed ? "Mark as incomplete" : "Mark as complete"}</span>
        </button>
        <div className="flex-1 space-y-1">
          <h3
            className={cn(
              "text-base font-semibold leading-none tracking-tight",
              completed && "line-through text-muted-foreground",
            )}
          >
            {title}
          </h3>
          {description && (
            <p className={cn("text-sm text-muted-foreground", completed && "line-through")}>{description}</p>
          )}
        </div>
        <Badge
          variant="outline"
          className={cn(
            "pointer-events-none hidden text-xs font-medium capitalize md:inline-flex",
            priorityColors[priority],
          )}
        >
          <Tag className="mr-1 h-3 w-3" />
          {priority}
        </Badge>
      </CardHeader>
      <Separator className="mb-3" />
      <CardContent>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className={cn("flex items-center gap-1.5", isOverdue && "text-red-500")}>
            {isOverdue ? <Clock className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
            <time dateTime={dueDate.toISOString()} className="tabular-nums">
              {isOverdue ? "Overdue - " : "Due "}
              {format(dueDate, "MMM d, yyyy")}
            </time>
          </div>
          <Badge variant="outline" className={cn("md:hidden", priorityColors[priority])}>
            <Tag className="mr-1 h-3 w-3" />
            {priority}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

