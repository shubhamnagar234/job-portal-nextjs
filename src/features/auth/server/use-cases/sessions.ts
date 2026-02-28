import crypto from "crypto";
import { cookies, headers } from "next/headers";
import { getIPAddress } from "./location";
import { db } from "@/config/db";
import { sessions } from "@/drizzle/schema";
import { SESSION_LIFETIME } from "@/config/constant";

type CreateUserSession = {
  token: string;
  userId: number;
  userAgent: string;
  ip: string;
};

// generates a 256-bit cryptographically secure token
// <Buffer 4f 8a 9b 12 ...> (raw binary, not readable)
// Converts that binary data into a hexadecimal string. ("4f8a9b12d1e9a8c3f5")
// This ensure the string is in a consistent Unicode normalization form (usaully NFC)
const generateSessionToken = () => {
  return crypto.randomBytes(32).toString("hex").normalize();
};

const createUserSession = async ({
  token,
  userId,
  userAgent,
  ip,
}: CreateUserSession) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  const [session] = await db.insert(sessions).values({
    id: hashedToken,
    userId,
    expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000),
    ip,
    userAgent,
  });

  return session;
};

export const createSessionAndSetCookies = async (userId: number) => {
  const token = generateSessionToken();
  const ip = await getIPAddress();
  const headerList = await headers();

  await createUserSession({
    token,
    userId: userId,
    userAgent: headerList.get("user-agent") || "",
    ip: ip,
  });

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    secure: true,
    httpOnly: true,
    maxAge: SESSION_LIFETIME,
  });
};
