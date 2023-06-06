import { LocalDate } from '@js-joda/core';
import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { proxy, useSnapshot } from 'valtio';
import DayType from '../../constants/DayType';
import DateTimeUtils from '../../utils/DateTimeUtils';
import Week from '../Week/Week';
import MonthType from '../../constants/MonthType';
import { Colors } from '../../styles';
import FlatList = Animated.FlatList;

type PropsType = {
  month: LocalDate;
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
      localDate: new DateTimeUtils(props.month),
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
    if (state.firstDay.value === DayType.SUNDAY.value) {
      return 0;
    }
    return state.firstDay.value;
  };

  const getLastBlankNumber = (): number => {
    if (state.lastDay.value === DayType.SUNDAY.value) {
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

  const renderWeekTitle = () => {
    return (
      <View>
        <View style={styles.monthTitleLayout}>
          <Text style={styles.monthTitle}>{MonthType.findOne(props.month.monthValue()).title}</Text>
        </View>
        <View style={styles.weekTitleContainer}>
          {DayType.values().map((day, index) => {
            return (
              <View key={index}>
                <Text style={styles.weekTitle}>{day.w}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderWeek = ({ item, index }: { item: (LocalDate | null)[]; index: number }) => {
    return (
      <View key={index}>
        <Week week={item} />
      </View>
    );
  };

  return (
    <View>
      <FlatList data={state.weeks} renderItem={renderWeek} ListHeaderComponent={renderWeekTitle} />
    </View>
  );
}

const styles = StyleSheet.create({
  monthTitleLayout: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white.s100,
    paddingVertical: 15,
  },
  weekTitle: {
    fontSize: 16,
  },
});

export default Month;
