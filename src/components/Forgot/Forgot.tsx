import * as React from "react";
import { Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { reduxForm, InjectedFormProps, FormInstance, Field } from "redux-form";
import Button from "components/common/Button";
import { FormInput } from "components/common/FormInputs";
import { requiredWithMessage, emailValidation } from "utils/FormValidations";
import URLRoutes from "URLRoutes";
import { IForgotPassword } from "interface";

interface Props {}

interface State {}


const EmailValidation = [requiredWithMessage(), emailValidation];

class ForgotForm extends React.Component<
  Props &
    InjectedFormProps<IForgotPassword, Props> &
    FormInstance<IForgotPassword, Props>,
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
            name="email"
            label="Email"
            placeholder="Enter Email"
            component={FormInput}
            validate={EmailValidation}
          />
          <Button>Submit</Button>
          <Link to={URLRoutes.client.LOGIN}>Having Password?</Link>
        </Form>
      </div>
    );
  }

  private handleSubmit(data: IForgotPassword): void {
  }
}

const ForgotContainer = reduxForm({
  form: "ForgotForm",
  initialValues: {
    email: ""
  }
})(ForgotForm);

export default ForgotContainer;
