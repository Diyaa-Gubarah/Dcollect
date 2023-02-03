import {NativeStateBar, NativeText, NativeView} from './src/components';
import {StyleSheet, View} from 'react-native';

import {HomeScreen} from './src/screens/home';
import {LightTheme} from './src/constants/themes';
import Map from './src/screens/map/CustomMap';
import React from 'react';
import {ThemeProvider} from './src/hooks/useTheme';

function App() {
  return (
    <ThemeProvider initial={LightTheme}>
      <NativeStateBar />
        <Map />
        
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  optionContainer:{
    position:"absolute",
    height:"100%",
  }
})

export default App;
