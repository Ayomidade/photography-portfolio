import { Router } from "express";
import {
  createPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
} from "../controllers/photos.controller.js";

const photo_router = Router();

photo_router.get("/", getPhotos);
photo_router.post("/", createPhoto);
photo_router.get("/:id", getPhoto);
photo_router.delete("/:id", deletePhoto);

export default photo_router;
