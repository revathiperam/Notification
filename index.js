import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import NotificationService from './src/Notification';
import { name as appName } from './app.json';

// Background notification handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background:', remoteMessage);
    NotificationService.backgroundHandler(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
