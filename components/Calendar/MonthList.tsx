import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import CalendarContext from '../../cotext/calendar/CalendarContext';
import { ChronoField, LocalDate } from '@js-joda/core';
import Month from './Month';

type PropsType = {};

function MonthList(props: PropsType) {
  const { startDate, setStartDate, endDate, setEndDate } = useContext(CalendarContext);

  useEffect(() => {
    console.log('calendar', startDate, endDate);
    const date = LocalDate.of(2023, 3, 19);
    console.log('>>>>>>>>>>>> ', date.get(ChronoField.DAY_OF_MONTH));
    console.log('dayOfWeek ', date.dayOfWeek(), date.dayOfWeek().value());
  }, []);

  return (
    <View>
      <Month month={3} />
    </View>
  );
}

export default MonthList;
