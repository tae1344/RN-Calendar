import { Animated, View } from 'react-native';
import Month from './Month';
import { LocalDate } from '@js-joda/core';
import React, { useRef } from 'react';
import FlatList = Animated.FlatList;

type PropsType = {
  monthCount: number;
  months: LocalDate[];
};

function MonthList(props: PropsType) {
  const calendarRef = useRef<FlatList>(null);

  const onFailToScroll = info => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      calendarRef.current?.scrollToIndex({ index: info.index, animated: false });
    });
  };

  const renderMonth = ({ item, index }: { item: LocalDate; index: number }) => {
    return (
      <View key={index}>
        <Month month={item} />
      </View>
    );
  };

  return props.months.length > 0 ? (
    <FlatList
      ref={calendarRef}
      data={props.months}
      // initialScrollIndex={props.months.length - props.monthCount - 1}
      renderItem={renderMonth}
      // onScrollToIndexFailed={onFailToScroll}
    />
  ) : null;
}

export default MonthList;
