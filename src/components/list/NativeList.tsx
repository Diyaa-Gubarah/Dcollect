import {FlatList, View, ViewStyle} from 'react-native';
import React, {useCallback, useMemo} from 'react';

import {SpaceValues} from '../../types/theme';
import {useTheme} from '../../hooks';

interface Props<T> {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
  direction?: 'horizontal' | 'vertical';
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  sepGap?: SpaceValues;
}

type GapStyle = Partial<
  Pick<ViewStyle, 'backgroundColor' | 'width' | 'height'>
>;
const ItemSeparator = ({...reset}: GapStyle) => <View style={reset} />;

const NativeList = <T extends {}>({
  data,
  renderItem,
  keyExtractor,
  direction = 'vertical',
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 21,
  sepGap = 'sm',
  ...rest
}: Props<T>) => {
  const {theme} = useTheme();
  const memoizedGap = useMemo(
    () => ({
      backgroundColor: 'transparent',
      ...(direction === 'horizontal' && {width: theme.spacing[sepGap]}),
      ...(direction === 'vertical' && {height: theme.spacing[sepGap]}),
    }),
    [sepGap],
  );
  const memoizedData = useMemo(() => data, [data.length]);
  const memoizedRenderItem = useCallback(renderItem, [renderItem]);
  const memoizedKeyExtractor = useCallback(keyExtractor, [keyExtractor]);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={memoizedData}
      renderItem={({item}) => memoizedRenderItem(item)}
      keyExtractor={memoizedKeyExtractor}
      ItemSeparatorComponent={() => <ItemSeparator {...memoizedGap} />}
      horizontal={direction === 'horizontal'}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={windowSize}
      style={{backgroundColor: theme.colors.background}}
      {...rest}
    />
  );
};

export default NativeList;
