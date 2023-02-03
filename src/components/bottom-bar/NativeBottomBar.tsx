import { NativeIcon, NativeText } from "../index";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { useTheme, useTranslate } from "../../hooks";

import React from "react";

type Style = StyleProp<ViewStyle>;

function NativeBottomBar({ state, descriptors, navigation }) {
  const t = useTranslate();

  const { theme } = useTheme();

  const containerStyle: Style = {
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: theme.spacing.sm,

    // position: "absolute",
    // bottom: 0,
    // right: 0,
    // left: 0,
  };

  const itemStyle: Style = {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: theme.spacing.md,
  };

  return false ? null : (
    <View style={containerStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={index.toString()}
            style={{ ...itemStyle, flex: 1 }}
          >
            {isFocused ? (
              <>
                <NativeIcon color={"primary"} name="dashboard" />
                <View style={{ width: theme.spacing.md }} />

                <NativeText color={"primary"} size="md">
                  {t(label)}
                </NativeText>
              </>
            ) : (
              <NativeIcon color="textSecondary" name="dashboard" size={22} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export default React.memo(NativeBottomBar);
