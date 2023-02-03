import {Feature, GeoJson} from '../../types/geojon';
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
import {StyleSheet, View} from 'react-native';
import {useTheme, useTranslate} from '../../hooks';

import {DEFAULT_LIGHT_THEME_ID} from '../../constants/themes';
import MapOption from './MapOption';
import Picker from './Picker';
import {Return} from '../../utils/getBounds';
import calculateMinimumZoomLevel from '../../utils/calculateMinimumZoomLevel';
import {collection} from '../../zuztand/store/polygon/selectors';
import {getData} from '../../utils/utils';
import i18n from '../../i18n/i18n';
import mapStyle from '../../config/mapStyle';
import mapStyleDark from '../../config/mapStyleDark';

const setInitialLanguage = async () => {
  const savedLanguage = await getData('language');
  i18n.changeLanguage(savedLanguage || 'en');
};

const Map: React.FC<PropsWithChildren> = () => {
  const {theme, toggleTheme} = useTheme();
  const t = useTranslate();
  const mapRef = useRef<MapView>(null);
  const modalRef = useRef<ModalRef>(null);

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
   * @param data - The loaded JSON data.
   * @param boundary - The boundary of the loaded data.
   *
   * @returns void
   */
  const onJsonDataSuccess = useCallback(
    (data: GeoJson, boundary: Return) => {
      // Update the state with the loaded JSON data

      // Update the state with the boundary of the loaded data
      setBoundary(boundary);

      // Close the modal if it is open
      modalRef.current?.close();
    },
    [modalRef, boundary],
  );

  const onRequestClose = useCallback(() => {
    console.log('main onRequestClose');
  }, [modalRef]);

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
              strokeColor={`${theme.colors.primary}`}
              fillColor={`${theme.colors.primary}0D`}
              strokeWidth={theme.spacing.sm * 0.25}
              onPress={(data: any) => {
                console.log(JSON.stringify(data));
              }}
            />
          </MapView>

          <MapOption
            onZoomInPress={onZoomInPress}
            onZoomOutPress={onZoomOutPress}
            onTypePress={onTypePress}
            onThemePress={onThemePress}
          />
        </>
      )}
      <NativeModal ref={modalRef} onClose={onRequestClose}>
        <Picker onJsonDataSuccess={onJsonDataSuccess} />
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
