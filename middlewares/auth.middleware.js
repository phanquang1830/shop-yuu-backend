import asyncHandler from 'express-async-handler';
import { UnauthorizedError } from '../utils/error/index.js';
import {verifyToken} from '../utils/jwt.js' 

const protect = asyncHandler(async (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthorizedError("Vui lòng đăng nhập để thực hiện thao tác này!")
    }

    const token = authHeader.split(" ")[1];

    const decode = verifyToken(token);

    if(!decode) {
        throw new UnauthorizedError("Token không hợp lệ hoặc hết hạn!")
    }

    req.user = decode;

    next();
})

export default protect