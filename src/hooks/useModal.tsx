import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import ReactModal from 'react-native-modal';
import { StyleSheet, View } from 'react-native';
import BackgroundGradient from '../components/BackgroundGradient';

export type ModalContext = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  isVisible: () => boolean;
  setContent: (content: JSX.Element) => void;
  hasContent: () => boolean;
};

const context = createContext<ModalContext>({
  show: () => {},
  hide: () => {},
  toggle: () => {},
  isVisible: () => false,
  setContent: () => {},
  hasContent: () => false,
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);
  const [content, setContentState] = useState<JSX.Element | undefined>();

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible(!visible);
  const isVisible = () => visible;
  const hasContent = () => !!content;
  const setContent = (content: JSX.Element) => {
    setContentState(content);
  };

  return (
    <context.Provider
      value={{ show, hide, toggle, isVisible, setContent, hasContent }}
    >
      {content && (
        <ReactModal
          isVisible={visible}
          onBackdropPress={hide}
          onBackButtonPress={hide}
          onSwipeComplete={hide}
          animationIn="slideInUp"
          animationInTiming={600}
          animationOut="slideOutDown"
          animationOutTiming={600}
          swipeDirection="down"
          style={styles.modal}
          backdropOpacity={0}
        >
          <BackgroundGradient style={styles.gradient}>
            <View pointerEvents="none" style={styles.modalLine} />
            {content}
          </BackgroundGradient>
        </ReactModal>
      )}
      {children}
    </context.Provider>
  );
};

const styles = StyleSheet.create({
  modal: { margin: 0, justifyContent: 'flex-end' },
  gradient: {
    flex: 0,
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  modalLine: {
    backgroundColor: '#F3F3F3',
    width: 50,
    height: 3,
    borderRadius: 49,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export const useModal = (): ModalContext => {
  return useContext(context);
};
