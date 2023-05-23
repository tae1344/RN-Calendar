import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LocalDate } from '@js-joda/core';
import CalendarContext from '../../context/calendar/CalendarContext';
import { Colors } from '../../styles';

type PropsType = {
  day: LocalDate | null;
};

const WIDTH = Dimensions.get('screen').width - 32;

function Day(props: PropsType) {
  const { startDate, setStartDate, endDate, setEndDate } = useContext(CalendarContext);

  const onPressDay = () => {
    processDate();
  };

  const isStartDate = (): boolean => {
    if (props.day && startDate) {
      return startDate.isEqual(props.day);
    }
    return false;
  };

  const isEndDate = (): boolean => {
    if (props.day && endDate) {
      return endDate.isEqual(props.day);
    }
    return false;
  };

  const isActive = (): boolean => {
    return isStartDate() || isEndDate() || isWithinPeriod();
  };

  const isWithinPeriod = (): boolean => {
    if (props.day && startDate && endDate) {
      return props.day.isAfter(startDate) && props.day.isBefore(endDate);
    }
    return false;
  };

  const setDayStyle = () => {
    if (props.day === null) {
      return defaultDayStyle.layout;
    }

    if (isStartDate()) {
      if (endDate === null) {
        return startDayStyle.circle;
      }
      return startDayStyle.layout;
    }

    if (isEndDate()) {
      return endDayStyle.layout;
    }

    if (isWithinPeriod()) {
      return containedDay.layout;
    }

    return defaultDayStyle.layout;
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
    <TouchableOpacity style={setDayStyle()} onPress={onPressDay}>
      <Text style={textStyle.dayText(isActive())}>{props.day === null ? null : props.day.dayOfMonth()}</Text>
    </TouchableOpacity>
  );
}

const defaultDayStyle = StyleSheet.create({
  layout: {
    width: WIDTH / 7,
    height: WIDTH / 7,
    backgroundColor: Colors.white.s100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const containedDay = StyleSheet.create({
  layout: {
    ...defaultDayStyle.layout,
    backgroundColor: Colors.gray.s200,
  },
});

const startDayStyle = StyleSheet.create({
  layout: {
    ...defaultDayStyle.layout,
    backgroundColor: Colors.gray.s200,
    borderTopLeftRadius: 99,
    borderBottomLeftRadius: 99,
    borderWidth: 0,
  },
  circle: {
    ...defaultDayStyle.layout,
    backgroundColor: Colors.gray.s200,
    borderRadius: 999,
  },
});

const endDayStyle = StyleSheet.create({
  layout: {
    ...defaultDayStyle.layout,
    backgroundColor: Colors.gray.s200,
    borderTopRightRadius: 99,
    borderBottomRightRadius: 99,
    borderWidth: 0,
  },
});

const textStyle = StyleSheet.create<any>({
  dayText: (isActive = false) => ({
    color: isActive ? Colors.white.s100 : Colors.black.s200,
  }),
});

export default Day;
