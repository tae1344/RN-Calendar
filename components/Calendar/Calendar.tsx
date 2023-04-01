import React from 'react';
import { Modal, SafeAreaView } from 'react-native';
import CalendarProvider from '../../cotext/calendar/CalendarProvider';
import MonthList from './MonthList';

type PropsType = {
  isVisible: boolean;
};

function Calendar(props: PropsType) {
  return (
    <SafeAreaView>
      <CalendarProvider>
        <Modal visible={props.isVisible} animationType={'slide'}>
          <MonthList />
        </Modal>
      </CalendarProvider>
    </SafeAreaView>
  );
}

export default Calendar;
