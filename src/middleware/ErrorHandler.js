
//In error handling middleware error there are four parmeters
const errorHandler = (err, req, res, next) =>{
    //default status code if the error is not having the status code
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    //Development vs production payload control
    if(process.env.NODE_ENV === "development"){
        return res.status(err.statusCode).josn({
            status: err.status,
            message: err.message,
            stack : err.stack,
            error:err
        });
    }

    //Productiuon respone (donot leak stack stack traces to clients)
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
  });
};

export default errorHandler;