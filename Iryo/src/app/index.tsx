// File: src/app/index.tsx

import { Redirect } from "expo-router";

export default function IndexScreen() {
  /*
   * Initial routing:
   *
   * Until real authentication and session validation
   * are implemented, send the user to the login screen.
   *
   * Do not treat locally stored data or a frontend-only
   * flag as proof that a user is authenticated.
   *
   * Later, this entry point will use the actual
   * authentication session and backend response.
   */

  return <Redirect href="/(auth)/login" />;
}