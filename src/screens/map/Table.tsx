import {
    ActivityIndicator,
    ScrollView,
    StyleProp,
    StyleSheet,
    TextStyle,
    View
} from 'react-native';
import React, { PropsWithChildren, useMemo } from 'react';
import {
    Row,
    Table,
    TableProps
} from 'react-native-table-component';

import { collection } from '../../zustand/store/polygon/selectors';
import { useTheme } from '../../hooks';

type ITable = TableProps & PropsWithChildren;

const GridTable: React.FC<ITable> = ({}) => {
  const GEOJSON = collection();
  const {theme} = useTheme();

  const tableHead = useMemo(
    () => Object.keys(GEOJSON.features[0].properties),
    [],
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
      borderWidth: theme.spacing.xsm / 2,
      borderColor: theme.colors.textSecondary,
    }),
    [],
  );

  const header = useMemo(
    () => ({backgroundColor: `${theme.colors.primary}80`}),
    [],
  );

  const headerText = useMemo(
    () => ({
      textAlign: 'center',
      color: theme.colors.textPrimary,
      margin: theme.spacing.sm,
      fontSize: theme.fontSizes.xsm,
      width: theme.spacing.lg * 5,
    }),
    [],
  );
  const text = useMemo(
    () => ({
      textAlign: 'center',
      color: theme.colors.primary,
      margin: theme.spacing.sm,
      fontSize: theme.fontSizes.xsm,
      width: theme.spacing.lg * 5,
    }),
    [],
  );

  if (tableHead.length === 0) {
    return <ActivityIndicator />;
  }

  return (
    <View style={container}>
      <ScrollView
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}>
        <View style={{flex: 1}}>
          {tableHead.length > 0 && (
            <Table borderStyle={tableBorder}>
              <Row
                data={tableHead}
                style={header}
                textStyle={headerText as StyleProp<TextStyle>}
              />
            </Table>
          )}
          <ScrollView style={styles.dataWrapper}>
            {GEOJSON.features.length > 0 && (
              <Table borderStyle={tableBorder}>
                {GEOJSON.features.map(row => (
                  <Row
                    key={row.properties.id}
                    data={Object.values(row.properties)}
                    style={{}}
                    textStyle={text as StyleProp<TextStyle>}
                  />
                ))}
              </Table>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dataWrapper: {marginTop: -3},
});

export default GridTable;
