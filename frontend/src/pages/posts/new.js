import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import PostForm from "@/components/PostForm";

export default function PostNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: (data) => {
      return api.post("/posts", data);
    },
  });

  const handleCreate = (data) => {
    mutate(data, {
      onSuccess: ({ data: post }) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        router.replace({
          pathname: `/posts/${post.id}`,
          query: { notice: "Created with success." },
        });
      },
      onError: (error) => {
        alert(`Error: ${JSON.stringify(error)}`);
      },
    });
  };

  return (
    <>
      <h1>New posts</h1>

      <PostForm isLoading={isCreating} data={{}} onSubmit={handleCreate} />

      <br />

      <div>
        <Link href="/posts">Back to posts</Link>
      </div>
    </>
  );
}
