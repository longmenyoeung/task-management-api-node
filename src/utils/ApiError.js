
class ApiError extends Error {
    constructor (statusCode, message ){
        super(message);
        this.statusCode = statusCode;
        
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        this.isOptinal = isOptinal;
      
        Error.captureStackTrace(this, this.constructor);
     
    }

}

export default ApiError;