import React from "react";

import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string(),
  body: z.string(),
});

type FormData = z.infer<typeof schema>;

export const resolver = zodResolver(schema);

export default function PostForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <>
    <p>
      <label htmlFor="title">Title:</label>
      <input type="string" {...register("title")} />
      {errors.title && <span>{errors.title.message}</span>}
    </p>
    <p>
      <label htmlFor="body">Body:</label>
      <input type="text" {...register("body")} />
      {errors.body && <span>{errors.body.message}</span>}
    </p>
    </>
  );
}
