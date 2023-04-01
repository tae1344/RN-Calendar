import { Animated, StyleSheet, View } from 'react-native';
import Day from './Day';
import FlatList = Animated.FlatList;
import { LocalDate } from '@js-joda/core';

type PropsTYpe = {
  week: (LocalDate | null)[];
};

function Week(props: PropsTYpe) {
  const renderItem = ({ item, index }) => {
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
    backgroundColor: 'blue',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Week;
