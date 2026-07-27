"use server";

import { revalidatePath } from "next/cache";
import { disconnectInstagram } from "@/lib/api/instagram";

export async function disconnectInstagramAction() {
  await disconnectInstagram();
  revalidatePath("/dashboard/connections");
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
}
