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

interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RequiredValidation = [requiredWithMessage()];
const EmailValidation = [requiredWithMessage(), emailValidation];

class RegisterForm extends React.Component<
  Props &
    InjectedFormProps<IRegisterForm, Props> &
    FormInstance<IRegisterForm, Props>,
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
            name="firstName"
            label="First Name"
            placeholder="Enter First Name"
            component={FormInput}
            validate={RequiredValidation}
          />
          <Field
            name="lastName"
            label="Last Name"
            placeholder="Enter Last Name"
            component={FormInput}
            validate={RequiredValidation}
          />
          <Field
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
            validate={RequiredValidation}
          />
          <Button>Submit</Button>
          <Link to={URLRoutes.client.LOGIN}>Old User</Link>
        </Form>
      </div>
    );
  }

  private handleSubmit(data: IRegisterForm): void {
    console.log(data);
  }
}

const RegisterContainer = reduxForm({
  form: "RegisterForm",
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }
})(RegisterForm);

export default RegisterContainer;
