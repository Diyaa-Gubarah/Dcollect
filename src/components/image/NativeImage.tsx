import {Image, ImageProps} from 'react-native';

import React from 'react';

interface NativeImageProps extends ImageProps {
  source: {uri: string};
}

const NativeImage = (props: NativeImageProps) => {
  const {source, style, ...otherProps} = props;
  return <Image source={source} style={style} {...otherProps} />;
};

export default NativeImage;
