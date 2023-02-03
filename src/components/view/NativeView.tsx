import React from 'react';
import {SpaceValues} from '../../types/theme';
import {View} from 'react-native';
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
}

const NativeView: React.FC<ContainerViewProps> = ({
  children,
  padding,
  margin,
  direction,
  justify,
  align,
  flex = true,
}) => {
  const {theme} = useTheme();
  const containerStyle = {
    ...(flex && {flex: 1}),
    backgroundColor: theme.colors.background,
    padding: padding ? theme.spacing[padding] : theme.spacing.lg,
    margin: margin ? theme.spacing[margin] : 0,
    ...(direction && {flexDirection: direction}),
    ...(justify && {justifyContent: justify}),
    ...(align && {alignItems: align}),
  };

  return <View style={containerStyle}>{children}</View>;
};

export default NativeView;
