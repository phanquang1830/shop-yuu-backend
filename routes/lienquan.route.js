import express from 'express';
import {
    getAllAccountLQ,
    getAccountLQById,
    createAccountLQ,
    updateAccountLQ,
    deleteAccountLQ
} from '../controllers/lienquan.controller.js'

const router = express.Router();

router.route('/')
    .get(getAllAccountLQ)
    .post(createAccountLQ)

router.route('/:id')
    .get(getAccountLQById)
    .put(updateAccountLQ)
    .delete(deleteAccountLQ)

export default router