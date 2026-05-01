import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import { upload } from "../config/cloudinary.js";

const upload_router = Router();

// -------POST /api/upload/single-------
upload_router.post("/single", protect, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      data: { imageUrl: req.file.path, imagePublicId: req.file.filename },
    });
  } catch (error) {
    console.error("Image upload error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// -------POST /api/upload/multiple-------
upload_router.post(
  "/multiple",
  protect,
  upload.array("images", 20),
  (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No files uploaded" });
      }

      const uploadedImages = req.files.map((file) => ({
        imageUrl: file.path,
        imagePublicId: file.filename,
      }));

      return res
        .status(200)
        .json({
          success: true,
          message: "Images uploaded successfully.",
          data: uploadedImages,
        });
    } catch (error) {
      console.error("Multiple image upload error:", error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);
// upload_router.post(
//   "/multiple",
//   protect,
//   upload.array("images", 20),
//   (req, res) => {
//     console.log("FILES:", req.files);
//   },
// );

export default upload_router;
