import { GeoJson } from '../../../types/geojon';
import { shallow } from 'zustand/shallow'
import { useGeoJsonStore } from './index'

// const collection = () => useGeoJsonStore(state => state.featureCollection, shallow);
const collection = () => useGeoJsonStore(state => state.featureCollection, (a: GeoJson, b: GeoJson) => {
    return b.features.length === a.features.length
});

export { collection };
