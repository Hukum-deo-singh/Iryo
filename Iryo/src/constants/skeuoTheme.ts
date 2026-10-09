// File: src/constants/skeuoTheme.ts

/**
 * IRYO — SKEUOMORPHIC DESIGN SYSTEM
 *
 * Shared visual tokens for the entire application.
 * All screens should use these values for consistent styling.
 */

// --------------------------------------------------
// 1. COLOR PALETTE
// --------------------------------------------------

export const SKEUO_COLORS = {
  // Application backgrounds
  background: "#E5E7E3",
  backgroundLight: "#F1F2EF",
  backgroundDark: "#D9DBD6",

  // Raised surfaces
  surface: "#F4F5F1",
  surfaceLight: "#FFFFFF",
  surfaceDark: "#E1E3DE",

  // Borders and physical edges
  borderLight: "#FFFFFF",
  border: "#D0D3CC",
  borderDark: "#BFC3BB",

  // Primary typography
  text: "#202C40",
  textSecondary: "#606C7D",
  textMuted: "#8992A0",

  // Brand colors
  primary: "#36599C",
  primaryLight: "#6F8ECD",
  primaryDark: "#233E74",

  // Medical indicators
  heart: "#B94F66",
  oxygen: "#4388AA",
  temperature: "#C18445",
  bloodPressure: "#5672B6",
  activity: "#368577",

  // Status colors
  success: "#28785F",
  warning: "#A56A24",
  danger: "#B84550",

  // Instrument-style dark panels
  instrumentBackground: "#283447",
  instrumentSurface: "#344258",
  instrumentBorder: "#46546B",
  instrumentText: "#F5F7FB",
  instrumentMuted: "#B9C5D9",

  // Navigation
  navigationBackground: "#E9EAE6",
  navigationActive: "#36599C",
  navigationInactive: "#7C8797",

  // Form states
  inputBackground: "#E1E3DE",
  inputBorder: "#C8CBC4",
  inputFocus: "#5478BC",
  placeholder: "#929BA8",
} as const;


// --------------------------------------------------
// 2. GRADIENTS
// Used with expo-linear-gradient
// --------------------------------------------------

export const SKEUO_GRADIENTS = {
  appBackground: [
    "#F1F2EF",
    "#E0E2DD",
  ] as const,

  raisedPanel: [
    "#FFFFFF",
    "#F1F2EF",
  ] as const,

  raisedPanelSubtle: [
    "#F8F9F6",
    "#E8EAE5",
  ] as const,

  raisedSurface: ["#FFFFFF", "#F1F2EF"] as const,

  insetPanel: [
    "#D7D9D4",
    "#E9EBE6",
  ] as const,

  primaryButton: [
    "#6585C5",
    "#36599C",
    "#294780",
  ] as const,

  secondaryButton: [
    "#FFFFFF",
    "#DFE1DC",
  ] as const,

  instrumentPanel: [
    "#3A4960",
    "#283447",
  ] as const,

  medicalCard: [
    "#FFFFFF",
    "#F0F2ED",
  ] as const,
} as const ;

// --------------------------------------------------
// 3. BORDER RADIUS
// --------------------------------------------------

export const SKEUO_RADIUS = {
  small: 9,
  medium: 14,
  large: 19,
  panel: 24,
  card: 22,
  round: 999,
} as const;


// --------------------------------------------------
// 4. SPACING SYSTEM
// --------------------------------------------------

export const SKEUO_SPACING = {
  xxs: 3,
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  section: 38,
} as const;


// --------------------------------------------------
// 5. TYPOGRAPHY
// --------------------------------------------------

export const SKEUO_TYPOGRAPHY = {
  caption: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0.6,
  },

  label: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.4,
  },

  body: {
    fontSize: 14,
    lineHeight: 21,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 23,
  },

  heading: {
    fontSize: 22,
    lineHeight: 29,
    letterSpacing: -0.4,
  },

  title: {
    fontSize: 30,
    lineHeight: 37,
    letterSpacing: -0.8,
  },
} as const;


// --------------------------------------------------
// 6. RAISED SURFACE STYLE
// --------------------------------------------------

export const SKEUO_RAISED_BORDER = {
  borderWidth: 1,
  borderTopColor: "#FFFFFF",
  borderLeftColor: "#FFFFFF",
  borderRightColor: "#D0D3CC",
  borderBottomColor: "#C4C7C0",
} as const;


// --------------------------------------------------
// 7. INSET SURFACE STYLE
// Used for recessed inputs and instrument wells
// --------------------------------------------------

export const SKEUO_INSET_BORDER = {
  borderWidth: 1,
  borderTopColor: "#BEC2BA",
  borderLeftColor: "#BEC2BA",
  borderRightColor: "#FFFFFF",
  borderBottomColor: "#FFFFFF",
} as const;


// --------------------------------------------------
// 8. SHADOWS
// --------------------------------------------------

export const SKEUO_SHADOWS = {
  raised: {
    shadowColor: "#74796F",
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.17,
    shadowRadius: 7,
    elevation: 5,
  },

  raisedSmall: {
    shadowColor: "#7A8077",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 3,
  },

  floating: {
    shadowColor: "#656B63",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 7,
  },

  pressed: {
    shadowColor: "#8B9087",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
} as const;


// --------------------------------------------------
// 9. ANIMATION TIMINGS
// --------------------------------------------------

export const SKEUO_ANIMATION = {
  pressIn: 90,
  pressOut: 150,
  transition: 220,
  screenTransition: 280,
} as const;


// --------------------------------------------------
// 10. LAYOUT CONSTANTS
// --------------------------------------------------

export const SKEUO_LAYOUT = {
  screenPadding: 20,
  cardPadding: 18,
  inputHeight: 54,
  buttonHeight: 54,
  minimumTouchTarget: 44,
  bottomNavigationHeight: 70,
} as const;