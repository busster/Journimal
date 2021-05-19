import React from 'react';
import { StyleSheet, View, Text, SectionList, Pressable } from 'react-native';

import { PageBack, Button, ButtonIconCircle, ButtonFloating, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

export default ({ timelineData, onRefresh, refreshing }) => {
  const renderItem = ({ item }) => (
    <View style={styles.entry}>
      <View style={styles.activities}></View>
      <View style={styles.events}>
        <View style={styles.eventsWrapper}>
          {item.events.map((entry, index) => (
              <ButtonIconCircle key={index} style={styles.icon} icon={entry.icon} />
            ))}
        </View>
        <Text style={styles.date}>{ item.minute }</Text>
      </View>
    </View>
  )

  const renderSectionHeader = ({ section }) => (
    <View>
      <Text style={styles.header}>{ section.day }</Text>
    </View>
  )

  const keyExtractor = item => item.minute

  return (
    <SectionList
      sections={timelineData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      onRefresh={onRefresh}
      refreshing={refreshing}
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
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  events: {
    flex: 0.5,
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
  date: {
    flexGrow: 1,
    color: Colors.Accent
  }
})