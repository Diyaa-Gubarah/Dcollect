import { useGeoJsonStore } from './index'

const updateFeatureCollection = () => useGeoJsonStore(state => state.updateFeatureCollection);
const updateFeatureProperties = () => useGeoJsonStore(state => state.updateFeatureProperties);
const setFeatureCollection = () => useGeoJsonStore(state => state.setFeatureCollection);

export { updateFeatureCollection, updateFeatureProperties, setFeatureCollection };
