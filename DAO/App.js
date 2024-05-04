import {LogBox} from 'react-native';
import React from 'react';
import Navigation from './common/Navigation';
import {Provider} from 'react-redux';
import {store} from './store';
import io from 'socket.io-client';
const socket = io.connect('https://dao-applicationservice.onrender.com');
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <Navigation socket={socket} />
    </Provider>
  );
}
