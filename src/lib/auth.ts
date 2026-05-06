// src/lib/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const hashPassword = async (plain: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plain, salt);
};

export const comparePassword = async (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};

export const signJwt = (payload: object): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyJwt = (token: string): any => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

/** Helper to create an HttpOnly cookie with the JWT */
export const createAuthCookie = (token: string) => {
  return `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=604800`; // 7 days
};

/** Helper to clear auth cookie */
export const clearAuthCookie = () => {
  return `token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0`;
};

/** Extract token from request cookies */
export const getTokenFromRequest = (request: Request): string | null => {
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.match(/(?:^|;)\s*token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};
