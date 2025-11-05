const userController = {
  authMe: async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default userController;
