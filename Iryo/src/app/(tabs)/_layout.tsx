// File: src/app/(tabs)/_layout.tsx

import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import {
  Platform,
  StyleSheet,
  View,
} from "react-native";

import {
  SKEUO_COLORS,
  SKEUO_RADIUS,
  SKEUO_SHADOWS,
} from "../../constants/skeuoTheme";

type IconName = ComponentProps<typeof Ionicons>["name"];

type TabIconProps = {
  activeIcon: IconName;
  inactiveIcon: IconName;
  focused: boolean;
};

// --------------------------------------------------
// SKEUOMORPHIC TAB ICON
// --------------------------------------------------

function TabIcon({
  activeIcon,
  inactiveIcon,
  focused,
}: TabIconProps) {
  return (
    <View
      style={[
        styles.iconSurface,
        focused
          ? styles.iconSurfacePressed
          : styles.iconSurfaceRaised,
      ]}
    >
      <Ionicons
        name={focused ? activeIcon : inactiveIcon}
        size={21}
        color={
          focused
            ? SKEUO_COLORS.primary
            : SKEUO_COLORS.navigationInactive
        }
      />
    </View>
  );
}

// --------------------------------------------------
// MAIN TAB NAVIGATION
// --------------------------------------------------

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarHideOnKeyboard: true,

        tabBarActiveTintColor:
          SKEUO_COLORS.navigationActive,

        tabBarInactiveTintColor:
          SKEUO_COLORS.navigationInactive,

        tabBarLabelStyle: styles.tabLabel,

        tabBarItemStyle: styles.tabItem,

        tabBarStyle: styles.tabBar,

        // Raised physical-looking navigation panel.
        tabBarBackground: () => (
          <View style={styles.tabBarBackground} />
        ),
      }}
    >
      {/* DASHBOARD */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",

          tabBarIcon: ({ focused }) => (
            <TabIcon
              activeIcon="grid"
              inactiveIcon="grid-outline"
              focused={focused}
            />
          ),
        }}
      />

      {/* QR SCANNER */}

      <Tabs.Screen
        name="qr"
        options={{
          title: "Scan",

          tabBarIcon: ({ focused }) => (
            <TabIcon
              activeIcon="qr-code"
              inactiveIcon="qr-code-outline"
              focused={focused}
            />
          ),
        }}
      />

      {/* PROFILE */}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ focused }) => (
            <TabIcon
              activeIcon="person"
              inactiveIcon="person-outline"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",

    left: 15,
    right: 15,

    bottom: Platform.OS === "ios" ? 18 : 12,

    height: 78,

    backgroundColor: "transparent",

    borderTopWidth: 0,

    paddingTop: 7,
    paddingBottom: Platform.OS === "ios" ? 9 : 7,

    elevation: 0,
  },

  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,

    borderRadius: SKEUO_RADIUS.panel,

    backgroundColor: SKEUO_COLORS.navigationBackground,

    borderWidth: 1,

    borderTopColor: SKEUO_COLORS.borderLight,
    borderLeftColor: SKEUO_COLORS.borderLight,
    borderRightColor: SKEUO_COLORS.border,
    borderBottomColor: SKEUO_COLORS.borderDark,

    ...SKEUO_SHADOWS.floating,
  },

  tabItem: {
    paddingTop: 1,
    paddingBottom: 1,
  },

  tabLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.2,
    marginTop: 3,
  },

  iconSurface: {
    width: 42,
    height: 34,

    borderRadius: SKEUO_RADIUS.medium,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
  },

  // Inactive icons sit on raised surfaces.
  iconSurfaceRaised: {
    backgroundColor: SKEUO_COLORS.surface,

    borderTopColor: SKEUO_COLORS.borderLight,
    borderLeftColor: SKEUO_COLORS.borderLight,
    borderRightColor: SKEUO_COLORS.border,
    borderBottomColor: SKEUO_COLORS.borderDark,

    ...SKEUO_SHADOWS.raisedSmall,
  },

  // The selected tab resembles a pressed physical button.
  iconSurfacePressed: {
    backgroundColor: SKEUO_COLORS.backgroundDark,

    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: SKEUO_COLORS.borderLight,
    borderBottomColor: SKEUO_COLORS.borderLight,

    ...SKEUO_SHADOWS.pressed,
  },
});