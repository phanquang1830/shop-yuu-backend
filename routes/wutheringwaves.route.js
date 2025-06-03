import express from 'express';
import {
    getAllAccountWW,
    getAccountWWById,
    deleteAccountWW,
    createAccountWW,
    updateAccountWW
} from '../controllers/wutheringwaves.controller.js'

const router = express.Router();

router.route('/')
    .get(getAllAccountWW)
    .post(createAccountWW)

router.route('/:id')
    .get(getAccountWWById)
    .delete(deleteAccountWW)
    .put(updateAccountWW)

export default router