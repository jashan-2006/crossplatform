import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {HomeScreen} from './src/screens';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
