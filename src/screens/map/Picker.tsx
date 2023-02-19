import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import {
  BackgroundImage,
  NativeIcon,
  NativeImage,
  NativeText,
  NativeTouch,
  NativeView,
} from '../../components';
import React, {useCallback, useState} from 'react';
import getBounds, {Return} from '../../utils/getBounds';
import {useTheme, useTranslate} from '../../hooks';

import DocumentPicker from 'react-native-document-picker';
import {GeoJson} from '../../types/geojon';
import RNFS from 'react-native-fs';
import {useGeoJsonStore} from '../../zustand/store/polygon';

interface PickerProps {
  setBoundaryWhenSuccessLoading: (boundary: Return) => void;
}
const Picker: React.FC<PickerProps> = ({setBoundaryWhenSuccessLoading}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {setFeatureCollection} = useGeoJsonStore();

  const handleUpdateFeatureCollection = useCallback((data: GeoJson) => {
    // update the featureCollection object here
    setFeatureCollection(data);
  }, []);

  const pickGeoJSON = useCallback(async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (result[0].name && result[0].name.endsWith('.geojson')) {
        const content = await RNFS.readFile(result[0].uri, 'utf8');
        const data = JSON.parse(content);

        // get field area bounder's
        const boundary = getBounds(data);
        // send the calculated boundary back to map component
        setBoundaryWhenSuccessLoading?.(boundary);

        // save loaded geojson to store
        handleUpdateFeatureCollection(data);
      } else {
        console.log('Picker No GeoJSON file was picked');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return <PickerButton onPress={pickGeoJSON} loading={loading} />;
};

interface PickerButtonProps {
  onPress: () => void;
  loading: boolean;
}

const PickerButton: React.FC<PickerButtonProps> = ({onPress, loading}) => {
  const t = useTranslate();
  const {theme} = useTheme();

  return (
      <BackgroundImage>
        <NativeView
          flex={false}
          style={{
            ...styles.container,
            margin: theme.spacing.lg,
            padding: theme.spacing.lg,
            borderRadius: theme.spacing.sm,
          }}>
          <View
            style={{
              ...styles.uploadContainer,
              borderRadius: theme.spacing.sm,
              borderWidth: theme.spacing.xsm * 0.25,
              borderStyle: 'dashed',
              borderColor: theme.colors.primary,
              padding: theme.spacing.md,
            }}>
            <NativeImage
              source={require('../../assests/images/upload.png')}
              resizeMode="contain"
              style={{
                width: '60%',
                height: '60%',
              }}
            />
            <View style={{marginVertical: theme.spacing.md}}>
              {loading ? (
                <ActivityIndicator
                  color={theme.colors.primary}
                  size="large"
                />
              ) : (
                <NativeTouch
                  padding="xsm"
                  rounded="xsm"
                  onPress={onPress}
                  background="primary"
                  style={{flexDirection: 'row'}}>
                  <View style={styles.innerButton}>
                    <NativeText color="background" size="xsm">
                      {t('IMPORT')}
                    </NativeText>
                  </View>
                </NativeTouch>
              )}
            </View>
            <NativeText color="primary" size="xsm">
              Only file's with extension .geojson are allowed.
            </NativeText>
          </View>
        </NativeView>
      </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
});
export default Picker;
