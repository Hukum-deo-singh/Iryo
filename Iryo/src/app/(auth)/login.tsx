// File: src/app/(auth)/login.tsx

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
} from "../../constants/skeuoTheme";

// --------------------------------------------------
// LOGIN SCREEN
// --------------------------------------------------

export default function LoginScreen() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ------------------------------------------------
  // VALIDATE LOGIN FORM
  // ------------------------------------------------

  const handleLogin = () => {
    const normalizedUserId = userId.trim();

    let hasError = false;

    setUserIdError("");
    setPasswordError("");

    if (!/^[0-9]+$/.test(normalizedUserId)) {
      setUserIdError("Enter your numeric Iryo User ID.");
      hasError = true;
    }

    if (password.length === 0) {
      setPasswordError("Enter your password.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    /*
     * BACKEND INTEGRATION PENDING
     *
     * This screen currently performs input validation only.
     * It does not authenticate the user.
     *
     * Never navigate to the authenticated dashboard
     * before the backend verifies the credentials.
     */

    Alert.alert(
      "Authentication unavailable",
      "Your details passed basic input validation. Secure login will work after the Java authentication API is connected."
    );
  };

  // ------------------------------------------------
  // NAVIGATE TO SIGNUP
  // ------------------------------------------------

  const handleSignup = () => {
    router.push("/(auth)/signup");
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
              BRAND
          ======================================== */}

          <View style={styles.brandContainer}>
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
                  size={30}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </View>

            <Text style={styles.brandName}>iryo</Text>

            <Text style={styles.brandCaption}>
              YOUR HEALTH COMPANION
            </Text>
          </View>

          {/* ========================================
              PAGE INTRODUCTION
          ======================================== */}

          <View style={styles.headingSection}>
            <Text style={styles.greeting}>
              Welcome back
            </Text>

            <Text style={styles.pageTitle}>
              Sign in to Iryo
            </Text>

            <Text style={styles.pageSubtitle}>
              Your health journey starts here. Sign in to
              access your measurements and health history.
            </Text>
          </View>

          {/* ========================================
              LOGIN FORM — RAISED PANEL
          ======================================== */}

          <View style={styles.formOuter}>
            <LinearGradient
              colors={[...SKEUO_GRADIENTS.raisedSurface]}
              style={styles.formCard}
            >
              <View style={styles.formHeadingRow}>
                <View style={styles.formHeadingText}>
                  <Text style={styles.formTitle}>
                    Your account
                  </Text>

                  <Text style={styles.formSubtitle}>
                    Enter your account credentials
                  </Text>
                </View>

                <View style={styles.formIconOuter}>
                  <View style={styles.formIconInner}>
                    <Ionicons
                      name="person-outline"
                      size={21}
                      color={SKEUO_COLORS.primary}
                    />
                  </View>
                </View>
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
                    userIdError !== "" && styles.inputError,
                  ]}
                >
                  <View style={styles.inputInner}>
                    <Ionicons
                      name="finger-print-outline"
                      size={20}
                      color={SKEUO_COLORS.textSecondary}
                    />

                    <TextInput
                      value={userId}
                      onChangeText={(value) => {
                        setUserId(value.replace(/\D/g, ""));
                        setUserIdError("");
                      }}
                      placeholder="Enter your User ID"
                      placeholderTextColor={
                        SKEUO_COLORS.placeholder
                      }
                      keyboardType="number-pad"
                      autoComplete="off"
                      autoCorrect={false}
                      style={styles.input}
                      accessibilityLabel="Iryo User ID"
                      returnKeyType="next"
                    />
                  </View>
                </View>

                {userIdError !== "" ? (
                  <Text
                    accessibilityRole="alert"
                    style={styles.errorText}
                  >
                    {userIdError}
                  </Text>
                ) : (
                  <Text style={styles.helperText}>
                    Use the unique ID assigned during signup.
                  </Text>
                )}
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
                    passwordError !== "" && styles.inputError,
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
                      onChangeText={(value) => {
                        setPassword(value);
                        setPasswordError("");
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
                      onSubmitEditing={handleLogin}
                    />

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      hitSlop={10}
                      onPress={() =>
                        setShowPassword((previous) => !previous)
                      }
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

                {passwordError !== "" ? (
                  <Text
                    accessibilityRole="alert"
                    style={styles.errorText}
                  >
                    {passwordError}
                  </Text>
                ) : (
                  <Text style={styles.helperText}>
                    Keep your account password private.
                  </Text>
                )}
              </View>

              {/* ====================================
                  FORGOT PASSWORD
              ==================================== */}

              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  Alert.alert(
                    "Password recovery",
                    "Password recovery will be available after the backend authentication and recovery workflow is implemented."
                  )
                }
                style={styles.forgotPasswordButton}
              >
                <Text style={styles.forgotPasswordText}>
                  Forgot password?
                </Text>
              </Pressable>

              {/* ====================================
                  SIGN IN BUTTON
              ==================================== */}

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Sign in to Iryo"
                onPress={handleLogin}
                style={({ pressed }) => [
                  styles.loginButtonOuter,
                  pressed && styles.pressed,
                ]}
              >
                <LinearGradient
                  colors={[
                    ...SKEUO_GRADIENTS.primaryButton,
                  ]}
                  style={styles.loginButton}
                >
                  <Ionicons
                    name="log-in-outline"
                    size={22}
                    color="#FFFFFF"
                  />

                  <Text style={styles.loginButtonText}>
                    SIGN IN
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
                  size={17}
                  color={SKEUO_COLORS.success}
                />

                <Text style={styles.securityText}>
                  Your credentials must be verified by the
                  Iryo backend before account access is granted.
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* ========================================
              SIGNUP NAVIGATION
          ======================================== */}

          <View style={styles.signupOuter}>
            <View style={styles.signupCard}>
              <Text style={styles.signupPrompt}>
                New to Iryo?
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={handleSignup}
                style={({ pressed }) => [
                  styles.signupButtonOuter,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.signupButton}>
                  <Text style={styles.signupButtonText}>
                    Create an account
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
              YOUR HEALTH. YOUR JOURNEY.
            </Text>
          </View>

          <Text style={styles.disclaimer}>
            Health measurements support awareness and do not
            replace professional medical advice.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
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

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SKEUO_SPACING.lg + 2,
    paddingTop: SKEUO_SPACING.xl,
    paddingBottom: SKEUO_SPACING.xxl,
  },

  // BRAND

  brandContainer: {
    alignItems: "center",
    marginBottom: 34,
  },

  brandOuter: {
    width: 70,
    height: 70,
    padding: 4,
    borderRadius: 24,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    ...SKEUO_SHADOWS.raised,
  },

  brandIcon: {
    flex: 1,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  brandName: {
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1.8,
    color: SKEUO_COLORS.text,
    marginTop: 12,
  },

  brandCaption: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.8,
    color: SKEUO_COLORS.textMuted,
    marginTop: 4,
  },

  // INTRODUCTION

  headingSection: {
    marginBottom: 24,
  },

  greeting: {
    fontSize: 13,
    fontWeight: "800",
    color: SKEUO_COLORS.primary,
    marginBottom: 7,
  },

  pageTitle: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -0.7,
    color: SKEUO_COLORS.text,
  },

  pageSubtitle: {
    fontSize: 12,
    lineHeight: 20,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 9,
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
    marginBottom: 22,
    ...SKEUO_SHADOWS.raised,
  },

  formCard: {
    padding: 17,
    borderRadius: 20,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#E0E2DC",
    borderBottomColor: "#D4D7D0",
  },

  formHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 24,
  },

  formHeadingText: {
    flex: 1,
  },

  formTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: SKEUO_COLORS.text,
  },

  formSubtitle: {
    fontSize: 10,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 5,
  },

  formIconOuter: {
    padding: 3,
    borderRadius: 13,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  formIconInner: {
    width: 39,
    height: 39,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: SKEUO_COLORS.surface,
  },

  // INPUTS

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
    minHeight: 51,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
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

  eyeButton: {
    minWidth: 38,
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
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
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "700",
    color: SKEUO_COLORS.danger,
    marginTop: 7,
  },

  // FORGOT PASSWORD

  forgotPasswordButton: {
    alignSelf: "flex-end",
    paddingVertical: 7,
    paddingHorizontal: 2,
    marginTop: -9,
    marginBottom: 17,
  },

  forgotPasswordText: {
    fontSize: 11,
    fontWeight: "800",
    color: SKEUO_COLORS.primary,
  },

  // SIGN IN BUTTON

  loginButtonOuter: {
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

  loginButton: {
    minHeight: 53,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  loginButtonText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.7,
    textAlign: "center",
    color: "#FFFFFF",
  },

  // SECURITY

  securityNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 2,
  },

  securityText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textSecondary,
  },

  // SIGNUP

  signupOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 26,
    ...SKEUO_SHADOWS.raisedSmall,
  },

  signupCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    padding: 13,
    borderRadius: 14,
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#E0E2DC",
    borderBottomColor: "#D4D7D0",
  },

  signupPrompt: {
    fontSize: 11,
    fontWeight: "700",
    color: SKEUO_COLORS.textSecondary,
  },

  signupButtonOuter: {
    padding: 3,
    borderRadius: 11,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  signupButton: {
    minHeight: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: SKEUO_COLORS.surface,
  },

  signupButtonText: {
    fontSize: 10,
    fontWeight: "900",
    color: SKEUO_COLORS.primary,
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
    letterSpacing: 1.1,
    color: SKEUO_COLORS.textMuted,
  },

  disclaimer: {
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    color: SKEUO_COLORS.textMuted,
    marginTop: 12,
  },

  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
});