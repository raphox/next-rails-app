import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import CommentForm, { resolver } from "@/components/CommentForm";

export default function CommentNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync } = useMutation({
    mutationFn: (data: any) => api.post("/comments", data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      router.push({
        pathname: `/comments/${data.id}`,
        query: { notice: "Created with success." },
      });
    },
  });

  return (
    <>
      <h1>New comment</h1>

      <FormProvider resolver={resolver} values={{}} onSubmit={mutateAsync}>
        <CommentForm />

        <div>
          <button disabled={isCreating} type="submit">
            Create
          </button>
        </div>
      </FormProvider>

      <br />

      <div>
        <Link href="/comments">Back to comments</Link>
      </div>
    </>
  );
}
