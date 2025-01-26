import React from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services";
import Comment, { Props as CommentProps } from "@/components/Comment";

export default function CommentPage() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");

  const { isPending, error, data } = useQuery({
    queryFn: () => api.get("/comments").then((res) => res.data),
    queryKey: ["comments"],
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>Comments</h1>

      <div id="comments">
        {data.map((comment: CommentProps) => (
          <div key={comment.id} id={`comment_${comment.id}`}>
            <Comment {...comment} />
            <p>
              <Link href={`/comments/${comment.id}`}>Show this comment</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href={`/comments/new`}>New comment</Link>
    </>
  );
}
