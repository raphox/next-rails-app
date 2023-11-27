import React, { useEffect } from "react";
import { FormProvider as FormProviderBase, useForm } from "react-hook-form";

export default function FormProvider({
  children,
  values,
  resolver,
  onSubmit,
  serverError,
}) {
  const { setError, handleSubmit, ...formProps } = useForm({
    values,
    resolver,
  });

  useEffect(() => {
    for (const attribute in serverError) {
      setError(attribute, { type: "server", message: serverError[attribute] });
    }
  }, [serverError]);

  return (
    <FormProviderBase {...formProps}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProviderBase>
  );
}
