import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import {
  getAllPosts,
  updateAnyPost,
  deleteAnyPost,
  getFilteredPosts,
} from "../controllers/adminPost.controller";
import { validate } from "../middlewares/joi.middleware";
import { updatePostSchema } from "../validators/post.validator";

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.get("/", getAllPosts);
router.put("/:id", validate(updatePostSchema), updateAnyPost);
router.delete("/:id", deleteAnyPost);
router.get("/search", getFilteredPosts);

export default router;
