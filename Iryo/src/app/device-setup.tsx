import { Ionicons } from "@react-native-vector-icons/ionicons";
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
import { router } from "expo-router";

export default function DeviceSetupScreen() {
  const [deviceCode, setDeviceCode] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleStart = () => {
    const normalizedCode = deviceCode.trim().toUpperCase();
    const normalizedUserId = userId.trim();

    // Validate the four-character hexadecimal device code.
    if (!/^[0-9A-F]{4}$/.test(normalizedCode)) {
      Alert.alert(
        "Invalid Device Code",
        "Enter exactly 4 hexadecimal characters (0–9 and A–F)."
      );
      return;
    }

    // User ID must contain digits only.
    if (!/^\d+$/.test(normalizedUserId)) {
      Alert.alert(
        "Invalid User ID",
        "Enter your numeric Iryo User ID."
      );
      return;
    }

    if (!password.trim()) {
      Alert.alert(
        "Password Required",
        "Please enter your account password."
      );
      return;
    }

    // Backend authentication is not connected yet.
    // Do not claim that the device has connected.
    Alert.alert(
      "Form Validated",
      "Your details pass the basic input checks. Backend authentication, device verification and session startup are not connected yet."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back navigation */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color="#1A2B4D"
            />
            <Text style={styles.backText}>Back</Text>
          </Pressable>

          {/* Brand */}
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Ionicons
                name="pulse-outline"
                size={26}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.brandName}>iryo</Text>
              <Text style={styles.brandCaption}>
                YOUR HEALTH COMPANION
              </Text>
            </View>
          </View>

          {/* Page introduction */}
          <View style={styles.headingSection}>
            <View style={styles.headingIcon}>
              <Ionicons
                name="hardware-chip-outline"
                size={29}
                color="#4265D8"
              />
            </View>

            <Text style={styles.heading}>
              Connect your{"\n"}health device
            </Text>

            <Text style={styles.subtitle}>
              Enter the code printed on your device and your
              Iryo account credentials to begin.
            </Text>
          </View>

          {/* Device setup form */}
          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                Device authentication
              </Text>

              <View style={styles.secureBadge}>
                <Ionicons
                  name="lock-closed-outline"
                  size={12}
                  color="#13856F"
                />
                <Text style={styles.secureBadgeText}>
                  SECURE SETUP
                </Text>
              </View>
            </View>

            {/* Device Code */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>DEVICE CODE</Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="qr-code-outline"
                  size={20}
                  color="#71809A"
                />

                <TextInput
                  value={deviceCode}
                  onChangeText={(text) =>
                    setDeviceCode(
                      text
                        .toUpperCase()
                        .replace(/[^0-9A-F]/g, "")
                        .slice(0, 4)
                    )
                  }
                  placeholder="e.g. A3F9"
                  placeholderTextColor="#A0A9B8"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={4}
                  autoComplete="off"
                  style={styles.input}
                  accessibilityLabel="Four character hexadecimal device code"
                  returnKeyType="next"
                />
              </View>

              <Text style={styles.helperText}>
                Enter the 4-character hexadecimal code printed
                on your device.
              </Text>
            </View>

            {/* User ID */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>IRYO USER ID</Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#71809A"
                />

                <TextInput
                  value={userId}
                  onChangeText={(text) =>
                    setUserId(text.replace(/\D/g, ""))
                  }
                  placeholder="Enter your User ID"
                  placeholderTextColor="#A0A9B8"
                  keyboardType="number-pad"
                  autoComplete="off"
                  style={styles.input}
                  accessibilityLabel="Iryo User ID"
                  returnKeyType="next"
                />
              </View>

              <Text style={styles.helperText}>
                Use the unique numeric ID assigned during signup.
              </Text>
            </View>

            {/* Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>PASSWORD</Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#71809A"
                />

                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#A0A9B8"
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
                    showPassword ? "Hide password" : "Show password"
                  }
                  onPress={() => setShowPassword(!showPassword)}
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
                    color="#71809A"
                  />
                </Pressable>
              </View>

              <Text style={styles.helperText}>
                Your password will be verified by the backend
                when authentication is integrated.
              </Text>
            </View>

            {/* Start button */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Start device connection"
              onPress={handleStart}
              style={({ pressed }) => [
                styles.startButton,
                pressed && styles.pressed,
              ]}
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
            </Pressable>

            <View style={styles.securityNote}>
              <Ionicons
                name="shield-checkmark-outline"
                size={17}
                color="#438B7D"
              />

              <Text style={styles.securityText}>
                Only connect to an authorised Iryo device.
                Never share your password with others.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Ionicons
              name="heart-outline"
              size={15}
              color="#9AA5B6"
            />

            <Text style={styles.footerText}>
              Your health journey, connected with Iryo.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FC",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 28,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingVertical: 9,
    paddingRight: 12,
    marginBottom: 20,
  },

  backText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A2B4D",
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  brandIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#192B52",
    alignItems: "center",
    justifyContent: "center",
  },

  brandName: {
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -1,
    color: "#192B52",
  },

  brandCaption: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.15,
    color: "#8490A5",
    marginTop: 2,
  },

  headingSection: {
    marginTop: 30,
    marginBottom: 25,
  },

  headingIcon: {
    width: 57,
    height: 57,
    borderRadius: 19,
    backgroundColor: "#E9EFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },

  heading: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "800",
    letterSpacing: -1,
    color: "#192B52",
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 21,
    color: "#78859B",
    marginTop: 10,
    maxWidth: 330,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E9EDF5",
    padding: 19,

    shadowColor: "#1A2B4D",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.045,
    shadowRadius: 18,
    elevation: 3,
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 26,
  },

  formTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#192B52",
  },

  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EAF8F4",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 10,
  },

  secureBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#13856F",
  },

  fieldContainer: {
    marginBottom: 21,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.15,
    color: "#71809A",
    marginBottom: 9,
  },

  inputContainer: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5EAF3",
    borderRadius: 15,
    backgroundColor: "#F9FAFD",
  },

  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 13,
    fontSize: 14,
    color: "#192B52",
  },

  eyeButton: {
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  helperText: {
    fontSize: 10,
    lineHeight: 16,
    color: "#8A96A9",
    marginTop: 8,
  },

  startButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 18,
    borderRadius: 17,
    backgroundColor: "#4265D8",
    marginTop: 3,

    shadowColor: "#4265D8",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.19,
    shadowRadius: 10,
    elevation: 4,
  },

  startButtonText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.78,
  },

  securityNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 18,
  },

  securityText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: "#7D899D",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 25,
  },

  footerText: {
    fontSize: 10,
    color: "#9AA5B6",
  },
});