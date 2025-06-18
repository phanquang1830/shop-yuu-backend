import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// bộ lọc chỉ cho upload ảnh:
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh!"), false);
  }
};

// Dùng storage Cloudinary, không lưu ở local nữa
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatar", //Tên folder trên Cloudinary,
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 300, height: 300, crop: "limit" }],
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB = 2 * 1024 * 1024 bytes
  },
});

export default upload;
