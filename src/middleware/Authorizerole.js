
// Restricts access to specific roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role){
            return res.status(403).json({
                success: false,
                message: "Access denied: No role provide"
            });
        }

        // Check if the user's role matches any of the allowed roles
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Access denied : Insufficient permissions."
            });
        }
        next();
    }
}

export default authorizeRoles;