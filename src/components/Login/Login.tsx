import * as React from "react";
import { Form } from "semantic-ui-react";
import { reduxForm, InjectedFormProps, FormInstance, Field } from "redux-form";
import Button from "components/common/Button";
import { FormInput, FormCheckbox, FormSelect } from "components/common/FormInputs";
import { requiredWithMessage, emailValidation } from "utils/FormValidations";

interface Props {

}

interface State {

}

interface ILoginForm {
  email: string;
  password: string;
  termsAndCond: boolean;
  gender: string;
}

const passwordValidation = [requiredWithMessage()];
const checkboxValidation = [requiredWithMessage()];
const EmailValidation = [requiredWithMessage(), emailValidation];

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class LoginForm extends React.Component<
  Props &
    InjectedFormProps<ILoginForm, Props> &
    FormInstance<ILoginForm, Props>,
  State
> {
  constructor(props: any) {
    super(props);
  }

  render(): JSX.Element {
    const { handleSubmit } = this.props;
    return (
      <div className="width-25">
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            type="text"
            name="email"
            label="Email"
            placeholder="Enter Email"
            component={FormInput}
            validate={EmailValidation}
          />
          <Field
            type="password"
            name="password"
            label="Password"
            placeholder="Enter Password"
            component={FormInput}
            validate={passwordValidation}
          />

            <Field
            name="termsAndCond"
            label="I agree to the Terms and Conditions"
            component={FormCheckbox}
            validate={checkboxValidation}
          />

          <Field
            name="gender"
            label="Select Gender"
            placeholder="Gender"
            component={FormSelect}
            options={options}
            validate={checkboxValidation}
          />
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }

  private handleSubmit(data: ILoginForm): void {
    console.log(data);
  }
}

const LoginContainer = reduxForm({
  form: "Login",
  enableReinitialize: true,
  initialValues: {
    email: "",
    password: "",
    termsAndCond: false,
    gender: "male"
  }
})(LoginForm);

export default LoginContainer;
