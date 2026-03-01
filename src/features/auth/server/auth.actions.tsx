"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { loginUserSchema, registerUserSchema } from "../auth.schema";
import { createSessionAndSetCookies } from "./use-cases/sessions";
import { cookies } from "next/headers";
import { invalidateSession } from "./use-cases/sessions";
import crypto from "crypto";
import { redirect } from "next/navigation";

export type RegisterData = {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "admin" | "applicant" | "employer";
};

export type LoginData = {
  email: string;
  password: string;
};

export const registerUserAction = async (data: RegisterData) => {
  try {
    const { data: valiadtedData, error } = registerUserSchema.safeParse(data);

    if (error) {
      return {
        status: "ERROR",
        message: error.issues[0].message,
      };
    }

    const { name, userName, email, password, role } = valiadtedData;

    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)));

    if (user) {
      if (user.email === email)
        return {
          status: "ERROR",
          message: "Email already exists",
        };
      else {
        return {
          status: "ERROR",
          message: "Username already exists",
        };
      }
    }

    const hashPassword = await argon2.hash(password);

    const [result] = await db
      .insert(users)
      .values({ name, userName, email, password: hashPassword, role });

    await createSessionAndSetCookies(result.insertId);

    return {
      status: "SUCCESS",
      message: "Registration Successful",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Registration Failed",
    };
  }
};

export const loginUserAction = async (data: LoginData) => {
  try {
    const { data: valiadtedData, error } = loginUserSchema.safeParse(data);

    if (error) {
      return {
        status: "ERROR",
        message: error.issues[0].message,
      };
    }
    const { email, password } = valiadtedData;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return {
        status: "ERROR",
        message: "Invalid Credentials",
      };
    }

    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword) {
      return {
        status: "ERROR",
        message: "Invalid Credentials",
      };
    }

    await createSessionAndSetCookies(user.id);

    return {
      status: "SUCCESS",
      message: "Login Successful",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Unknown Error Occured! Please Try Again Later.",
    };
  }
};

export const logoutUserAction = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if(!session) return redirect("/login");

  if (session) {
    const hashedToken = crypto
      .createHash("sha-256")
      .update(session)
      .digest("hex");

    await invalidateSession(hashedToken);
  }

  cookieStore.delete("session");

  return redirect("/login");
};