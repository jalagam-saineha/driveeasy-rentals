import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";

export interface AuthState {
  identity: Identity | undefined;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  login: () => void;
  logout: () => void;
  principalText: string | null;
}

export function useAuth(): AuthState {
  const {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    clear,
  } = useInternetIdentity();

  const principalText = identity ? identity.getPrincipal().toText() : null;

  return {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    logout: clear,
    principalText,
  };
}
