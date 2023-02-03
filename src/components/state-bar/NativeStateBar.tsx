import { DEFAULT_DARK_THEME_ID } from "../../constants/themes";
import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "../../hooks";

const StatusBarComponent: React.FC = () => {
  const { theme } = useTheme();
  return (
    <StatusBar
      backgroundColor={theme.colors.background}
      barStyle={
        theme.id === DEFAULT_DARK_THEME_ID ? "light-content" : "dark-content"
      }
    />
  );
};

export default StatusBarComponent;
