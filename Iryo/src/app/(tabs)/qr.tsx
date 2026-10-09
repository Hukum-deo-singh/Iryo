// File: src/app/(tabs)/qr.tsx

import { Ionicons } from "@react-native-vector-icons/ionicons";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef } from "react";

import {
  ActivityIndicator,
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
// QR SCANNER SCREEN
// --------------------------------------------------

export default function QRScannerScreen() {
  const [permission, requestPermission] =
    useCameraPermissions();

  const isFocused = useIsFocused();

  // Prevent duplicate navigation when the same QR is detected
  // repeatedly by the camera.
  const scanHandled = useRef(false);

  // Reset scanning when the user returns to this tab.
  useEffect(() => {
    if (isFocused) {
      scanHandled.current = false;
    }
  }, [isFocused]);

  // --------------------------------------------------
  // HANDLE QR SCAN
  // --------------------------------------------------

  const handleBarcodeScanned = useCallback(
    ({ data }: { data: string }) => {
      if (!isFocused || scanHandled.current) {
        return;
      }

      if (!data || !data.trim()) {
        return;
      }

      scanHandled.current = true;

      /*
       * Open the Device Setup page.
       *
       * We are not assuming a QR payload format yet.
       * Member 2 must confirm the hardware QR specification
       * before the frontend interprets or verifies its data.
       *
       * The four-character hexadecimal Device Code will be
       * entered on the next screen, according to the
       * current project requirement.
       */

      router.push("/device-setup");
    },
    [isFocused]
  );

  // --------------------------------------------------
  // CAMERA PERMISSION
  // --------------------------------------------------

  const handleRequestPermission = async () => {
    try {
      await requestPermission();
    } catch {
      // The permission UI remains available if the request fails.
    }
  };

  // --------------------------------------------------
  // PERMISSION LOADING STATE
  // --------------------------------------------------

  if (!permission) {
    return (
      <SafeAreaView
        style={styles.safeArea}
        edges={["top"]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={SKEUO_COLORS.primary}
          />

          <Text style={styles.loadingText}>
            Preparing your scanner...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // --------------------------------------------------
  // MAIN SCREEN
  // --------------------------------------------------

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ==========================================
            HEADER
        ========================================== */}

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>
              IRYO CONNECT
            </Text>

            <Text style={styles.pageTitle}>
              Scan your device
            </Text>

            <Text style={styles.pageSubtitle}>
              Scan a QR code to open the device setup process.
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
                name="qr-code-outline"
                size={27}
                color="#FFFFFF"
              />
            </LinearGradient>
          </View>
        </View>

        {/* ==========================================
            PROGRESS INDICATOR
        ========================================== */}

        <View style={styles.progressOuter}>
          <View style={styles.progressInner}>
            <View style={styles.progressStep}>
              <View style={styles.activeStepOuter}>
                <View style={styles.activeStep}>
                  <Text style={styles.activeStepText}>
                    1
                  </Text>
                </View>
              </View>

              <Text style={styles.activeStepLabel}>
                Scan QR
              </Text>
            </View>

            <View style={styles.progressLine} />

            <View style={styles.progressStep}>
              <View style={styles.inactiveStepOuter}>
                <Text style={styles.inactiveStepText}>
                  2
                </Text>
              </View>

              <Text style={styles.inactiveStepLabel}>
                Device setup
              </Text>
            </View>
          </View>
        </View>

        {/* ==========================================
            CAMERA PANEL
        ========================================== */}

        <View style={styles.cameraOuter}>
          <LinearGradient
            colors={[
              ...SKEUO_GRADIENTS.instrumentPanel,
            ]}
            style={styles.cameraCard}
          >
            {/* Camera card header */}

            <View style={styles.cameraHeader}>
              <View style={styles.scannerStatusOuter}>
                <View style={styles.scannerStatusInner}>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          permission.granted
                            ? "#63D2A4"
                            : "#D9B66F",
                      },
                    ]}
                  />

                  <Text style={styles.scannerStatusText}>
                    {permission.granted
                      ? "CAMERA READY"
                      : "CAMERA ACCESS"}
                  </Text>
                </View>
              </View>

              <View style={styles.cameraHeaderIcon}>
                <Ionicons
                  name="scan-outline"
                  size={21}
                  color="#DDE7FF"
                />
              </View>
            </View>

            <Text style={styles.cameraTitle}>
              Position the QR code
            </Text>

            <Text style={styles.cameraSubtitle}>
              Hold your device steady and keep the entire
              QR code inside the frame.
            </Text>

            {/* ======================================
                CAMERA VIEWPORT
            ====================================== */}

            <View style={styles.cameraViewportOuter}>
              <View style={styles.cameraViewport}>
                {!permission.granted ? (
                  // CAMERA PERMISSION SCREEN

                  <View style={styles.permissionContent}>
                    <View style={styles.permissionIconOuter}>
                      <View style={styles.permissionIconInner}>
                        <Ionicons
                          name="camera-outline"
                          size={32}
                          color={SKEUO_COLORS.primary}
                        />
                      </View>
                    </View>

                    <Text style={styles.permissionTitle}>
                      Camera access required
                    </Text>

                    <Text style={styles.permissionDescription}>
                      Allow camera access to scan the QR code
                      on your Iryo device.
                    </Text>

                    <Pressable
                      accessibilityRole="button"
                      onPress={handleRequestPermission}
                      style={({ pressed }) => [
                        styles.permissionButtonOuter,
                        pressed && styles.pressed,
                      ]}
                    >
                      <LinearGradient
                        colors={[
                          ...SKEUO_GRADIENTS.primaryButton,
                        ]}
                        style={styles.permissionButton}
                      >
                        <Ionicons
                          name="camera-outline"
                          size={19}
                          color="#FFFFFF"
                        />

                        <Text
                          style={styles.permissionButtonText}
                        >
                          Allow Camera Access
                        </Text>
                      </LinearGradient>
                    </Pressable>

                    {!permission.canAskAgain && (
                      <Text style={styles.settingsHint}>
                        Camera access has been denied.
                        Enable it from your device settings.
                      </Text>
                    )}
                  </View>
                ) : !isFocused ? (
                  // PAUSED STATE

                  <View style={styles.permissionContent}>
                    <Ionicons
                      name="pause-circle-outline"
                      size={45}
                      color={SKEUO_COLORS.textMuted}
                    />

                    <Text style={styles.permissionTitle}>
                      Scanner paused
                    </Text>

                    <Text style={styles.permissionDescription}>
                      Return to this tab to scan a QR code.
                    </Text>
                  </View>
                ) : (
                  // LIVE CAMERA

                  <>
                    <CameraView
                      style={StyleSheet.absoluteFillObject}
                      facing="back"
                      barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                      }}
                      onBarcodeScanned={
                        scanHandled.current
                          ? undefined
                          : handleBarcodeScanned
                      }
                    />

                    {/* Visual scanning frame */}

                    <View
                      pointerEvents="none"
                      style={styles.scanOverlay}
                    >
                      <View style={styles.scanFrame}>
                        <View
                          style={[
                            styles.corner,
                            styles.topLeft,
                          ]}
                        />

                        <View
                          style={[
                            styles.corner,
                            styles.topRight,
                          ]}
                        />

                        <View
                          style={[
                            styles.corner,
                            styles.bottomLeft,
                          ]}
                        />

                        <View
                          style={[
                            styles.corner,
                            styles.bottomRight,
                          ]}
                        />

                        <View style={styles.scanCenter}>
                          <Ionicons
                            name="qr-code-outline"
                            size={77}
                            color="#FFFFFF"
                          />
                        </View>
                      </View>

                      <View style={styles.scanHintOuter}>
                        <Text style={styles.scanHint}>
                          ALIGN QR CODE WITHIN FRAME
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>

            {/* CAMERA FOOTER */}

            <View style={styles.cameraFooter}>
              <View style={styles.cameraFooterIcon}>
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color="#D6E2FF"
                />
              </View>

              <Text style={styles.cameraFooterText}>
                Scan the intended Iryo QR code. The scan
                itself does not authenticate the device.
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* ==========================================
            NEXT STEP CARD
        ========================================== */}

        <View style={styles.nextOuter}>
          <LinearGradient
            colors={[
              ...SKEUO_GRADIENTS.raisedSurface,
            ]}
            style={styles.nextCard}
          >
            <View style={styles.nextIconOuter}>
              <View style={styles.nextIconInner}>
                <Ionicons
                  name="keypad-outline"
                  size={23}
                  color={SKEUO_COLORS.primary}
                />
              </View>
            </View>

            <View style={styles.nextContent}>
              <Text style={styles.nextTitle}>
                What happens next?
              </Text>

              <Text style={styles.nextDescription}>
                After scanning, enter the 4-character
                hexadecimal Device Code printed on your
                device, your Iryo User ID and your password.
                Then press START.
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* ==========================================
            SECURITY NOTE
        ========================================== */}

        <View style={styles.securityNote}>
          <Ionicons
            name="shield-checkmark-outline"
            size={17}
            color={SKEUO_COLORS.textMuted}
          />

          <Text style={styles.securityText}>
            Device verification and account authentication
            must be completed by the Java backend.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --------------------------------------------------
