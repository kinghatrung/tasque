import bcrypt from "bcrypt";

import User from "../models/User.js";

const authService = {
  signIn: async () => {},

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      if (!username || !password || !email || !firstName || !lastName)
        throw new Error("Vui lòng điền đầy đủ thông tin!");
      const user = User.findOne({ username });
      if (user) throw new Error("Tên đăng nhập đã tồn tại!");

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        hashPassword: hashedPassword,
        email,
        displayName: `${firstName} ${lastName}`,
      });

      return;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
