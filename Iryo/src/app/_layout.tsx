// File: src/app/_layout.tsx

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SKEUO_COLORS } from "../constants/skeuoTheme";

export default function RootLayout() {
  return (
    <>
      {/* Application status bar */}
      <StatusBar
        style="dark"
        backgroundColor={SKEUO_COLORS.background}
      />

      {/* Main application navigation */}
      <Stack
        screenOptions={{
          headerShown: false,

          contentStyle: {
            backgroundColor: SKEUO_COLORS.background,
          },

          animation: "fade",
          gestureEnabled: true,
        }}
      >
        {/* App entry point */}
        <Stack.Screen
          name="index"
          options={{
            animation: "fade",
          }}
        />

        {/* Login and signup screens */}
        <Stack.Screen
          name="(auth)"
          options={{
            animation: "fade_from_bottom",
          }}
        />

        {/* Main application tabs */}
        <Stack.Screen
          name="(tabs)"
          options={{
            animation: "fade",
          }}
        />

        {/* Device setup after QR scanning */}
        <Stack.Screen
          name="device-setup"
          options={{
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
      </Stack>
    </>
  );
}