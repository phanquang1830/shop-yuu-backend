class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Lấy tên class hiện tại đang khởi tạo 
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = 'Resource Not Found') {
        super(message, 404);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}

export {
    ErrorResponse,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError
};
