import * as React from "react";
import queryString from "query-string";
import { Form } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, InjectedFormProps, FormInstance, Field } from "redux-form";
import Button from "components/common/Button";
import { FormInput } from "components/common/FormInputs";
import { requiredWithMessage } from "utils/FormValidations";
import URLRoutes from "URLRoutes";
import { IUpdateForgotPassword } from "interface";
import {
  getRextState,
  IRextActionCancelDefinition,
  IRextActionDefinition,
  IRextState
} from "store/baseStoreProviders";
import { ApplicationState } from "store/reducers";
import { updateForgotPassword } from "rext";
import { toast } from "react-toastify";

interface DispatchProps {
  requestUpdateForgotPassword: IRextActionDefinition;
  unmountUpdateForgotPassword: IRextActionCancelDefinition;
}

interface StateProps {
  updateForgotRextState: IRextState;
  initialValues: any;
}

interface OwnProps {
  location: any;
}

type Props = DispatchProps & StateProps & OwnProps;

interface State {}

const PasswordValidation = [requiredWithMessage()];

type FormProps = Props &
  InjectedFormProps<IUpdateForgotPassword, any> &
  FormInstance<IUpdateForgotPassword, Props>;

class UpdateForgotPasswordForm extends React.Component<FormProps, State> {
  constructor(props: any) {
    super(props);
  }

  public componentDidUpdate(prevsProps: FormProps): void {
    const { error, fetching, message } = this.props.updateForgotRextState;
    if (!fetching && prevsProps.updateForgotRextState.fetching) {
      if (error) {
        toast.error(message);
      } else {
        toast.info(message);
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div className="width-25">
        <Form onSubmit={this.props.handleSubmit(this.handleSubmitForm)}>
          <Field
            type="password"
            name="newPassword"
            label="New Password"
            placeholder="Enter New Password"
            component={FormInput}
            validate={PasswordValidation}
          />
          <Field
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            component={FormInput}
            validate={PasswordValidation}
          />
          <Button>Update Password</Button>
          <Link to={URLRoutes.client.LOGIN}>Having Password?</Link>
        </Form>
      </div>
    );
  }

  private handleSubmitForm = (data: IUpdateForgotPassword): void => {
    let { tkn }: any = queryString.parse(this.props.location.search);
    this.props.requestUpdateForgotPassword({
      body: {
        ...data
      },
      queryParams: {
        tkn: tkn
      }
    });
  };
}

const UpdateForgotPasswordContainer = reduxForm({
  form: "UpdateForgotPasswordForm",
  enableReinitialize: true
})(UpdateForgotPasswordForm);

const mapStateToProps = (
  state: ApplicationState,
  ownProps: OwnProps
): StateProps => {
  return {
    initialValues: {
      newPassword: "",
      confirmPassword: ""
    },
    updateForgotRextState: getRextState(state.updateForgotPassword, {})
  };
};

const mapDispatchStateToProps: DispatchProps = {
  requestUpdateForgotPassword: updateForgotPassword.request.call,
  unmountUpdateForgotPassword: updateForgotPassword.request.cancel
};

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchStateToProps
)(UpdateForgotPasswordContainer);

// resetPassword?tkn=b79510a3-79b7-4cfa-9549-9ff5fd3e64f81626764766149
