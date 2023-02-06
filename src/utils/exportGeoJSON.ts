import * as ScopedStorage from "react-native-scoped-storage";

import { GeoJson } from '../types/geojon';

const exportGeoJSON = async (geojson: GeoJson) => {
    try {
        let dir = await ScopedStorage.openDocumentTree(true);
        await ScopedStorage.writeFile(dir.uri, JSON.stringify(geojson), `${Date.now()}.geojson`, "utf8");
    } catch (e) {
        console.log(`Save e: ${JSON.stringify(e)}`)
    }

};

// const exportGeoJSON = async (geojson: GeoJson) => {

//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             try {
//                 const folderPath = RNFS.CachesDirectoryPath

//                 const paths = await RNFS.getAllExternalFilesDirs()


//                 const path = paths[0] + `/${new Date().toDateString().replace(' ', '')}.geojson`;
//                 await RNFS.writeFile(path, JSON.stringify(geojson), 'utf8');

//                 console.log('GeoJSON exported successfully to: ', path);
//             } catch (error) {
//                 console.error('Error exporting GeoJSON: ', error);
//             } return true;
//         } else {
//             console.log('write denied');
//             return false;
//         }
//     } catch (err: any) {
//         Alert.alert(err);
//         return false;
//     }



// };

export default exportGeoJSON
