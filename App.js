import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import NotificationService from './src/Notification';

export default function App() {
  useEffect(() => {
    // Request notification permissions
    const requestPermissions = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permissions granted.');
        NotificationService.getFcmToken(); // Fetch the FCM token
      }
    };

    requestPermissions();

    // Foreground notification handler
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log('Message received in foreground:', remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: 'default',
        },
      });
    });

    return unsubscribeOnMessage;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text >React Native Push Notifications</Text>
    </View>
  );
}
