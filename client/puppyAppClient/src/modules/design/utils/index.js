import { Dimensions } from 'react-native'

export const wpw = (percent) => Dimensions.get('window').width * percent
export const wph = (percent) => Dimensions.get('window').height * percent
export const ww = () => Dimensions.get('window').width