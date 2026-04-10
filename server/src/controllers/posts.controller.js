import { ObjectId } from "mongodb";
import {
  createPost,
  findAllPosts,
  findPostsByCategory,
  findPostById,
  updatePost,
  deletePost,
} from "../models/JournalPost.js";

export const getPosts = async (req, res) => {
  try {
    const { category } = req.query;
    const posts = category
      ? await findPostsByCategory(category)
      : await findAllPosts();

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No posts found." });
    }

    return res
      .status(200)
      .json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    console.error("getPosts error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Post ID." });
    }

    const post = await findPostById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("getPostsById error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, category, date } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required." });
    }

    if (!excerpt) {
      return res
        .status(400)
        .json({ success: false, message: "Excerpt is required." });
    }

    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Content is required." });
    }

    if (!coverImage) {
      return res
        .status(400)
        .json({ success: false, message: "CoverImage is required." });
    }

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is Required" });
    }

    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "Date is required." });
    }

    const result = await createPost({
      title,
      excerpt,
      content,
      coverImage,
      category,
      date,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully.",
      data: { id: result },
    });
  } catch (error) {
    console.error("addPost error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, coverImage, category, date } = req.body;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Post ID." });
    }
    if (!title && !excerpt && !content && !coverImage && !category && !date) {
      return res.status(400).json({
        success: false,
        message: "Provide at least a field to be updated.",
      });
    }

    const post = await findPostById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }

    const updated = await updatePost(id, {
      title,
      excerpt,
      content,
      coverImage,
      category,
      date,
    });

    if (updated) {
      return res
        .status(200)
        .json({ success: true, message: "Post updated successfully." });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update post." });
    }
  } catch (error) {
    console.error("editPost error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Post ID." });
    }

    const post = await findPostById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }

    const deleted = await deletePost(id);
    if (!deleted) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete post." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully." });
  } catch (error) {
    console.error("removePost error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
