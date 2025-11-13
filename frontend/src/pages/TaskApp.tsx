import { Search, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import Task from "~/components/common/Task";

function TaskApp() {
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

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-10">
              <Plus />
              Thêm Task
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
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-5">
        <Task />
        <Button>Load more</Button>
      </div>
    </div>
  );
}

export default TaskApp;
