import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import Modal, { ModalPreset } from '../components/Modal';

export type ModalContext = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  isVisible: () => boolean;
  setContent: (content: JSX.Element) => void;
  setPreset: (preset: ModalPreset) => void;
  hasContent: () => boolean;
  setContentAndShow: (content: JSX.Element) => void;
};

const context = createContext<ModalContext>({
  show: () => {},
  hide: () => {},
  toggle: () => {},
  isVisible: () => false,
  setContent: () => {},
  setPreset: () => {},
  hasContent: () => false,
  setContentAndShow: () => {},
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);
  const [content, setContentState] = useState<JSX.Element | undefined>();
  const [preset, setCurrentPreset] = useState<ModalPreset>('bottom');

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible(!visible);
  const isVisible = () => visible;
  const hasContent = () => !!content;
  const setContent = (content: JSX.Element) => {
    setContentState(content);
  };
  const setPreset = (preset: ModalPreset) => setCurrentPreset(preset);
  const setContentAndShow = (content: JSX.Element) => {
    setContent(content);
    show();
  };

  return (
    <context.Provider
      value={{
        show,
        hide,
        toggle,
        isVisible,
        setContent,
        setPreset,
        hasContent,
        setContentAndShow,
      }}
    >
      {content && (
        <Modal preset={preset} isVisible={visible} onHide={hide}>
          {content}
        </Modal>
      )}
      {children}
    </context.Provider>
  );
};

export const useModal = (): ModalContext => useContext(context);
