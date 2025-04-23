import multer from "multer";
const storage=multer.memoryStorage();

const upload=multer({storage})

export const uploadFiles = upload.fields([
    { name: 'file', maxCount: 1 },    // for .js, .html, etc.
    { name: 'image', maxCount: 1 },   // for .jpg, .png, etc.
  ]);

export default upload;