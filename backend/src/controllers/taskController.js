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

      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default taskController;
