import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import User from "@/components/User";

export default function UserShowPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notice = searchParams.get("notice");
  const userId = params?.id;

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (data) => api.delete(`/users/${userId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.replace({
        pathname: "/users",
        query: { notice: "Removed with success." },
      });
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
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <User {...data} />

      <div>
        <Link href={`/users/${userId}/edit`}>Edit this user</Link>
        {" | "}
        <Link href="/users">Back to users</Link>{" "}
        <button disabled={isDeleting} onClick={mutate}>
          Destroy this user
        </button>
      </div>
    </>
  );
}
