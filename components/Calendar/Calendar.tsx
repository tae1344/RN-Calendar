import React from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import CalendarProvider from '../../cotext/calendar/CalendarProvider';
import MonthList from './MonthList';
import { LocalDate } from '@js-joda/core';

type PropsType = {
  monthCount: number;
};

function Calendar(props: PropsType) {
  return (
    <SafeAreaView>
      <CalendarProvider>
        {/*<Modal visible={props.isVisible} animationType={'slide'}>*/}
        <MonthList monthCount={props.monthCount} />
        {/*</Modal>*/}
      </CalendarProvider>
    </SafeAreaView>
  );
}

Calendar.defaultProps = {
  monthCount: 3,
};

export default Calendar;
