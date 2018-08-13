import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator } from 'react-navigation';
import Home from './components/Home';
import ImagePreview from './components/ImagePreview';
import configureStore from './store/configureStore';

const store = configureStore();

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
  },
  ImagePreview: {
    screen: ImagePreview,
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <RootStack />
        </PersistGate>
      </Provider>
    );
  }
}
