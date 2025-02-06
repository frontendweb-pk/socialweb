// import { auth } from "@/auth";
import { CustomError } from "@/lib/errors";
import { isAuth } from "@/lib/middlewares/auth";
import { errorHandler } from "@/lib/middlewares/error-handler";
import { Post } from "@/lib/models";
// import { Session } from "next-auth";

import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Post schema
 */
// const postSchema = z.object({
//   content: z.string(),
//   user_id: z.number(),
// });

/**
 * Get all posts
 * @param req
 * @returns
 */
export const GET = async () => {
  try {
    const session = await isAuth();
    const posts = await Post.findAll();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
};

// export const POST = auth(async (req) => {
//   try {
//     // const session = isAuth(req.auth!) as Session;
//     const session = req.auth as Session;
//     console.log(req.auth, session);
//     // body is not null
//     const body = await req.json();
//     const parse = postSchema.safeParse(body);
//     if (!parse.success) {
//       throw new ValidationError(parse.error.errors);
//     }

//     body.user_id = session.user?.role_id;
//     // check validation
//     const post = await Post.create(body);
//     return NextResponse.json(post, { status: 201 });
//   } catch (error) {
//     return errorHandler(error as CustomError);
//   }
// });
