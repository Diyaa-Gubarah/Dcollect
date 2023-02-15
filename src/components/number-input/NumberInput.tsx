import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {NativeText} from '..';
import NativeTouch from '../touch/NativeTouch';
import {useTheme} from '../../hooks';

interface NumberInputProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onValueChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
}) => {
  const [inputValue, setInputValue] = useState(`${value}`);
  const {theme} = useTheme();

  const handleInputChange = (text: string) => {
    const newValue = Number(text);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setInputValue(text);
      onValueChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + step;
    if (newValue <= max) {
      onValueChange(newValue);
      setInputValue(`${newValue}`);
    }
  };

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onValueChange(newValue);
      setInputValue(`${newValue}`);
    }
  };

  const container = {
    marginVertical: theme.spacing.xsm,
  };
  const labelStyle: StyleProp<TextStyle> = {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
  };
  const inputContainer: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: theme.spacing.xsm * 0.5,
    borderRadius: theme.spacing.xsm,
    borderColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
  };

  const input: StyleProp<TextStyle> = {
    flex: 1,
    textAlign: 'center',
    padding: theme.spacing.sm,
    color: theme.colors.primary,
    fontSize: theme.fontSizes.xsm,
  };

  const button = {
    // margin: 0,
    // minWidth: 48,
    // height: 48,
    // borderRadius: 0,
    backgroundColor: theme.colors.primary,
  };

  return (
    <View style={container}>
      {label && <TextInput style={labelStyle} value={label} editable={false} />}
      <View style={inputContainer}>
        <NativeTouch onPress={handleDecrement} style={button}>
          <NativeText color="primary" size="sm">
            -
          </NativeText>
        </NativeTouch>
        <TextInput
          style={input}
          value={inputValue}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
        <NativeTouch onPress={handleIncrement} style={button}>
          <NativeText color="primary" size="sm">
            +
          </NativeText>
        </NativeTouch>
      </View>
    </View>
  );
};

export default NumberInput;
