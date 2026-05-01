import { Router } from "express";
import {
  addCollection,
  editCollection,
  getAllCollections,
  getCollectionById,
  getCollectionBySlug,
  getCollectionPhotos,
  removeCollection,
} from "../controllers/collection.contoller.js";
import { protect } from "../middlewares/auth.js";

const collection_route = Router();

collection_route.get("/", getAllCollections);
collection_route.get("/photos/:id", getCollectionPhotos);
collection_route.get("/:id", getCollectionById);
collection_route.get("/slug/:slug", getCollectionBySlug);
collection_route.post("/", protect, addCollection);
collection_route.patch("/:id", protect, editCollection);
collection_route.delete("/:id", protect, removeCollection);

export default collection_route;
