import {ColorValues, SpaceValues} from '../../types/theme';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {useCallback} from 'react';

import {useTheme} from '../../hooks';

interface Props extends Partial<ViewProps> {
  onPress: () => void;
  children: React.ReactNode;
  background?: ColorValues;
  padding?: SpaceValues;
  rounded?: SpaceValues;
}

const NativeTouch = ({
  onPress,
  children,
  background = 'background',
  padding,
  rounded,
  ...rest
}: Props) => {
  const {theme} = useTheme();
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  const touchableStyle = {
    backgroundColor: theme.colors[background],
    ...(padding &&{padding: theme.spacing[padding]}),
    ...(rounded&&{borderRadius: theme.spacing[rounded]}),
  };

  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={handlePress} style={[touchableStyle, rest]}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableNativeFeedback
        onPress={handlePress}
        style={[touchableStyle, rest]}>
        <View style={touchableStyle}>{children}</View>
      </TouchableNativeFeedback>
    );
  }
};

export default NativeTouch;
