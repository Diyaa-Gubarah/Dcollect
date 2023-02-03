import { GeoJson } from '../../../types/geojon';
import { create } from 'zustand';
import exportGeoJSON from '../../../utils/exportGeoJSON';

interface State {
    featureCollection: GeoJson;
    updateFeatureCollection: (features: any) => void;
    updateFeatureProperties: (index: number, properties: any) => void;
    setFeatureCollection: (featureCollection: GeoJson) => void;
}


const useGeoJsonStore = create<State>((set, get) => ({
    featureCollection: {
        type: "FeatureCollection",
        features: []
    },
    updateFeatureCollection: (features: any) => set(state => ({ ...state, featureCollection: { ...state.featureCollection, features } })),
    updateFeatureProperties: (index: number, properties: any) => set(state => {
        const updatedFeatures = state.featureCollection.features.map((feature, i) => {
            if (i === index) {
                return { ...feature, properties: { ...feature.properties, ...properties } };
            }
            return feature;
        });

        exportGeoJSON({ ...state.featureCollection, features: updatedFeatures });

        return { ...state, featureCollection: { ...state.featureCollection, features: updatedFeatures } };
    }),
    setFeatureCollection: (featureCollection: GeoJson) => set(state => ({ ...state, featureCollection })),

}));


export { useGeoJsonStore };

