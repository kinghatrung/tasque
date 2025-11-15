import { Trash2, ChevronRight, Settings, ChevronDown, ChevronUp, Equal } from "lucide-react";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { TaskProps } from "~/types/task";
import { TASK_STATUS, TASK_PRIORITY } from "~/constants/task";
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
          <div className="flex items-center gap-2">
            <Button className="cursor-pointer" variant="ghost">
              <ChevronRight className="h-4 w-4" />
              Tiếp
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="ghost">
                  <Settings />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-bold text-xl">Tạo công việc mới</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button
              className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
              variant="ghost"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge
            variant="destructive"
            className={`inline-block rounded-full px-2.5 py-1 text-sm font-medium border ${
              TASK_STATUS[task.status as TaskStatusKey].color
            }`}
          >
            {TASK_STATUS[task.status as TaskStatusKey].label ?? "Không xác định"}
          </Badge>
          <Badge variant="secondary" className={`flex items-center gap-2 rounded-full px-2.5 py-1 text-sm font-medium`}>
            {task.priority === "low" ? (
              <div className="w-6 h-6">
                <ChevronDown className="w-full h-full" />
              </div>
            ) : task.priority === "high" ? (
              <div className="w-6 h-6">
                <ChevronUp className="w-full h-full" />
              </div>
            ) : (
              <div className="w-6 h-6">
                <Equal className="w-full h-full " />
              </div>
            )}
            {TASK_PRIORITY[task.priority as TaskPriorityKey] ?? "Không xác định"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Hạn: {format(new Date(task.deadline), "dd/MM/yyyy hh:mm")}
          </span>
          <span className="text-sm text-muted-foreground">Người tạo: {task.createdBy.displayName}</span>
        </div>
      </div>
    </div>
  );
}

export default Task;
