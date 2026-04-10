import { Router } from "express";
import {
  addPost,
  editPost,
  getPostById,
  getPosts,
  removePost,
} from "../controllers/posts.controller.js";

const post_route = Router();

post_route.get("/", getPosts);
post_route.get("/:id", getPostById);
post_route.post("/", addPost);
post_route.patch("/:id", editPost);
post_route.delete("/:id", removePost);

export default post_route;
