import { ObjectId } from "mongodb";
import {
  createCollection,
  deleteCollection,
  findAllCollections,
  findCollectionById,
  findCollectionBySlug,
  updateCollection,
} from "../models/Collections.js";

// GET /api/collections
export const getAllCollections = async (req, res) => {
  try {
    const collections = await findAllCollections();

    if (!collections || collections.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No collections found." });
    }

    return res
      .status(200)
      .json({ success: true, count: collections.length, data: collections });
  } catch (error) {
    console.error("getAllCollections error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/collections/:id
export const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Collection ID" });
    }

    const collection = await findCollectionById(id);

    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "No collection found." });
    }

    return res.status(200).json({ success: true, data: collection });
  } catch (error) {
    console.error("getCollectionById error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/collections/slug/:slug
export const getCollectionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const collection = await findCollectionBySlug(slug);

    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "No collection found." });
    }

    return res.status(200).json({ success: true, data: collection });
  } catch (error) {
    console.error("getCollectionBySlug error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/collections
export const addCollection = async (req, res) => {
  try {
    const { name, slug, description, coverImage } = req.body;
    if (!name || !slug || !description || !coverImage) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const existing = await findCollectionBySlug(slug);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Collection with this slug already exists",
      });
    }

    const newCollectionId = await createCollection({
      name,
      slug,
      description,
      coverImage,
    });

    return res
      .status(201)
      .json({ success: true, data: { id: newCollectionId } });
  } catch (error) {
    console.error("addCollection error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/collections/:id
export const editCollection = async (req, res) => {
  try {
    const { name, slug, description, coverImage } = req.body;
    const { id } = req.params;

    if (!name && !slug && !description && !coverImage) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to be updated",
      });
    }

    if (slug) {
      const existing = await findCollectionBySlug(slug);
      if (existing && existing._id.toString() !== id) {
        return res.status(409).json({
          success: false,
          message: "A collection with this slug already exists.",
        });
      }
    }

    const collection = await findCollectionById(id);
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "No collection found." });
    }

    const updatedCollection = await updateCollection(id, {
      name,
      slug,
      description,
      coverImage,
    });
    if (updatedCollection) {
      return res.status(200).json({
        success: true,
        message: "Collection updated successfully.",
        // data: updatedCollection,
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update collection." });
    }
  } catch (error) {
    console.error("editCollection error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/collections/:id
export const removeCollection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Collection ID" });
    }

    const collection = await findCollectionById(id);
    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "No collection found." });
    }

    const deleted = await deleteCollection(id);
    if (!deleted) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete collection." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Collection deleted successfully." });
  } catch (error) {
    console.error("removeCollection error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
