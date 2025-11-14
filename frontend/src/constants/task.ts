export const TASK_STATUS_LABELS = {
  todo: "Chưa làm",
  inprogress: "Đang làm",
  done: "Hoàn thành",
} as const;

export const TASK_PRIORITY_LABELS = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
} as const;

export type TaskStatusKey = keyof typeof TASK_STATUS_LABELS;
export type TaskPriorityKey = keyof typeof TASK_PRIORITY_LABELS;
