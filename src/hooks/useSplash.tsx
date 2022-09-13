import { createContext, PropsWithChildren, useContext, useState } from 'react';
import Splash from '../components/Splash';

export type SplashContext = {
  show: () => void;
  hide: () => void;
};

const context = createContext<SplashContext>({
  show: () => {},
  hide: () => {},
});

export const SplashProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(true);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <context.Provider value={{ show, hide }}>
      {children}
      <Splash visible={visible} />
    </context.Provider>
  );
};

const useSplash = () => {
  return useContext(context);
};

export default useSplash;
