import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import FormProvider from "@/components/FormProvider";
import PostForm, { resolver } from "@/components/PostForm";
import { useResource } from "@/hooks/resources";

export default function PostEditPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const postId = params?.id;

  const {
    isPending: isUpdating,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: (data) => {
      return api.put(`/posts/${postId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
      {isSuccess && <p style={{ color: "green" }}>Updated with success.</p>}

      <h1>Editing post</h1>

      <FormProvider
        resolver={resolver}
        serverError={resource.errors}
        onSubmit={resource.handleMutate}
        values={resource.data}
      >
        <PostForm />

        <div>
          <button disabled={isUpdating} type="submit">
            Update
          </button>
        </div>
      </FormProvider>

      <br />

      <div>
        <Link href={`/posts/${postId}`}>Show this post</Link>
        {" | "}
        <Link href="/posts">Back to posts</Link>
      </div>
    </>
  );
}
