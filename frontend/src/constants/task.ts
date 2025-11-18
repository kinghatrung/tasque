export const TASK_STATUS = {
  todo: { label: "Chưa làm", color: "bg-gray-100 text-gray-800" },
  inprogress: { label: "Đang làm", color: "bg-blue-100 text-blue-800" },
  done: { label: "Hoàn thành", color: "bg-green-100 text-green-800" },
} as const;

export const TASK_PRIORITY = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
} as const;

export type TaskStatusKey = keyof typeof TASK_STATUS;
export type TaskPriorityKey = keyof typeof TASK_PRIORITY;
