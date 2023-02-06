import * as RNFS from 'react-native-fs';

import { Alert, PermissionsAndroid } from 'react-native'

import { GeoJson } from '../types/geojon';

const folderPath = RNFS.DocumentDirectoryPath + "/appdata";

const makeDirectory = async (folderPath: string) => {
    await RNFS.mkdir(folderPath); //create a new folder on folderPath

};


const exportGeoJSON = (geojson: GeoJson) => {
    var path = RNFS.DocumentDirectoryPath + '/test.txt';

    // write the file
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        .then((success) => {
            console.log('FILE WRITTEN! ', JSON.stringify(success));
        })
        .catch((err) => {
            console.log(err.message);
        });



};


// const exportGeoJSON = async (geojson: GeoJson) => {
//     makeDirectory(folderPath)

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
