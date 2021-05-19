import React from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';

import { PageBack, Button, ButtonFloating, ArrowLeftIcon, Colors, Spacing, Typography, wpw } from 'modules/design'

import { useService } from '@xstate/react'
import { appService } from 'modules/core/machines'

import Entries from 'modules/dog/components/timeline/entries'

export default ({ title, timelineData, refreshing, onBack, onRefreshTimeline, onAddEntry, onAddActivity, onCompleteActiveActivity, activeActivity }) => {
  return (
    <PageBack
      onBack={onBack}
      title={title}
      style={styles.timelinePage}
    >
      <Entries
        timelineData={timelineData}
        onRefresh={onRefreshTimeline}
        refreshing={refreshing}
      />
      <View style={[styles.fab, Spacing.m1]}>
        { activeActivity ? 
          <ButtonFloating style={Spacing.mb05} variation="secondary" onPress={onCompleteActiveActivity} icon={activeActivity.icon} /> :
          null }
        <ButtonFloating style={Spacing.mb05} variation="secondary" onPress={onAddActivity} text="+" />
        <ButtonFloating onPress={onAddEntry} text="+" />
      </View>
    </PageBack>
  )
}

const styles = StyleSheet.create({
  timelinePage: {
    display: 'flex',
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 1,
  }
})