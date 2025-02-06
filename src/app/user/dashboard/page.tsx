import { createPost, getPosts } from "@/lib/actions/post";

export default async function Page() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      {JSON.stringify(posts)}
      {/* {JSON.stringify(session)} */}
      <form action={createPost}>
        <textarea name="content"></textarea>
        <button type="submit">Create post</button>
      </form>
    </div>
  );
}
