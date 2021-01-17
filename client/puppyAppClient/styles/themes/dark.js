import merge from 'deepmerge';

import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme } from 'react-native-paper';

export const DarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
