import express from "express";

import { checkAdminCookie } from "../../middlewares/Auth.middleware.ts";
import { uploadFiles } from "../../middlewares/multer.middleware.ts";
import { uploadImage, deleteImage, updateImage } from "./Aws.controller.ts";

const router = express.Router();

router.post(
  "/upload-image",
  checkAdminCookie,
  uploadFiles,
  uploadImage,
);

router.delete(
  "/delete-image",
  checkAdminCookie,
  deleteImage,
);

router.put(
  "/update-image",
  checkAdminCookie,
  uploadFiles,
  updateImage,
);

export default router;
