// File: src/app/(tabs)/index.tsx

import { Ionicons } from "@react-native-vector-icons/ionicons";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentProps } from "react";

import {
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

type IconName = ComponentProps<typeof Ionicons>["name"];

type Metric = {
  title: string;
  value: string;
  unit: string;
  icon: IconName;
  accent: string;
  tint: string;
  description: string;
};

// --------------------------------------------------
// SAMPLE DASHBOARD DATA
//
// These are display-only demo values.
// Replace them with backend measurements later.
// --------------------------------------------------

const METRICS: Metric[] = [
  {
    title: "Heart Rate",
    value: "76",
    unit: "bpm",
    icon: "heart-outline",
    accent: SKEUO_COLORS.heart,
    tint: "#F8E8EC",
    description: "Sample reading",
  },
  {
    title: "Blood Pressure",
    value: "118/78",
    unit: "mmHg",
    icon: "pulse-outline",
    accent: SKEUO_COLORS.bloodPressure,
    tint: "#E8EDFA",
    description: "Sample reading",
  },
  {
    title: "Blood Oxygen",
    value: "98",
    unit: "%",
    icon: "water-outline",
    accent: SKEUO_COLORS.oxygen,
    tint: "#E2F0F4",
    description: "Sample reading",
  },
  {
    title: "Temperature",
    value: "36.7",
    unit: "°C",
    icon: "thermometer-outline",
    accent: SKEUO_COLORS.temperature,
    tint: "#F8EDE0",
    description: "Sample reading",
  },
];

const WEEKLY_TREND = [
  { day: "M", height: 36 },
  { day: "T", height: 47 },
  { day: "W", height: 42 },
  { day: "T", height: 55 },
  { day: "F", height: 49 },
  { day: "S", height: 63 },
  { day: "S", height: 57 },
];

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
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
      <Text style={styles.sectionTitle}>{title}</Text>

      <Text style={styles.sectionSubtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

// --------------------------------------------------
// RAISED METRIC CARD
// --------------------------------------------------

function MetricCard({ item }: { item: Metric }) {
  return (
    <View style={styles.metricOuter}>
      <LinearGradient
        colors={[SKEUO_COLORS.surfaceLight, item.tint]}
        style={styles.metricCard}
      >
        {/* Raised icon control */}
        <View style={styles.metricIconOuter}>
          <View
            style={[
              styles.metricIconInner,
              { backgroundColor: item.tint },
            ]}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={item.accent}
            />
          </View>
        </View>

        <Text style={styles.metricTitle}>
          {item.title}
        </Text>

        <View style={styles.metricValueRow}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.metricValue}
          >
            {item.value}
          </Text>

          <Text style={styles.metricUnit}>
            {item.unit}
          </Text>
        </View>

        <View style={styles.metricFooter}>
          <View
            style={[
              styles.metricIndicator,
              { backgroundColor: item.accent },
            ]}
          />

          <Text style={styles.metricDescription}>
            {item.description}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

// --------------------------------------------------
// INSTRUMENT STYLE GAUGE
// --------------------------------------------------

function InstrumentGauge() {
  return (
    <LinearGradient
      colors={[...SKEUO_GRADIENTS.instrumentPanel]}
      style={styles.instrumentCard}
    >
      <View style={styles.instrumentTop}>
        <View>
          <Text style={styles.instrumentEyebrow}>
            IRYO HEALTH MONITOR
          </Text>

          <Text style={styles.instrumentTitle}>
            Health overview
          </Text>
        </View>

        <View style={styles.instrumentBadge}>
          <Ionicons
            name="pulse-outline"
            size={20}
            color="#D9E5FF"
          />
        </View>
      </View>

      <View style={styles.instrumentDisplay}>
        <View style={styles.instrumentDisplayTop}>
          <View style={styles.instrumentStatus}>
            <View style={styles.instrumentStatusDot} />

            <Text style={styles.instrumentStatusText}>
              DEMO DISPLAY
            </Text>
          </View>

          <Ionicons
            name="hardware-chip-outline"
            size={19}
            color="#AFC2E8"
          />
        </View>

        <View style={styles.instrumentMainValue}>
          <Ionicons
            name="heart"
            size={24}
            color="#F08BA0"
          />

          <Text style={styles.instrumentValue}>
            76
          </Text>

          <View style={styles.instrumentUnitContainer}>
            <Text style={styles.instrumentUnit}>
              BPM
            </Text>

            <Text style={styles.instrumentUnitCaption}>
              HEART RATE
            </Text>
          </View>
        </View>

        <View style={styles.instrumentDivider} />

        <View style={styles.instrumentBottom}>
          <View>
            <Text style={styles.instrumentSmallLabel}>
              DEVICE STATUS
            </Text>

            <Text style={styles.instrumentSmallValue}>
              Not connected
            </Text>
          </View>

          <View style={styles.instrumentStatusIcon}>
            <Ionicons
              name="link-outline"
              size={19}
              color="#D3DDF3"
            />
          </View>
        </View>
      </View>

      <Text style={styles.instrumentFootnote}>
        Illustrative values only. No live sensor data is
        connected.
      </Text>
    </LinearGradient>
  );
}

// --------------------------------------------------
// WEEKLY TREND PANEL
// --------------------------------------------------

function WeeklyTrendCard() {
  return (
    <View style={styles.trendOuter}>
      <View style={styles.trendCard}>
        <View style={styles.trendHeader}>
          <View style={styles.trendHeadingText}>
            <Text style={styles.trendTitle}>
              Heart rate history
            </Text>

            <Text style={styles.trendSubtitle}>
              Example measurements · last 7 days
            </Text>
          </View>

          <View style={styles.trendIcon}>
            <Ionicons
              name="analytics-outline"
              size={21}
              color={SKEUO_COLORS.primary}
            />
          </View>
        </View>

        {/* Recessed chart area */}
        <View style={styles.chartInset}>
          <View style={styles.chartGuides}>
            <View style={styles.chartGuideLine} />
            <View style={styles.chartGuideLine} />
            <View style={styles.chartGuideLine} />
          </View>

          <View style={styles.chartBars}>
            {WEEKLY_TREND.map((item, index) => (
              <View
                key={`${item.day}-${index}`}
                style={styles.chartColumn}
              >
                <View style={styles.chartBarTrack}>
                  <LinearGradient
                    colors={
                      index === WEEKLY_TREND.length - 1
                        ? [
                            SKEUO_COLORS.primaryLight,
                            SKEUO_COLORS.primaryDark,
                          ]
                        : [
                            "#C9D5EC",
                            "#8DA4CD",
                          ]
                    }
                    style={[
                      styles.chartBar,
                      { height: item.height },
                    ]}
                  />
                </View>

                <Text
                  style={[
                    styles.chartDay,
                    index === WEEKLY_TREND.length - 1 &&
                      styles.chartDayActive,
                  ]}
                >
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.chartLegend}>
          <View style={styles.chartLegendDot} />

          <Text style={styles.chartLegendText}>
            Illustrative trend — not actual measurement history
          </Text>
        </View>
      </View>
    </View>
  );
}

// --------------------------------------------------
// DAILY INSIGHT PANEL
// --------------------------------------------------

function InsightCard() {
  return (
    <View style={styles.insightOuter}>
      <LinearGradient
        colors={[
          SKEUO_COLORS.surfaceLight,
          SKEUO_COLORS.backgroundLight,
        ]}
        style={styles.insightCard}
      >
        <View style={styles.insightIconOuter}>
          <View style={styles.insightIconInner}>
            <Ionicons
              name="sparkles-outline"
              size={22}
              color={SKEUO_COLORS.primary}
            />
          </View>
        </View>

        <View style={styles.insightContent}>
          <View style={styles.insightLabelRow}>
            <Text style={styles.insightLabel}>
              DAILY HABIT
            </Text>

            <View style={styles.previewBadge}>
              <Text style={styles.previewBadgeText}>
                PREVIEW
              </Text>
            </View>
          </View>

          <Text style={styles.insightTitle}>
            Make measurements consistent
          </Text>

          <Text style={styles.insightDescription}>
            Follow your device instructions and take readings
            under similar conditions. Consistency makes
            measurements easier to compare over time.
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

// --------------------------------------------------
// MAIN DASHBOARD
// --------------------------------------------------

export default function DashboardScreen() {
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
                  size={25}
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

          <View style={styles.dateOuter}>
            <View style={styles.dateInner}>
              <Ionicons
                name="calendar-outline"
                size={15}
                color={SKEUO_COLORS.textSecondary}
              />

              <Text style={styles.dateText}>
                {getFormattedDate()}
              </Text>
            </View>
          </View>
        </View>

        {/* ========================================
            GREETING
        ======================================== */}

        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>
            {getGreeting()} 👋
          </Text>

          <Text style={styles.pageTitle}>
            Your health,{"\n"}in one view.
          </Text>

          <Text style={styles.pageSubtitle}>
            Keep track of your measurements and understand
            your health history over time.
          </Text>
        </View>

        {/* ========================================
            DEMO DATA NOTICE
        ======================================== */}

        <View style={styles.demoOuter}>
          <View style={styles.demoInner}>
            <View style={styles.demoIcon}>
              <Ionicons
                name="information-circle-outline"
                size={21}
                color={SKEUO_COLORS.warning}
              />
            </View>

            <View style={styles.demoTextContainer}>
              <Text style={styles.demoTitle}>
                Preview mode
              </Text>

              <Text style={styles.demoDescription}>
                Values shown here are examples. Live device
                readings will appear after hardware and
                backend integration.
              </Text>
            </View>
          </View>
        </View>

        {/* ========================================
            INSTRUMENT PANEL
        ======================================== */}

        <InstrumentGauge />

        {/* ========================================
            HEALTH METRICS
        ======================================== */}

        <SectionHeading
          title="Health measurements"
          subtitle="Example readings from supported measurement types"
        />

        <View style={styles.metricsGrid}>
          {METRICS.map((item) => (
            <MetricCard
              key={item.title}
              item={item}
            />
          ))}
        </View>

        {/* ========================================
            HEALTH HISTORY
        ======================================== */}
 <SectionHeading
          title="Your health history"
          subtitle="A preview of the measurement trends section"
        />

        <WeeklyTrendCard />

        {/* ========================================
            INSIGHTS
        ======================================== */}

        <SectionHeading
          title="Health insights"
          subtitle="Helpful habits for consistent measurements"
        />

        <InsightCard />

        {/* ========================================
            FOOTER
        ======================================== */}

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={17}
            color={SKEUO_COLORS.textMuted}
          />

          <Text style={styles.footerText}>
            Health measurements support awareness and do
            not replace professional medical advice.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SKEUO_COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: SKEUO_LAYOUT_PADDING(),
    paddingTop: SKEUO_SPACING.md,
    paddingBottom: 145,
  },

  // HEADER

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SKEUO_SPACING.sm,
    marginBottom: 28,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SKEUO_SPACING.sm,
  },

  brandOuter: {
    width: 51,
    height: 51,
    padding: 3,
    borderRadius: 18,
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#D1D4CC",
    borderBottomColor: "#C3C7BE",
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
    letterSpacing: 1.15,
    color: SKEUO_COLORS.textMuted,
    marginTop: 2,
  },

  dateOuter: {
    padding: 3,
    borderRadius: 13,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: SKEUO_COLORS.borderLight,
    borderBottomColor: SKEUO_COLORS.borderLight,
  },

  dateInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: SKEUO_COLORS.surface,
  },

  dateText: {
    fontSize: 10,
    fontWeight: "700",
    color: SKEUO_COLORS.textSecondary,
  },

  // GREETING

  greetingSection: {
    marginBottom: 23,
  },

  greeting: {
    fontSize: 14,
    fontWeight: "800",
    color: SKEUO_COLORS.primary,
    marginBottom: 9,
  },

  pageTitle: {
    fontSize: 33,
    lineHeight: 40,
    fontWeight: "900",
    letterSpacing: -1.15,
    color: SKEUO_COLORS.text,
  },

  pageSubtitle: {
    maxWidth: 325,
    fontSize: 13,
    lineHeight: 21,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 10,
  },

  // DEMO NOTICE

  demoOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: SKEUO_COLORS.borderLight,
    borderBottomColor: SKEUO_COLORS.borderLight,
    marginBottom: 24,
  },

  demoInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
    padding: 13,
    borderRadius: 15,
    backgroundColor: "#F8F0DD",
    borderWidth: 1,
    borderColor: "#E5D5B6",
  },

  demoIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#F4E5C6",
    alignItems: "center",
    justifyContent: "center",
  },

  demoTextContainer: {
    flex: 1,
  },

  demoTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: "#79561E",
  },

  demoDescription: {
    fontSize: 11,
    lineHeight: 17,
    color: "#846F4C",
    marginTop: 4,
  },

  // INSTRUMENT PANEL

  instrumentCard: {
    borderRadius: SKEUO_RADIUS.panel,
    padding: 18,
    marginBottom: 29,
    borderWidth: 1,
    borderTopColor: "#65738B",
    borderLeftColor: "#58667E",
    borderRightColor: "#1F2938",
    borderBottomColor: "#1D2735",
    ...SKEUO_SHADOWS.floating,
  },

  instrumentTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  instrumentEyebrow: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
    color: "#AEBFE0",
  },

  instrumentTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 5,
  },

  instrumentBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SKEUO_COLORS.instrumentSurface,
    borderWidth: 1,
    borderTopColor: "#52617A",
    borderLeftColor: "#52617A",
    borderRightColor: "#202A39",
    borderBottomColor: "#202A39",
    ...SKEUO_SHADOWS.raisedSmall,
  },

  instrumentDisplay: {
    padding: 16,
    borderRadius: 19,
    backgroundColor: "#1E2939",
    borderWidth: 1,
    borderTopColor: "#17202D",
    borderLeftColor: "#17202D",
    borderRightColor: "#46536A",
    borderBottomColor: "#46536A",
  },

  instrumentDisplayTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  instrumentStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: "#2A3649",
    borderWidth: 1,
    borderColor: "#3A4960",
  },

  instrumentStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D8B366",
  },

  instrumentStatusText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: "#D5DFF2",
  },

  instrumentMainValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginTop: 22,
    marginBottom: 20,
  },

  instrumentValue: {
    fontSize: 49,
    lineHeight: 56,
    fontWeight: "900",
    letterSpacing: -1.7,
    color: "#FFFFFF",
  },

  instrumentUnitContainer: {
    flex: 1,
    marginLeft: 1,
  },

  instrumentUnit: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.1,
    color: "#B8C9E8",
  },

  instrumentUnitCaption: {
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#8F9FB9",
    marginTop: 4,
  },

  instrumentDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#46536A",
    marginBottom: 15,
  },

  instrumentBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  instrumentSmallLabel: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#98A9C5",
  },

  instrumentSmallValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 5,
  },

  instrumentStatusIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#2A3649",
    borderWidth: 1,
    borderColor: "#3C4A61",
  },

  instrumentFootnote: {
    fontSize: 10,
    lineHeight: 15,
    color: "#B6C3D9",
    marginTop: 13,
  },

  // SECTION HEADINGS

  sectionHeading: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "900",
    letterSpacing: -0.4,
    color: SKEUO_COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 11,
    lineHeight: 17,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 4,
  },

  // METRIC CARDS

  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  metricOuter: {
    width: "48.3%",
    padding: 3,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderLight,
    borderLeftColor: SKEUO_COLORS.borderLight,
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 13,
    ...SKEUO_SHADOWS.raised,
  },

  metricCard: {
    flex: 1,
    minHeight: 175,
    borderRadius: 15,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#DFE1DB",
    borderBottomColor: "#D5D8D0",
    padding: 12,
  },

  metricIconOuter: {
    alignSelf: "flex-start",
    padding: 3,
    borderRadius: 13,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: SKEUO_COLORS.borderLight,
    borderBottomColor: SKEUO_COLORS.borderLight,
    marginBottom: 13,
  },

  metricIconInner: {
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  metricTitle: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "800",
    color: SKEUO_COLORS.textSecondary,
    minHeight: 29,
  },

  metricValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "nowrap",
    gap: 4,
    marginTop: 3,
  },

  metricValue: {
    flexShrink: 1,
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: -0.6,
    color: SKEUO_COLORS.text,
  },

  metricUnit: {
    fontSize: 9,
    fontWeight: "800",
    color: SKEUO_COLORS.textSecondary,
  },

  metricFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: "auto",
    paddingTop: 11,
  },

  metricIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  metricDescription: {
    flexShrink: 1,
    fontSize: 9,
    color: SKEUO_COLORS.textSecondary,
  },

  // WEEKLY TREND

  trendOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.panel,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderLight,
    borderLeftColor: SKEUO_COLORS.borderLight,
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 29,
    ...SKEUO_SHADOWS.raised,
  },

  trendCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#D8DBD4",
    borderBottomColor: "#D0D3CC",
  },

  trendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },

  trendHeadingText: {
    flex: 1,
  },

  trendTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: SKEUO_COLORS.text,
  },

  trendSubtitle: {
    fontSize: 10,
    lineHeight: 16,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 5,
  },

  trendIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SKEUO_COLORS.surface,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#D1D4CC",
    borderBottomColor: "#C4C8BF",
    ...SKEUO_SHADOWS.raisedSmall,
  },

  chartInset: {
    height: 156,
    paddingHorizontal: 9,
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: 15,
    backgroundColor: "#DFE2DC",
    borderWidth: 1,
    borderTopColor: "#C7CAC2",
    borderLeftColor: "#C7CAC2",
    borderRightColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    overflow: "hidden",
  },

  chartGuides: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  chartGuideLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(111,122,110,0.17)",
  },

  chartBars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 7,
  },

  chartColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 7,
  },

  chartBarTrack: {
    width: "100%",
    maxWidth: 25,
    height: 84,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "#D0D4CD",
    borderWidth: 1,
    borderTopColor: "#C5C9C1",
    borderLeftColor: "#C5C9C1",
    borderRightColor: "#F8F9F6",
    borderBottomColor: "#F8F9F6",
  },

  chartBar: {
    width: "100%",
    borderRadius: 6,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "rgba(50,65,90,0.15)",
    borderBottomColor: "rgba(50,65,90,0.15)",
  },

  chartDay: {
    fontSize: 10,
    fontWeight: "700",
    color: SKEUO_COLORS.textSecondary,
  },

  chartDayActive: {
    fontWeight: "900",
    color: SKEUO_COLORS.primary,
  },

  chartLegend: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
    marginTop: 13,
  },

  chartLegendDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 4,
    backgroundColor: SKEUO_COLORS.primary,
  },

  chartLegendText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    color: SKEUO_COLORS.textSecondary,
  },

  // INSIGHT CARD

  insightOuter: {
    padding: 4,
    borderRadius: SKEUO_RADIUS.large,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: SKEUO_COLORS.borderDark,
    borderBottomColor: SKEUO_COLORS.borderDark,
    marginBottom: 22,
    ...SKEUO_SHADOWS.raised,
  },

  insightCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderTopColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
    borderRightColor: "#DFE1DB",
    borderBottomColor: "#D5D8D0",
  },

  insightIconOuter: {
    padding: 3,
    borderRadius: 13,
    backgroundColor: SKEUO_COLORS.backgroundDark,
    borderWidth: 1,
    borderTopColor: SKEUO_COLORS.borderDark,
    borderLeftColor: SKEUO_COLORS.borderDark,
    borderRightColor: SKEUO_COLORS.borderLight,
    borderBottomColor: SKEUO_COLORS.borderLight,
  },

  insightIconInner: {
    width: 37,
    height: 37,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SKEUO_COLORS.surfaceLight,
  },

  insightContent: {
    flex: 1,
  },

  insightLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },

  insightLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
    color: SKEUO_COLORS.primary,
  },

  previewBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: "#E0E7F7",
    borderWidth: 1,
    borderColor: "#C9D5ED",
  },

  previewBadgeText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
    color: SKEUO_COLORS.primaryDark,
  },

  insightTitle: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "900",
    color: SKEUO_COLORS.text,
  },

  insightDescription: {
    fontSize: 10,
    lineHeight: 17,
    color: SKEUO_COLORS.textSecondary,
    marginTop: 6,
  },

  // FOOTER

  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 4,
    marginBottom: 12,
  },

  footerText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    color: SKEUO_COLORS.textMuted,
  },
});

function SKEUO_LAYOUT_PADDING(): number {
  return SKEUO_SPACING.lg + 2;
}