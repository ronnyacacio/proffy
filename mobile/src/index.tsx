import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import Landing from './screens/Landing';

const App: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded)
    return <AppLoading />
  else
    return (
      <>
        <Landing />
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      </>
    );
}

export default App;
