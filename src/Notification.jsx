import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const NotificationService = {
    async getFcmToken() {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        return token;
    },

    async createNotificationChannel() {
        await notifee.createChannel({
            id: 'default',
            name: 'Default Notification Channel',
            importance: notifee.AndroidImportance.HIGH,
        });
    },

    async backgroundHandler() {
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('Message handled in the background:', remoteMessage);
        });
    },
};

export default NotificationService;
