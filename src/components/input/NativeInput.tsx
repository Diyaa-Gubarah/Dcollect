import {ColorValues, SpaceValues} from '../../types/theme';
import {TextInput, TextInputProps} from 'react-native';

import {DEFAULT_DARK_THEME_ID} from '../../constants/themes';
import React from 'react';
import {useTheme} from '../../hooks';

export type KeyboardType =
  | 'default'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'number-pad';

export type InputType = 'text' | 'numeric';

interface INativeInputProps {
  fontSize?: SpaceValues;
  color?: ColorValues;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  KeyboardType?: KeyboardType;
  inputMode?: InputType;
  value?: string;
  defaultValue?: string;
}

const NativeInput: React.FC<INativeInputProps> = ({
  onChangeText,
  color,
  fontSize,
  style,
  ...props
}) => {
  const {theme} = useTheme();
  return (
    <TextInput
      {...props}
      onChangeText={onChangeText}
      textAlign="center"
      keyboardAppearance={theme.id === DEFAULT_DARK_THEME_ID ? 'dark' : 'light'}
      placeholderTextColor={theme.colors.textPrimary}
      style={[
        {
          fontSize: theme.fontSizes[fontSize ?? 'md'],
          color: theme.colors[color ?? 'textPrimary'],
        },
        style,
      ]}
    />
  );
};

export default NativeInput;
