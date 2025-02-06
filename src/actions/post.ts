"use server";

import { auth } from "@/auth";

export async function getPosts() {
  const session = await auth();

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/post", {
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  const posts = await response.json();

  console.log("Posts", posts);

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
