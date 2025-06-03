import express from 'express';
import {
    getAllAccountGI,
    getAccountGIById,
    createAccountGI,
    updateAccountGI,
    deleteAccountGI
} from '../controllers/genshin.controller.js'

const router = express.Router();

router.route('/')
    .get(getAllAccountGI)
    .post(createAccountGI)

router.route('/:id')
    .get(getAccountGIById)
    .put(updateAccountGI)
    .delete(deleteAccountGI)

export default router