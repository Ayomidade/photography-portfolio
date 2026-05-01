import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import {
  uploadImageToCloudinary,
  uploadMultipleImages,
} from "../services/cloudinary.service.js";

const router = Router();

// -------- SINGLE UPLOAD --------
router.post("/single", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadImageToCloudinary(
      req.file.buffer,
      req.file.originalname,
    );

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        imageUrl: result.secure_url,
        imagePublicId: result.public_id,
      },
    });
  } catch (error) {
    console.error("Single upload error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// -------- MULTIPLE UPLOAD --------
router.post(
  "/multiple",
  protect,
  upload.array("images", 20),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }

      const results = await uploadMultipleImages(req.files);

      const formatted = results.map((img) => ({
        imageUrl: img.secure_url,
        imagePublicId: img.public_id,
      }));

      return res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        data: formatted,
      });
    } catch (error) {
      console.error("Multiple upload error:", error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
);

export default router;
