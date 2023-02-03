import {ImageBackground, ImageBackgroundProps, View} from 'react-native';
import React, {ReactNode} from 'react';

import {IColorTheme} from '../../types/theme';

interface NativeBackgroundImageProps extends ImageBackgroundProps {
  children: ReactNode;
  overlayColor?: string;
  overlayOpacity?: number;
}

const NativeBackgroundImage = (props: NativeBackgroundImageProps) => {
  const {children, overlayColor, overlayOpacity = 0.5, ...otherProps} = props;

  return (
    <ImageBackground {...otherProps}>
      <View
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />
      {children}
    </ImageBackground>
  );
};

export default NativeBackgroundImage;
