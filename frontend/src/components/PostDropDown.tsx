import React from "react";

import Select from "react-select";
import { Control, Controller, FieldValues, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services";
import { Props as Post } from "./Post";

interface DropdownProps {
  name?: string;
  apiEndpoint?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Dropdown: React.FC<DropdownProps> = ({ name="post_id", apiEndpoint = "/posts" }) => {
  const { control } = useFormContext();
  const { isPending, error, data } = useQuery({
    queryFn: () => api.get<Post[]>(apiEndpoint).then((res) => res.data),
    queryKey: ["posts-options"],
  });

  let options = undefined;

  if (error) {
    options = [{ value: "", label: "An error has occurred" }];
  } else if (data) {
    options = data.map((item) => ({
      value: item.id,
      label: `${item.title} - ${item.id}`,
    }));
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Select
          id={name}
          ref={ref}
          onBlur={onBlur}
          options={options}
          isDisabled={isPending}
          placeholder={isPending ? "Loading..." : "Select a post"}
          value={options?.find((option) => option.value === value)}
          onChange={(selectedOption) => onChange(String(selectedOption?.value))}
        />
      )}
    />
  );
};

export default Dropdown;
