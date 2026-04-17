import { ObjectId } from "mongodb";
import { create, findAll, findById, deleteOne } from "../models/Photos.js";
import {
  decreasePhotoCount,
  findCollectionById,
  increasePhotoCount,
} from "../models/Collections.js";

// GET /api/photos
export const getPhotos = async (req, res) => {
  try {
    const photos = await findAll();

    // if (!photos || photos.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "No Photos found" });
    // }
    return res
      .status(200)
      .json({ success: true, count: photos.length, data: photos });
  } catch (error) {
    console.error("getPhotos error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/photos
export const createPhoto = async (req, res) => {
  try {
    const { title, description, category, imageUrl, collectionId, featured } =
      req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    }

    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Image URL is required" });
    }

    if (collectionId) {
      const collection = await findCollectionById(collectionId);
      if (!collection) {
        return res
          .status(404)
          .json({ success: false, message: "Collection not found" });
      }
    }

    const result = await create({
      title,
      description,
      category,
      imageUrl,
      collectionId: collectionId || null,
      featured: featured || false,
    });

    if (collectionId) {
      await increasePhotoCount(collectionId);
    }

    return res.status(201).json({
      success: true,
      message: "Photo created successfully",
      data: { id: result },
    });
  } catch (error) {
    console.error("createPhoto error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/photos/:id
export const getPhoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid photo ID" });
    }

    const photo = await findById(id);

    if (!photo) {
      return res
        .status(404)
        .json({ success: false, message: "Photo not found" });
    }

    return res.status(200).json({ success: true, data: photo });
  } catch (error) {
    console.error("getPhoto error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/photos/:id
export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid photo ID" });
    }

    const photo = await findById(id);
    if (!photo) {
      return res
        .status(404)
        .json({ success: false, message: "Photo not found" });
    }

    await deleteOne(id);

    if (photo.collectionId) {
      await decreasePhotoCount(photo.collectionId);
    }

    return res
      .status(200)
      .json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    console.error("deletePhoto error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
