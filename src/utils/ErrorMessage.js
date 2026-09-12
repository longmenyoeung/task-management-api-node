import ApiError from "./ApiError.js";


class badRequest extends ApiError{
    constructor(message = "Bad Request."){
        super(message, 400);
    }
}

class internalServerError extends ApiError{
    constructor(message = "Internal Server error"){
        super(message, 500);
    }
}

class notFound extends ApiError{
    constructor (message ="Resource not found"){
        super(message, 404);
    }
}


class forbiden  extends ApiError{
    constructor (message = "Forbiden"){
        super(message, 403);
    }
}

class unauthorized extends ApiError{
    constructor (message = "Unauthorized"){
        super(message, 401);
    }
}

export {badRequest, internalServerError, notFound,forbiden, unauthorized};