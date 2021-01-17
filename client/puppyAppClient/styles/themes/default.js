import merge from 'deepmerge';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

export const DefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
