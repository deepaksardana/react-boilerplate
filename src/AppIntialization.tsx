import "styles/index.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import loadable from "@loadable/component";

import LazyLoading from "components/common/LazyLoading";
import requiresAuth from "HOC/WithAuth";
import withoutAuth from "HOC/WithoutAuth"
import URLRoutes from "URLRoutes";

const HomeContainer = loadable(() => import("components/Home"), {
  fallback: <LazyLoading />
});

const RegisterContainer = loadable(() => import("components/Register"), {
  fallback: <LazyLoading />
});

const LoginContainer = loadable(() => import("components/Login"), {
  fallback: <LazyLoading />
});

const ForgotContainer = loadable(() => import("components/Forgot"), {
  fallback: <LazyLoading />
});

interface Props {
  history: History;
}

function App(props: Props) {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact={true} path={URLRoutes.client.REGISTER} component={withoutAuth(RegisterContainer)} />
        <Route exact={true} path={URLRoutes.client.LOGIN} component={withoutAuth(LoginContainer)} />
        <Route exact={true} path={URLRoutes.client.FORGOT} component={withoutAuth(ForgotContainer)} />
        <Route path={URLRoutes.client.HOME} component={requiresAuth(HomeContainer)}/>
        <Redirect to={URLRoutes.client.HOME}/>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
