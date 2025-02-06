import { auth } from "@/auth";
import { CustomError, ValidationError } from "@/lib/errors";
import { errorHandler } from "@/lib/middlewares/error-handler";
import { Post } from "@/lib/models";
import { Session } from "next-auth";

import { NextResponse } from "next/server";
import { z } from "zod";

/**
 *
 * @returns
 */

export const GET = auth(function GET(req) {
  console.log("R", req.headers.get("authorization"), req.auth);
  if (req.auth?.user) return NextResponse.json(req.auth);
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
/**
 *
 * @returns
 */
const postSchema = z.object({
  content: z.string(),
  user_id: z.number(),
});
export const POST = auth(async function POST(req) {
  try {
    // const session = isAuth(req.auth!) as Session;
    const session = req.auth as Session;
    console.log(req.auth, session);
    // body is not null
    const body = await req.json();
    const parse = postSchema.safeParse(body);
    if (!parse.success) {
      throw new ValidationError(parse.error.errors);
    }

    body.user_id = session.user?.role_id;
    // check validation
    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
});
