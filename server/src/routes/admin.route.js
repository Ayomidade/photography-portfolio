import { Router } from "express";
import { checkSession, login, register } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.js";

const adminRoute = Router();

// ---POST /api/admin/register
adminRoute.post("/register", register);

// ---POST /api/admin/login
adminRoute.post("/login", login);

// ---GET /api/admin/me
adminRoute.get("/me",protect, checkSession)

// adminRoutes.js — no changes needed
adminRoute.post('/logout', protect, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to log out.',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    })
  })
})

export default adminRoute;
