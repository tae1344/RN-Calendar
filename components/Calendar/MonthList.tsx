import { Animated, StyleSheet, Text, View } from 'react-native';
import Month from './Month';
import { LocalDate } from '@js-joda/core';
import { useEffect, useRef } from 'react';
import { proxy } from 'valtio';
import FlatList = Animated.FlatList;
import MonthType from '../../constants/MonthType';

type StateType = {
  thisMonth: number;
};

type PropsType = {
  monthCount: number;
};

function MonthList(props: PropsType) {
  const calendarRef = useRef<FlatList>(null);
  const state = useRef(
    proxy<StateType>({
      thisMonth: LocalDate.now().monthValue(),
    }),
  ).current;

  const onFailToScroll = info => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      calendarRef.current?.scrollToIndex({ index: info.index, animated: false });
    });
  };

  const renderMonth = ({ item, index }: { item: MonthType; index: number }) => {
    return (
      <View key={index}>
        <Month month={item} />
      </View>
    );
  };

  return (
    <FlatList
      ref={calendarRef}
      data={MonthType.values()}
      initialScrollIndex={state.thisMonth - 1}
      renderItem={renderMonth}
      onScrollToIndexFailed={onFailToScroll}
    />
  );
}

export default MonthList;
