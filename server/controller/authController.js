const User = require("../models/User"); // ✅ REQUIRED

const register = async (req, res) => {
  console.log("REQ BODY:", req.body);

  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const user = new User({ email, password, role });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// ✅ DEFINE login (even simple version)
const login = async (req, res) => {
  return res.json({
    success: true,
    message: "Login route working"
  });
};

module.exports = { register, login };