// STYLES — STRICT SKEUOMORPHIC VISUAL LANGUAGE
// --------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SKEUO_COLORS.background,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },

  loadingText: {
    fontSize: 13,
    fontWeight: "700",
    color: SKEUO_COLORS.textSecondary,
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
    marginBottom: 22,
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.6,
    color: SKEUO_COLORS.primary,
    marginBottom: 7,
  },

  pageTitle: {
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.7,
    color: SKEUO_COLORS.text,
  },

  pageSubtitle: {
    fontSize: 12,
    lineHeight: 19,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 7,
  },

  headerOuter: {
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

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  // PROGRESS

  progressOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    marginBottom: 23,
  },

  progressInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    backgroundColor: SKEUO_COLORS.surface,
  },

  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  activeStepOuter: {
    width: 31,
    height: 31,
    padding: 3,
    borderRadius: 12,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  activeStep: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: SKEUO_COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  activeStepText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  inactiveStepOuter: {
    width: 31,
    height: 31,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  inactiveStepText: {
    fontSize: 11,
    fontWeight: "800",
    color: SKEUO_COLORS.textMuted,
  },

  activeStepLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: SKEUO_COLORS.primary,
  },

  inactiveStepLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: SKEUO_COLORS.textMuted,
  },

  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: SKEUO_COLORS.border,
    marginHorizontal: 9,
  },

  // CAMERA CARD

  cameraOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.panel,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 21,
    ...SKEUO_SHADOWS.raised,
  },

  cameraCard: {
    padding: 16,
    borderRadius: 21,
    borderWidth: 1,
    borderTopColor: "#68768D",
    borderLeftColor: "#58667D",
    borderRightColor: "#1E2938",
    borderBottomColor: "#1E2938",
    overflow: "hidden",
  },

  cameraHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 17,
  },

  scannerStatusOuter: {
    padding: 3,
    borderRadius: 11,
    backgroundColor: "#1E2938",
    borderWidth: 1,
    borderTopColor: "#1A2331",
    borderLeftColor: "#1A2331",
    borderRightColor: "#47556C",
    borderBottomColor: "#47556C",
  },

  scannerStatusInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  scannerStatusText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: "#DCE5F7",
  },

  cameraHeaderIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: SKEUO_COLORS.instrumentSurface,
    borderWidth: 1,
    borderTopColor: "#56647A",
    borderLeftColor: "#56647A",
    borderRightColor: "#1D2735",
    borderBottomColor: "#1D2735",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraTitle: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
    color: "#FFFFFF",
  },

  cameraSubtitle: {
    fontSize: 11,
    lineHeight: 18,
    color: "#BCC8DE",
    marginTop: 7,
    marginBottom: 17,
  },

  // CAMERA VIEWPORT — RECESSED PANEL

  cameraViewportOuter: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: "#1D2736",
    borderWidth: 1,
    borderTopColor: "#182231",
    borderLeftColor: "#182231",
    borderRightColor: "#657187",
    borderBottomColor: "#657187",
  },

  cameraViewport: {
    height: 340,
    borderRadius: 15,
    backgroundColor: "#111B2A",
    overflow: "hidden",
    position: "relative",
  },

  // PERMISSION STATE

  permissionContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
  },

  permissionIconOuter: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: "#0E1827",
    borderWidth: 1,
    borderTopColor: "#0B1420",
    borderLeftColor: "#0B1420",
    borderRightColor: "#45536A",
    borderBottomColor: "#45536A",
    marginBottom: 17,
  },

  permissionIconInner: {
    width: 56,
    height: 56,
    borderRadius: 15,
    backgroundColor: SKEUO_COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  permissionTitle: {
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 5,
  },

  permissionDescription: {
    fontSize: 11,
    lineHeight: 18,
    color: "#B8C5DB",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 15,
  },

  permissionButtonOuter: {
    padding: 3,
    borderRadius: 15,
    backgroundColor: "#1A2637",
    borderWidth: 1,
    borderTopColor: "#63718A",
    borderLeftColor: "#63718A",
    borderRightColor: "#111B29",
    borderBottomColor: "#111B29",
    ...SKEUO_SHADOWS.raisedSmall,
  },

  permissionButton: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 11,
  },

  permissionButtonText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  settingsHint: {
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    color: "#B8C5DB",
    marginTop: 12,
  },

  // SCAN OVERLAY

  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  scanFrame: {
    width: 225,
    height: 225,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  corner: {
    position: "absolute",
    width: 34,
    height: 34,
    borderColor: "#FFFFFF",
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },

  scanCenter: {
    width: 106,
    height: 106,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20, 32, 49, 0.48)",
    borderWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    borderLeftColor: "rgba(255,255,255,0.2)",
    borderRightColor: "rgba(0,0,0,0.3)",
    borderBottomColor: "rgba(0,0,0,0.3)",
  },

  scanHintOuter: {
    position: "absolute",
    bottom: 18,
    left: 9,
    right: 9,
    alignItems: "center",
    paddingVertical: 9,
    borderRadius: 11,
    backgroundColor: "rgba(12, 23, 38, 0.88)",
    borderWidth: 1,
    borderTopColor: "#46546B",
    borderLeftColor: "#46546B",
    borderRightColor: "#101A28",
    borderBottomColor: "#101A28",
  },

  scanHint: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.7,
    color: "#EDF2FC",
  },

  // CAMERA FOOTER

  cameraFooter: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 14,
  },

  cameraFooterIcon: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#2D3B50",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraFooterText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: "#C0CBE0",
    marginTop: 3,
  },

  // NEXT STEP — RAISED PANEL

  nextOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 18,
    ...SKEUO_SHADOWS.raised,
  },

  nextCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#E0E2DC",
    borderBottomColor: "#D4D7D0",
  },

  nextIconOuter: {
    padding: 3,
    borderRadius: 13,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
  },

  nextIconInner: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SKEUO_COLORS.surface,
  },

  nextContent: {
    flex: 1,
  },

  nextTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: SKEUO_COLORS.text,
    marginBottom: 6,
  },

  nextDescription: {
    fontSize: 11,
    lineHeight: 18,
    color: SKEUO_COLORS.textSecondary,
  },

  // SECURITY FOOTER

  securityNote: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 7,
    paddingHorizontal: 5,
    marginBottom: 12,
  },

  securityText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    color: SKEUO_COLORS.textMuted,
  },

  // INTERACTION

  pressed: {
    opacity: 0.78,
  },
});