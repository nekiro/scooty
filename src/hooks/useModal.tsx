import { useState } from 'react';
import { ModalPreset } from '../components/Modal';

export type ModalContext = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  visible: boolean;
  setContent: (content: JSX.Element) => void;
  content: JSX.Element | undefined;
  hasContent: () => boolean;
  setContentAndShow: (content: JSX.Element) => void;
  preset: ModalPreset;
  setPreset: (preset: ModalPreset) => void;
};

export const useModal = (preset: ModalPreset = 'bottom'): ModalContext => {
  const [visible, setVisible] = useState(false);
  const [content, setContentState] = useState<JSX.Element | undefined>();
  const [presetState, setPresetState] = useState<ModalPreset>(preset);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible(!visible);
  const hasContent = () => !!content;
  const setContent = (content: JSX.Element) => {
    setContentState(content);
  };
  const setContentAndShow = (content: JSX.Element) => {
    setContent(content);
    show();
  };
  const setPreset = (preset: ModalPreset) => setPresetState(preset);

  return {
    show,
    hide,
    toggle,
    visible,
    content,
    setContent,
    hasContent,
    setContentAndShow,
    preset: presetState,
    setPreset,
  };
};
