import { ObjectId } from "mongodb";
import {
  create,
  findAll,
  findById,
  deleteOne,
  findPhotos,
  updateOne,
} from "../models/Photos.js";
import {
  decreasePhotoCount,
  findCollectionById,
  increasePhotoCount,
} from "../models/Collections.js";
import { deleteImage } from "../config/cloudinary.js";

// GET /api/photos
export const getPhotos = async (req, res) => {
  try {
    const photos = await findAll();

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
    const {
      title,
      description,
      category,
      imageUrl,
      collectionId,
      featured,
      imagePublicId,
    } = req.body;

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
      imagePublicId: imagePublicId || null,
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

    // --- Delete from Cloudinary------
    if (photo.imagePublicId) {
      await deleteImage(photo.imagePublicId);
    }

    return res
      .status(200)
      .json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    console.error("deletePhoto error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/photos with query parameters for filtering
export const getAllPhotos = async (req, res) => {
  try {
    const { featured, collectionId, standalone } = req.query;
    const query = {};

    if (featured === "true") {
      query.featured = true;
    }

    // CHANGE: added collectionId filter with ObjectId validation
    if (collectionId) {
      if (!ObjectId.isValid(collectionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid collection ID.",
        });
      }
      query.collectionId = new ObjectId(collectionId);
    }

    // CHANGE: added standalone filter — powers the Commissions gallery page
    if (standalone === "true") {
      query.collectionId = null;
    }

    const photosList = await findPhotos(query);

    return res.status(200).json({
      success: true,
      count: photosList.length,
      data: photosList,
    });
  } catch (error) {
    console.error("getPhotos error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/photos/:id
export const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      imageUrl,
      collectionId,
      featured,
      imagePublicId,
    } = req.body;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid photo ID." });
    }

    if (
      !title &&
      !description &&
      !category &&
      !imageUrl &&
      collectionId === undefined &&
      featured === undefined &&
      imagePublicId === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update.",
      });
    }

    const photo = await findById(id);
    if (!photo) {
      return res
        .status(404)
        .json({ success: false, message: "Photo not found." });
    }

    if (imageUrl && imageUrl !== photo.imageUrl && photo.imagePublicId) {
      // Delete the old image from Cloudinary
      await deleteImage(photo.imagePublicId);
    }

    // if collectionId is changing, adjust counts on both old and new collection
    const oldCollectionId = photo.collectionId?.toString();
    const newCollectionId = collectionId;
    if (newCollectionId !== undefined && newCollectionId !== oldCollectionId) {
      if (oldCollectionId) {
        await decrementPhotoCount(oldCollectionId);
      }
      if (newCollectionId) {
        if (!ObjectId.isValid(newCollectionId)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid collection ID." });
        }
        const collection = await findCollectionById(newCollectionId);
        if (!collection) {
          return res
            .status(404)
            .json({ success: false, message: "Collection not found." });
        }
        await incrementPhotoCount(newCollectionId);
      }
    }

    await updateOne(id, {
      title,
      description,
      category,
      imageUrl,
      collectionId,
      featured,
      imagePublicId,
    });

    return res.status(200).json({
      success: true,
      message: "Photo updated successfully.",
    });
  } catch (error) {
    console.error("updatePhoto error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
