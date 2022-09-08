import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../App';
import { icons } from '../../assets';
import MenuIconOption from '../../components/MenuIconOption';
import WalletWidget from '../../components/WalletWidget';

const MenuModal = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onNotificationPress = () => console.log('notification press');
  const onProfilePress = () => console.log('profile press');
  const onRidingHistoryPress = () => console.log('riding history press');
  const onSavedCardsPress = () => console.log('saved card press');
  const onLogoutPress = () => {
    // TODO hide modal
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <MenuIconOption iconSource={icons.bell} onPress={onNotificationPress}>
        Notifications
      </MenuIconOption>
      <MenuIconOption iconSource={icons.person} onPress={onProfilePress}>
        Profile
      </MenuIconOption>
      <MenuIconOption iconSource={icons.history} onPress={onRidingHistoryPress}>
        Riding History
      </MenuIconOption>
      <MenuIconOption iconSource={icons.creditCard} onPress={onSavedCardsPress}>
        Saved Cards
      </MenuIconOption>
      <MenuIconOption iconSource={icons.exitDoor} onPress={onLogoutPress}>
        Log Out
      </MenuIconOption>
      <WalletWidget style={styles.wallet} name="John Doe" money="200.00€" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  wallet: {
    marginTop: 20,
  },
});

export default MenuModal;
