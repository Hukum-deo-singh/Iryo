import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
      <>
            <StatusBar style="dark" />

                  <Stack
                          screenOptions={{
                                    headerShown: false,
                                              animation: "fade",
                                                        animationDuration: 280,
                                                                  contentStyle: {
                                                                              backgroundColor: "#F7F9FC",
                                                                                        },
                                                                                                  gestureEnabled: true,
                                                                                                          }}
                                                                                                                >
                                                                                                                        <Stack.Screen
                                                                                                                                  name="index"
                                                                                                                                            options={{
                                                                                                                                                        animation: "fade",
                                                                                                                                                                  }}
                                                                                                                                                                          />

                                                                                                                                                                                  <Stack.Screen
                                                                                                                                                                                            name="(auth)"
                                                                                                                                                                                                      options={{
                                                                                                                                                                                                                  animation: "fade_from_bottom",
                                                                                                                                                                                                                            }}
                                                                                                                                                                                                                                    />

                                                                                                                                                                                                                                            <Stack.Screen
                                                                                                                                                                                                                                                      name="(tabs)"
                                                                                                                                                                                                                                                                options={{
                                                                                                                                                                                                                                                                            animation: "fade",
                                                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                                              />
                                                                                                                                                                                                                                                                                                    </Stack>
                                                                                                                                                                                                                                                                                                        </>
                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                          }