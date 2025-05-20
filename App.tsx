import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './AppNavigator';
import ModalProvider from './components/ModalProvider';
import { store } from './store/Modal/store';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ModalProvider>
            <AppNavigator />
          </ModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
