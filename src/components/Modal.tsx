import ReactModal, {
  Direction,
  ModalProps as ReactModalProps,
} from 'react-native-modal';
import { StyleProp, View, ViewStyle } from 'react-native';
import BackgroundGradient from './BackgroundGradient';
import colors from '../lib/colorScheme';

type PresetInfo = {
  useModalLine?: boolean;
  animation: {
    in: string;
    inTiming: number;
    out: string;
    outTiming: number;
  };
  swipeDirection?: Direction;
  backdropOpacity?: number;
  style: {
    gradient?: StyleProp<ViewStyle>;
    modal?: StyleProp<ViewStyle>;
    modalLine?: StyleProp<ViewStyle>;
  };
};

const presetInfo: { bottom: PresetInfo; center: PresetInfo } = {
  bottom: {
    useModalLine: true,
    animation: {
      in: 'slideInUp',
      inTiming: 600,
      out: 'slideOutDown',
      outTiming: 600,
    },
    swipeDirection: 'down',
    backdropOpacity: 0,
    style: {
      gradient: {
        flex: 0,
        paddingTop: 10,
        paddingBottom: 40,
        paddingHorizontal: 15,
        borderRadius: 20,
      },
      modal: { margin: 0, justifyContent: 'flex-end' },
    },
  },
  center: {
    animation: {
      in: 'slideInUp',
      inTiming: 600,
      out: 'slideOutDown',
      outTiming: 600,
    },
    backdropOpacity: 0.8,
    style: {
      gradient: {
        flex: 0,
        borderColor: colors.yellow,
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        shadowColor: colors.yellow,
        shadowRadius: 5,
        shadowOpacity: 1,
      },
    },
  },
};

type ModalProps = {
  preset: 'bottom' | 'center';
  onHide?: () => void;
};

const Modal = ({
  preset,
  onHide,
  children,
  ...props
}: ModalProps & Partial<ReactModalProps>) => {
  const info = presetInfo[preset];

  return (
    <ReactModal
      onBackdropPress={onHide}
      onBackButtonPress={onHide}
      onSwipeComplete={onHide}
      animationIn={info.animation.in as any}
      animationInTiming={info.animation.inTiming}
      animationOut={info.animation.out as any}
      animationOutTiming={info.animation.outTiming}
      swipeDirection={info.swipeDirection}
      style={info.style.modal}
      backdropOpacity={info.backdropOpacity}
      {...props}
    >
      <BackgroundGradient style={info.style.gradient}>
        {info.useModalLine && (
          <View pointerEvents="none" style={info.style.modalLine} />
        )}
        {children}
      </BackgroundGradient>
    </ReactModal>
  );
};

export default Modal;
