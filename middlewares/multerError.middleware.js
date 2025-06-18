import multer from "multer";

const handleMulterError = (err, req, res, next) =>{
    if(err instanceof multer.MulterError) {
        if(err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                statusCode: 400,
                message: 'Ảnh quá lớn, vui lòng chọn ảnh khác!'
            })
        }
    }
    next(err);
}

export default handleMulterError