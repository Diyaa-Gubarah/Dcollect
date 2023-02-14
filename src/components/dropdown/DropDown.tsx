import {Pressable, StyleSheet, View} from 'react-native';
import React, {FC, ReactElement, useCallback, useState} from 'react';

import NativeIcon from '../icon/NativeIcon';
import NativeText from '../text/NativeText';
import NativeTouch from '../touch/NativeTouch';
import NativeView from '../view/NativeView';
import {useTheme} from '../../hooks';

interface Props {
  label: string;
  data: Array<{label: string; value: string}>;
}

interface ListProps {
  data: any[];
  onPress: (item: any) => void;
}

const DropList: FC<ListProps> = ({
  data,
  onPress,
}): React.ReactElement<any, any> | any => {
  const {theme} = useTheme();
  return React.Children.toArray(
    data.map((item: (typeof data)[0]) => (
      <Pressable
        onPress={() => onPress(item)}
        style={{
          backgroundColor: `${theme.colors.primary}33`,
          padding: theme.spacing.sm,
          marginVertical: theme.spacing.xsm,
        }}>
        <NativeText color="textPrimary" size="xsm">
          {item.label}
        </NativeText>
      </Pressable>
    )),
  );
};

const Dropdown: FC<Props> = ({label = 'key_name', data}) => {
  const {theme} = useTheme();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string|null>(null);

  const toggleDropdown = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const onItemPress = useCallback(
    (item: (typeof data)[0]): void => {
      setSelected(item.label);
      setVisible(false);
    },
    [selected, visible],
  );

  return (
    <>
      <NativeTouch onPress={toggleDropdown}>
        <View
          style={{
            ...styles.button,
            padding: theme.spacing.sm,
            borderColor: theme.colors.primary,
            borderWidth: theme.spacing.xsm / 2,
            borderRadius: theme.spacing.xsm,
            backgroundColor: `${theme.colors.primary}0D`,
            margin: theme.spacing.xsm,
          }}>
          <NativeText color="primary" size="xsm">
            {`${label} ( ${selected||'Not Selected'} )`}
          </NativeText>
          <NativeIcon
            name={visible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            color="primary"
          />
        </View>
      </NativeTouch>
      {visible ? (
        <View
          style={{
            padding: theme.spacing.xsm,
            marginTop: -theme.spacing.sm,
            marginHorizontal: theme.spacing.sm,
          }}>
          <DropList data={data} onPress={onItemPress} />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
});

export default Dropdown;
