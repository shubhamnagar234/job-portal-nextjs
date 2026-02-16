"use server"

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";

export const registrationAction = async (data: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "admin" | "applicant" | "employer";
}) => {
    // console.log(formData);
    const { name, userName, email, password, role } = data;

    await db.insert(users).values({name, userName, email, password, role});
}