// Dependencies
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

// Stores
import createStore from './createStore';

// Reducers
import persistedReducers from './persistReducers';

// Modules
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistedReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
