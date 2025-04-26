import { Request, Response } from "express";
import Post from "../models/post.model";
import { IPost } from "../models/post.model";
import { FilterQuery } from "mongoose";

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const updateAnyPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deleteAnyPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

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

export const getFilteredPosts = async (req: Request, res: Response) => {
  try {
    const { status, author, title } = req.query;
    const query: FilterQuery<IPost> = {};

    if (status) query.status = status;
    if (author) query.author = new RegExp(author as string, "i");
    // used for partial match means if provided alex then it will match to AleX, ALEX, ALEXANDRA. It will be case insensitive also
    if (title) query.title = new RegExp(title as string, "i");

    const posts = await Post.find(query).populate("author", "name email");
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
