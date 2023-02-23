import {ImageBackground, StatusBar, StyleSheet} from 'react-native';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

const BackgroundImage = ({children}: Props) => {
  return (
    <>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assests/images/bg_1.png')}
        resizeMode="cover">
        {children}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    justifyContent:"center",
  },
});

export default BackgroundImage;
