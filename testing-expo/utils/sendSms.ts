// utils/sms.ts

import { NativeModules, PermissionsAndroid } from 'react-native';

export const sendSilentSMS = async (number: string, message: string) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
    {
      title: 'SMS Permission',
      message: 'App needs access to send messages silently.',
      buttonPositive: 'Allow',
    }
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    NativeModules.SmsModule.sendSMS(number, message);
  } else {
    console.warn('SMS permission denied');
  }
};
