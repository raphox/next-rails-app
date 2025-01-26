import React from "react";

import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import PostDropDown from "./PostDropDown";

const schema = z.object({
  post_id: z.string(),
  message: z.string(),
});

type FormData = z.infer<typeof schema>;

export const resolver = zodResolver(schema);

export default function CommentForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<FormData>();

  const post_id = getValues("post_id");

  return (
    <>
    <div>
      <label htmlFor="post_id">Post:</label>
      <PostDropDown apiEndpoint={`/posts?include_ids[]=${post_id}`} {...register("post_id")} />
      {errors.post_id && <span>{errors.post_id.message}</span>}
    </div>
    <p>
      <label htmlFor="message">Message:</label>
      <input type="text" {...register("message")} />
      {errors.message && <span>{errors.message.message}</span>}
    </p>
    </>
  );
}
