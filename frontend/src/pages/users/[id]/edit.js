import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import UserForm, { resolver } from "@/components/UserForm";

export default function UserEditPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const userId = params?.id;

  const {
    isPending: isUpdating,
    isSuccess,
    mutateAsync,
  } = useMutation({
    mutationFn: (data) => api.put(`/users/${userId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { isPending, error, data } = useQuery({
    queryFn: () => api.get(`/users/${userId}`).then((res) => res.data),
    queryKey: ["users", userId],
    enabled: !!userId,
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <>
      {isSuccess && <p style={{ color: "green" }}>Updated with success.</p>}

      <h1>Editing user</h1>

      <FormProvider resolver={resolver} values={data} onSubmit={mutateAsync}>
        <UserForm />

        <div>
          <button disabled={isUpdating} type="submit">
            Update
          </button>
        </div>
      </FormProvider>

      <br />

      <div>
        <Link href={`/users/${userId}`}>Show this user</Link>
        {" | "}
        <Link href="/users">Back to users</Link>
      </div>
    </>
  );
}
