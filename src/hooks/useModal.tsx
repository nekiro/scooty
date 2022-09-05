import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import Modal from '../components/Modal';

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
        <Modal preset="bottom" isVisible={visible} onHide={hide}>
          {content}
        </Modal>
      )}
      {children}
    </context.Provider>
  );
};

export const useModal = (): ModalContext => {
  return useContext(context);
};
