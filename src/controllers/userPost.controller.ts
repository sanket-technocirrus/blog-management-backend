import { Request, Response } from "express";
import Post from "../models/post.model";

export const createPost = async (req: Request, res: Response) => {
  try {
    await Post.create({ ...req.body, author: req.user!.id });

    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ author: req.user!.id });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const updateMyPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user!.id },
      req.body,
      { new: true }
    );

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deleteMyPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user!.id,
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
