import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "dev-secret";

export function start() {
  console.log("🔐 Auth module ready");
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): object | null {
  try {
    return jwt.verify(token, SECRET) as object;
  } catch {
    return null;
  }
}

start();
