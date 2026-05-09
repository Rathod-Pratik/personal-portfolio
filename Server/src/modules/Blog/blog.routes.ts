import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from './blog.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { updateAdminViews } from '../../middlewares/View.middleware.ts';
import { uploadFiles } from '../../middlewares/multer.middleware.ts';

const router = express.Router();

router.post("/create", uploadFiles, checkAdminCookie, createBlog);       
router.get("/get",updateAdminViews, getBlogs);            
router.get("/:id",updateAdminViews, getBlogBySlug);    
router.put("/:id", uploadFiles, checkAdminCookie, updateBlog);   
router.delete("/:id",checkAdminCookie, deleteBlog);

export default router;
