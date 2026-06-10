import jwt from "jsonwebtoken";

// 🔥 PRODUCTION SECURITY FALLBACK: Env na milne par crash nahi hoga
const SECRET_KEY = process.env.JWT_SECRET || "STONENOX_CRM_MASTER_SECRET_KEY_99_BROTHERS";

export function createToken(user) {
  if (!user || !user._id) {
    throw new Error("User object with an _id is required to create a token");
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role || null,
      isOnboarded: user.isOnboarded || false,
    },
    SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
}

export function verifyToken(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("🔒 JWT_VERIFY_ERROR:", error.message);
    return null;
  }
}