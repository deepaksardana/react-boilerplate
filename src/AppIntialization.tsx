import "styles/index.scss";
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history';

interface Props {
  history: History;
}

function App(props: Props) {
  const {history} = props;
  return (
    <div className="flex">
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => (<div>Match</div>)} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
    </ConnectedRouter>
    </div>
  );
}

export default App;
