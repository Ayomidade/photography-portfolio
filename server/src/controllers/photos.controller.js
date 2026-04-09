import { ObjectId } from "mongodb";
import { create, findAll, findById, deleteOne } from "../models/Photos.js";

export const getPhotos = async (req, res) => {
  try {
    const photos = await findAll();

    if (!photos || photos.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: "No Photos found" });
    }
    return res
      .status(200)
      .json({ success: true, count: photos.length, data: photos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createPhoto = async (req, res) => {
  try {
    const { title, description, category, imageUrl, collectionId, featured } =
      req.body;

    if (!imageUrl) {
      res
        .status(400)
        .json({ success: false, message: "Image Url is required" });
      return;
    }

    const result = await create({
      title,
      description,
      category,
      imageUrl,
      collectionId,
      featured,
    });

    return res.status(201).json({
      success: true,
      message: "Photo created successfully",
      data: { id: result },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

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
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid photo ID" });
    }

    await deleteOne(id);

    return res
      .status(200)
      .json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
