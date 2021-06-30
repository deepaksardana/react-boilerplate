import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "store/reducers";

interface Props {
  isAuthenticated: boolean;
  history: any;
}

export default function(ComposedComponent: any) {
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
        history.push("/signup");
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated ? (
            <ComposedComponent {...this.props} />
          ) : null}
        </div>
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
