import React, { useContext, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import MonthList from '../MonthList/MonthList';
import { proxy, useSnapshot } from 'valtio';
import { LocalDate } from '@js-joda/core';
import CalendarContext from '../../context/calendar/CalendarContext';

type PropsType = {
  monthCount: number;
};

type StateType = {
  today: LocalDate;
  months: LocalDate[];
};

function Calendar(props: PropsType) {
  const { startDate, endDate, onPressDay, monthCount = 2 } = useContext(CalendarContext);

  useEffect(() => {
    if (startDate !== undefined && endDate !== undefined) {
      onPressDay && onPressDay({ startDate: startDate, endDate: endDate });
    }
  }, [startDate, endDate]);

  const state = useRef(
    proxy<StateType>({
      today: LocalDate.now(),
      months: [],
    }),
  ).current;

  const snap = useSnapshot(state);

  useEffect(() => {
    state.months = retrieveMonths();
  }, [monthCount]);

  const retrieveMonths = (): LocalDate[] => {
    let dates: LocalDate[] = [];

    // 현재 월 기준 이전
    for (let i = 1; i <= monthCount; i++) {
      dates = [state.today.minusMonths(i).withDayOfMonth(1), ...dates];
    }

    // 현재 월
    dates = [...dates, state.today.withDayOfMonth(1)];

    // 현재 월 기준 이후
    for (let i = 1; i <= monthCount; i++) {
      dates = [...dates, state.today.plusMonths(i).withDayOfMonth(1)];
    }

    return dates;
  };

  return (
    <SafeAreaView>
      <MonthList months={state.months} />
    </SafeAreaView>
  );
}

Calendar.defaultProps = {
  monthCount: 3,
};

export default Calendar;
