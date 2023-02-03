import {NativeIcon, NativeList, NativeTouch} from '../../components';
import {StyleSheet, View} from 'react-native';

import {useTheme} from '../../hooks';

interface Props {
  onZoomInPress: () => void;
  onZoomOutPress: () => void;
  onTypePress: () => void;
  onThemePress: () => void;
}

const MapOption: React.FC<Props> = ({
  onZoomInPress,
  onZoomOutPress,
  onTypePress,
  onThemePress,
}) => {
  const {theme} = useTheme();
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
        data={[
          {
            id: '1',
            text: 'dashboard',
            onPress: onZoomOutPress,
          },
          {
            id: '2',
            text: 'layers',
            onPress: onTypePress,
          },
          {
            id: '3',
            text: 'add',
            onPress: onZoomInPress,
          },
          {
            id: '4',
            text: 'remove',
            onPress: onZoomOutPress,
          },

          {
            id: '8',
            text: 'table-chart',
            onPress: onThemePress,
          },
        ]}
        sepGap="md"
        direction="vertical"
        keyExtractor={data => data.id.toString()}
        renderItem={data => (
          <NativeTouch onPress={data.onPress} background={'primary'}>
            <NativeIcon color="background" name={data.text} size={10} />
          </NativeTouch>
        )}
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
