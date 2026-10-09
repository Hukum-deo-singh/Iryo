// File: src/app/(auth)/_layout.tsx

import { Stack } from "expo-router";

import { SKEUO_COLORS } from "../../constants/skeuoTheme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        // We create our own headers inside each screen.
        headerShown: false,

        // Consistent background for authentication screens.
        contentStyle: {
          backgroundColor: SKEUO_COLORS.background,
        },

        // Smooth transitions between authentication screens.
        animation: "fade_from_bottom",

        // Allow users to navigate back where appropriate.
        gestureEnabled: true,
      }}
    >
      {/* Login screen */}
      <Stack.Screen
        name="login"
        options={{
          title: "Sign in",
          animation: "fade",
        }}
      />

      {/* Signup screen */}
      <Stack.Screen
        name="signup"
        options={{
          title: "Create account",
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}