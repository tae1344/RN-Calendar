import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Calendar from './components/Calendar/Calendar';
import CalendarProvider from './context/calendar/CalendarProvider';
import { AppPropsType } from './types/AppType';

function App(props: AppPropsType): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <CalendarProvider {...props}>
        <Calendar />
      </CalendarProvider>
    </SafeAreaView>
  );
}

export default App;
