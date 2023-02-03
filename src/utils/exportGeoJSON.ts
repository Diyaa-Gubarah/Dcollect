import * as RNFS from 'react-native-fs';

import { GeoJson } from '../types/geojon';

const exportGeoJSON = async (geojson: GeoJson) => {
    try {
        const path = RNFS.DocumentDirectoryPath + '/modified_geojson.geojson';
        await RNFS.writeFile(path, JSON.stringify(geojson), 'utf8');
        console.log('GeoJSON exported successfully to: ', path);
    } catch (error) {
        console.error('Error exporting GeoJSON: ', error);
    }
};

export default exportGeoJSON
