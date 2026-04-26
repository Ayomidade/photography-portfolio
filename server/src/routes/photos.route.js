import { Router } from "express";
import {
  createPhoto,
  deletePhoto,
  getAllPhotos,
  getPhoto,
  getPhotos,
  updatePhoto,
} from "../controllers/photos.controller.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../config/cloudinary.js";

const photo_router = Router();

photo_router.get("/", getPhotos);
photo_router.get("/all", getAllPhotos);
photo_router.post("/", protect, createPhoto);
photo_router.get("/:id", getPhoto);
photo_router.delete("/:id", protect, deletePhoto);
photo_router.patch("/:id", protect, updatePhoto);

export default photo_router;
