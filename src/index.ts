import jwt from "jsonwebtoken";

// The signing secret must come from the environment. There is deliberately no fallback:
// a default secret in a public repo lets anyone forge tokens.
function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return secret;
}

export function start() {
  console.log("🔐 Auth module ready");
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): object | null {
  const secret = getSecret(); // outside the try: a missing secret is a config error, not an invalid token
  try {
    return jwt.verify(token, secret) as object;
  } catch {
    return null;
  }
}

start();
