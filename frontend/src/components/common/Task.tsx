import { useState } from "react";
import { Trash2, ChevronRight, Settings, ChevronDown, ChevronUp, Equal } from "lucide-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { TaskProps } from "~/types/task";
import { TASK_STATUS, TASK_PRIORITY } from "~/constants/task";
import type { TaskStatusKey, TaskPriorityKey } from "~/constants/task";
import { taskService } from "~/services/taskService";

function Task({ task }: TaskProps) {
  const queryClient = useQueryClient();

  const [openChange, setOpenChange] = useState(false);

  const handleDeleteTask = async (idTask: string) => {
    await taskService.deleteTask(idTask);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

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

            <Dialog onOpenChange={setOpenChange} open={openChange}>
              <DialogTrigger asChild>
                <Button
                  className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                  variant="ghost"
                >
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-bold text-xl">Bạn muốn xóa công việc này?</DialogTitle>
                  <DialogDescription>
                    Việc thực hiện xóa công việc sẽ vĩnh viễn không thể khôi phục công việc này nữa. Bạn có chắc chắn
                    vẫn muốn xóa?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => setOpenChange(false)} className="cursor-pointer" variant="outline">
                    Hủy
                  </Button>
                  <Button onClick={() => handleDeleteTask(task._id)} className="cursor-pointer">
                    Xóa công việc
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
              <div className="w-4 h-4">
                <ChevronDown className="w-full h-full" />
              </div>
            ) : task.priority === "high" ? (
              <div className="w-4 h-4">
                <ChevronUp className="w-full h-full" />
              </div>
            ) : (
              <div className="w-4 h-4">
                <Equal className="w-full h-full " />
              </div>
            )}
            {TASK_PRIORITY[task.priority as TaskPriorityKey] ?? "Không xác định"}
          </Badge>
          <span className="text-sm text-muted-foreground">Hạn: {format(new Date(task.deadline), "dd/MM/yyyy")}</span>
          <span className="text-sm text-muted-foreground">Người tạo: {task.createdBy.displayName}</span>
        </div>
      </div>
    </div>
  );
}

export default Task;
