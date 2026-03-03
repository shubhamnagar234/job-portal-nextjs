"use server";

import { db } from "@/config/db";
import { getCurrentUser } from "../auth/server/auth.queries";
import { employers } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const organizationTypeOptions = [
  "development",
  "business",
  "design",
  "android dev",
  "cloud business",
] as const;
type OrganizationType = (typeof organizationTypeOptions)[number];

const teamSizeOptions = ["1-5", "6-20", "21-50"] as const;
type TeamSize = (typeof teamSizeOptions)[number];

interface IFormInput {
  name: string;
  description: string;
  yearOfEstablishment: string;
  location: string;
  websiteUrl: string;
  organizationType: OrganizationType;
  teamSize: TeamSize;
}

export const updateEmployerProfileAction = async (data: IFormInput) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "employer") {
      return { status: "ERROR", message: "Unauthorized" };
    }

    const {
      name,
      description,
      yearOfEstablishment,
      location,
      websiteUrl,
      organizationType,
      teamSize,
    } = data;

    const updatedEmployer = await db
      .update(employers)
      .set({
        name,
        description,
        location,
        websiteUrl,
        organizationType,
        teamSize,
        yearOfEstablishment: yearOfEstablishment
          ? parseInt(yearOfEstablishment)
          : null,
      })
      .where(eq(employers.id, currentUser.id));

    console.log("employers ", updatedEmployer);

    return { status: "SUCCESS", message: "Profile updated successfully" };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};