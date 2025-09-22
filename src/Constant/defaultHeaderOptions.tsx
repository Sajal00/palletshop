import React from 'react';
import { TouchableOpacity, View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from './colors';
import { FontSize } from './FontSize';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigator/AppNavigator';

interface HeaderOptionsProps<RouteName extends keyof RootStackParamList> {
  title: string;
  navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIconName?: string;
  rightIconName?: string;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

const defaultHeaderOptions = <RouteName extends keyof RootStackParamList>({
  title,
  navigation,
  showLeftIcon = true,
  showRightIcon = false,
  leftIconName = 'arrowleft',
  rightIconName = '',
  onLeftIconPress,
  onRightIconPress,
}: HeaderOptionsProps<RouteName>) => {
 

  return {
    headerStyle: {
      backgroundColor: colors.primary,
      paddingTop: Platform.OS === 'ios' ? insets.top : 0, // safe area for notch
    },
    headerTitleAlign: 'center' as const,
    headerTitle: title,
    headerBackVisible: false,
    headerTintColor: colors.headerTint,

    ...(showLeftIcon && {
      headerLeft: () => (
        <TouchableOpacity
          onPress={onLeftIconPress || (() => navigation.goBack())}
          style={{ paddingHorizontal: 10 }}
        >
          <Icon
            name={leftIconName}
            size={FontSize.Font_24}
            color={colors.arrowColor}
          />
        </TouchableOpacity>
      ),
    }),

    ...(showRightIcon && {
      headerRight: () => (
        <TouchableOpacity
          onPress={
            onRightIconPress || (() => console.log(`${rightIconName} icon pressed`))
          }
          style={{ paddingHorizontal: 10 }}
        >
          <Icon
            name={rightIconName}
            size={FontSize.Font_24}
            color={colors.arrowColor}
          />
        </TouchableOpacity>
      ),
    }),
  };
};

export default defaultHeaderOptions;
