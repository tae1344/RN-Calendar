import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { LocalDate } from '@js-joda/core';
import CalendarContext from '../../context/calendar/CalendarContext';
import { Colors } from '../../styles';

type StyleType = {
  layout?: (color: string) => ViewStyle;
  circle?: (color: string) => ViewStyle;
};

type PropsType = {
  day: LocalDate | null;
};

const WIDTH = Dimensions.get('screen').width - 32;

function Day(props: PropsType) {
  const { startDate, setStartDate, endDate, setEndDate, activeColor } = useContext(CalendarContext);

  const onPress = () => {
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
        return startDayStyle.circle(activeColor);
      }
      return startDayStyle.layout(activeColor);
    }

    if (isEndDate()) {
      return endDayStyle.layout(activeColor);
    }

    if (isWithinPeriod()) {
      return containedDay.layout(activeColor);
    }

    return defaultDayStyle.layout;
  };

  const processDate = () => {
    if (startDate === null && endDate === null) {
      setStartDate(props.day);
      return;
    }

    if (startDate !== null && endDate !== null) {
      setStartDate(props.day);
      setEndDate(null);
      return;
    }

    if (props.day !== null && startDate !== null && endDate === null) {
      if (startDate.isAfter(props.day) || startDate.isEqual(props.day)) {
        setStartDate(props.day);
        return;
      } else {
        setEndDate(props.day);
        return;
      }
    }
  };

  return (
    <TouchableOpacity style={setDayStyle()} onPress={onPress}>
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

const containedDay = StyleSheet.create<StyleType | any>({
  layout: (color = Colors.gray.s200) => ({
    ...defaultDayStyle.layout,
    backgroundColor: color,
  }),
});

const startDayStyle = StyleSheet.create<StyleType | any>({
  layout: (color = Colors.gray.s200) => ({
    ...defaultDayStyle.layout,
    backgroundColor: color,
    borderTopLeftRadius: 99,
    borderBottomLeftRadius: 99,
    borderWidth: 0,
  }),
  circle: (color = Colors.gray.s200): ViewStyle => ({
    ...defaultDayStyle.layout,
    backgroundColor: color,
    borderRadius: 999,
  }),
});

const endDayStyle = StyleSheet.create<StyleType | any>({
  layout: (color = Colors.gray.s200): ViewStyle => ({
    ...defaultDayStyle.layout,
    backgroundColor: color,
    borderTopRightRadius: 99,
    borderBottomRightRadius: 99,
    borderWidth: 0,
  }),
});

const textStyle = StyleSheet.create<any>({
  dayText: (isActive = false) => ({
    color: isActive ? Colors.white.s100 : Colors.black.s200,
  }),
});

export default Day;
