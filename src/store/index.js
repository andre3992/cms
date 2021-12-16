/**
 * @author Victor Andrade <victor.andrade@caixamagica.pt>, Paulo Pinho <paulo.pinho@caixamagica.pt>
 *
 * @see redux-sagas docs: https://redux-saga.js.org/docs/api/index.html
 *
 * @version 20200116
 * @since 20200116 Initial release
 *
 */

import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/index";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * persistConfig

 * @type {
 *    {
 *      blacklist: *[], Colocar todos os estados do reducer que não são necessários que sejam guardar "persistentes", exemplo: auth, router, settings
 *      storage: *,
 *      key: string
 *    }
 *  }
 */
const persistConfig = {
  key: "cms-fe-technical-test",
  storage,
  blacklist: ["router"],
};

const persistedReducer = persistReducer(persistConfig, reducers(history));

export default function configureStore(initialState) {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor };
}

export { history };
