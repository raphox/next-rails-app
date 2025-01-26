import React from "react";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import CommentForm, { resolver } from "@/components/CommentForm";

export default function CommentEditPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const commentId = params?.id;

  const {
    isPending: isUpdating,
    isSuccess,
    mutateAsync,
  } = useMutation({
    mutationFn: (data: any) => api.put(`/comments/${commentId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const { isPending, error, data } = useQuery({
    queryFn: () => api.get(`/comments/${commentId}`).then((res) => res.data),
    queryKey: ["comments", commentId],
    enabled: !!commentId,
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <>
      {isSuccess && <p style={{ color: "green" }}>Updated with success.</p>}

      <h1>Editing comment</h1>

      <FormProvider resolver={resolver} values={data} onSubmit={mutateAsync}>
        <CommentForm />

        <div>
          <button disabled={isUpdating} type="submit">
            Update
          </button>
        </div>
      </FormProvider>

      <br />

      <div>
        <Link href={`/comments/${commentId}`}>Show this comment</Link>
        {" | "}
        <Link href="/comments">Back to comments</Link>
      </div>
    </>
  );
}
