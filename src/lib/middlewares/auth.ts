import { auth } from "@/auth";
import { Session } from "next-auth";
import { AuthenticationError } from "../errors";

/**
 * Check if user is authenticated
 * @returns
 */
export async function isAuth() {
  const session = await auth();
  if (!session) {
    throw new AuthenticationError("Unauthorized access, please login");
  }
  return session as Session;
}
