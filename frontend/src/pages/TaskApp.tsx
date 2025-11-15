import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Task from "~/components/common/Task";
import { taskService } from "~/services/taskService";
import type { TaskType } from "~/types/task";
import { authSelect } from "~/redux/slices/authSlice";
import { Label } from "~/components/ui/label";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

const taskSchema = z.object({
  title: z.string("Tên công việc bắt buộc phải có"),
  description: z.string("Mô tả công việc bắt buộc phải có"),
  status: z.string("Trạng thái công việc bắt buộc phải có"),
  priority: z.string("Trạng thái công việc bắt buộc phải có"),
  deadline: z.date,
});

type TaskFormValues = z.infer<typeof taskSchema>;

function TaskApp() {
  const { currentUser } = useSelector(authSelect);
  const [openChange, setOpenChange] = useState(false);
  const [date, setDate] = useState<Date>();

  const { data: tasks } = useQuery<TaskType[]>({
    queryKey: ["tasks"],
    queryFn: async () => taskService.getTasks(),
  });

  const handleCreateTask = async () => {};

  return (
    <div className="flex flex-col min-h-svh">
      <Card className="mb-5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Quản lý công việc</CardTitle>
          <CardDescription className="text-lg">
            Người dùng có thể chỉnh sửa công việc theo ý muốn của bản thân
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            type="text"
            placeholder="Nhập để tìm sản phẩm..."
            className="pl-9 pr-4 py-2 h-10 border border-gray-300  text-sm transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger
              className="w-50 border border-gray-300 transition-all duration-300 cursor-pointer"
              style={{ height: "40px" }}
            >
              <SelectValue placeholder="Lọc theo trạng thái..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Trạng thái</SelectLabel>
                <SelectItem className="cursor-pointer h-10" value="all">
                  Tất cả
                </SelectItem>
                <SelectItem className="cursor-pointer h-10" value="todo">
                  Chưa làm
                </SelectItem>
                <SelectItem className="cursor-pointer h-10" value="inprogress">
                  Đang làm
                </SelectItem>
                <SelectItem className="cursor-pointer h-10" value="done">
                  Hoàn thành
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger
              className="w-50 border border-gray-300 transition-all duration-300 cursor-pointer"
              style={{ height: "40px" }}
            >
              <SelectValue placeholder="Lọc theo mức độ..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Mức độ</SelectLabel>
                <SelectItem className="cursor-pointer h-10" value="all">
                  Tất cả
                </SelectItem>
                <SelectItem className="cursor-pointer h-10" value="short">
                  Thấp
                </SelectItem>
                <SelectItem className="cursor-pointer h-10" value="medium">
                  Trung bình
                </SelectItem>
                <SelectItem className="cursor-pointer h-10" value="high">
                  Cao
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {currentUser?.role === "admin" && (
          <Dialog onOpenChange={setOpenChange}>
            <DialogTrigger asChild>
              <Button className="h-10 cursor-pointer">
                <Plus />
                Tạo Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bold text-xl">Tạo công việc mới</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateTask}>
                <div className="flex flex-col gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="block text-sm">
                      Tên công việc
                    </Label>
                    <Input id="title" type="text" placeholder="Quét nhà..." />
                  </div>

                  <div className="flex gap-3">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="status" className="block text-sm">
                        Trạng thái
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="status"
                          className="w-full border border-gray-300 transition-all duration-300 cursor-pointer"
                        >
                          <SelectValue placeholder="Trạng thái công việc..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Trạng thái</SelectLabel>
                            <SelectItem className="cursor-pointer h-10" value="todo">
                              Chưa làm
                            </SelectItem>
                            <SelectItem className="cursor-pointer h-10" value="inprogress">
                              Đang làm
                            </SelectItem>
                            <SelectItem className="cursor-pointer h-10" value="done">
                              Hoàn thành
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 w-full">
                      <Label htmlFor="priority" className="block text-sm">
                        Độ ưu tiên
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="priority"
                          className="w-full border border-gray-300 transition-all duration-300 cursor-pointer"
                        >
                          <SelectValue placeholder="Độ ưu tiên công việc..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Độ ưu tiên</SelectLabel>
                            <SelectItem className="cursor-pointer h-10" value="short">
                              Thấp
                            </SelectItem>
                            <SelectItem className="cursor-pointer h-10" value="medium">
                              Trung bình
                            </SelectItem>
                            <SelectItem className="cursor-pointer h-10" value="high">
                              Cao
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="block text-sm">
                      Hạn công việc
                    </Label>
                    <Popover>
                      <PopoverTrigger id="deadline" asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal cursor-pointer ${
                            !date && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="block text-sm">
                      Mô tả
                    </Label>
                    <Input id="description" type="text" placeholder="Quét nhà như thế nào?..." />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      className="cursor-pointer"
                      type="button"
                      variant="outline"
                      onClick={() => setOpenChange(false)}
                    >
                      Hủy
                    </Button>

                    <Button type="submit" className="cursor-pointer text-white">
                      Tạo Task
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="flex flex-col gap-5">
        {tasks?.map((task) => (
          <Task key={task._id} task={task} />
        ))}
        {/* <Button>Load more</Button> */}
      </div>
    </div>
  );
}

export default TaskApp;
