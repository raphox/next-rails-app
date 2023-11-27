import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { useResource } from "@/hooks/resources";
import Post from "@/components/Post";

export default function PostShowPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notice = searchParams.get("notice");
  const postId = params?.id;

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: () => {
      return api.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.replace({
        pathname: "/posts",
        query: { notice: "Removed with success." },
      });
    },
  });

  const { isPending, exception, ...resource } = useResource(
    `/posts/${postId}`,
    {
      queryKey: ["posts", postId],
      mutate,
    }
  );

  if (isPending) {
    return "Loading...";
  } else if (exception) {
    return "An error has occurred: " + exception.message;
  }

  return (
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <Post {...resource.data} />

      <div>
        <Link href={`/posts/${postId}/edit`}>Edit this post</Link>
        {" | "}
        <Link href="/posts">Back to posts</Link>{" "}
        <button
          data={{ isLoading: isDeleting }}
          onClick={resource.handleMutate}
        >
          Destroy this post
        </button>
      </div>
    </>
  );
}
