import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services";

export function useResource(
  loadPath,
  { queryKey, mutate, loadResources = true }
) {
  const [errors, setErrors] = useState({});
  const enabled = !!queryKey[queryKey.length - 1];

  const { isPending, error, data } = loadResources
    ? useQuery({
        queryKey,
        enabled,
        queryFn: () => api.get(loadPath).then((res) => res.data),
      })
    : {
        isPending: false,
        error: null,
        data: {},
      };

  const handleMutate =
    mutate &&
    ((data) => {
      mutate(data, {
        onError: (error) => {
          if (error.response.status === 422) {
            setErrors(error.response.data);
          } else {
            alert(`Error: ${JSON.stringify(error)}`);
          }
        },
      });
    });

  return {
    data,
    errors,
    isPending,
    handleMutate,
    exception: error,
  };
}
