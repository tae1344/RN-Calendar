import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Day from './Day';
import { LocalDate } from '@js-joda/core';

type PropsTYpe = {
  week: (LocalDate | null)[];
};

function Week(props: PropsTYpe) {
  const renderItem = ({ item, index }: { item: LocalDate; index: number }) => {
    return (
      <View key={index}>
        <Day day={item} />
      </View>
    );
  };

  return (
    <FlatList
      data={props.week}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      columnWrapperStyle={styles.container}
      numColumns={7}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default Week;
