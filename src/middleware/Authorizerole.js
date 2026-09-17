import ApiError from "../utils/ApiError.js";

// Restricts access to specific roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role){
            return next(new ApiError(403, "Access denied: No role provided."))
        }

        // Check if the user's role matches any of the allowed roles
        if(!allowedRoles.includes(req.user.role)){
            return next(new ApiError (403, "Access denied: Insufficient permissions."));
        }
        next();
    }
}

export default authorizeRoles;