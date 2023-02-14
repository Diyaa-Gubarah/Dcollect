import {NativeIcon, NativeList, NativeTouch} from '../../components';
import {StyleSheet, View} from 'react-native';
import {useCallback, useMemo} from 'react';

import {Option} from '../../data/option';
import {useTheme} from '../../hooks';

interface Props {
  onZoomInPress: () => void;
  onZoomOutPress: () => void;
  onTypePress: () => void;
  onThemePress: () => void;
  onFitPress: () => void;
  onBackupPress: () => void;
  onPowerPress: () => void;
  onTablePress: () => void;
  onOptionPress: () => void;
  onTranslatePress: () => void;
}

const MapOption: React.FC<Props> = ({
  onZoomInPress,
  onZoomOutPress,
  onTypePress,
  onThemePress,
  onBackupPress,
  onFitPress,
  onOptionPress,
  onPowerPress,
  onTablePress,
  onTranslatePress,
}) => {
  const {theme} = useTheme();

  const fun = useMemo(
    () => [
      onOptionPress,
      onTypePress,
      onZoomInPress,
      onZoomOutPress,
      onFitPress,
      onBackupPress,
      onTablePress,
      onThemePress,
      onTranslatePress,
      onPowerPress,
    ],
    [
      onOptionPress,
      onTypePress,
      onZoomInPress,
      onZoomOutPress,
      onFitPress,
      onBackupPress,
      onTablePress,
      onThemePress,
      onTranslatePress,
      onPowerPress,
    ],
  );

  const renderItem = useCallback(
    (data: (typeof Option)[0]) => (
      <NativeTouch
        onPress={fun[data.id - 1]}
        padding="xsm"
        background="primary"
        rounded="xsm">
        <NativeIcon color="background" name={data.icon} size={8} />
      </NativeTouch>
    ),
    [Option.length],
  );

  return (
    <View
      style={[
        styles.optionContainer,
        {
          backgroundColor: theme.colors.background,
          padding: theme.spacing.sm,
        },
      ]}>
      <NativeList
        data={Option}
        // sepGap="md"
        direction="vertical"
        keyExtractor={data => data.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    ...StyleSheet.absoluteFillObject,
  },
  optionContainer: {
    position: 'absolute',
    height: '100%',
    right: 0,
  },
});

export default MapOption;
