import authService from "../services/authService.js";

const authController = {
  signIn: async (req, res) => {},

  signUp: async (req, res) => {
    try {
      const { username, password, email, firstName, lastName } = req.body;

      await authService.signUp(username, password, email, firstName, lastName);

      res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (err) {
      res.status(500).json("Lỗi hệ thống, vui lòng thử lại sau!");
      console.log({ message: err.message });
    }
  },
};

export default authController;
