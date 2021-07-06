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
import { IRegister } from "interface";
import { ActionCreator, registerAction } from "store/actions";
import { getAuthState } from "store/selectors";

interface DispatchProps {
  requestRegister: ActionCreator;
  unmountRegister: ActionCreator;
}

interface StateProps {
  registerState: AuthState;
  initialValues: IRegister;
}

interface OwnProps {}

type Props = DispatchProps & StateProps & OwnProps;
type FormProps = Props &
  InjectedFormProps<IRegister, any> &
  FormInstance<IRegister, Props>;

interface State {}

const RequiredValidation = [requiredWithMessage()];
const EmailValidation = [requiredWithMessage(), emailValidation];

class RegisterForm extends React.Component<FormProps, State> {
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

  componentWillUnmount(): void {
    this.props.unmountRegister();
  }

  private handleSubmit = (data: IRegister): void => {
    this.props.requestRegister(data);
  }
}

const RegisterContainer = reduxForm({
  form: "RegisterForm",
  enableReinitialize: true
})(RegisterForm);

const mapStateToProps = (
  state: ApplicationState,
  ownProps: OwnProps
): StateProps => {
  return {
    registerState: getAuthState(state),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  };
};

const mapDispatchStateToProps: DispatchProps = {
  requestRegister: registerAction.request,
  unmountRegister: registerAction.cancel
};

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchStateToProps
)(RegisterContainer);
