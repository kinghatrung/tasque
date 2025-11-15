import Task from "../models/Task.js";

const taskService = {
  getTasks: async () => {
    try {
      const tasks = await Task.find().populate("createdBy", "displayName");

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

  deleteTask: async (id) => {
    try {
      const deleted = await Task.findByIdAndDelete(id);

      if (!deleted) {
        throw new Error("Task not found");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default taskService;
