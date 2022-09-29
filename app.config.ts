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
  backgroundColor: '#000000',
  ios: {
    config: {
      googleMapsApiKey: '',
    },
    bundleIdentifier: 'com.nekiro.scooty',
  },
};

export default config;
