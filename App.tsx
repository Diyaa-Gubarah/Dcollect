import { LightTheme } from './src/constants/themes';
import Map from './src/screens/map/CustomMap';
import { NativeStateBar } from './src/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from './src/hooks/useTheme';

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
