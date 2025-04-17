import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    // Extract the username and password from the request body
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({
        where: { username }
    });
    // If the user isn't found, return a authentication failed response
    if (!user) {
        return res.status(401).json({ message: 'Authentication Failed' });
    }
    // Compare the password with the stored password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // If the password is incorrect, return a authentication failed response
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Authentication Failed' });
    }
    // Get secret key from environment variable
    const secretKey = process.env.JWT_SECRET_KEY || '';
    // Generate a JWT token for authenticated user
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    return res.json({ token }); // Return the token as JSON response
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
