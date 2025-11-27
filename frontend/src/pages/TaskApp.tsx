/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Equal, Calendar as CalendarIcon, CircleAlert, Search, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/components/ui/empty";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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
import type { TasksResponse } from "~/types/task";
import { authSelect } from "~/redux/slices/authSlice";
import { Label } from "~/components/ui/label";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import useDebounce from "~/hooks/useDebounce";
import TitlePage from "~/components/common/TitlePage";
import useQueryAndUpdateParams from "~/hooks/useQueryAndUpdateParams";

const taskSchema = z.object({
  title: z.string().nonempty("Tên công việc bắt buộc phải có"),
  description: z.string().nonempty("Mô tả công việc bắt buộc phải có"),
  status: z.string().nonempty("Trạng thái công việc bắt buộc phải có"),
  priority: z.string().nonempty("Trạng thái công việc bắt buộc phải có"),
  deadline: z.date("Hạn công việc không được để trống"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

function TaskApp() {
  const queryClient = useQueryClient();
  const { query, updateParams } = useQueryAndUpdateParams();
  const { currentUser } = useSelector(authSelect);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState(query.search || "");
  const [page, setPage] = useState(1);
  const [openChange, setOpenChange] = useState(false);
  const [date, setDate] = useState<Date>();
  const limit = 5;
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    updateParams({
      status: statusFilter,
      priority: priorityFilter,
      search: debouncedSearch,
      page,
      limit,
    });
  }, [statusFilter, priorityFilter, debouncedSearch, page, limit]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      deadline: new Date(),
    },
  });

  const { data: dataTasks } = useQuery<TasksResponse>({
    queryKey: ["tasks", statusFilter, priorityFilter, debouncedSearch, page],
    queryFn: async () =>
      taskService.getTasks({ status: statusFilter, priority: priorityFilter, search: debouncedSearch, page, limit }),
    // Ngăn không refetch khi queryKey giống lúc mount
    refetchOnMount: false,
    // Không refetch khi focus tab
    refetchOnWindowFocus: false,
    // Không refetch khi reconnect network
    refetchOnReconnect: false,
    // Cache giữ lại 10 phút
    staleTime: Infinity,
  });

  const pagination = dataTasks?.pagination;
  const hasPrev = dataTasks?.pagination?.hasPrev;
  const hasNext = dataTasks?.pagination?.hasNext;

  const handleCreateTask = async (payload: TaskFormValues) => {
    const { title, description, status, priority, deadline } = payload;
    const idUser = currentUser?._id;

    await taskService.createTask(title, description, status, priority, deadline, idUser);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });

    reset();
    setDate(undefined);
    setOpenChange(false);
  };

  return (
    <div className="flex flex-col min-h-svh">
      <TitlePage
        title="Quản lý công việc"
        description="Người dùng có thể chỉnh sửa công việc theo ý muốn của bản thân"
      />

      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            type="text"
            placeholder="Nhập để tìm công việc..."
            className="pl-9 pr-4 py-2 h-10 border border-gray-300  text-sm transition-all duration-300"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
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
          <Dialog open={openChange} onOpenChange={setOpenChange}>
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

              <form onSubmit={handleSubmit(handleCreateTask)}>
                <div className="flex flex-col gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="block text-sm">
                      Tên công việc
                    </Label>
                    <Input id="title" type="text" placeholder="Quét nhà..." {...register("title")} />
                    {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                  </div>

                  <div className="flex gap-3">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="status" className="block text-sm">
                        Trạng thái
                      </Label>
                      <Select defaultValue="" onValueChange={(value) => setValue("status", value)}>
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
                      {errors.status && <p className="text-destructive text-sm">{errors.status.message}</p>}
                    </div>

                    <div className="space-y-2 w-full">
                      <Label htmlFor="priority" className="block text-sm">
                        Độ ưu tiên
                      </Label>
                      <Select
                        defaultValue=""
                        onValueChange={(value) => setValue("priority", value, { shouldValidate: true })}
                      >
                        <SelectTrigger
                          id="priority"
                          className="w-full border border-gray-300 transition-all duration-300 cursor-pointer"
                        >
                          <SelectValue placeholder="Độ ưu tiên công việc..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Độ ưu tiên</SelectLabel>
                            <SelectItem className="cursor-pointer h-10" value="low">
                              <ChevronDown className="w-full h-full" />
                              Thấp
                            </SelectItem>
                            <SelectItem className="cursor-pointer h-10" value="medium">
                              <Equal className="w-full h-full " />
                              Trung bình
                            </SelectItem>
                            <SelectItem className="cursor-pointer h-10" value="high">
                              <ChevronUp className="w-full h-full" />
                              Cao
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.priority && <p className="text-destructive text-sm">{errors.priority.message}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="deadline" className="block text-sm">
                        Hạn công việc
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="deadline"
                            className="w-full justify-start text-left font-normal cursor-pointer"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              if (!date) return;
                              setValue("deadline", date, { shouldValidate: true });
                              setDate(date);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.deadline && <p className="text-destructive text-sm">{errors.deadline.message}</p>}
                    </div>

                    {/* Thời gian */}
                    {/* <div className="space-y-2">
                      <Label htmlFor="time" className="block text-sm">
                        Thời gian
                      </Label>
                      <Input
                        type="time"
                        id="time"
                        step="1"
                        defaultValue="00:00:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div> */}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="block text-sm">
                      Mô tả
                    </Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Quét nhà như thế nào?..."
                      {...register("description")}
                    />
                    {errors.description && <p className="text-destructive text-sm"> {errors.description.message}</p>}
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
        {dataTasks?.tasks?.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CircleAlert className="w-10 h-10" />
              </EmptyMedia>
              <EmptyTitle className="text-2xl font-bold">Không có công việc nào</EmptyTitle>
              <EmptyDescription className="text-lg">
                {currentUser?.role === "admin"
                  ? "Hãy tạo thêm công việc"
                  : "Hiện tại chưa có công việc, hãy đợi task từ cấp trên!"}
              </EmptyDescription>
            </EmptyHeader>
            {currentUser?.role === "admin" ? (
              <EmptyContent>
                <Button onClick={() => setOpenChange(true)} className="cursor-pointer">
                  Thêm công việc
                </Button>
              </EmptyContent>
            ) : (
              ""
            )}
          </Empty>
        ) : (
          <>
            {dataTasks?.tasks.map((task) => (
              <Task key={task._id} task={task} />
            ))}
            <Pagination className="my-7">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`cursor-pointer ${hasPrev ? "" : "opacity-50 pointer-events-none"}`}
                    onClick={() => hasPrev && setPage(page - 1)}
                  />
                </PaginationItem>

                {Array.from({ length: pagination?.totalPages || 0 }, (_, i) => i + 1).map((page) => {
                  const total = pagination?.totalPages;
                  const current = pagination?.page || 0;

                  if (page === 1 || page === total || (page >= current - 2 && page <= current + 2)) {
                    return (
                      <PaginationItem className="cursor-pointer" key={page}>
                        <PaginationLink isActive={page === current} onClick={() => setPage(page)}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (page === current - 3 || page === current + 3) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    className={`cursor-pointer ${hasNext ? "" : "opacity-50 pointer-events-none"}`}
                    onClick={() => hasNext && setPage(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskApp;
