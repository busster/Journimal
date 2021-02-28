import { StyleSheet } from 'react-native';

const buildSpacing = (label, size) => ({
  [`m${label}`]: { margin: size },
  [`my${label}`]: { marginVertical: size },
  [`mt${label}`]: { marginTop: size },
  [`mb${label}`]: { marginBottom: size },
  [`mx${label}`]: { marginHorizontal: size },
  [`ml${label}`]: { marginLeft: size },
  [`mr${label}`]: { marginRight: size },
})

export const Spacing = StyleSheet.create({
  ...buildSpacing('025', 5),
  ...buildSpacing('05', 10),
  ...buildSpacing('1', 25),
  ...buildSpacing('2', 50)
})