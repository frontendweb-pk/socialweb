import { createPost, getPosts } from "@/actions/post";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  //   const posts = await getPosts();

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/post");
  const posts = await response.json();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      {JSON.stringify(posts)}
      {JSON.stringify(session)}
      <form action={createPost}>
        <textarea name="content"></textarea>
        <button type="submit">Create post</button>
      </form>
    </div>
  );
}
