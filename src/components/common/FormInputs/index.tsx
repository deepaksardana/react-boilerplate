import { Form, Dropdown } from "semantic-ui-react";

const Error = (props: any) => {
  const {
    meta: { error, touched }
  } = props;
  return (touched && error ?  <div>{error}</div> : null) 
}

export const FormInput = (props: any) => {
  const {
    required,
    meta
  } = props;
  return (
    <Form.Field required={required}>
      <Form.Input {...props}/>
      <Error meta={meta} />
    </Form.Field>
  );
};

export const FormTextArea = (props: any) => {
  const {
    required,
    meta,
    input: { onChange, ...input },
    ...rest
  } = props;
  return (
    <Form.Field required={required}>
      <Form.TextArea
        {...rest}
        {...input}
        onChange={(e, { value }) => onChange(value)}
      />
      <Error meta={meta} />
    </Form.Field>
  );
};

export const FormCheckbox = (props: any) => {
  const {
    required,
    meta,
    input: { value, onChange, ...input },
    ...rest
  } = props;
  return (
    <Form.Field required={required}>
      <Form.Checkbox
        {...input}
        {...rest}
        defaultChecked={!!value}
        onChange={(e, data) => onChange(data.checked)}
      />
      <Error meta={meta} />
    </Form.Field>
  );
};

export const FormSelect = (props: any) => {
  const {
    required,
    label,
    meta,
    input: { onChange, ...input },
    ...rest
  } = props;
  return (
    <Form.Field required={required}>
      <label>{label}</label>
      <Dropdown 
        {...rest}
        clearable
        selection
        onChange={(e, { value }) => onChange(value)}
      />
      <Error meta={meta} />
    </Form.Field>
  );
};

export const FormRadioGroup = (props: any) => {
  const {
    required,
    name,
    label,
    meta,
    input: { value, onChange, ...input },
    options,
    ...rest
  } = props;
  return (
    <Form.Field required={required}>
      <Form.Group inline>
        <label>{label}</label>
        {options.map((option: any, index: number) => (
          <Form.Radio
            {...rest}
            {...input}
            key={`radio_${name}_${index}`}
            label={option.text}
            value={option.value}
            checked={value === option.value}
            onChange={(e, { value }) => onChange(value)}
          />
        ))}
      </Form.Group>
      <Error meta={meta} />
    </Form.Field>
  );
};
