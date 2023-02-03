import { Dimensions } from 'react-native';
import { Return } from './getBounds';

const calculateMinimumZoomLevel = (boundary: Return): number => {
    const minLongitude = boundary[0].longitude;
    const maxLongitude = boundary[1].longitude;
    const minLatitude = boundary[0].latitude;
    const maxLatitude = boundary[1].latitude;

    // Calculate the width and height of the boundary in degrees
    const boundaryWidth = maxLongitude - minLongitude;
    const boundaryHeight = maxLatitude - minLatitude;

    // Get the aspect ratio of the screen
    const screenAspectRatio = Dimensions.get('window').width / Dimensions.get('window').height;

    // Calculate the zoom level based on the aspect ratio and the boundary size
    const zoomLevel = Math.log2(360 / Math.max(boundaryWidth, boundaryHeight / screenAspectRatio));

    return zoomLevel + 1.5;
};


export default calculateMinimumZoomLevel