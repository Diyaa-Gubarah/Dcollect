import {BackHandler, StyleSheet, View} from 'react-native';
import MapView, {Camera, Geojson, Region} from 'react-native-maps';
import NativeModal, {ModalRef} from '../../components/modal/NativeModal';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {getData, saveData} from '../../utils/utils';
import {useTheme, useTranslate} from '../../hooks';

import {DEFAULT_LIGHT_THEME_ID} from '../../constants/themes';
import {Feature} from '../../types/geojon';
import Form from './Form';
import {LANGUAGE_KEY} from '../../constants/variable';
import MapOption from './MapOption';
import Picker from './Picker';
import {Return} from '../../utils/getBounds';
import calculateMinimumZoomLevel from '../../utils/calculateMinimumZoomLevel';
import {collection} from '../../zustand/store/polygon/selectors';
import exportGeoJSON from '../../utils/exportGeoJSON';
import i18n from '../../i18n/i18n';
import mapStyle from '../../config/mapStyle';
import mapStyleDark from '../../config/mapStyleDark';
import {useGeoJsonStore} from '../../zustand/store/polygon';

const setInitialLanguage = async () => {
  const savedLanguage = await getData(LANGUAGE_KEY);
  i18n.changeLanguage(savedLanguage || 'en');
};

const returnData = {
  feature: {},
};
const Map: React.FC<PropsWithChildren> = () => {
  const {theme, toggleTheme} = useTheme();
  const {setFeature} = useGeoJsonStore();
  const t = useTranslate();
  const mapRef = useRef<MapView>(null);
  const modalRef = useRef<ModalRef>(null);
  const formModalRef = useRef<ModalRef>(null);

  // const [json, setJson] = useState<unknown | null>(null);
  const [boundary, setBoundary] = useState<Return | null>(null);
  const [mapType, setMapType] = useState<'satellite' | 'standard'>('satellite');
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const minimumZoomLevel = useMemo(
    () => boundary && calculateMinimumZoomLevel(boundary),
    [boundary],
  );

  const GEOJSON = collection();

  /**
   * A callback function that is triggered when the zoom in button is pressed.
   *
   * @returns void
   */
  const onZoomInPress = useCallback(() => {
    // Get the current camera object from the map
    mapRef?.current?.getCamera().then((cam: Camera) => {
      // Check if the camera has a zoom property
      if (cam?.zoom) {
        // Increment the zoom level
        cam.zoom += 1;

        // Animate the camera to the new zoom level
        mapRef?.current?.animateCamera(cam);
      }
    });
  }, [mapRef]);

  /**
   * A callback function that is triggered when the zoom out button is pressed.
   *
   * @returns void
   */
  const onZoomOutPress = useCallback(() => {
    // Get the current camera object from the map
    mapRef?.current?.getCamera().then((cam: Camera) => {
      // Check if the camera has a zoom property
      if (cam?.zoom) {
        // Decrement the zoom level
        cam.zoom -= 1;

        // Animate the camera to the new zoom level
        mapRef?.current?.animateCamera(cam);
      }
    });
  }, [mapRef]);

  /**
   * A callback function that is triggered when the type button is pressed.
   *
   * @returns void
   */
  const onTypePress = useCallback(() => {
    setMapType(type => (type === 'satellite' ? 'standard' : 'satellite'));
  }, [mapType]);

  /**
   * A callback function that is triggered when the theme button is pressed.
   *
   * @returns void
   */
  const onThemePress = useCallback(() => {
    toggleTheme();
  }, [theme.id]);
  /**
   * A callback function that is triggered when the fit button is pressed.
   *
   * @returns void
   */
  const onFitPress = useCallback(() => {
    if (boundary) {
      mapRef?.current?.fitToCoordinates([boundary[0], boundary[1]], {
        animated: true,
        edgePadding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      });
    }
  }, [mapRef, boundary]);
  /**
   * A callback function that is triggered when the backup button is pressed.
   *
   * @returns void
   */

  const onBackupPress = useCallback(() => {
    exportGeoJSON(GEOJSON);
  }, [GEOJSON]);
  /**
   * A callback function that is triggered when the power button is pressed.
   *
   * @returns void
   */
  const onPowerPress = useCallback(() => {
    // exportGeoJSON(GEOJSON);
    BackHandler.exitApp();
  }, [GEOJSON]);

  /**
   * A callback function that is triggered when the table button is pressed.
   *
   * @returns void
   */
  const onTablePress = useCallback(() => {
    console.log('onTablePress clicked');
  }, []);
  /**
   * A callback function that is triggered when the option button is pressed.
   *
   * @returns void
   */
  const onOptionPress = useCallback(() => {
    console.log('onOptionPress clicked');
  }, []);

  /**
   * A callback function that is triggered when the translate button is pressed.
   *
   * @returns void
   */
  const onTranslatePress = useCallback(async () => {
    const savedLanguage = await getData(LANGUAGE_KEY);
    const current = savedLanguage === 'en' ? 'ar' : 'en';

    i18n.changeLanguage(current);
    await saveData(LANGUAGE_KEY, current);
  }, []);

  /**
   * A callback function that sets the boundaries of the map based on the `boundary` state.
   *
   * @returns void
   */
  const setMapBoundary = useCallback(() => {
    // Check if the `boundary` state has a value
    if (boundary) {
      // Set the region of the map to the center of the boundary
      setRegion({
        latitude: (boundary[0].latitude + boundary[1].latitude) / 2,
        longitude: (boundary[0].longitude + boundary[1].longitude) / 2,
        latitudeDelta: boundary[1].latitude - boundary[0].latitude,
        longitudeDelta: boundary[1].longitude - boundary[0].longitude,
      });

      // Set the map boundaries based on the `boundary` state
      mapRef?.current?.setMapBoundaries(boundary[0], boundary[1]);
    }
  }, [mapRef, boundary]);

  /**
   * A callback function that is triggered when JSON data is successfully loaded.
   *
   * @param boundary - The boundary of the loaded data.
   *
   * @returns void
   */
  const setBoundaryWhenSuccessLoading = useCallback(
    (boundary: Return) => {
      // Update the state with the loaded JSON data

      // Update the state with the boundary of the loaded data
      setBoundary(boundary);

      // Close the modal if it is open
      modalRef.current?.close();
    },
    [modalRef, boundary],
  );

  const onRequestClose = useCallback(() => {
    formModalRef.current?.close();
  }, [formModalRef]);

  const onMainRequestClose = useCallback(() => {
    console.log('main onRequestClose');
    BackHandler.exitApp();
  }, [modalRef]);

  const onFeaturePress = useCallback(
    (data: Feature | unknown) => {
      // console.log(`onFeaturePress: ${JSON.stringify(data)}`);
      formModalRef?.current?.open();
      setFeature(data);
    },
    [formModalRef],
  );

  const onFormCloseButtonPress = useCallback(() => {
    // console.log(`onFeaturePress: ${JSON.stringify(data)}`);
    formModalRef?.current?.close();
  }, [formModalRef]);

  useEffect(() => {
    setInitialLanguage();

    if (modalRef.current) {
      modalRef.current.open();
    }

    return () => modalRef?.current?.close?.();
  }, []);

  return (
    <View style={styles.full}>
      {GEOJSON.features.length > 0 && (
        <>
          <MapView
            minZoomLevel={minimumZoomLevel as number}
            ref={mapRef}
            region={region}
            onMapReady={setMapBoundary}
            mapType={mapType}
            rotateEnabled={false}
            zoomTapEnabled={false}
            customMapStyle={
              theme.id === DEFAULT_LIGHT_THEME_ID ? mapStyle : mapStyleDark
            }
            style={styles.full}>
            <Geojson
              tappable
              geojson={GEOJSON}
              strokeColor={`${theme.colors.primary}4D`}
              fillColor={`${theme.colors.primary}1A`}
              strokeWidth={theme.spacing.sm * 0.25}
              onPress={(data: typeof returnData | any) => {
                onFeaturePress(data.feature);
              }}
            />
          </MapView>

          <MapOption
            onZoomInPress={onZoomInPress}
            onZoomOutPress={onZoomOutPress}
            onTypePress={onTypePress}
            onThemePress={onThemePress}
            onFitPress={onFitPress}
            onBackupPress={onBackupPress}
            onPowerPress={onPowerPress}
            onTablePress={onTablePress}
            onOptionPress={onOptionPress}
            onTranslatePress={onTranslatePress}
          />
        </>
      )}
      <NativeModal ref={modalRef} onClose={onMainRequestClose}>
        <Picker setBoundaryWhenSuccessLoading={setBoundaryWhenSuccessLoading} />
      </NativeModal>

      <NativeModal ref={formModalRef} onClose={onRequestClose}>
        <Form onFormCloseButtonPress={onFormCloseButtonPress} />
      </NativeModal>
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

export default Map;
