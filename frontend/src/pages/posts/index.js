import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services";
import Post from "./_components/Post";

export default function PostPage() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");
  const {
    isPending,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get("/posts").then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>Posts</h1>

      <div id="posts">
        {posts.map((post) => (
          <div key={post.id} id={`post_${post.id}`}>
            <Post {...post} />
            <p>
              <Link href={`/posts/${post.id}`}>Show this posts</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href={`/posts/new`}>New posts</Link>
    </>
  );
}