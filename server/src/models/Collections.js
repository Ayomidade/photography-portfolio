import { ObjectId } from "mongodb";
import { collections } from "../config/db.js";

export const findAllCollections = async () => {
  return await collections().find().sort({ createdAt: -1 }).toArray();
};

export const findCollectionById = async (id) => {
  return collections.findOne({ _id: new ObjectId(id) });
};

export const findCollectionBySlug = async (slug) => {
  return collections.findOne({ slug });
};

export const createCollection = async (data) => {
  const doc = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    coverImage: data.coverImage,
    photoCount: 0,
    createdAt: new Date(),
  };

  const result = await collections.insertOne(doc);
  return result.insertedId;
};

export const updateCollection = async (id, data) => {
  const updates = {};

  if (data.name) updates.name = data.name;
  if (data.slug) updates.slug = data.slug;
  if (data.description) updates.description = data.description;
  if (data.coverImage) updates.coverImage = data.coverImage;

  const result= await collections.updateOne({_id:new ObjectId(id)}, {$set:updates}, {returnDocument:'after'})
    
  return result
};
