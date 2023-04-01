import { ChronoField, LocalDate } from '@js-joda/core';
import { Animated, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { proxy, useSnapshot } from 'valtio';
import DayType from '../../constants/DayType';
import DateTimeUtils from '../../utils/DateTimeUtils';
import Week from './Week';
import FlatList = Animated.FlatList;

type PropsType = {
  month: number;
};

type StateType = {
  localDate: DateTimeUtils;
  firstDay: DayType;
  lastDay: DayType;
  weeks: (LocalDate | null)[][] | null;
};

function Month(props: PropsType) {
  const state = useRef(
    proxy<StateType>({
      localDate: new DateTimeUtils(LocalDate.of(2023, props.month, 1)),
      firstDay: DayType.DEFAULT,
      lastDay: DayType.DEFAULT,
      weeks: null,
    }),
  ).current;

  const snap = useSnapshot(state);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    state.firstDay = findDayType(state.localDate.getFirstDayOfMonth());
    state.lastDay = findDayType(state.localDate.getLastDayOfMonth());
    setWeeks();
  };

  const findDayType = (date: LocalDate): DayType => {
    const result = DayType.values().find(day => day.value === date.dayOfWeek().value());
    return result === undefined ? DayType.DEFAULT : result;
  };

  const getFrontBlankNumber = (): number => {
    if (state.firstDay.value === 7) {
      return 0;
    }
    return state.firstDay.value;
  };

  const getLastBlankNumber = (): number => {
    if (state.lastDay.value === 7) {
      return 6;
    }
    return 6 - state.lastDay.value;
  };

  const setWeeks = () => {
    const frontBlanks: null[] = new Array(getFrontBlankNumber()).fill(null);
    const endBlanks: null[] = new Array(getLastBlankNumber()).fill(null);
    const monthArr: (LocalDate | null)[][] = [frontBlanks];

    let numberOfWeek = 0;
    let numberOfDay = 1;
    while (numberOfDay <= state.localDate.lengthOfMonth()) {
      if (monthArr[numberOfWeek] && monthArr[numberOfWeek].length === 7) {
        numberOfWeek++;
        monthArr[numberOfWeek] = [];
        continue;
      }
      monthArr[numberOfWeek].push(state.localDate.date().withDayOfMonth(numberOfDay));
      numberOfDay++;
    }

    if (monthArr[numberOfWeek] && monthArr[numberOfWeek].length !== 7) {
      monthArr[numberOfWeek] = [...monthArr[numberOfWeek], ...endBlanks];
    }
    state.weeks = monthArr;
  };

  const renderWeek = ({ item, index }) => {
    return (
      <View key={index}>
        <Week week={item} />
      </View>
    );
  };

  return <FlatList data={state.weeks} renderItem={renderWeek} />;
}

export default Month;
