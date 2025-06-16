import express from 'express';
import {
    getProfile,
    updateProfile
}  from '../controllers/user.controller.js'
import protect from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/profile', protect, getProfile)

//upload.single('avatar'): dòng này cho phép upload duy nhất 1 file và tên field là avatar
router.post('/update-profile', protect,upload.single('avatar'),updateProfile)

export default router