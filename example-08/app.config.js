// import { EXPO_PROJECT_ID } from "react-native-dotenv";

// const projectId = EXPO_PROJECT_ID ? EXPO_PROJECT_ID : process.env.EXPO_PROJECT_ID;

export default {
  expo: {
    name: "example-08",
    slug: "example-08",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.aertas.notifApp"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./local/assets/notification-icon.png",
          color: "#ffffff"
        }
      ]
    ],
    extra: {
      eas: {
        projectId: '702cfe23-4e00-415f-bd02-bdeedef6035e'
      }
    }
  }
};