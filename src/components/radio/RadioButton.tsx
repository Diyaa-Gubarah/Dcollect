import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {NativeText} from '..';
import NativeTouch from '../touch/NativeTouch';
import NativeView from '../view/NativeView';
import {useTheme} from '../../hooks';

type Props = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const RadioButton = ({label, value, onValueChange}: Props) => {
  const {theme} = useTheme();
  const handlePress = () => {
    onValueChange(!value);
  };

  const radio: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: theme.spacing.sm,
      height: theme.spacing.sm,
      borderRadius: theme.spacing.sm / 2,
      borderWidth: theme.spacing.xsm * 0.25,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.sm,
    }),
    [],
  );

  const radioSelected: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: theme.spacing.xsm,
      height: theme.spacing.xsm,
      borderRadius: theme.spacing.xsm / 2,
      backgroundColor: theme.colors.primary,
    }),
    [],
  );

  return (
    <NativeTouch onPress={handlePress} padding="xsm">
      <View style={styles.container}>
        <View style={radio}>
          {value ? <View style={radioSelected} /> : null}
        </View>
        <NativeText color={'primary'} size="xsm">
          {label}
        </NativeText>
      </View>
    </NativeTouch>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default RadioButton;
