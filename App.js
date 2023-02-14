import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// redux
import {Provider, connect} from 'react-redux';
import {State} from './redux/store';
import store from './redux/store';
import {addNotification} from './redux/notificationSlice';

// component
import Navigation from './navigation/navigation';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function App(props) {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId: 'default',
      },
    });

    const notifData = {
      title: remoteMessage.notification.title,
      text: remoteMessage.notification.body,
      created_time: new Date().getTime(),
    };
    props.addNotification(notifData);
  });

  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId: 'default',
      },
    });
    const notifData = {
      title: remoteMessage.notification.title,
      text: remoteMessage.notification.body,
      created_time: new Date().getTime(),
    };
    props.addNotification(notifData);

    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        notifee.displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          android: {
            channelId: 'default',
          },
        });

        const notifData = {
          title: remoteMessage.notification.title,
          text: remoteMessage.notification.body,
          created_time: new Date().getTime(),
        };
        props.addNotification(notifData);

        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId: 'default',
        },
      });

      const notifData = {
        title: remoteMessage.notification.title,
        text: remoteMessage.notification.body,
        created_time: new Date().getTime(),
      };
      props.addNotification(notifData);

      console.log('A new FCM message arrived!', remoteMessage.notification);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'#F3F4F8'} barStyle={'dark-content'} />
      <Navigation />
    </>
  );
}

const mapStateToProps = (state = State) => ({
  notification: state.notification.notification,
});

export default connect(mapStateToProps, {addNotification})(App);
