"use server";

import { signOut } from "@/auth";

/**
 * Sign out
 */
export async function logout() {
  await signOut({ redirectTo: "/login" });
}
