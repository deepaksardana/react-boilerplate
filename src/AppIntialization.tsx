import "styles/index.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import loadable from "@loadable/component";

import LazyLoading from "components/common/LazyLoading";
import requiresAuth from "./HOC/WithAuth";

const MainContainer = loadable(() => import("components/Main"), {
  fallback: <LazyLoading />
});

const RegisterContainer = loadable(() => import("components/Register"), {
  fallback: <LazyLoading />
});

interface Props {
  history: History;
}

function App(props: Props) {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <>
      <Switch>
        <Route exact={true} path="/signup" component={RegisterContainer} />
        <Route path="/app" component={requiresAuth(MainContainer)}/>
        <Redirect to="/app"/>
      </Switch>
      </>
    </ConnectedRouter>
  );
}

export default App;
