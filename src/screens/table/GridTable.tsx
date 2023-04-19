import {
  ActivityIndicator,
  ScrollView,
  StyleProp,
  TextStyle,
  View,
} from 'react-native';
import {
  NativeList,
  NativeText,
  NativeTouch,
  NativeView,
} from '../../components';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Row, TableWrapper} from 'react-native-table-component';
import {useTheme, useTranslate} from '../../hooks';

import {Feature} from '../../types/geojon';
import {LatLng} from 'react-native-maps';
import {collection} from '../../zustand/store/polygon/selectors';

type ITable = {
  onRowClicked: (coordinates: LatLng[]) => void;
} & PropsWithChildren;

const ListFooterComponent = ({
  onPress,
  loading,
}: {
  onPress: () => void;
  loading: boolean;
}) => {
  const {theme} = useTheme();
  const t = useTranslate();
  return (
    <NativeTouch onPress={onPress}>
      <NativeView
        padding="xsm"
        align="center"
        style={{backgroundColor: theme.colors.primary}}>
        {loading ? (
          <ActivityIndicator color={theme.colors.textPrimary} size={'small'} />
        ) : (
          <NativeText color="textPrimary" size="xsm">
            {t('LOAD_MORE')}
          </NativeText>
        )}
      </NativeView>
    </NativeTouch>
  );
};

const GridTable: React.FC<ITable> = ({onRowClicked}) => {
  const {theme} = useTheme();

  const [rowsToDisplay, setRowsToDisplay] = useState(20);
  const [loading, setLoading] = useState(false);
  let timerRef = useRef<number>(0);

  const GEOJSON = collection();

  const displayedRows = useMemo(
    () => GEOJSON.features.slice(0, rowsToDisplay),
    [GEOJSON.features.length, rowsToDisplay],
  );

  const tableHead = useMemo(
    () => Object.keys(GEOJSON.features[0].properties),
    [GEOJSON.features.length],
  );

  const container = useMemo(
    () => ({
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      width: '50%',
      flex: 1,
    }),
    [],
  );

  const tableBorder = useMemo(
    () => ({
      borderWidth: theme.spacing.xsm / 3,
      borderColor: theme.colors.primary,
    }),
    [],
  );

  const header = useMemo(
    () => ({backgroundColor: `${theme.colors.primary}80`}),
    [],
  );

  const text = useMemo(
    () => ({
      textAlign: 'center',
      color: theme.colors.textPrimary,
      margin: theme.spacing.sm,
      fontSize: theme.fontSizes.xsm,
      width: theme.spacing.lg * 4,
    }),
    [],
  );

  const handleRowPress = useCallback(
    (rowData: any[]) => {
      const coordinates = rowData[1].coordinates[0];

      const latLngArray: LatLng[] = coordinates.map((cord: LatLng[]) => ({
        latitude: cord[1],
        longitude: cord[0],
      }));

      onRowClicked(latLngArray);
    },
    [onRowClicked],
  );

  const ClickableRow = useCallback(
    (item: Feature) => {
      return (
        <NativeTouch onPress={() => handleRowPress(Object.values(item))}>
          <Row
            key={item.properties.id}
            data={Object.values(item.properties)}
            textStyle={text as StyleProp<TextStyle>}
            flexArr={[1, 1, 1, 1]}
          />
        </NativeTouch>
      );
    },
    [handleRowPress, displayedRows.length, text],
  );

  const handleEndReached = useCallback(() => {
    setLoading(true);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setRowsToDisplay(prevRowsToDisplay => prevRowsToDisplay + 10);
      setLoading(false);
    }, 1500);
  }, [rowsToDisplay, loading, timerRef.current]);

  // const listFooterComponent = useCallback(() => {
  //   return (
  //     <ActivityIndicator
  //       size="large"
  //       color={theme.colors.primary}
  //       style={{marginTop: theme.spacing.lg}}
  //     />
  //   );
  // }, []);

  const keyExtractor = useCallback(
    (item: Feature, index: number) => `${item.properties.id}${index}`,
    [],
  );

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <View style={container}>
      <ScrollView horizontal>
        <TableWrapper style={tableBorder}>
          <Row
            data={tableHead}
            style={header}
            textStyle={text as StyleProp<TextStyle>}
            flexArr={[1, 1, 1, 1]}
          />
          <NativeList
            data={displayedRows}
            renderItem={ClickableRow}
            keyExtractor={keyExtractor}
            ListFooterComponent={() =>
              GEOJSON.features.length > 20 && (
                <ListFooterComponent
                  onPress={handleEndReached}
                  loading={loading}
                />
              )
            }
          />
        </TableWrapper>
      </ScrollView>
    </View>
  );
};

export default GridTable;
