import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers/index';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['images'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
