import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Authorization header:", req.headers.authorization);
  console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
  console.log("Token:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
