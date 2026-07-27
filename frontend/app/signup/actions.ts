"use server";

import { redirect } from "next/navigation";
import { registerUser } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/server";

export interface SignupFormState {
  error?: string;
}

export async function signupAction(
  _prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    await registerUser({ name, email, password });
  } catch (err) {
    if (err instanceof ApiError) {
      return { error: err.message };
    }
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}
