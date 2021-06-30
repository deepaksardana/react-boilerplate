import { Form } from "semantic-ui-react";

export const FormInput = (props: any) => {
  const {
    meta: { error, touched }
  } = props;
  return (
    <Form.Field>
      <Form.Input {...props} error={touched && error} />
    </Form.Field>
  );
};

export const FormCheckbox = (props: any) => {
  const {
    meta: { error, touched },
    input: { value, onChange, ...input },
    ...rest
  } = props;
  return (
    <Form.Field>
      <Form.Checkbox
        {...input}
        {...rest}
        defaultChecked={!!value}
        onChange={(e, data) => onChange(data.checked)}
        error={
          touched &&
          error && {
            content: error,
            pointing: "left"
          }
        }
      />
    </Form.Field>
  );
};


export const FormSelect = (props: any) => {
  const {
    meta: { error, touched },
    input: { onChange, ...input },
    ...rest
  } = props;
  return (
    <Form.Field>
      <Form.Select {...input} {...rest} onChange={(e, { value }) => onChange(value)}  error={touched && error} />
    </Form.Field>
  );
}
