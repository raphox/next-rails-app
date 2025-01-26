import React from "react";

import Link from "next/link";
import { useRouter } from 'next/router'
import { useParams, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import Comment, {Props as CommentProps} from "@/components/Comment";

export default function CommentShowPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notice = searchParams.get("notice");
  const commentId = params?.id;

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (data: any) => api.delete(`/comments/${commentId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      router.replace({
        pathname: "/comments",
        query: { notice: "Removed with success." },
      });
    },
  });

  const { isPending, error, data } = useQuery<CommentProps>({
    queryFn: () => api.get(`/comments/${commentId}`).then((res) => res.data),
    queryKey: ["comments", commentId],
    enabled: !!commentId,
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + (error as Error).message;
  }

  return (
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <Comment {...data} />

      <div>
        <Link href={`/comments/${commentId}/edit`}>Edit this comment</Link>
        {" | "}
        <Link href="/comments">Back to comments</Link>{" "}
        <button disabled={isDeleting} onClick={() => mutate(commentId)}>
          Destroy this comment
        </button>
      </div>
    </>
  );
}
