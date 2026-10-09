import { Ionicons } from "@react-native-vector-icons/ionicons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const isFocused = useIsFocused();
  const scanHandled = useRef(false);

  // Reset scanning when the user returns to this tab.
  useEffect(() => {
    if (isFocused) {
      scanHandled.current = false;
      setScanned(false);
    }
  }, [isFocused]);

  // Handle a successful QR scan only once.
  const handleBarcodeScanned = useCallback(
    ({ data }: { data: string }) => {
      if (scanHandled.current) {
        return;
      }

      const qrPayload = data.trim();

      if (!qrPayload) {
        return;
      }

      scanHandled.current = true;
      setScanned(true);

      // Open Device Setup and pass along the scanned QR content.
      // The backend must verify the QR content before trusting it.
      router.push({
        pathname: "/device-setup",
        params: {
          qrPayload,
        },
      });
    },
    []
  );

  const handleRequestPermission = async () => {
    try {
      await requestPermission();
    } catch {
      // The permission screen remains visible if the request fails.
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.eyebrow}>IRYO CONNECT</Text>

            <Text style={styles.title}>
              Scan your device
            </Text>

            <Text style={styles.subtitle}>
              Scan the QR code on your Iryo device to continue
              to the device authentication page.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="qr-code-outline"
              size={27}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={styles.progressStep}>
            <View style={styles.progressNumberActive}>
              <Text style={styles.progressNumberTextActive}>1</Text>
            </View>

            <Text style={styles.progressLabelActive}>
              Scan QR
            </Text>
          </View>

          <View style={styles.progressLine} />

          <View style={styles.progressStep}>
            <View style={styles.progressNumber}>
              <Text style={styles.progressNumberText}>2</Text>
            </View>

            <Text style={styles.progressLabel}>
              Device setup
            </Text>
          </View>
        </View>

        {/* Camera card */}
        <View style={styles.cameraCard}>
          <View style={styles.cameraCardHeader}>
            <View style={styles.liveIndicator}>
              <View style={styles.statusDot} />

              <Text style={styles.liveText}>
                QR SCANNER
              </Text>
            </View>

            <Ionicons
              name="shield-checkmark-outline"
              size={21}
              color="#A9C0FF"
            />
          </View>

          <Text style={styles.cameraTitle}>
            Position the QR code
          </Text>

          <Text style={styles.cameraSubtitle}>
            Keep the device QR code inside the scanning frame.
          </Text>

          {/* Camera preview / permission state */}
          <View style={styles.cameraViewport}>
            {!permission ? (
              <View style={styles.permissionState}>
                <ActivityIndicator
                  size="large"
                  color="#A9C0FF"
                />

                <Text style={styles.permissionTitle}>
                  Preparing camera...
                </Text>
              </View>
            ) : !permission.granted ? (
              <View style={styles.permissionState}>
                <View style={styles.permissionIcon}>
                  <Ionicons
                    name="camera-outline"
                    size={31}
                    color="#A9C0FF"
                  />
                </View>

                <Text style={styles.permissionTitle}>
                  Camera access needed
                </Text>

                <Text style={styles.permissionDescription}>
                  Allow camera access to scan your device's QR
                  code.
                </Text>

                <Pressable
                  accessibilityRole="button"
                  onPress={handleRequestPermission}
                  style={({ pressed }) => [
                    styles.permissionButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.permissionButtonText}>
                    Allow Camera Access
                  </Text>
                </Pressable>

                {!permission.canAskAgain && (
                  <Text style={styles.settingsHint}>
                    If access was permanently denied, enable
                    camera permission in your device settings.
                  </Text>
                )}
              </View>
            ) : !isFocused ? (
              <View style={styles.permissionState}>
                <Ionicons
                  name="scan-outline"
                  size={45}
                  color="#A9C0FF"
                />

                <Text style={styles.permissionTitle}>
                  Scanner paused
                </Text>

                <Text style={styles.permissionDescription}>
                  Return to this tab to scan a QR code.
                </Text>
              </View>
            ) : scanned ? (
              <View style={styles.permissionState}>
                <ActivityIndicator
                  size="large"
                  color="#A9C0FF"
                />

                <Text style={styles.permissionTitle}>
                  Opening device setup...
                </Text>
              </View>
            ) : (
              <>
                <CameraView
                  style={StyleSheet.absoluteFillObject}
                  facing="back"
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                  }}
                  onBarcodeScanned={handleBarcodeScanned}
                />

                {/* Visual scanning guide */}
                <View
                  pointerEvents="none"
                  style={styles.cameraOverlay}
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
                  </View>

                  <Text style={styles.frameHint}>
                    Align the QR code inside the frame
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.cameraFooter}>
            <Ionicons
              name="information-circle-outline"
              size={19}
              color="#B9C7E7"
            />

            <Text style={styles.cameraFooterText}>
              Use the QR code belonging to your authorised
              Iryo device.
            </Text>
          </View>
        </View>

        {/* What happens next */}
        <View style={styles.nextCard}>
          <View style={styles.nextIcon}>
            <Ionicons
              name="keypad-outline"
              size={23}
              color="#4567D8"
            />
          </View>

          <View style={styles.nextContent}>
            <Text style={styles.nextTitle}>
              What happens next?
            </Text>

            <Text style={styles.nextDescription}>
              After scanning, enter the 4-character hexadecimal
              Device Code printed on your device, your Iryo
              User ID and your password. Then press START.
            </Text>
          </View>
        </View>

        {/* Security note */}
        <View style={styles.securityNote}>
          <Ionicons
            name="lock-closed-outline"
            size={16}
            color="#8490A5"
          />

          <Text style={styles.securityText}>
            Scanning a QR code does not authenticate a user
            or verify a device. The backend must verify the
            submitted details.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 135,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },

  headerTextContainer: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.7,
    color: "#5875C9",
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.7,
    color: "#192B52",
  },

  subtitle: {
    fontSize: 12,
    lineHeight: 19,
    color: "#77849A",
    marginTop: 7,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#192B52",
    alignItems: "center",
    justifyContent: "center",
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    paddingHorizontal: 4,
  },

  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  progressNumberActive: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "#4265D8",
    alignItems: "center",
    justifyContent: "center",
  },

  progressNumberTextActive: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  progressNumber: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "#E6EAF3",
    alignItems: "center",
    justifyContent: "center",
  },

  progressNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8490A5",
  },

  progressLabelActive: {
    fontSize: 11,
    fontWeight: "800",
    color: "#4265D8",
  },

  progressLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8490A5",
  },

  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDE3EF",
    marginHorizontal: 12,
  },

  cameraCard: {
    backgroundColor: "#192B52",
    borderRadius: 25,
    padding: 16,
    marginBottom: 20,
    overflow: "hidden",
  },

  cameraCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.09)",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#62D8AC",
  },

  liveText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: "#D5E0FF",
  },

  cameraTitle: {
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.4,
    color: "#FFFFFF",
  },

  cameraSubtitle: {
    fontSize: 11,
    lineHeight: 18,
    color: "#BAC8E7",
    marginTop: 6,
    marginBottom: 17,
  },

  cameraViewport: {
    height: 350,
    borderRadius: 20,
    backgroundColor: "#0D1830",
    overflow: "hidden",
    position: "relative",
  },

  permissionState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  permissionIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },

  permissionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 15,
  },

  permissionDescription: {
    fontSize: 12,
    lineHeight: 19,
    color: "#C0CBE3",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 17,
  },

  permissionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 6,
  },

  permissionButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#192B52",
  },

  settingsHint: {
    fontSize: 10,
    lineHeight: 16,
    color: "#BAC8E7",
    textAlign: "center",
    marginTop: 12,
  },

  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  scanFrame: {
    width: 225,
    height: 225,
    borderRadius: 22,
  },

  corner: {
    position: "absolute",
    width: 35,
    height: 35,
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

  frameHint: {
    position: "absolute",
    bottom: 19,
    left: 12,
    right: 12,
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "rgba(13,24,48,0.68)",
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden",
  },

  cameraFooter: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginTop: 15,
  },

  cameraFooterText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: "#BAC8E7",
  },

  nextCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 13,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#E9EDF5",
    padding: 16,
    marginBottom: 17,
  },

  nextIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  nextContent: {
    flex: 1,
  },

  nextTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#192B52",
    marginBottom: 7,
  },

  nextDescription: {
    fontSize: 11,
    lineHeight: 19,
    color: "#77849A",
  },

  securityNote: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 7,
    paddingHorizontal: 5,
    marginBottom: 8,
  },

  securityText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: "#8490A5",
  },

  pressed: {
    opacity: 0.75,
  },
});