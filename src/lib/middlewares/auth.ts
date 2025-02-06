import { AuthError, Session } from "next-auth";

export function isAuth(session?: Session) {
  console.log("session", session);
  if (!session) {
    return new AuthError("Unauthorized access");
  }

  return session as Session;
}
