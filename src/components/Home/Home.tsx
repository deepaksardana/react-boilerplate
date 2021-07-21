import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { History } from "history";
import loadable from "@loadable/component";
import { connect } from "react-redux";


import LazyLoading from "components/common/LazyLoading";
import URLRoutes from "URLRoutes";
import { ApplicationState, AuthState } from "store/reducers";

import "styles/index.scss";
import { ActionCreator, fetchUserAction } from "store/actions";
import { getAuthState } from "store/selectors";

const DashboardContainer = loadable(() => import("components/Dashboard"), {
  fallback: <LazyLoading />
});

interface DispatchProps {
  requestUserDetail: ActionCreator;
  unmountUserDetail: ActionCreator;
}

interface StateProps {
  authState: AuthState;
}

interface OwnProps {
  history: History;
}

type Props = DispatchProps & StateProps & OwnProps;

interface State {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if(!props.authState.user) {
      this.props.requestUserDetail();
    }
  }

  public render(): JSX.Element {
    const { user } = this.props.authState;
    return (
      user && user.isVerified ? <div>
        {user.role}
      </div> : this.renderWatingForVerification()
    );
  }


  public renderWatingForVerification(): JSX.Element {
    return <div>We are wating fro verification</div>
  }
}

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps): StateProps => {
  return {
    authState: getAuthState(state)
  };
};

const mapDispatchStateToProps: DispatchProps = {
  requestUserDetail: fetchUserAction.request,
  unmountUserDetail: fetchUserAction.cancel
};

export default connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchStateToProps
)(App);


