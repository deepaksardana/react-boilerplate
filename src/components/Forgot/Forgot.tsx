import * as React from "react";
import { Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { reduxForm, InjectedFormProps, FormInstance, Field } from "redux-form";
import { connect } from "react-redux";

import Button from "components/common/Button";
import { FormInput } from "components/common/FormInputs";
import { requiredWithMessage, emailValidation } from "utils/FormValidations";
import URLRoutes from "URLRoutes";
import { IForgotPassword } from "interface";
import { getRextState, IRextActionCancelDefinition, IRextActionDefinition, IRextState } from "store/baseStoreProviders";
import { forgotPassword } from "rext";
import { ApplicationState } from "store/reducers";
import { toast } from "react-toastify";

interface DispatchProps {
  requestForgotPassword: IRextActionDefinition;
  unmountForgotPassword: IRextActionCancelDefinition;
}

interface StateProps {
  forgotRextState: IRextState;
  initialValues: IForgotPassword;
}

interface OwnProps {}

type Props = DispatchProps & StateProps & OwnProps;

interface State {}

type FormProps = Props &
InjectedFormProps<IForgotPassword, any> &
FormInstance<IForgotPassword, Props>;


const EmailValidation = [requiredWithMessage(), emailValidation];

class ForgotForm extends React.Component<FormProps, State> {
  constructor(props: any) {
    super(props);
  }

  public componentDidUpdate(prevsProps: FormProps): void {
    const { error, fetching, message} = this.props.forgotRextState;
    if(!fetching && prevsProps.forgotRextState.fetching) {
      if(error) {
        toast.error(message);
      } else {
        toast.info(message);
      }
    }
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

  private handleSubmit = (data: IForgotPassword): void => {
    this.props.requestForgotPassword({
      body: data
    })
  }
}

const ForgotContainer = reduxForm({
  form: "ForgotForm",
  enableReinitialize: true
})(ForgotForm);

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps): StateProps => {
  return {
    initialValues: {
      email: ""
    },
    forgotRextState: getRextState(state.forgotPasswordState, {})
  }
};

const mapDispatchStateToProps: DispatchProps = {
  requestForgotPassword: forgotPassword.request.call,
  unmountForgotPassword: forgotPassword.request.cancel
};

export default  connect<StateProps, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchStateToProps)(ForgotContainer);
