import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthNavigation from './navigations/AuthNavigation';

import tw from 'twrnc';
import { Provider } from 'react-redux';
import Store from './reducer/Configuration';

export default function App() {
  return (
    <Provider store={Store}>
      <AuthNavigation />
    </Provider>
  );
}
