import jwt from 'jsonwebtoken';

const generateToken = (userId) =>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '30d'})
} 

const verifyToken = (token) =>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null;
    }
}

export {
    generateToken,
    verifyToken
}