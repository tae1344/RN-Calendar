import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Calendar from './components/Calendar/Calendar';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Calendar />
    </SafeAreaView>
  );
}

export default App;
