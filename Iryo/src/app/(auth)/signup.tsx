// File: src/app/(auth)/signup.tsx

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
// TYPES
// --------------------------------------------------

type SignupErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

// --------------------------------------------------
// SIGNUP SCREEN
// --------------------------------------------------

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState<SignupErrors>({});

  // ------------------------------------------------
  // FORM VALIDATION
  // ------------------------------------------------

  const validateForm = (): boolean => {
    const nextErrors: SignupErrors = {};

    const normalizedName = fullName.trim();
    const normalizedEmail = email.trim();

    if (normalizedName.length < 2) {
      nextErrors.fullName =
        "Enter your full name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (password.length < 8) {
      nextErrors.password =
        "Password must contain at least 8 characters.";
    }

    if (confirmPassword.length === 0) {
      nextErrors.confirmPassword =
        "Confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  // ------------------------------------------------
  // SIGNUP SUBMISSION
  // ------------------------------------------------

  const handleSignup = () => {
    if (!validateForm()) {
      return;
    }

    /*
     * BACKEND INTEGRATION PENDING
     *
     * The registration API is not connected yet.
     *
     * After backend integration:
     *
     * 1. Submit the validated registration details
     *    to the Java backend over HTTPS.
     *
     * 2. The backend validates the details again.
     *
     * 3. The backend securely hashes the password
     *    and creates the user account.
     *
     * 4. The backend generates the unique User ID.
     *
     * 5. The app displays the real User ID returned
     *    by the API.
     *
     * Never generate a fake User ID in this screen.
     */

    Alert.alert(
      "Registration API not connected",
      "Your details passed the basic input checks. Account creation and unique User ID generation will work after the Java backend is integrated."
    );
  };

  // ------------------------------------------------
  // NAVIGATION
  // ------------------------------------------------

  const handleBackToLogin = () => {
    router.replace("/(auth)/login");
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
            accessibilityLabel="Return to login"
            onPress={handleBackToLogin}
            style={({ pressed }) => [
              styles.backOuter,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.backInner}>
              <Ionicons
                name="arrow-back"
                size={19}
                color={SKEUO_COLORS.text}
              />

              <Text style={styles.backText}>
                Back to login
              </Text>
            </View>
          </Pressable>

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
                  size={29}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </View>

            <Text style={styles.brandName}>
              iryo
            </Text>

            <Text style={styles.brandCaption}>
              YOUR HEALTH COMPANION
            </Text>
          </View>

          {/* ========================================
              PAGE INTRODUCTION
          ======================================== */}

          <View style={styles.headingSection}>
            <Text style={styles.eyebrow}>
              CREATE YOUR ACCOUNT
            </Text>

            <Text style={styles.pageTitle}>
              Start your{"\n"}health journey.
            </Text>

            <Text style={styles.pageSubtitle}>
              Create an Iryo account to access your health
              measurements and personalised dashboard.
            </Text>
          </View>

          {/* ========================================
              REGISTRATION FORM
          ======================================== */}

          <View style={styles.formOuter}>
            <LinearGradient
              colors={[
                ...SKEUO_GRADIENTS.raisedSurface,
              ]}
              style={styles.formCard}
            >
              <View style={styles.formHeader}>
                <View style={styles.formHeadingText}>
                  <Text style={styles.formTitle}>
                    Personal details
                  </Text>

                  <Text style={styles.formSubtitle}>
                    Enter your information below
                  </Text>
                </View>

                <View style={styles.formIconOuter}>
                  <View style={styles.formIconInner}>
                    <Ionicons
                      name="person-add-outline"
                      size={21}
                      color={SKEUO_COLORS.primary}
                    />
                  </View>
                </View>
              </View>

              {/* ====================================
                  FULL NAME
              ==================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  FULL NAME
                </Text>

                <View
                  style={[
                    styles.inputOuter,
                    errors.fullName && styles.inputError,
                  ]}
                >
                  <View style={styles.inputInner}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={SKEUO_COLORS.textSecondary}
                    />

                    <TextInput
                      value={fullName}
                      onChangeText={(value) => {
                        setFullName(value);

                        setErrors((previous) => ({
                          ...previous,
                          fullName: undefined,
                        }));
                      }}
                      placeholder="Enter your full name"
                      placeholderTextColor={
                        SKEUO_COLORS.placeholder
                      }
                      autoCapitalize="words"
                      autoCorrect={false}
                      autoComplete="name"
                      textContentType="name"
                      style={styles.input}
                      accessibilityLabel="Full name"
                      returnKeyType="next"
                    />
                  </View>
                </View>

                {errors.fullName ? (
                  <Text
                    accessibilityRole="alert"
                    style={styles.errorText}
                  >
                    {errors.fullName}
                  </Text>
                ) : null}
              </View>

              {/* ====================================
                  EMAIL
              ==================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  EMAIL ADDRESS
                </Text>

                <View
                  style={[
                    styles.inputOuter,
                    errors.email && styles.inputError,
                  ]}
                >
                  <View style={styles.inputInner}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={SKEUO_COLORS.textSecondary}
                    />

                    <TextInput
                      value={email}
                      onChangeText={(value) => {
                        setEmail(value);

                        setErrors((previous) => ({
                          ...previous,
                          email: undefined,
                        }));
                      }}
                      placeholder="you@example.com"
                      placeholderTextColor={
                        SKEUO_COLORS.placeholder
                      }
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="email"
                      textContentType="emailAddress"
                      style={styles.input}
                      accessibilityLabel="Email address"
                      returnKeyType="next"
                    />
                  </View>
                </View>

                {errors.email ? (
                  <Text
                    accessibilityRole="alert"
                    style={styles.errorText}
                  >
                    {errors.email}
                  </Text>
                ) : null}
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
                      onChangeText={(value) => {
                        setPassword(value);

                        setErrors((previous) => ({
                          ...previous,
                          password: undefined,
                        }));
                      }}
                      placeholder="Create a password"
                      placeholderTextColor={
                        SKEUO_COLORS.placeholder
                      }
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="new-password"
                      textContentType="newPassword"
                      style={styles.input}
                      accessibilityLabel="Create a password"
                      returnKeyType="next"
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

                {errors.password ? (
                  <Text
                    accessibilityRole="alert"
                    style={styles.errorText}
                  >
                    {errors.password}
                  </Text>
                ) : (
                  <Text style={styles.helperText}>
                    Use at least 8 characters.
                  </Text>
                )}
              </View>

              {/* ====================================
                  CONFIRM PASSWORD
              ==================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  CONFIRM PASSWORD
                </Text>

                <View
                  style={[
                    styles.inputOuter,
                    errors.confirmPassword &&
                      styles.inputError,
                  ]}
                >
                  <View style={styles.inputInner}>
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={20}
                      color={SKEUO_COLORS.textSecondary}
                    />

                    <TextInput
                      value={confirmPassword}
                      onChangeText={(value) => {
                        setConfirmPassword(value);

                        setErrors((previous) => ({
                          ...previous,
                          confirmPassword: undefined,
                        }));
                      }}
                      placeholder="Re-enter your password"
                      placeholderTextColor={
                        SKEUO_COLORS.placeholder
                      }
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="new-password"
                      textContentType="newPassword"
                      style={styles.input}
                      accessibilityLabel="Confirm password"
                      returnKeyType="done"
                      onSubmitEditing={handleSignup}
                    />

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        showConfirmPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                      hitSlop={10}
                      onPress={() =>
                        setShowConfirmPassword(
                          (previous) => !previous
                        )
                      }
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color={SKEUO_COLORS.textSecondary}
                      />
                    </Pressable>
                  </View>
                </View>

                {errors.confirmPassword ? (
                  <Text
                    accessibilityRole="alert"
                    style={styles.errorText}
                  >
                    {errors.confirmPassword}
                  </Text>
                ) : null}
              </View>

              {/* ====================================
                  USER ID INFORMATION
              ==================================== */}

              <View style={styles.userIdInfoOuter}>
                <View style={styles.userIdInfo}>
                  <View style={styles.userIdInfoIcon}>
                    <Ionicons
                      name="finger-print-outline"
                      size={22}
                      color={SKEUO_COLORS.primary}
                    />
                  </View>

                  <View style={styles.userIdInfoText}>
                    <Text style={styles.userIdInfoTitle}>
                      Your unique User ID
                    </Text>

                    <Text style={styles.userIdInfoDescription}>
                      The Java backend will generate your
                      unique numeric User ID after successful
                      registration. You do not need to enter
                      one here.
                    </Text>
                  </View>
                </View>
              </View>

              {/* ====================================
                  CREATE ACCOUNT BUTTON
              ==================================== */}

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Create Iryo account"
                onPress={handleSignup}
                style={({ pressed }) => [
                  styles.signupButtonOuter,
                  pressed && styles.pressed,
                ]}
              >
                <LinearGradient
                  colors={[
                    ...SKEUO_GRADIENTS.primaryButton,
                  ]}
                  style={styles.signupButton}
                >
                  <Ionicons
                    name="person-add-outline"
                    size={21}
                    color="#FFFFFF"
                  />

                  <Text style={styles.signupButtonText}>
                    CREATE ACCOUNT
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color="#FFFFFF"
                  />
                </LinearGradient>
              </Pressable>

              {/* ====================================
                  PRIVACY NOTE
              ==================================== */}

              <View style={styles.privacyNote}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={17}
                  color={SKEUO_COLORS.success}
                />

                <Text style={styles.privacyText}>
                  Your password must be securely handled by
                  the backend. Never store plaintext passwords.
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* ========================================
              LOGIN NAVIGATION
          ======================================== */}

          <View style={styles.loginOuter}>
            <View style={styles.loginCard}>
              <Text style={styles.loginPrompt}>
                Already have an account?
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={handleBackToLogin}
                style={({ pressed }) => [
                  styles.loginButtonOuter,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>
                    Sign in
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
            Health monitoring supports awareness and does not
            replace professional medical advice.
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
    paddingTop: SKEUO_SPACING.md,
    paddingBottom: SKEUO_SPACING.xxl,
  },

  // BACK BUTTON

  backOuter: {
    alignSelf: "flex-start",
    padding: 3,
    borderRadius: SKEUO_RADIUS.medium,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 20,
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
    fontSize: 11,
    fontWeight: "800",
    color: SKEUO_COLORS.text,
  },

  // BRAND

  brandContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  brandOuter: {
    width: 65,
    height: 65,
    padding: 4,
    borderRadius: 22,
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
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  brandName: {
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: SKEUO_COLORS.text,
    marginTop: 11,
  },

  brandCaption: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.6,
    color: SKEUO_COLORS.textMuted,
    marginTop: 3,
  },

  // INTRODUCTION

  headingSection: {
    marginBottom: 24,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.6,
    color: SKEUO_COLORS.primary,
    marginBottom: 8,
  },

  pageTitle: {
    fontSize: 30,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -0.8,
    color: SKEUO_COLORS.text,
  },

  pageSubtitle: {
    fontSize: 12,
    lineHeight: 20,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 10,
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
    gap: 10,
    marginBottom: 23,
  },

  formHeadingText: {
    flex: 1,
  },

  formTitle: {
    fontSize: 16,
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
    marginBottom: 19,
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
    minHeight: 50,
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

  eyeButton: {
    minWidth: 37,
    minHeight: 37,
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
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "700",
    color: SKEUO_COLORS.danger,
    marginTop: 7,
  },

  // USER ID INFORMATION

  userIdInfoOuter: {
    padding: 3,
    borderRadius: 15,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    marginBottom: 20,
  },

  userIdInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 11,
    borderRadius: 11,
    backgroundColor: "#E7ECF7",
    borderWidth: 1,
    borderColor: "#D4DDF0",
  },

  userIdInfoIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FC",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  userIdInfoText: {
    flex: 1,
  },

  userIdInfoTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: SKEUO_COLORS.primaryDark,
  },

  userIdInfoDescription: {
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 4,
  },

  // CREATE ACCOUNT BUTTON

  signupButtonOuter: {
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

  signupButton: {
    minHeight: 53,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  signupButtonText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    textAlign: "center",
    color: "#FFFFFF",
  },

  // PRIVACY

  privacyNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 17,
    paddingHorizontal: 2,
  },

  privacyText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textSecondary,
  },

  // LOGIN NAVIGATION

  loginOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 24,
    ...SKEUO_SHADOWS.raisedSmall,
  },

  loginCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#E0E2DC",
    borderBottomColor: "#D4D7D0",
  },

  loginPrompt: {
    fontSize: 10,
    fontWeight: "700",
    color: SKEUO_COLORS.textSecondary,
  },

  loginButtonOuter: {
    padding: 3,
    borderRadius: 10,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  loginButton: {
    minHeight: 33,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: SKEUO_COLORS.surface,
  },

  loginButtonText: {
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
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
});