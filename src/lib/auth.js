import jwt from "jsonwebtoken";

export function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role || null,
      isOnboarded: user.isOnboarded || false,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  } catch (error) {
    return null;
  }
}