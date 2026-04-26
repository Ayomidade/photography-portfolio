import { ObjectId } from "mongodb";
import { collections } from "../config/db.js";

export const findAllCollections = async () => {
  return await collections().find().sort({ createdAt: -1 }).toArray();
};

export const findCollectionById = async (id) => {
  return await collections().findOne({ _id: new ObjectId(id) });
};

export const findCollectionBySlug = async (slug) => {
  return await collections().findOne({ slug });
};

export const createCollection = async (data) => {
  const doc = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    coverImage: data.coverImage,
    coverPublicId: data.coverPublicId,
    photoCount: 0,
    createdAt: new Date(),
  };

  const result = await collections().insertOne(doc);
  return result.insertedId;
};

export const updateCollection = async (id, data) => {
  const updates = {};

  if (data.name) updates.name = data.name;
  if (data.slug) updates.slug = data.slug;
  if (data.description) updates.description = data.description;
  if (data.coverImage) updates.coverImage = data.coverImage;
  if (data.coverPublicId) updates.coverPublicId = data.coverPublicId;

  const result = await collections().updateOne(
    { _id: new ObjectId(id) },
    { $set: updates },
  );

  return result.modifiedCount === 1;
};

export const deleteCollection = async (id) => {
  const result = await collections().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
};

export const increasePhotoCount = async (id) => {
  await collections().updateOne(
    { _id: new ObjectId(id) },
    { $inc: { photoCount: 1 } },
  );
};

export const decreasePhotoCount = async (id) => {
  await collections().updateOne(
    { _id: new ObjectId(id) },
    { $inc: { photoCount: -1 } },
  );
};
