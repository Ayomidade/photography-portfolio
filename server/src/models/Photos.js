import { ObjectId } from "mongodb";
import { photos } from "../config/db.js";

export const create = async (photoData) => {
  const photo = {
    title: photoData.title,
    description: photoData.description,
    category: photoData.category,
    imageUrl: photoData.imageUrl,
    collectionId: photoData.collectionId,
    featured: photoData.featured,
    createdAt: new Date(),
  };

  const result = await photos().insertOne(photo);
  return result.insertedId;
};

export const findAll = async () => {
  const result = await photos().find().sort({ createdAt: -1 }).toArray();
  return result;
};

export const findById = async (id) => {
  const result = await photos().findOne({ _id: new ObjectId(id) });
  return result;
};

export const deleteOne = async (id) => {
  const result = await photos().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
};

export const findPhotos = async (query = {}) => {
  return await photos().find(query).sort({ createdAt: -1 }).toArray();
};

export const updateOne = async (id, data) => {
  const updates = {};
  if (data.title) updates.title = data.title;
  if (data.description !== undefined) updates.description = data.description;
  if (data.category) updates.category = data.category;
  if (data.imageUrl) updates.imageUrl = data.imageUrl;
  if (data.collectionId !== undefined) updates.collectionId = data.collectionId;
  if (data.featured !== undefined) updates.featured = data.featured;

  const result = await photos().updateOne(
    { _id: new ObjectId(id) },
    { $set: updates },
  );
  return result.modifiedCount === 1;
};

