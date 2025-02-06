"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";

export async function getPosts() {
  const header = await headers();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/post", {
    headers: header,
  });
  const posts = await response.json();

  return posts;
}

export async function createPost(formData: FormData) {
  const session = await auth();
  const data = {
    content: formData.get("content"),
  };

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: JSON.stringify(data),
  });

  const post = await response.json();

  console.log("Post created", post);
}
