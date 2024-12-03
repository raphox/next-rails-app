import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email_address: z.string().min(1, { message: "can't be blank" }),
  password: z.string(),
  password_confirmation: z.string(),
})
.refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export const resolver = zodResolver(schema);

export default function UserForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <p>
        <label htmlFor="email_address">Email:</label>
        <input type="email" {...register("email_address")} />
        {errors.email_address && <span>{errors.email_address.message}</span>}
      </p>
      <p>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
      </p>
      <p>
        <label htmlFor="password_confirmation">Password confirmation:</label>
        <input type="password" {...register("password_confirmation")} />
        {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}
      </p>
    </>
  );
}
