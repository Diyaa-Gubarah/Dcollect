import { Feature, GeoJson } from '../../../types/geojon';

import { useGeoJsonStore } from './index'

const updateFeatureCollection = () => useGeoJsonStore(state => state.updateFeatureCollection);
const updateFeatureProperties = () => useGeoJsonStore(state => state.updateFeatureProperties);
const setFeatureCollection = (collection: GeoJson) => useGeoJsonStore(state => state.setFeatureCollection(collection));
const setFeature = (feature: Feature | unknown) => useGeoJsonStore(state => state.setFeature(feature));

export { updateFeatureCollection, updateFeatureProperties, setFeatureCollection, setFeature };
