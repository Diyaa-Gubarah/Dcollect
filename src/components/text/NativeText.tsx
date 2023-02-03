import { ColorValues, SpaceValues } from "../../types/theme";
import { Text as NativeText, TextProps } from "react-native";

import React from "react";
import { useTheme } from "../../hooks/index";

interface Props extends TextProps {
  size: SpaceValues;
  color: ColorValues;
  children: React.ReactNode;
}

const Text = ({ children, color, size, ...props }: Props) => {
  const { theme } = useTheme();
  // Generate our style sheet based on the current theme
  // We're using the React.useMemo hook for optimization,
  // the Styles object will be re-generated if the theme changes
  const textStyle = React.useMemo(
    () => ({
      color: theme.colors ? theme.colors[color] : "",
      fontSize: theme?.fontSizes[size],
    }),
    [theme, color, size]
  );

  return (
    <NativeText style={textStyle} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;
