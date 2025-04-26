import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  status: Joi.string().valid("draft", "published").required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3),
  content: Joi.string().min(10),
  status: Joi.string().valid("draft", "published"),
  tags: Joi.array().items(Joi.string()),
});
