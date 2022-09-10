import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { fonts } from '../assets';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      // load fonts
      await Font.loadAsync(fonts);
      setLoadingComplete(true);
    }

    void loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
