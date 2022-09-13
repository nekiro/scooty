import { Dispatch, useReducer } from 'react';
import { ModalPreset } from '../components/Modal';

export type ModalContext = [ModalState, Dispatch<ModalAction>];

export type ModalAction =
  | { type: 'SHOW' }
  | { type: 'HIDE' }
  | { type: 'SET_CONTENT'; content: JSX.Element | undefined; show?: boolean }
  | { type: 'SET_PRESET'; preset: ModalPreset };

export type ModalState = {
  visible: boolean;
  content: JSX.Element | undefined;
  preset: ModalPreset;
};

const reducer = (state: ModalState, action: ModalAction) => {
  switch (action.type) {
    case 'SHOW':
      return { ...state, visible: true };
    case 'HIDE':
      return { ...state, visible: false };
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.content,
        visible: action.show ?? false,
      };
    case 'SET_PRESET':
      return { ...state, preset: action.preset };
    default:
      return state;
  }
};

export const useModal = (preset: ModalPreset = 'bottom'): ModalContext => {
  const [state, dispatch] = useReducer(reducer, {
    visible: false,
    content: undefined,
    preset,
  });

  return [state, dispatch];
};
