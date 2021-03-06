import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "store/reducers";
import URLRoutes from "URLRoutes";
interface Props {
  isAuthenticated: boolean;
  history: any;
}

const withAuth = (ComposedComponent: any) => {
  class Authenticate extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { isAuthenticated, history } = this.props;

      if (!isAuthenticated) {
        history.push(URLRoutes.client.LOGIN);
      }
    }

    render() {
      return (
        <React.Fragment>
          {this.props.isAuthenticated ? (
            <ComposedComponent {...this.props} />
          ) : null}
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = (state: ApplicationState) => {
    return {
      isAuthenticated: state.authState.isAuthenticated
    };
  };

  const mapDispatchToProps = {
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}


export default withAuth;