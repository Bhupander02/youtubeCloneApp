// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // 1. Check if the Authorization header exists
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // 2. Extract the token
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the user info to the request so the next function can use it
    req.user = decoded; 
    
    // 5. Let the user pass to the actual route
    next(); 
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};