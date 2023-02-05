import * as RNFS from 'react-native-fs';

import { Alert, PermissionsAndroid } from 'react-native'

import { GeoJson } from '../types/geojon';

const exportGeoJSON = async (geojson: GeoJson) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
                const f = await RNFS.CachesDirectoryPath
                console.log(f)
                const path = RNFS.DocumentDirectoryPath + `${new Date().toDateString().replace(' ', '')}.geojson`;
                await RNFS.writeFile(path, JSON.stringify(geojson), 'utf8');
                console.log('GeoJSON exported successfully to: ', path);
            } catch (error) {
                console.error('Error exporting GeoJSON: ', error);
            } return true;
        } else {
            console.log('write denied');
            return false;
        }
    } catch (err: any) {
        Alert.alert(err);
        return false;
    }



};

export default exportGeoJSON
