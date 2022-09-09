// app.config.ts

// `@expo/config` is installed with the `expo` package
// ensuring the versioning is correct.
import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'scooty',
  slug: 'scooty',
  owner: 'nekiro',
  version: '1.0.0',
  orientation: 'portrait',
  backgroundColor: 'black',
  splash: {
    image: 'src/assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: 'black',
  },
  entryPoint: 'src/App.tsx',
  ios: {
    config: {
      googleMapsApiKey: 'AIzaSyDtJXmLhNgA7IQ78Pc69Sw-CV_Lyd_TPRI',
    },
    bundleIdentifier: 'com.nekiro.scooty',
  },
};

export default config;
