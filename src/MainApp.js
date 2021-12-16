import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import App from "./containers/App";
import { BASENAME_URL } from "./constants/Settings";
import { PersistGate } from "redux-persist/integration/react";

export const { store, persistor } = configureStore();

const MainApp = () => (
  <Router>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={`${BASENAME_URL}`} component={App} />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </Router>
);

export default MainApp;
