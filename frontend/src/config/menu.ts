import { ChartBar, Group, Users, LayoutDashboard, Briefcase } from "lucide-react";

export const menuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Công việc",
    to: "/work",
    icon: Briefcase,
  },
  {
    label: "Thống kê",
    to: "/statis",
    icon: ChartBar,
  },
  {
    label: "Bạn bè",
    to: "/friends",
    icon: Users,
  },
  {
    label: "Nhóm",
    to: "/group",
    icon: Group,
  },
];
