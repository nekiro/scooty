import ReactModal, {
  Direction,
  ModalProps as ReactModalProps,
} from 'react-native-modal';
import { StyleProp, View, ViewStyle } from 'react-native';

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
        backgroundColor: '#191A1A',
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
      in: 'pulse',
      inTiming: 600,
      out: 'fadeOut',
      outTiming: 400,
    },
    backdropOpacity: 0.9,
    style: {
      gradient: {
        flex: 0,
        borderRadius: 11,
        backgroundColor: '#191A1A',
        // borderColor: colors.yellow,
        // borderWidth: 0.5,
        padding: 15,
        shadowColor: '#eef511',
        shadowRadius: 100,
        shadowOpacity: 0.15,
      },
    },
  },
};

type ModalProps = {
  preset: ModalPreset;
  onHide?: () => void;
};

export default function Modal({
  preset,
  onHide,
  children,
  ...props
}: ModalProps & Partial<ReactModalProps>) {
  const info = presetInfo[preset];
  if (!info) return null;

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
      <View style={info.style.gradient}>
        {info.useModalLine && (
          <View pointerEvents="none" style={info.style.modalLine} />
        )}
        {children}
      </View>
    </ReactModal>
  );
}
