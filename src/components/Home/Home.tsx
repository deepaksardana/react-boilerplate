import { Route, Switch, Redirect } from "react-router-dom";
import loadable from "@loadable/component";

import URLRoutes from "URLRoutes";
import LazyLoading from "components/common/LazyLoading";

const DashboardContainer = loadable(() => import("components/Dashboard"), {
  fallback: <LazyLoading />
});

interface Props {}

const HomeContainer = (props: Props) => {
  return (
    <div>
      Home
      <Switch>
        <Route
          exact={true}
          path={URLRoutes.client.DAHSBOARD}
          component={DashboardContainer}
        />
        <Redirect to={URLRoutes.client.DAHSBOARD} />
      </Switch>
    </div>
  );
};


export default HomeContainer;

