import {
  FormProvider as FormProviderBase,
  useForm,
  Form,
} from "react-hook-form";

export default function FormProvider({ children, values, resolver, onSubmit }) {
  const { setError, ...formProps } = useForm({
    values,
    resolver,
  });

  const handleSubmit = ({ data }) => {
    onSubmit(data).catch((error) => {
      if (error.response.status === 422) {
        const serverError = error.response.data;

        for (const attribute in serverError) {
          setError(attribute, {
            type: "server",
            message: serverError[attribute],
          });
        }
      } else {
        alert(`Error: ${JSON.stringify(error)}`);
      }
    });
  };

  return (
    <FormProviderBase {...formProps}>
      <Form onSubmit={handleSubmit}>{children}</Form>
    </FormProviderBase>
  );
}
