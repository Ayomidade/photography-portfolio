import bcrypt from "bcrypt";
import { createAdmin, findAdmin } from "../models/admin.model.js";
import { admin } from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, username and password are required.",
      });
    }
    
    const existingAdmin = await admin().find({ $or: [{ email }, { username }] }).toArray();
    if (existingAdmin.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminId = await createAdmin({
      email,
      username,
      password: hashedPassword,
    });
    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Unable to register admin, please try again.",
      });
    }

    req.session.adminId = adminId.toString();
    req.session.username = username;

    return res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      id: adminId,
    });
  } catch (error) {
    console.error("register error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const admin = await findAdmin(username);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    req.session.adminId = admin._id.toString();
    req.session.username = admin.username;

    console.log(req)
    return res
      .status(200)
      .json({ success: true, message: `Welcome back ${admin.username}` });
  } catch (error) {
    console.error("login error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const checkSession=async(req,res)=>{
  return res.status(200).json({
    success: true,
    data: { username: req.session.username },
  })
}

