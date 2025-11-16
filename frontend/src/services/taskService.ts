import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const taskService = {
  getTasks: async () => {
    const res = await authorizedAxiosInstance.get("tasks");
    return res.data.tasks;
  },

  createTask: async (
    title: string,
    description: string,
    status: string,
    priority: string,
    deadline: Date,
    createdBy: string | undefined
  ) => {
    const res = await authorizedAxiosInstance.post("tasks/task", {
      title,
      description,
      status,
      priority,
      deadline,
      createdBy,
    });
    return res.data;
  },

  deleteTask: async (idTask: string) => {
    const res = await authorizedAxiosInstance.delete(`tasks/del/${idTask}`);
    return res.data;
  },

  editTask: async (
    idTask: string,
    title: string,
    description: string,
    status: string,
    priority: string,
    deadline: Date
  ) => {
    const res = await authorizedAxiosInstance.put(`tasks/edit/${idTask}`, {
      title,
      description,
      status,
      priority,
      deadline,
    });
    return res.data;
  },
};
