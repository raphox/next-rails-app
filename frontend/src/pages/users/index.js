import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services";
import User from "@/components/User";

export default function UserPage() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");

  const { isPending, error, data } = useQuery({
    queryFn: () => api.get("/users").then((res) => res.data),
    queryKey: ["users"],
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>Users</h1>

      <div id="users">
        {data.map((user) => (
          <div key={user.id} id={`user_${user.id}`}>
            <User {...user} />
            <p>
              <Link href={`/users/${user.id}`}>Show this user</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href={`/users/new`}>New user</Link>
    </>
  );
}
