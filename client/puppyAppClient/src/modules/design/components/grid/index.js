import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Colors, shade } from 'modules/design/styles'
import { wpw } from 'modules/design/utils'
// const data = [
//   { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
//   { key: 'K' },
//   { key: 'L' },
// ];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

export const Grid = ({
  data,
  numColumns,
  renderItem,
  keyExtractor,
  width = '100%',
  height = '100%',
  gridSpace = 1,
  styles = {}
}) => {
  const renderItemWrapper = ({ item, index }) => {
    const height = (wpw(1) - (gridSpace * (numColumns + 1))) / numColumns;

    const x = index % numColumns;
    const y = Math.floor((index / numColumns) % (data.length / numColumns));

    let spacing = {
      marginTop: gridSpace / 2,
      marginBottom: gridSpace / 2,
      marginLeft: gridSpace / 2,
      marginRight: gridSpace / 2
    };
    if (x === 0) {
      spacing.marginLeft = gridSpace;
    }
    if (y === 0) {
      spacing.marginTop = gridSpace;
    }
    if (x === numColumns - 1) {
      spacing.marginRight = gridSpace;
    }
    if (y === data.length / numColumns - 1) {
      spacing.marginBottom = gridSpace;
    }

    const tileStyles = {
      ...styles.item,
      ...spacing,
      height,
    };
    if (item.empty === true) {
      return <View style={[tileStyles, styles.itemInvisible]} />;
    }

    const size = height;

    return (
      <View
        style={tileStyles}
      >
        { renderItem({ item, index, size }) }
      </View>
    );
  };

  return (
    <View style={{ width, height, ...styles  }}>
      <FlatList
        data={formatData(data, numColumns)}
        style={{ ...styles.container }}
        renderItem={renderItemWrapper}
        numColumns={numColumns}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});