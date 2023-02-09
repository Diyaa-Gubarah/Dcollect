import React, {useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import {SpaceValues} from '../../types/theme';
import {useTheme} from '../../hooks/index';

// interface ContainerViewProps extends ViewProps {
interface ContainerViewProps {
  children: React.ReactNode;
  padding?: SpaceValues;
  margin?: SpaceValues;
  direction?: 'row' | 'column';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-around'
    | 'space-between';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  flex?: boolean;
  style?: ViewStyle;
}

const NativeView: React.FC<ContainerViewProps> = ({
  children,
  padding,
  margin,
  direction,
  justify,
  align,
  flex = true,
  style = {},
}) => {
  const {theme} = useTheme();
  const containerStyle = useMemo(
    () => ({
      ...(flex && {flex: 1}),
      backgroundColor: theme.colors.background,
      padding: padding ? theme.spacing[padding] : theme.spacing.lg,
      margin: margin ? theme.spacing[margin] : 0,
      ...(direction && {flexDirection: direction}),
      ...(justify && {justifyContent: justify}),
      ...(align && {alignItems: align}),
    }),
    [padding, margin, direction, justify, align],
  );

  return <View style={[containerStyle, style]}>{children}</View>;
};

export default NativeView;
