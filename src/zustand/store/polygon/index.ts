import { Feature, GeoJson } from '../../../types/geojon';

import { create } from 'zustand';
import exportGeoJSON from '../../../utils/exportGeoJSON';

interface State {
    featureCollection: GeoJson;
    feature: Feature,
    updateFeatureCollection: (features: any) => void;
    updateFeatureProperties: (index: number, properties: Record<string, any>) => void;
    setFeatureCollection: (featureCollection: GeoJson) => void;
    setFeature: (feature: Feature | unknown) => void;
    updateProperties: (key: string, value: unknown) => void;
}


const useGeoJsonStore = create<State>((set, get) => ({
    featureCollection: {
        type: "FeatureCollection",
        features: [] as Feature[]
    },
    feature: {} as Feature,
    updateFeatureCollection: (features: any) => set(state => ({ ...state, featureCollection: { ...state.featureCollection, features } })),
    updateFeatureProperties: (id: number, properties: Record<string, any>) => set(state => {
        const updatedFeatures = state.featureCollection.features.map((feature, i) => {
            if (feature.properties.id === id) {
                return { ...feature, properties: { ...feature.properties, ...properties } };
            }
            return feature;
        });

        console.log('store: ', JSON.stringify({ ...state.featureCollection, features: updatedFeatures }))

        exportGeoJSON({ ...state.featureCollection, features: updatedFeatures });

        return { ...state, featureCollection: { ...state.featureCollection, features: updatedFeatures } };
    }),
    setFeatureCollection: (featureCollection: GeoJson) => set(state => ({ ...state, featureCollection })),
    setFeature: (feature: Feature | unknown) => set(state => ({ ...state, feature: feature as Feature })),
    updateProperties: (key: string, value: unknown) => set((state) => ({ ...state, feature: { ...state.feature, properties: { ...state.feature.properties, [key]: value }, } })),
}));


export { useGeoJsonStore };

