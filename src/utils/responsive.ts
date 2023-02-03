import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

/* scale function calculates a font size or 
   dimension based on the width of the device's screen
*/
const scale = (size: number) => (width / 320) * size;

/* verticalScale function calculates a font size or dimension
   based on the height of the device's screen. 
*/

const verticalScale = (size: number) => (height / 480) * size;


/* 
 fontScale function calculates a font size based on the device's font scale. 
*/
const fontScale = (size: number) => PixelRatio.getFontScale() * size;

export { scale, verticalScale, fontScale };



