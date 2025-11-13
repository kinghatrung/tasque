import Task from "../models/Task.js";

const taskService = {
  getTasks: async () => {
    try {
      const tasks = await Task.find();

      return tasks;
    } catch (error) {
      throw error;
    }
  },

  createTask: async (title, description, status, priority, deadline, createdBy) => {
    try {
      if (!title || !description || !status || !priority || !deadline || !createdBy)
        throw new Error("Không được thiếu các thông tin trên");

      await Task.create({
        title,
        description,
        status,
        priority,
        deadline,
        createdBy,
      });

      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default taskService;
