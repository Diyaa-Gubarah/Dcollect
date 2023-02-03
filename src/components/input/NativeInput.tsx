import { ColorValues, SpaceValues } from "../../types/theme";
import { TextInput, TextInputProps } from "react-native";

import React from "react";
import { useTheme } from "../../hooks";

type KeyboardType = "default" | "numeric" | "email-address" | "phone-pad";

interface INativeInputProps {
  fontSize?: SpaceValues;
  color?: ColorValues;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  KeyboardType: KeyboardType;
}

const NativeInput: React.FC<INativeInputProps> = ({
  onChangeText,
  color,
  fontSize,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <TextInput
      {...props}
      style={[
        {
          fontSize: theme.fontSizes[fontSize ?? "lg"],
          color: theme.colors[color ?? "textPrimary"],
        },
        style,
      ]}
      onChangeText={onChangeText}
    />
  );
};

export default NativeInput;
