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
  return result.deletedCount===1;
};
