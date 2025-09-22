import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './CustomTextinputStyle';


interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  error?: boolean;
  errorMessage?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
  secureTextEntry?: boolean;
  style?: ViewStyle;
  maxLength?: number;
  iconSize?: number;
  mode?: 'flat' | 'outlined';
  placeholderText?:string;
  placeholderTextColor?: string;
  iconName?: string;
  iconPosition?: 'left' | 'right';
  onIconPress?: () => void;
  [key: string]: any; // For extra props like testID, autoCapitalize etc.
}

const CustomTextInput:React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  editable = true,
  error = false,
  errorMessage = '',
  keyboardType = 'default',
  secureTextEntry = false,
  style,
  maxLength,
  iconSize,
  mode,
  placeholderText,
  placeholderTextColor,
  iconName = '', // <-- optional icon name
  iconPosition = 'right', // 'left' or 'right'
  onIconPress = () => { }, // handler for icon tap
  ...rest
}) => {
  const renderIcon = () => {
    if (!iconName) return null;
    return (
      <TextInput.Icon
        icon={iconName}
        onPress={onIconPress}
        forceTextInputFocus={false}
        size={iconSize}
      />
    );
  };
  return (
    <View style={styles.textContainer}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        mode={mode ? mode : 'outlined'}
        error={error}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={style}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        maxLength={maxLength}
        returnKeyType="done"
        {...(iconPosition === 'right'
          ? { right: renderIcon() }
          : { left: renderIcon() })}

        {...rest}
      />


      {error && !!errorMessage && (
        <Text style={styles.textError}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;