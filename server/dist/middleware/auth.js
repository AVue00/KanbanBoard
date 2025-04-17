import jwt from 'jsonwebtoken';
// Verifies the token exists and adds the user data to the request object
export const authenticateToken = (req, res, next) => {
    // Get authorization header from request
    const authHeader = req.headers.authorization;
    // Check if the authorization header is set
    if (authHeader) {
        // Extract the token from the authorization header
        const token = authHeader.split(' ')[1];
        console.log(token);
        // Get the secret key from the environment variables
        const secretKey = process.env.JWT_SECRET_KEY || '';
        // Verify JWT token
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403); // Send forbidden status if token is invalid
            }
            console.log(user);
            // Attach the user data to the request object
            req.user = user;
            return next(); // Continue with the request
        });
    }
    else {
        res.sendStatus(401); // Send unauthorized status if there is no authorization header
    }
};
