import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useResource } from "@/hooks/resources";
import Post from "@/components/Post";

export default function PostPage() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");
  const {
    data: posts,
    isPending,
    exception,
  } = useResource("/posts", {
    queryKey: ["/posts"],
  });

  if (isPending) {
    return "Loading...";
  } else if (exception) {
    return "An error has occurred: " + exception.message;
  }

  return (
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>Posts</h1>

      <div id="posts">
        {posts.map((post) => (
          <div key={post.id} id={`post_${post.id}`}>
            <Post {...post} />
            <p>
              <Link href={`/posts/${post.id}`}>Show this post</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href={`/posts/new`}>New post</Link>
    </>
  );
}
