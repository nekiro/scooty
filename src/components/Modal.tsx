import ReactModal, {
  Direction,
  ModalProps as ReactModalProps,
} from 'react-native-modal';
import { StyleProp, View, ViewStyle } from 'react-native';
import BackgroundGradient from './BackgroundGradient';
import colors from '../lib/colorScheme';

export type ModalPreset = 'bottom' | 'center';

type PresetInfo = {
  useModalLine?: boolean;
  animation: {
    in: string;
    inTiming: number;
    out: string;
    outTiming: number;
  };
  backdropEnabled?: boolean;
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
      inTiming: 400,
      out: 'slideOutDown',
      outTiming: 400,
    },
    swipeDirection: 'down',
    backdropOpacity: 0,
    style: {
      gradient: {
        flex: 0,
        paddingTop: 5,
        paddingBottom: 50,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      modal: {
        margin: 0,
        justifyContent: 'flex-end',
      },
      modalLine: {
        backgroundColor: '#F3F3F3',
        width: 50,
        height: 3,
        borderRadius: 49,
        alignSelf: 'center',
        marginBottom: 20,
      },
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
        borderRadius: 11,
        // borderColor: colors.yellow,
        // borderWidth: 0.5,
        padding: 15,
        shadowColor: colors.yellow,
        shadowRadius: 5,
        shadowOpacity: 1,
      },
    },
  },
};

type ModalProps = {
  preset: ModalPreset;
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
      hasBackdrop={info.backdropEnabled ?? true}
      animationIn={info.animation.in as any}
      animationInTiming={info.animation.inTiming}
      animationOut={info.animation.out as any}
      animationOutTiming={info.animation.outTiming}
      swipeDirection={info.swipeDirection}
      style={info.style.modal}
      backdropTransitionOutTiming={0}
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
