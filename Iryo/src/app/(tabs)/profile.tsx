// File: src/app/(tabs)/profile.tsx

import { Ionicons } from "@react-native-vector-icons/ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  SKEUO_COLORS,
  SKEUO_GRADIENTS,
  SKEUO_RADIUS,
  SKEUO_SHADOWS,
  SKEUO_SPACING,
} from "../../constants/skeuoTheme";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type ProfileSettingProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
  onPress: () => void;
};

// --------------------------------------------------
// REUSABLE SETTING ROW
// --------------------------------------------------

function ProfileSetting({
  icon,
  title,
  subtitle,
  onPress,
}: ProfileSettingProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${subtitle}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingOuter,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.settingInner}>
        <View style={styles.settingIconOuter}>
          <View style={styles.settingIconInner}>
            <Ionicons
              name={icon}
              size={20}
              color={SKEUO_COLORS.primary}
            />
          </View>
        </View>

        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>
            {title}
          </Text>

          <Text style={styles.settingSubtitle}>
            {subtitle}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color={SKEUO_COLORS.textMuted}
        />
      </View>
    </Pressable>
  );
}

// --------------------------------------------------
// REUSABLE SECTION HEADING
// --------------------------------------------------

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Text style={styles.sectionSubtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

// --------------------------------------------------
// PROFILE SCREEN
// --------------------------------------------------

export default function ProfileScreen() {
  const handleConnectDevice = () => {
    router.push("/(tabs)/qr");
  };

  const showPendingFeature = (feature: string) => {
    Alert.alert(
      feature,
      "This feature will be available after the required screen or backend API is implemented."
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign-out is not connected",
      "Secure session management has not been implemented yet. No account session has been cleared."
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>
              YOUR ACCOUNT
            </Text>

            <Text style={styles.pageTitle}>
              My Profile
            </Text>

            <Text style={styles.pageSubtitle}>
              Manage your Iryo account and device settings.
            </Text>
          </View>

          <View style={styles.headerOuter}>
            <LinearGradient
              colors={[
                SKEUO_COLORS.primaryLight,
                SKEUO_COLORS.primaryDark,
              ]}
              style={styles.headerIcon}
            >
              <Ionicons
                name="settings-outline"
                size={24}
                color="#FFFFFF"
              />
            </LinearGradient>
          </View>
        </View>

        {/* ========================================
            PROFILE IDENTITY PANEL
        ======================================== */}

        <View style={styles.profileOuter}>
          <LinearGradient
            colors={[
              ...SKEUO_GRADIENTS.instrumentPanel,
            ]}
            style={styles.profileCard}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarOuter}>
                <View style={styles.avatarInner}>
                  <Ionicons
                    name="person"
                    size={35}
                    color="#FFFFFF"
                  />
                </View>
              </View>

              <View style={styles.identity}>
                <Text style={styles.profileName}>
                  Iryo User
                </Text>

                <Text style={styles.profileDescription}>
                  Your personal health account
                </Text>

                <View style={styles.accountBadgeOuter}>
                  <View style={styles.accountBadge}>
                    <View style={styles.statusDot} />

                    <Text style={styles.accountBadgeText}>
                      PROFILE DATA PENDING
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.profileDivider} />

            {/* Unique User ID */}

            <View style={styles.userIdPanelOuter}>
              <View style={styles.userIdPanel}>
                <View style={styles.userIdText}>
                  <Text style={styles.userIdLabel}>
                    YOUR UNIQUE IRYO USER ID
                  </Text>

                  <Text style={styles.userIdValue}>
                    Not loaded
                  </Text>
                </View>

                <View style={styles.fingerprintOuter}>
                  <Ionicons
                    name="finger-print-outline"
                    size={26}
                    color="#D4E1FF"
                  />
                </View>
              </View>
            </View>

            <Text style={styles.profileNote}>
              Your registered name and unique User ID will
              appear here after account authentication is
              connected to the Java backend.
            </Text>
          </LinearGradient>
        </View>

        {/* ========================================
            DEVICE CONNECTION PANEL
        ======================================== */}

        <View style={styles.deviceOuter}>
          <View style={styles.deviceCard}>
            <View style={styles.deviceIconOuter}>
              <LinearGradient
                colors={[
                  SKEUO_COLORS.primaryLight,
                  SKEUO_COLORS.primaryDark,
                ]}
                style={styles.deviceIcon}
              >
                <Ionicons
                  name="hardware-chip-outline"
                  size={25}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </View>

            <View style={styles.deviceContent}>
              <Text style={styles.deviceTitle}>
                My Health Device
              </Text>

              <Text style={styles.deviceDescription}>
                Scan your device QR code and enter your
                device code and account credentials.
              </Text>

              <Text style={styles.deviceStatus}>
                DEVICE STATUS: NOT VERIFIED
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={handleConnectDevice}
                style={({ pressed }) => [
                  styles.deviceButtonOuter,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.deviceButton}>
                  <Text style={styles.deviceButtonText}>
                    Open QR Scanner
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={SKEUO_COLORS.primary}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* ========================================
            ACCOUNT SETTINGS
        ======================================== */}

        <SectionHeading
          title="Account settings"
          subtitle="Your personal information and preferences"
        />

        <View style={styles.settingsOuter}>
          <View style={styles.settingsPanel}>
            <ProfileSetting
              icon="person-outline"
              title="Personal information"
              subtitle="View your registered account details"
              onPress={() =>
                showPendingFeature("Personal information")
              }
            />

            <View style={styles.rowDivider} />

            <ProfileSetting
              icon="notifications-outline"
              title="Notifications"
              subtitle="Health reminders and app updates"
              onPress={() =>
                showPendingFeature("Notifications")
              }
            />

            <View style={styles.rowDivider} />

            <ProfileSetting
              icon="shield-checkmark-outline"
              title="Privacy and security"
              subtitle="Account security and privacy settings"
              onPress={() =>
                showPendingFeature("Privacy and security")
              }
            />
          </View>
        </View>

        {/* ========================================
            SUPPORT
        ======================================== */}

        <SectionHeading
          title="Help and support"
          subtitle="Information and assistance"
        />

        <View style={styles.settingsOuter}>
          <View style={styles.settingsPanel}>
            <ProfileSetting
              icon="help-circle-outline"
              title="Help centre"
              subtitle="Get assistance with Iryo"
              onPress={() =>
                showPendingFeature("Help centre")
              }
            />

            <View style={styles.rowDivider} />

            <ProfileSetting
              icon="document-text-outline"
              title="Terms and privacy policy"
              subtitle="Review the applicable policies"
              onPress={() =>
                showPendingFeature("Terms and privacy policy")
              }
            />

            <View style={styles.rowDivider} />

            <ProfileSetting
              icon="information-circle-outline"
              title="About Iryo"
              subtitle="Application information"
              onPress={() =>
                Alert.alert(
                  "About Iryo",
                  "Iryo is a health-monitoring application under development."
                )
              }
            />
          </View>
        </View>

        {/* ========================================
            DEVELOPMENT NOTICE
        ======================================== */}

        <View style={styles.noticeOuter}>
          <View style={styles.noticeInner}>
            <View style={styles.noticeIcon}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={SKEUO_COLORS.primary}
              />
            </View>

            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>
                Profile integration pending
              </Text>

              <Text style={styles.noticeDescription}>
                This screen currently displays placeholder
                account information. Actual profile details
                and account actions require authentication
                and backend integration.
              </Text>
            </View>
          </View>
        </View>

        {/* ========================================
            SIGN OUT
        ======================================== */}

        <Pressable
          accessibilityRole="button"
          onPress={handleSignOut}
          style={({ pressed }) => [
            styles.signOutOuter,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.signOutButton}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color={SKEUO_COLORS.danger}
            />

            <Text style={styles.signOutText}>
              Sign out
            </Text>
          </View>
        </Pressable>

        {/* ========================================
            FOOTER
        ======================================== */}

        <View style={styles.footer}>
          <Ionicons
            name="heart-outline"
            size={15}
            color={SKEUO_COLORS.textMuted}
          />

          <Text style={styles.footerText}>
            IRYO · YOUR HEALTH COMPANION
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          Health monitoring supports awareness and does not
          replace professional medical advice.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// --------------------------------------------------
// STYLES — SKEUOMORPHIC DESIGN
// --------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SKEUO_COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: SKEUO_SPACING.lg + 2,
    paddingTop: SKEUO_SPACING.md,
    paddingBottom: 145,
  },

  // HEADER

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: SKEUO_COLORS.primary,
    marginBottom: 7,
  },

  pageTitle: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -0.8,
    color: SKEUO_COLORS.text,
  },

  pageSubtitle: {
    fontSize: 11,
    lineHeight: 18,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 6,
    maxWidth: 260,
  },

  headerOuter: {
    padding: 3,
    borderRadius: 17,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    ...SKEUO_SHADOWS.raisedSmall,
  },

  headerIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  // PROFILE PANEL

  profileOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.panel,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 19,
    ...SKEUO_SHADOWS.raised,
  },

  profileCard: {
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderTopColor: "#63718A",
    borderLeftColor: "#526078",
    borderRightColor: "#202A39",
    borderBottomColor: "#202A39",
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  avatarOuter: {
    padding: 4,
    borderRadius: 21,
    backgroundColor: "#202A39",
    borderWidth: 1,
    borderTopColor: "#192332",
    borderLeftColor: "#192332",
    borderRightColor: "#59677F",
    borderBottomColor: "#59677F",
  },

  avatarInner: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: SKEUO_COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  identity: {
    flex: 1,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  profileDescription: {
    fontSize: 10,
    lineHeight: 16,
    color: "#BBC8DF",
    marginTop: 4,
  },

  accountBadgeOuter: {
    alignSelf: "flex-start",
    padding: 3,
    borderRadius: 9,
    backgroundColor: "#202A39",
    borderWidth: 1,
    borderTopColor: "#192332",
    borderLeftColor: "#192332",
    borderRightColor: "#55637A",
    borderBottomColor: "#55637A",
    marginTop: 9,
  },

  accountBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#303C4E",
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9B66F",
  },

  accountBadgeText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
    color: "#D6E0F3",
  },

  profileDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#58667B",
    marginVertical: 17,
  },

  // USER ID

  userIdPanelOuter: {
    padding: 3,
    borderRadius: 14,
    backgroundColor: "#202A39",
    borderWidth: 1,
    borderTopColor: "#192332",
    borderLeftColor: "#192332",
    borderRightColor: "#59677F",
    borderBottomColor: "#59677F",
  },

  userIdPanel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#263245",
    borderWidth: 1,
    borderTopColor: "#1B2534",
    borderLeftColor: "#1B2534",
    borderRightColor: "#3A4960",
    borderBottomColor: "#3A4960",
  },

  userIdText: {
    flex: 1,
  },

  userIdLabel: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#B7C5E0",
  },

  userIdValue: {
    fontSize: 17,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 6,
  },

  fingerprintOuter: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#303E52",
    borderWidth: 1,
    borderTopColor: "#47566D",
    borderLeftColor: "#47566D",
    borderRightColor: "#1B2534",
    borderBottomColor: "#1B2534",
    alignItems: "center",
    justifyContent: "center",
  },

  profileNote: {
    fontSize: 10,
    lineHeight: 16,
    color: "#BBC8DF",
    marginTop: 12,
  },

  // DEVICE CARD

  deviceOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 29,
    ...SKEUO_SHADOWS.raised,
  },

  deviceCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 13,
    borderRadius: 15,
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#E0E2DC",
    borderBottomColor: "#D4D7D0",
  },

  deviceIconOuter: {
    padding: 3,
    borderRadius: 14,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  deviceContent: {
    flex: 1,
  },

  deviceTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: SKEUO_COLORS.text,
  },

  deviceDescription: {
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 5,
  },

  deviceStatus: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.4,
    color: SKEUO_COLORS.warning,
    marginTop: 9,
  },

  deviceButtonOuter: {
    alignSelf: "flex-start",
    padding: 3,
    borderRadius: 10,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    marginTop: 10,
  },

  deviceButton: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: SKEUO_COLORS.surface,
  },

  deviceButtonText: {
    fontSize: 10,
    fontWeight: "900",
    color: SKEUO_COLORS.primary,
  },

  // SECTION HEADINGS

  sectionHeading: {
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.3,
    color: SKEUO_COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 4,
  },

  // SETTINGS PANEL

  settingsOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 27,
    ...SKEUO_SHADOWS.raised,
  },

  settingsPanel: {
    paddingHorizontal: 11,
    borderRadius: 15,
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#E0E2DC",
    borderBottomColor: "#D4D7D0",
  },

  settingOuter: {
    paddingVertical: 5,
    borderRadius: 12,
  },

  settingInner: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 8,
  },

  settingIconOuter: {
    padding: 3,
    borderRadius: 12,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  settingIconInner: {
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SKEUO_COLORS.surface,
  },

  settingText: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: SKEUO_COLORS.text,
  },

  settingSubtitle: {
    fontSize: 9,
    lineHeight: 15,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 4,
  },

  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: SKEUO_COLORS.border,
    marginLeft: 51,
  },

  // NOTICE

  noticeOuter: {
    padding: 4,
    borderRadius: 17,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    marginBottom: 18,
  },

  noticeInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#E6EBF5",
    borderWidth: 1,
    borderColor: "#D4DDEE",
  },

  noticeIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F8FB",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  noticeContent: {
    flex: 1,
  },

  noticeTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: SKEUO_COLORS.primaryDark,
  },

  noticeDescription: {
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 5,
  },

  // SIGN OUT

  signOutOuter: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: "#D8DAD4",
    borderWidth: 1,
    borderTopColor: "#C2C5BD",
    borderLeftColor: "#C2C5BD",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    marginBottom: 23,
  },

  signOutButton: {
    minHeight: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 11,
    backgroundColor: "#F7E7E8",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  signOutText: {
    fontSize: 12,
    fontWeight: "900",
    color: SKEUO_COLORS.danger,
  },

  // FOOTER

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  footerText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: SKEUO_COLORS.textMuted,
  },

  disclaimer: {
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    color: SKEUO_COLORS.textMuted,
    marginTop: 10,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
});