"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";

export type RegistrationData = {
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

export const registrationAction = async (data: RegistrationData) => {
  try {
    // console.log(formData);
    const { name, userName, email, password, role } = data;

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

    await db
      .insert(users)
      .values({ name, userName, email, password: hashPassword, role });

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
    const { email, password } = data;

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
