import rateLimit from 'express-rate-limit';

//set rate limiting
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 250, // each IP can only make 250 requests per 15 minutes
    standardHeaders: 'draft-7', // return rate limit info in the 'Ratelimit' headers
    legacyHeaders: false , //disable the 'x-Ratelimit-Limit' headers
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after 15 minutes."
    }    
});
