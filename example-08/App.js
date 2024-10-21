import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { EXPO_PUSH_TOKEN, EXPO_PROJECT_ID } from "react-native-dotenv";

const projectId = EXPO_PROJECT_ID ? EXPO_PROJECT_ID : process.env.EXPO_PROJECT_ID;
const expoPushToken = EXPO_PUSH_TOKEN ? EXPO_PUSH_TOKEN : process.env.EXPO_PUSH_TOKEN;

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the appropriate permissions"
        );
        return;
      }
      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      console.log(pushTokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }
    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("NOTIFICATION RECIEVED");
        console.log(notification);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("NOTIFICATION RESPONSE RECIEVED");
        console.log(response);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification",
        data: {
          userName: "Sax",
        },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,
        title: "Test - sent from a device!",
        body: "This is a test",
      }),
    });
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={scheduleNotificationHandler}
        title="Schedule Notification"
      />
      <Button
        title="Send push notification"
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
