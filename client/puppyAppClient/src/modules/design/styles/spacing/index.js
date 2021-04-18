import { StyleSheet } from 'react-native';

const buildSpacing = (label, size) => ({
  [`m${label}`]: { margin: size },
  [`my${label}`]: { marginVertical: size },
  [`mt${label}`]: { marginTop: size },
  [`mb${label}`]: { marginBottom: size },
  [`mx${label}`]: { marginHorizontal: size },
  [`ml${label}`]: { marginLeft: size },
  [`mr${label}`]: { marginRight: size },
  [`p${label}`]: { padding: size },
  [`py${label}`]: { paddingVertical: size },
  [`pt${label}`]: { paddingTop: size },
  [`pb${label}`]: { paddingBottom: size },
  [`px${label}`]: { paddingHorizontal: size },
  [`pl${label}`]: { paddingLeft: size },
  [`pr${label}`]: { paddingRight: size },
})

export const SpacingConstants = {
  '025': 5,
  '05': 10,
  '1': 25,
  '2': 50
}

export const Spacing = StyleSheet.create({
  ...Object.keys(SpacingConstants).reduce((acc, n) => {
    acc = { ...acc, ...buildSpacing(n, SpacingConstants[n]) }
    return acc
  }, {})
})
