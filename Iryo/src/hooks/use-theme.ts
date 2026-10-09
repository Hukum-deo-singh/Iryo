// File: src/hooks/use-theme.ts

import { useColorScheme as useNativeColorScheme } from "react-native";

import { SKEUO_COLORS } from "../constants/skeuoTheme";

/**
 * IRYO — THEME HOOK
  *
   * Provides consistent colours from the central
    * Skeuomorphism design system.
     *
      * This file maintains compatibility with common
       * Expo starter-template colour names.
        */

        // --------------------------------------------------
        // THEME COLOURS
        // --------------------------------------------------

        const THEME_COLORS = {
          ...SKEUO_COLORS,

            // Compatibility with standard Expo template components
              tint: SKEUO_COLORS.primary,
                icon: SKEUO_COLORS.textSecondary,
                  tabIconDefault: SKEUO_COLORS.navigationInactive,
                    tabIconSelected: SKEUO_COLORS.navigationActive,
                    } as const;

                    // --------------------------------------------------
                    // TYPES
                    // --------------------------------------------------

                    export type ThemeColorName = keyof typeof THEME_COLORS;

                    export type ThemeColorProps = {
                      light?: string;
                        dark?: string;
                        };

                        // --------------------------------------------------
                        // THEME COLOR HOOK
                        // --------------------------------------------------

                        /**
                         * Returns a colour from the Iryo design system.
                          *
                           * An explicit light/dark override takes precedence.
                            * Otherwise, the colour comes from SKEUO_COLORS.
                             *
                              * The base palette intentionally remains skeuomorphic
                               * regardless of the operating-system colour scheme.
                                */

                                export function useThemeColor(
                                  props: ThemeColorProps,
                                    colorName: ThemeColorName
                                    ): string {
                                      const colorScheme = useNativeColorScheme();

                                        const theme = colorScheme === "dark" ? "dark" : "light";

                                          const override = props[theme];

                                            if (override !== undefined) {
                                                return override;
                                                  }

                                                    return THEME_COLORS[colorName];
                                                    }

                                                    // --------------------------------------------------
                                                    // THEME MODE HOOK
                                                    // --------------------------------------------------

                                                    /**
                                                     * Returns the operating-system colour preference.
                                                      *
                                                       * This is informational: Iryo's main interface continues
                                                        * to use the configured Skeuomorphism design system.
                                                         */

                                                         export function useTheme(): "light" | "dark" {
                                                           const colorScheme = useNativeColorScheme();

                                                             return colorScheme === "dark" ? "dark" : "light";
                                                             }