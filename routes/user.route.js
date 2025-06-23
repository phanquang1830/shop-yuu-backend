import express from "express";
import { getProfile, updateProfile, getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import handleMulterError from "../middlewares/multerError.middleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

//upload.single('avatar'): dòng này cho phép upload duy nhất 1 file và tên field là avatar
router.put(
  "/update-profile",
  protect,
  upload.single("avatar"),
  handleMulterError,
  updateProfile
);

router.route("/")
  .get(getAllUsers)
  .post(upload.single("avatar"),createUser)

router.route("/:id")
  .get(getUserById)
  .put(upload.single("avatar"),updateUser)
  .delete(deleteUser)

export default router;
