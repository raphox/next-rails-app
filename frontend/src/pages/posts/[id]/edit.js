import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import PostForm from "../_components/PostForm";

export default function PostEditPage() {
  const params = useParams();
  const [notice, setNotice] = useState();
  const queryClient = useQueryClient();
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

  const { isPending: isUpdating, mutate } = useMutation({
    mutationFn: (data) => {
      return api.put(`/posts/${postId}`, data);
    },
  });

  const handleUpdate = (data) => {
    mutate(data, {
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        setNotice("Updated with success.");
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

      <h1>Editing posts</h1>

      <PostForm
        isLoading={isUpdating}
        data={post}
        onSubmit={handleUpdate}
      />

      <br />

      <div>
        <Link href={`/posts/${post.id}`}>Show this posts</Link>
        {" | "}
        <Link href="/posts">Back to posts</Link>
      </div>
    </>
  );
}
