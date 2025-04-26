import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import {
  createPost,
  getMyPosts,
  updateMyPost,
  deleteMyPost,
} from "../controllers/userPost.controller";
import { validate } from "../middlewares/joi.middleware";
import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.validator";

const router = express.Router();

router.use(authenticate, authorize("user"));

router.post("/", validate(createPostSchema), createPost);
router.get("/", getMyPosts);
router.put("/:id", validate(updatePostSchema), updateMyPost);
router.delete("/:id", deleteMyPost);

export default router;
