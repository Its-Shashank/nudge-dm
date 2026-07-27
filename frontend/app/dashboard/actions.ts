"use server";

import { redirect } from "next/navigation";
import { logoutUser } from "@/lib/api/auth";

export async function logoutAction() {
  await logoutUser();
  redirect("/login");
}
