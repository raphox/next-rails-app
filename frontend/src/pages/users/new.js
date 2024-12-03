import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import UserForm, { resolver } from "@/components/UserForm";

export default function UserNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync } = useMutation({
    mutationFn: (data) => api.post("/users", data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push({
        pathname: `/users/${data.id}`,
        query: { notice: "Created with success." },
      });
    },
  });

  return (
    <>
      <h1>New user</h1>

      <FormProvider resolver={resolver} values={{}} onSubmit={mutateAsync}>
        <UserForm />

        <div>
          <button disabled={isCreating} type="submit">
            Create
          </button>
        </div>
      </FormProvider>

      <br />

      <div>
        <Link href="/users">Back to users</Link>
      </div>
    </>
  );
}
