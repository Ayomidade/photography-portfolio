import { ObjectId } from "mongodb";
import { journal_posts } from "../config/db.js";

// const posts = ()=>journal_posts();

export const findAllPosts = async () => {
  const result = await journal_posts().find().sort({ createdAt: -1 }).toArray();
  return result;
};

export const findPostById = async (id) => {
  const result = await journal_posts().findOne({ _id: new ObjectId(id) });
  return result;
};

export const findPostsByCategory = async (category) => {
  const result = await journal_posts()
    .find({ category })
    .sort({ createdAt: -1 })
    .toArray();
  return result;
};

export const createPost = async (data) => {
  const doc = {
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.coverImage,
    category: data.category,
    date: data.date,
    createdAt: new Date(),
  };

  const result = await journal_posts().insertOne(doc);
  return result.insertedId;
};

export const updatePost = async (id, data) => {
  const updates = {};

  if (data.title) updates.title = data.title;
  if (data.excerpt) updates.excerpt = data.excerpt;
  if (data.content) updates.content = data.content;
  if (data.coverImage) updates.coverImage = data.coverImage;
  if (data.category) updates.category = data.category;
  if (data.date) updates.date = data.date;

  const result = await journal_posts().updateOne(
    { _id: new ObjectId(id) },
    { $set: updates },
  );

  return result.modifiedCount === 1;
};

export const deletePost = async (id) => {
  const result = await journal_posts().deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
};
