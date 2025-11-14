import { Trash2, ChevronRight } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { TaskProps } from "~/types/task";
import { TASK_STATUS_LABELS, TASK_PRIORITY_LABELS } from "~/constants/task";
import type { TaskStatusKey, TaskPriorityKey } from "~/constants/task";

function Task({ task }: TaskProps) {
  return (
    <div className="p-4 border border-border rounded-lg">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground">{task.title}</h1>
            <p className="mt-1 text-base text-muted-foreground">{task.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="cursor-pointer" variant="ghost">
              <ChevronRight className="h-4 w-4" />
              Tiếp
            </Button>

            <Button
              className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
              variant="ghost"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="destructive" className={`inline-block rounded-full px-2.5 py-1 text-sm font-medium border`}>
            {TASK_STATUS_LABELS[task.status as TaskStatusKey] ?? "Không xác định"}
          </Badge>
          <Badge variant="secondary" className={`inline-block rounded-full px-2.5 py-1 text-sm font-medium`}>
            {TASK_PRIORITY_LABELS[task.priority as TaskPriorityKey] ?? "Không xác định"}
          </Badge>
          <span className="text-sm text-muted-foreground">Hạn: {format(new Date(task.deadline), "dd/MM/yyyy")}</span>
          <span className="text-sm text-muted-foreground">{task.createdBy.displayName}</span>
        </div>
      </div>
    </div>
  );
}

export default Task;
