import taskService from "../services/taskService.js";

const taskController = {
  getTasks: async (req, res) => {
    try {
      const tasks = await taskService.getTasks();

      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description, status, priority, deadline, createdBy } = req.body;
      await taskService.createTask(title, description, status, priority, deadline, createdBy);

      res.status(200).json({ message: "Tạo công việc thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const id = req.params.id;
      await taskService.deleteTask(id);
      res.status(200).json({ message: "Xóa công việc thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default taskController;
