import React, { useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LocalDate } from '@js-joda/core';
import CalendarContext from '../../cotext/calendar/CalendarContext';

type PropsType = {
  day: LocalDate | null;
};

const WIDTH = Dimensions.get('screen').width - 32;

function Day(props: PropsType) {
  const { startDate, setStartDate, endDate, setEndDate } = useContext(CalendarContext);

  useEffect(() => {
    console.log('date >>>>>>>>>>>>>>>>. ', startDate, endDate);
  }, [startDate, endDate]);

  const onPressDay = () => {
    console.log('click', props.day, startDate, endDate);
    processDate();
  };

  const processDate = () => {
    if (startDate === null && endDate === null) {
      setStartDate(props.day);
    }

    if (startDate !== null && endDate !== null) {
      setStartDate(props.day);
      setEndDate(null);
    }

    if (props.day !== null && startDate !== null && endDate === null) {
      if (startDate.isAfter(props.day) || startDate.isEqual(props.day)) {
        setStartDate(props.day);
      } else {
        setEndDate(props.day);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressDay}>
      <Text>{props.day === null ? null : props.day.dayOfMonth()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH / 7,
    height: WIDTH / 7,
    borderRadius: 999,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Day;
