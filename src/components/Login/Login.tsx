import * as React from "react";
import { Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { reduxForm, InjectedFormProps, FormInstance, Field } from "redux-form";
import { connect } from "react-redux";

import Button from "components/common/Button";
import { FormInput } from "components/common/FormInputs";
import { requiredWithMessage, emailValidation } from "utils/FormValidations";
import URLRoutes from "URLRoutes";
import { ApplicationState, AuthState } from "store/reducers";
import { ILogin } from "interface";
import { ActionCreator, loginAction } from "store/actions";
import { getAuthState } from "store/selectors";
interface DispatchProps {
  requestLogin: ActionCreator;
  unmountLogin: ActionCreator;
}

interface StateProps {
  loginState: AuthState;
  initialValues: ILogin;
}

interface OwnProps {

}

type Props = DispatchProps & StateProps & OwnProps;
type FormProps = Props &
InjectedFormProps<ILogin, any> &
FormInstance<ILogin, Props>;


interface State {}

const passwordValidation = [requiredWithMessage()];
const EmailValidation = [requiredWithMessage(), emailValidation];

class LoginForm extends React.Component<FormProps, State> {
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

  componentWillUnmount(): void {
    this.props.unmountLogin();
  }

  private handleSubmit = (data: ILogin): void => {
    this.props.requestLogin(data)
  }
}

const LoginContainer = reduxForm({
  form: "Login",
  enableReinitialize: true
})(LoginForm);


const mapStateToProps = (state: ApplicationState, ownProps: OwnProps): StateProps => {
  return {
    loginState: getAuthState(state),
    initialValues: {
      email: "",
      password: ""
    }
  }
};

const mapDispatchStateToProps: DispatchProps = {
  requestLogin: loginAction.request,
  unmountLogin: loginAction.cancel
};

export default  connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchStateToProps)(LoginContainer);
