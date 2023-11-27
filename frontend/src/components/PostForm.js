import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "can't be blank" }),
  body: z.string(),
});

export const resolver = zodResolver(schema);

export default function PostForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
