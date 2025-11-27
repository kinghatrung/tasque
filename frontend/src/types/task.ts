export interface TaskType {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: Date;
  createdBy: {
    displayName: string;
  };
}

export interface TaskProps {
  task: TaskType;
}

export interface TasksResponse {
  tasks: TaskType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
}
