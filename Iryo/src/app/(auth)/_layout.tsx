import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
      <Stack
            screenOptions={{
                    headerShown: false,
                            animation: "fade_from_bottom",
                                    animationDuration: 260,
                                            gestureEnabled: true,
                                                    contentStyle: {
                                                              backgroundColor: "#F7F9FC",
                                                                      },
                                                                            }}
                                                                                >
                                                                                      <Stack.Screen
                                                                                              name="login"
                                                                                                      options={{
                                                                                                                animation: "fade",
                                                                                                                        }}
                                                                                                                              />

                                                                                                                                    <Stack.Screen
                                                                                                                                            name="signup"
                                                                                                                                                    options={{
                                                                                                                                                              animation: "slide_from_right",
                                                                                                                                                                      }}
                                                                                                                                                                            />
                                                                                                                                                                                </Stack>
                                                                                                                                                                                  );
                                                                                                                                                                                  }