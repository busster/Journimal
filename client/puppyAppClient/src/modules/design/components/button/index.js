import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from 'modules/design/styles'

import { Neomorph } from 'react-native-neomorph-shadows'

export const JButton = ({ onPress, text, style }) => (
  <View>
    {/* <InsetShadow>
      <InsetShadow>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.button, { ...style }]}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </InsetShadow>
    </InsetShadow> */}
  </View>
)

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})
