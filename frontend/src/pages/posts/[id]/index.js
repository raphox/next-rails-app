import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import Post from "@/components/Post";

export default function PostShowPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notice = searchParams.get("notice");
  const postId = params?.id;

  const {
    isPending,
    error,
    data: post,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => api.get(`/posts/${params.id}`).then((res) => res.data),
    enabled: !!postId,
  });

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (id) => {
      return api.delete(`/posts/${id}`);
    },
  });

  const handleDelete = () => {
    mutate(params.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        router.replace({
          pathname: "/posts",
          query: { notice: "Removed with success." },
        });
      },
      onError: (error) => {
        alert(`Error: ${JSON.stringify(error)}`);
      },
    });
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <Post {...post} />

      <div>
        <Link href={`/posts/${post.id}/edit`}>Edit this posts</Link>
        {" | "}
        <Link href="/posts">Back to posts</Link>{" "}
        <button data={{ isLoading: isDeleting }} onClick={handleDelete}>
          Destroy this posts
        </button>
      </div>
    </>
  );
}
