"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";
import { Post } from "../models";
import { z } from "zod";

/**
 * get posts
 * @returns
 */
export async function getPosts() {
  const header = await headers();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/post", {
    headers: header,
  });
  const posts = await response.json();
  return posts;
}

/**
 * create new posts
 * @param formState
 * @param formData
 */
const postSchema = z.object({
  content: z.string().nonempty(),
});
export async function createPost(
  formState: FormState<Post>,
  formData: FormData
) {
  const session = await auth();
  const header = await headers();
  const data = { content: formData.get("content") };

  const parse = postSchema.safeParse(data);
  if (!parse.success) {
    return {
      ...formState,
      message: "Error",
      data: null,
      errors: parse.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/post", {
    method: "POST",
    headers: {
      ...header,
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: JSON.stringify(data),
  });

  const post = await response.json();
  return {
    ...formState,
    message: "Post added successfully",
    data: post,
  };
}
