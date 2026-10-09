// File: src/app/device-setup.tsx

import { Ionicons } from "@react-native-vector-icons/ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  SKEUO_COLORS,
  SKEUO_GRADIENTS,
  SKEUO_RADIUS,
  SKEUO_SHADOWS,
  SKEUO_SPACING,
} from "../constants/skeuoTheme";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type FormErrors = {
  deviceCode?: string;
  userId?: string;
  password?: string;
};

// --------------------------------------------------
// DEVICE SETUP SCREEN
// --------------------------------------------------

export default function DeviceSetupScreen() {
  const [deviceCode, setDeviceCode] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  // ------------------------------------------------
  // VALIDATE FORM
  // ------------------------------------------------

  const handleStart = () => {
    const normalizedCode = deviceCode.trim().toUpperCase();
    const normalizedUserId = userId.trim();

    const nextErrors: FormErrors = {};

    // Exactly four hexadecimal characters.
    if (!/^[0-9A-F]{4}$/.test(normalizedCode)) {
      nextErrors.deviceCode =
        "Enter exactly 4 hexadecimal characters (0–9, A–F).";
    }

    // The current project requirement uses a numeric User ID.
    if (!/^[0-9]+$/.test(normalizedUserId)) {
      nextErrors.userId =
        "Enter your numeric Iryo User ID.";
    }

    if (password.length === 0) {
      nextErrors.password =
        "Enter your account password.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    /*
     * Backend integration is not implemented here yet.
     *
     * This only validates the form locally.
     * It does not authenticate the user, verify the device,
     * create a session, or start a measurement.
     */

    Alert.alert(
      "Input validation successful",
      "Your entries passed the basic format checks. Backend authentication and device verification must be integrated before the device can start."
    );
  };

  // ------------------------------------------------
  // NAVIGATION
  // ------------------------------------------------

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/qr");
    }
  };

  // ------------------------------------------------
  // SCREEN
  // ------------------------------------------------

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ========================================
              BACK BUTTON
          ======================================== */}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back to previous screen"
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backOuter,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.backInner}>
              <Ionicons
                name="arrow-back"
                size={20}
                color={SKEUO_COLORS.text}
              />

              <Text style={styles.backText}>
                Back
              </Text>
            </View>
          </Pressable>

          {/* ========================================
              BRAND
          ======================================== */}

          <View style={styles.brandRow}>
            <View style={styles.brandOuter}>
              <LinearGradient
                colors={[
                  SKEUO_COLORS.primaryLight,
                  SKEUO_COLORS.primaryDark,
                ]}
                style={styles.brandIcon}
              >
                <Ionicons
                  name="pulse-outline"
                  size={26}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </View>

            <View>
              <Text style={styles.brandName}>
                iryo
              </Text>

              <Text style={styles.brandCaption}>
                HEALTH COMPANION
              </Text>
            </View>
          </View>

          {/* ========================================
              PAGE INTRODUCTION
          ======================================== */}

          <View style={styles.headingSection}>
            <View style={styles.headingIconOuter}>
              <View style={styles.headingIconInner}>
                <Ionicons
                  name="hardware-chip-outline"
                  size={29}
                  color={SKEUO_COLORS.primary}
                />
              </View>
            </View>

            <Text style={styles.pageTitle}>
              Connect your{"\n"}health device
            </Text>

            <Text style={styles.pageSubtitle}>
              Enter the code printed on your device and your
              Iryo account credentials to continue.
            </Text>
          </View>

          {/* ========================================
              FORM PANEL
          ======================================== */}

          <View style={styles.formOuter}>
            <LinearGradient
              colors={[
                ...SKEUO_GRADIENTS.raisedSurface,
              ]}
              style={styles.formCard}
            >
              {/* Form heading */}

              <View style={styles.formHeader}>
                <View style={styles.formHeadingText}>
                  <Text style={styles.formTitle}>
                    Device authentication
                  </Text>

                  <Text style={styles.formSubtitle}>
                    Enter your details below
                  </Text>
                </View>

                <View style={styles.secureBadgeOuter}>
                  <View style={styles.secureBadge}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={12}
                      color={SKEUO_COLORS.success}
                    />

                    <Text style={styles.secureBadgeText}>
                      SECURE SETUP
                    </Text>
                  </View>
                </View>
              </View>

              {/* ====================================
                  DEVICE CODE
              ==================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  DEVICE CODE
                </Text>

                <View
                  style={[
                    styles.inputOuter,
                    errors.deviceCode && styles.inputError,
                  ]}
                >
                  <View style={styles.inputInner}>
                    <Ionicons
                      name="qr-code-outline"
                      size={20}
                      color={SKEUO_COLORS.textSecondary}
                    />

                    <TextInput
                      value={deviceCode}
                      onChangeText={(text) => {
                        const sanitized = text
                          .toUpperCase()
                          .replace(/[^0-9A-F]/g, "")
                          .slice(0, 4);

                        setDeviceCode(sanitized);

                        setErrors((previous) => ({
                          ...previous,
                          deviceCode: undefined,
                        }));
                      }}
                      placeholder="e.g. A3F9"
                      placeholderTextColor={
                        SKEUO_COLORS.placeholder
                      }
                      autoCapitalize="characters"
                      autoCorrect={false}
                      autoComplete="off"
                      maxLength={4}
                      style={styles.input}
                      accessibilityLabel="Four character hexadecimal device code"
                      returnKeyType="next"
                    />

                    <View style={styles.codeCounter}>
                      <Text style={styles.codeCounterText}>
                        {deviceCode.length}/4
                      </Text>
                    </View>
                  </View>
                </View>

                <Text
                  style={[
                    styles.helperText,
                    errors.deviceCode && styles.errorText,
                  ]}
                >
                  {errors.deviceCode ??
                    "Enter the 4-character hexadecimal code printed on your device."}
                </Text>
              </View>

              {/* ====================================
                  USER ID
              ==================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  IRYO USER ID
                </Text>

                <View
                  style={[
                    styles.inputOuter,
                    errors.userId && styles.inputError,
                  ]}
                >
                  <View style={styles.inputInner}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={SKEUO_COLORS.textSecondary}
                    />

                    <TextInput
                      value={userId}
                      onChangeText={(text) => {
                        setUserId(text.replace(/\D/g, ""));

                        setErrors((previous) => ({
                          ...previous,
                          userId: undefined,
                        }));
                      }}
                      placeholder="Enter your User ID"
                      placeholderTextColor={
                        SKEUO_COLORS.placeholder
                      }
                      keyboardType="number-pad"
                      autoComplete="off"
                      style={styles.input}
                      accessibilityLabel="Numeric Iryo User ID"
                      returnKeyType="next"
                    />
                  </View>
                </View>

                <Text
                  style={[
                    styles.helperText,
                    errors.userId && styles.errorText,
                  ]}
                >
                  {errors.userId ??
                    "Use the unique ID assigned when your account was created."}
                </Text>
              </View>

              {/* ====================================
                  PASSWORD
              ==================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  PASSWORD
                </Text>

                <View
                  style={[
                    styles.inputOuter,
                    errors.password && styles.inputError,
                  ]}
                >
                  <View style={styles.inputInner}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={SKEUO_COLORS.textSecondary}
                    />

                    <TextInput
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);

                        setErrors((previous) => ({
                          ...previous,
                          password: undefined,
                        }));
                      }}
                      placeholder="Enter your password"
                      placeholderTextColor={
                        SKEUO_COLORS.placeholder
                      }
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="current-password"
                      textContentType="password"
                      style={styles.input}
                      accessibilityLabel="Account password"
                      returnKeyType="done"
                      onSubmitEditing={handleStart}
                    />

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onPress={() =>
                        setShowPassword((previous) => !previous)
                      }
                      hitSlop={10}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={
                          showPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color={SKEUO_COLORS.textSecondary}
                      />
                    </Pressable>
                  </View>
                </View>

                <Text
                  style={[
                    styles.helperText,
                    errors.password && styles.errorText,
                  ]}
                >
                  {errors.password ??
                    "Your password will be verified by the backend."}
                </Text>
              </View>

              {/* ====================================
                  START BUTTON
              ==================================== */}

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Start device setup"
                onPress={handleStart}
                style={({ pressed }) => [
                  styles.startOuter,
                  pressed && styles.startPressed,
                ]}
              >
                <LinearGradient
                  colors={[
                    ...SKEUO_GRADIENTS.primaryButton,
                  ]}
                  style={styles.startButton}
                >
                  <Ionicons
                    name="play-circle-outline"
                    size={23}
                    color="#FFFFFF"
                  />

                  <Text style={styles.startButtonText}>
                    START
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color="#FFFFFF"
                  />
                </LinearGradient>
              </Pressable>

              {/* ====================================
                  SECURITY NOTE
              ==================================== */}

              <View style={styles.securityNote}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={SKEUO_COLORS.success}
                />

                <Text style={styles.securityText}>
                  Your account and device must be verified
                  by the backend before a measurement session
                  can start.
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* ========================================
              PROCESS INFORMATION
          ======================================== */}

          <View style={styles.processOuter}>
            <View style={styles.processInner}>
              <View style={styles.processIcon}>
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color={SKEUO_COLORS.primary}
                />
              </View>

              <View style={styles.processContent}>
                <Text style={styles.processTitle}>
                  What happens after START?
                </Text>

                <Text style={styles.processDescription}>
                  The Java backend will authenticate your
                  account, verify the device code and apply
                  the device-linking rules before a session
                  begins.
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}

          <Text style={styles.footerText}>
            IRYO · HEALTH COMPANION
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --------------------------------------------------
// STYLES — STRICT SKEUOMORPHISM
// --------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SKEUO_COLORS.background,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SKEUO_SPACING.lg + 2,
    paddingTop: SKEUO_SPACING.sm,
    paddingBottom: SKEUO_SPACING.xxl,
  },

  // BACK BUTTON

  backOuter: {
    alignSelf: "flex-start",
    padding: 3,
    borderRadius: SKEUO_RADIUS.medium,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderLight,
    borderLeftColor: SKEUO_COLORS.borderLight,
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 22,
    ...SKEUO_SHADOWS.raisedSmall,
  },

  backInner: {
    minHeight: 37,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: SKEUO_COLORS.surface,
  },

  backText: {
    fontSize: 12,
    fontWeight: "800",
    color: SKEUO_COLORS.text,
  },

  // BRAND

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  brandOuter: {
    width: 51,
    height: 51,
    padding: 3,
    borderRadius: 18,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    ...SKEUO_SHADOWS.raisedSmall,
  },

  brandIcon: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  brandName: {
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -1,
    color: SKEUO_COLORS.text,
  },

  brandCaption: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: SKEUO_COLORS.textMuted,
    marginTop: 2,
  },

  // INTRODUCTION

  headingSection: {
    marginTop: 29,
    marginBottom: 23,
  },

  headingIconOuter: {
    alignSelf: "flex-start",
    padding: 4,
    borderRadius: 19,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    marginBottom: 17,
  },

  headingIconInner: {
    width: 53,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  pageTitle: {
    fontSize: 31,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -0.8,
    color: SKEUO_COLORS.text,
  },

  pageSubtitle: {
    fontSize: 12,
    lineHeight: 20,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 9,
    maxWidth: 330,
  },

  // FORM PANEL

  formOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.panel,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 20,
    ...SKEUO_SHADOWS.raised,
  },

  formCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#E0E2DC",
    borderBottomColor: "#D4D7D0",
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },

  formHeadingText: {
    flex: 1,
    minWidth: 155,
  },

  formTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
    color: SKEUO_COLORS.text,
  },

  formSubtitle: {
    fontSize: 10,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 4,
  },

  secureBadgeOuter: {
    padding: 3,
    borderRadius: 10,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  secureBadge: {
    minHeight: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 6,
    borderRadius: 7,
    backgroundColor: "#E5F1E9",
  },

  secureBadgeText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.4,
    color: SKEUO_COLORS.success,
  },

  // INPUT FIELDS

  fieldContainer: {
    marginBottom: 20,
  },

  fieldLabel: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.1,
    color: SKEUO_COLORS.textSecondary,
    marginBottom: 9,
  },

  inputOuter: {
    padding: 3,
    borderRadius: 15,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  inputInner: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 11,
    borderRadius: 11,
    backgroundColor: SKEUO_COLORS.inputBackground,
    borderWidth: 1,
    borderTopColor: "#C6C9C1",
    borderLeftColor: "#C6C9C1",
    borderRightColor: "#F9FAF7",
    borderBottomColor: "#F9FAF7",
  },

  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    fontSize: 13,
    color: SKEUO_COLORS.text,
  },

  codeCounter: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: "#D0D4CD",
  },

  codeCounterText: {
    fontSize: 9,
    fontWeight: "900",
    color: SKEUO_COLORS.textSecondary,
  },

  eyeButton: {
    minWidth: 35,
    minHeight: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },

  inputError: {
    borderColor: SKEUO_COLORS.danger,
  },

  helperText: {
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textMuted,
    marginTop: 7,
  },

  errorText: {
    color: SKEUO_COLORS.danger,
    fontWeight: "700",
  },

  // START BUTTON

  startOuter: {
    padding: 4,
    borderRadius: 17,
    backgroundColor: "#243D6F",
    borderWidth: 1,
    borderTopColor: "#7E96C5",
    borderLeftColor: "#7E96C5",
    borderRightColor: "#1C315B",
    borderBottomColor: "#1C315B",
    ...SKEUO_SHADOWS.raisedSmall,
  },

  startButton: {
    minHeight: 53,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  startButtonText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1.8,
    color: "#FFFFFF",
  },

  startPressed: {
    opacity: 0.83,
    transform: [{ scale: 0.99 }],
  },

  // SECURITY NOTE

  securityNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 19,
    paddingHorizontal: 2,
  },

  securityText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textSecondary,
  },

  // PROCESS INFORMATION

  processOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 20,
    ...SKEUO_SHADOWS.raisedSmall,
  },

  processInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
    padding: 13,
    borderRadius: 14,
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#E0E2DC",
    borderBottomColor: "#D6D8D1",
  },

  processIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E9F7",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  processContent: {
    flex: 1,
  },

  processTitle: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "900",
    color: SKEUO_COLORS.text,
  },

  processDescription: {
    fontSize: 10,
    lineHeight: 17,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 5,
  },

  footerText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
    textAlign: "center",
    color: SKEUO_COLORS.textMuted,
    marginTop: 3,
    marginBottom: 10,
  },

  pressed: {
    opacity: 0.78,
  },
});