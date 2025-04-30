import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import {
  createPost,
  getMyPosts,
  updateMyPost,
  deleteMyPost,
  fetchPostData,
} from "../controllers/userPost.controller";
import { validate } from "../middlewares/joi.middleware";
import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.validator";

const router = express.Router();

// Apply authenticate to all routes
router.use(authenticate);

// Routes with "user" only
router.post("/", authorize("user"), validate(createPostSchema), createPost);
router.get("/", authorize("user"), getMyPosts);
router.delete("/:id", authorize("user"), deleteMyPost);

// Route allowing "user" and "admin"
router.get("/:id", authorize("user", "admin"), fetchPostData);
router.put(
  "/:id",
  authorize("user", "admin"),
  validate(updatePostSchema),
  updateMyPost
);

export default router;
