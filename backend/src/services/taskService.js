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
        throw new Error("Không tìm thấy Task");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },

  editTask: async (id, title, description, status, priority, deadline) => {
    try {
      const oldTask = await Task.findById(id);

      if (!oldTask) throw new Error("Không tìm thấy Task");

      const updates = {};

      if (title !== oldTask.title) updates.title = title;
      if (description !== oldTask.description) updates.description = description;
      if (status !== oldTask.status) updates.status = status;
      if (priority !== oldTask.priority) updates.priority = priority;
      if (deadline && new Date(deadline).getTime() !== oldTask.deadline.getTime())
        updates.deadline = new Date(deadline);

      if (Object.keys(updates).length === 0) return oldTask;

      await Task.findByIdAndUpdate(id, updates, { new: true });

      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default taskService;
