import { LayoutGrid, CheckCircle2, Clock, ListTodo } from "lucide-react";

export const menuItems = [
  {
    label: "Tất cả công việc",
    to: "/",
    icon: LayoutGrid,
  },
  {
    label: "Thống kê",
    to: "/statis",
    icon: ListTodo,
  },
  {
    label: "Bạn bè",
    to: "/friends",
    icon: Clock,
  },
  {
    label: "Nhóm",
    to: "/group",
    icon: CheckCircle2,
  },
];
