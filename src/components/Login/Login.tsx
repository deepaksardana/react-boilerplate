import * as React from "react";
import { Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { reduxForm, InjectedFormProps, FormInstance, Field } from "redux-form";
import Button from "components/common/Button";
import { FormInput } from "components/common/FormInputs";
import { requiredWithMessage, emailValidation } from "utils/FormValidations";
import URLRoutes from "URLRoutes";

interface Props {}

interface State {}

interface ILoginForm {
  email: string;
  password: string;
}

const passwordValidation = [requiredWithMessage()];
const EmailValidation = [requiredWithMessage(), emailValidation];

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
          <Link to={URLRoutes.client.REGISTER}>New User</Link>
          <Link to={URLRoutes.client.FORGOT}>Forgot Password</Link>

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
  initialValues: {
    email: "",
    password: ""
  }
})(LoginForm);

export default LoginContainer;
