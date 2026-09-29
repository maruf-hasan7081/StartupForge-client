import { createAuthClient } from "better-auth/react";
import { getApiBaseUrl } from "../utils/apiBaseUrl.js";

export const authClient = createAuthClient({
  baseURL: getApiBaseUrl() || window.location.origin,
  fetchOptions: {
    credentials: "include",
  },
});
