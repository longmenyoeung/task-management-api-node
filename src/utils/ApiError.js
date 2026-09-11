
class ApiError extends Error {
    constructor (statusCode, message, isOptinal = true, stack = true){
        super(message);
        this.statusCode = statusCode;
        this.isOptinal = isOptinal;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }

    static badRequest(msg = "Bad Request"){
        return new ApiError(400, msg);
    }

    static internalServerError(msg = "Internal Server error"){
        return new ApiError(500, msg);
    }

    static notFound(msg = "Resource not found"){
        return new ApiError(404, msg);
    }


    static forbiden (msg = "Forbiden"){
        return new ApiError(403, msg);
    }

    static unauthorized(msg = "Unauthorize"){
        return new ApiError(401, msg);
    }

}

export default ApiError;