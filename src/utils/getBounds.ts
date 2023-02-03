import { GeoJson } from "../types/geojon";
import { LatLng } from "react-native-maps";

export type Return = [LatLng, LatLng]

function getBounds(geojson: GeoJson): Return {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    geojson.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates[0];
        coordinates.forEach(point => {
            if (point[0] < minX) {
                minX = point[0];
            }
            if (point[0] > maxX) {
                maxX = point[0];
            }
            if (point[1] < minY) {
                minY = point[1];
            }
            if (point[1] > maxY) {
                maxY = point[1];
            }
        });
    });

    return [{ longitude: minX, latitude: minY, }, { longitude: maxX, latitude: maxY, }];
}

export default getBounds