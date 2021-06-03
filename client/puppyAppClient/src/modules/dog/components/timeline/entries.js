import React from 'react';
import { StyleSheet, View, Text, SectionList, Pressable } from 'react-native';

import { PageBack, Button, ButtonIconCircle, ButtonFloating, ArrowLeftIcon, Colors, shade, Spacing, Typography, wpw } from 'modules/design'

export default ({ timelineData, onRefresh, refreshing, onLoadNextDay }) => {
  const renderItem = ({ item }) => (
    <View style={styles.entry}>
      <View style={styles.activities}>
        <View style={styles.eventsWrapper}>
          {[...item.activities].map(([ key, entry ]) => entry).map((entry, index) => (
              <ButtonIconCircle variation='tertiary' key={index} style={styles.icon} icon={entry.icon} />
            ))}
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{ item.minuteKey }</Text>
      </View>
      <View style={styles.events}>
        <View style={styles.eventsWrapper}>
          {[...item.events].map(([ key, entry ]) => entry).map((entry, index) => (
              <ButtonIconCircle variation='primary' key={index} style={styles.icon} icon={entry.icon} />
            ))}
        </View>
      </View>
    </View>
  )

  const renderSectionHeader = ({ section }) => (
    <View>
      <Text style={styles.header}>{ section.dayKey }</Text>
    </View>
  )

  const sectionSeparator = ({ leadingItem }) => (
    leadingItem ? (<View style={styles.separator}></View>) : null
  )

  const keyExtractor = item => item.minuteKey

  return (
    <SectionList
      sections={timelineData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onLoadNextDay}
      onEndReachedThreshold={0.5}
      SectionSeparatorComponent={sectionSeparator}
    />
  )
}

const styles = StyleSheet.create({
  header: {
    color: Colors.Accent,
    ...Typography.navigationTitle,
    ...Spacing.mx1,
    ...Spacing.mt1,
    ...Spacing.mb05
  },
  entry: {
    flex: 1,
    flexDirection: 'row',
  },
  activities: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  events: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsWrapper: {
    flexShrink: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  icon: {
    ...Spacing.mx025,
    ...Spacing.my025
  },
  dateContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    color: Colors.Accent,
  },
  separator: {
    height: 1,
    backgroundColor: shade(Colors.Background, -10),
    ...Spacing.mt1
  }
})