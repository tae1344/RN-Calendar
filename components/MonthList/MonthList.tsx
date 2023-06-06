import { Animated, View } from 'react-native';
import Month from '../Month/Month';
import { LocalDate } from '@js-joda/core';
import React, { useRef } from 'react';
import FlatList = Animated.FlatList;

type PropsType = {
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

  return props.months.length > 0 ? <FlatList ref={calendarRef} data={props.months} renderItem={renderMonth} /> : null;
}

export default MonthList;
