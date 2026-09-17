import ApiError from "./ApiError.js";


class badRequest extends ApiError{
    constructor(message = "Bad Request."){
        super(400, message);
    }
}

class internalServerError extends ApiError{
    constructor(message = "Internal Server error"){
        super(500, message);
    }
}

class notFound extends ApiError{
    constructor (message ="Resource not found"){
        super(404,message);
    }
}


class forbidden  extends ApiError{
    constructor (message = "Forbidden"){
        super(403, message);
    }
}

class unauthorized extends ApiError{
    constructor (message = "Unauthorized"){
        super(401, message);
    }
}

export {badRequest, internalServerError, notFound,forbidden, unauthorized};