import { Router } from "express";
import {
  addCollection,
  editCollection,
  getAllCollections,
  getCollectionById,
  getCollectionBySlug,
  removeCollection,
} from "../controllers/collection.contoller.js";

const collection_route = Router();

collection_route.get("/", getAllCollections);
collection_route.get("/:id", getCollectionById);
collection_route.get("/slug/:slug", getCollectionBySlug);
collection_route.post("/", addCollection);
collection_route.patch("/:id", editCollection);
collection_route.delete("/:id", removeCollection);

export default collection_route;
