import ExpressMongoSanitize from "express-mongo-sanitize";


const nosqlSanitizer = (req, res, next) => {
  if (req.body) {
    ExpressMongoSanitize.sanitize(req.body, { replaceWith: '_' });
  }
  if (req.params) {
    ExpressMongoSanitize.sanitize(req.params, { replaceWith: '_' });
  }
  if (req.query) {
    ExpressMongoSanitize.sanitize(req.query, { replaceWith: '_' });
  }
  
  next(); 
};

export default nosqlSanitizer