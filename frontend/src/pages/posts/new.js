import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { useResource } from "@/hooks/resources";
import FormProvider from "@/components/FormProvider";
import PostForm, { resolver } from "@/components/PostForm";

export default function PostNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: (data) => {
      return api.post("/posts", data);
    },
    onSuccess: ({ data: post }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push({
        pathname: `/posts/${post.id}`,
        query: { notice: "Created with success." },
      });
    },
  });

  const resource = useResource("/posts", {
    queryKey: ["/posts"],
    loadResources: false,
    mutate,
  });

  return (
    <>
      <h1>New post</h1>

      <FormProvider
        resolver={resolver}
        serverError={resource.errors}
        onSubmit={resource.handleMutate}
        values={resource.data}
      >
        <PostForm />

        <div>
          <button disabled={isCreating} type="submit">
            Create
          </button>
        </div>
      </FormProvider>

      <br />

      <div>
        <Link href="/posts">Back to posts</Link>
      </div>
    </>
  );
}
