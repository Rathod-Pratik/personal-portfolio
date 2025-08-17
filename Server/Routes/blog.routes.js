import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../Controller/blog.controller.js";
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';
import { updateAdminViews } from "../Middleware/View.middleware.js";

const router = express.Router();

router.post("/create",checkAdminCookie, createBlog);       
router.get("/get",updateAdminViews, getBlogs);            
router.get("/:id",updateAdminViews, getBlogBySlug);    
router.put("/:id",checkAdminCookie, updateBlog);   
router.delete("/:id",checkAdminCookie, deleteBlog);

export default router;
