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
    createdBy: string
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
};
