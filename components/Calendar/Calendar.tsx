import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import MonthList from './MonthList';
import { proxy, useSnapshot } from 'valtio';
import { LocalDate } from '@js-joda/core';

type PropsType = {
  monthCount: number;
};

type StateType = {
  today: LocalDate;
  months: LocalDate[];
};

function Calendar(props: PropsType) {
  const state = useRef(
    proxy<StateType>({
      today: LocalDate.now(),
      months: [],
    }),
  ).current;

  const snap = useSnapshot(state);

  useEffect(() => {
    state.months = retrieveMonths();
  }, [props.monthCount]);

  const retrieveMonths = (): LocalDate[] => {
    let dates: LocalDate[] = [];

    // 현재 월 기준 이전
    for (let i = 1; i <= props.monthCount; i++) {
      dates = [state.today.minusMonths(i).withDayOfMonth(1), ...dates];
    }

    // 현재 월
    dates = [...dates, state.today.withDayOfMonth(1)];

    // 현재 월 기준 이후
    for (let i = 1; i <= props.monthCount; i++) {
      dates = [...dates, state.today.plusMonths(i).withDayOfMonth(1)];
    }

    return dates;
  };

  return (
    <SafeAreaView>
      <MonthList months={state.months} monthCount={props.monthCount} />
    </SafeAreaView>
  );
}

Calendar.defaultProps = {
  monthCount: 3,
};

export default Calendar;
