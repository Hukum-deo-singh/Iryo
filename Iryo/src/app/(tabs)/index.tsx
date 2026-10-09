import { Ionicons } from "@react-native-vector-icons/ionicons";
import type { ComponentProps } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Metric = {
  title: string;
  value: string;
  unit: string;
  icon: IconName;
  accent: string;
  tint: string;
};

const METRICS: Metric[] = [
  {
    title: "Heart Rate",
    value: "76",
    unit: "bpm",
    icon: "heart-outline",
    accent: "#E85D8E",
    tint: "#FFF0F5",
  },
  {
    title: "Blood Pressure",
    value: "118/78",
    unit: "mmHg",
    icon: "pulse-outline",
    accent: "#5875E8",
    tint: "#EEF2FF",
  },
  {
    title: "Blood Oxygen",
    value: "98",
    unit: "%",
    icon: "water-outline",
    accent: "#159B9B",
    tint: "#E7F8F6",
  },
  {
    title: "Temperature",
    value: "36.7",
    unit: "°C",
    icon: "thermometer-outline",
    accent: "#D78A35",
    tint: "#FFF4E6",
  },
];

const PULSE_TREND = [
  { day: "M", value: 66, height: 43 },
  { day: "T", value: 69, height: 49 },
  { day: "W", value: 72, height: 56 },
  { day: "T", value: 70, height: 52 },
  { day: "F", value: 74, height: 61 },
  { day: "S", value: 71, height: 54 },
  { day: "S", value: 76, height: 67 },
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function MetricCard({ item }: { item: Metric }) {
  return (
    <View style={styles.metricCard}>
      <View
        style={[
          styles.metricIcon,
          { backgroundColor: item.tint },
        ]}
      >
        <Ionicons
          name={item.icon}
          size={21}
          color={item.accent}
        />
      </View>

      <Text style={styles.metricTitle}>{item.title}</Text>

      <View style={styles.metricValueRow}>
        <Text style={styles.metricValue}>{item.value}</Text>
        <Text style={styles.metricUnit}>{item.unit}</Text>
      </View>

      <Text style={styles.metricFootnote}>Preview value</Text>
    </View>
  );
}

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
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Brand header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Ionicons
                name="pulse-outline"
                size={25}
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

          <View style={styles.headerDate}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color="#64748B"
            />
            <Text style={styles.dateText}>{today}</Text>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>{getGreeting()} 👋</Text>

          <Text style={styles.pageTitle}>
            Your health,{ "\n" }in one view.
          </Text>

          <Text style={styles.pageSubtitle}>
            Keep track of your measurements and build a clearer
            picture of your health over time.
          </Text>
        </View>

        {/* Preview status */}
        <View style={styles.demoNotice}>
          <Ionicons
            name="information-circle-outline"
            size={21}
            color="#A76D18"
          />

          <View style={styles.demoNoticeText}>
            <Text style={styles.demoNoticeTitle}>
              Dashboard preview
            </Text>
            <Text style={styles.demoNoticeDescription}>
              Sample values only. No live device or backend data
              is connected yet.
            </Text>
          </View>
        </View>

        {/* Latest measurements */}
        <SectionHeading
          title="Latest measurements"
          subtitle="Example readings for the dashboard preview"
        />

        <View style={styles.metricsGrid}>
          {METRICS.map((item) => (
            <MetricCard key={item.title} item={item} />
          ))}
        </View>

        {/* Weekly pulse chart */}
        <View style={styles.trendHeader}>
          <SectionHeading
            title="Health trends"
            subtitle="A simple view of your measurement history"
          />

          <View style={styles.weekBadge}>
            <Ionicons
              name="calendar-outline"
              size={13}
              color="#64748B"
            />
            <Text style={styles.weekBadgeText}>7 days</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartTitleRow}>
            <View>
              <Text style={styles.chartTitle}>
                Heart rate
              </Text>

              <Text style={styles.chartSubtitle}>
                Sample readings · bpm
              </Text>
            </View>

            <View style={styles.chartIcon}>
              <Ionicons
                name="pulse-outline"
                size={22}
                color="#4265D8"
              />
            </View>
          </View>

          <View style={styles.chartSummary}>
            <Text style={styles.chartSummaryValue}>76</Text>
            <Text style={styles.chartSummaryUnit}>bpm</Text>
            <Text style={styles.chartSummaryLabel}>
              Demo value
            </Text>
          </View>

          <View style={styles.chart}>
            {PULSE_TREND.map((item, index) => (
              <View
                key={`${item.day}-${index}`}
                style={styles.chartColumn}
              >
                <View style={styles.chartTrack}>
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height: item.height,
                        backgroundColor:
                          index === PULSE_TREND.length - 1
                            ? "#4265D8"
                            : "#C9D5FA",
                      },
                    ]}
                  />
                </View>

                <Text
                  style={[
                    styles.chartDay,
                    index === PULSE_TREND.length - 1 &&
                      styles.chartDayActive,
                  ]}
                >
                  {item.day}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.chartFooter}>
            <Ionicons
              name="information-circle-outline"
              size={15}
              color="#8490A4"
            />

            <Text style={styles.chartFooterText}>
              Illustrative trend only. Actual history will come
              from saved measurements.
            </Text>
          </View>
        </View>

        {/* Recommendations */}
        <SectionHeading
          title="Recommendations"
          subtitle="A preview of future health insights"
        />

        <View style={styles.recommendationCard}>
          <View style={styles.recommendationIcon}>
            <Ionicons
              name="sparkles-outline"
              size={23}
              color="#7654C8"
            />
          </View>

          <View style={styles.recommendationContent}>
            <View style={styles.recommendationLabelRow}>
              <Text style={styles.recommendationLabel}>
                DAILY HABIT
              </Text>

              <View style={styles.previewPill}>
                <Text style={styles.previewPillText}>
                  PREVIEW
                </Text>
              </View>
            </View>

            <Text style={styles.recommendationTitle}>
              Make your readings consistent
            </Text>

            <Text style={styles.recommendationDescription}>
              Take measurements under similar conditions and
              follow your device instructions. Consistent
              readings help make trends easier to compare.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={17}
            color="#8290A5"
          />

          <Text style={styles.footerText}>
            Health measurements support awareness; they do not
            replace professional medical advice.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 135,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    letterSpacing: 1.2,
    color: "#8490A5",
    marginTop: 1,
  },

  headerDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9EDF5",
  },

  dateText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748B",
  },

  greetingSection: {
    marginBottom: 22,
  },

  greeting: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5875C9",
    marginBottom: 9,
  },

  pageTitle: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: -1.2,
    color: "#172746",
  },

  pageSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#728096",
    marginTop: 10,
    maxWidth: 330,
  },

  demoNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FFF8E9",
    borderWidth: 1,
    borderColor: "#F4E5C5",
    padding: 13,
    borderRadius: 17,
    marginBottom: 27,
  },

  demoNoticeText: {
    flex: 1,
  },

  demoNoticeTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#855B19",
    marginBottom: 3,
  },

  demoNoticeDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#8A734F",
  },

  sectionHeading: {
    flex: 1,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: -0.4,
    color: "#172746",
  },

  sectionSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: "#8490A5",
    marginTop: 4,
  },

  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  metricCard: {
    width: "48.3%",
    minHeight: 147,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#EDF0F6",
    padding: 13,
    marginBottom: 11,
    shadowColor: "#1C3156",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.035,
    shadowRadius: 12,
    elevation: 2,
  },

  metricIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  metricTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#718096",
    marginBottom: 7,
  },

  metricValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 4,
  },

  metricValue: {
    fontSize: 25,
    fontWeight: "800",
    color: "#192B52",
    letterSpacing: -0.7,
  },

  metricUnit: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8490A5",
  },

  metricFootnote: {
    fontSize: 10,
    color: "#9BA5B6",
    marginTop: 7,
  },

  trendHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 1,
  },

  weekBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 7,
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E9EDF5",
  },

  weekBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#EDF0F6",
    padding: 18,
    marginBottom: 27,
    shadowColor: "#1C3156",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
  },

  chartTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#253654",
  },

  chartSubtitle: {
    fontSize: 11,
    color: "#8490A5",
    marginTop: 4,
  },

  chartIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  chartSummary: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
    marginTop: 18,
  },

  chartSummaryValue: {
    fontSize: 31,
    fontWeight: "800",
    color: "#192B52",
    letterSpacing: -0.9,
  },

  chartSummaryUnit: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8490A5",
  },

  chartSummaryLabel: {
    fontSize: 10,
    color: "#9BA5B6",
    marginLeft: 4,
  },

  chart: {
    height: 110,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 12,
  },

  chartColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },

  chartTrack: {
    height: 76,
    width: 24,
    backgroundColor: "#F2F4FA",
    borderRadius: 9,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },

  chartBar: {
    width: 24,
    borderRadius: 8,
  },

  chartDay: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9BA5B6",
  },

  chartDayActive: {
    color: "#4265D8",
    fontWeight: "800",
  },

  chartFooter: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F7",
    paddingTop: 13,
    marginTop: 16,
  },

  chartFooterText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: "#8490A5",
  },

  recommendationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 13,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#EDF0F6",
    padding: 15,
    marginBottom: 24,
  },

  recommendationIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#F2EDFF",
    alignItems: "center",
    justifyContent: "center",
  },

  recommendationContent: {
    flex: 1,
  },

  recommendationLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  recommendationLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#8A76C3",
  },

  previewPill: {
    backgroundColor: "#F3EFFD",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
  },

  previewPillText: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#7654C8",
  },

  recommendationTitle: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
    color: "#253654",
  },

  recommendationDescription: {
    fontSize: 12,
    lineHeight: 19,
    color: "#7D899D",
    marginTop: 6,
  },

  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 5,
    marginBottom: 8,
  },

  footerText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    color: "#8490A5",
  },
});