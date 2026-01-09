const express = require("express")
const auth = require("../middlewares/auth")
const isAdmin = require("../middlewares/role")
const User = require("../models/User")

const router = express.Router()

// GET all users (admin only)
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password") // hide passwords
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE user by id (admin only)
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({ message: "User deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
