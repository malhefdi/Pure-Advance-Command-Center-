export const featureFlags = {
  dashboard: true,
  products: true,
  team: true,
  finance: true,
  pipeline: false,
  ownership: false,
  ai: false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export function isFeatureEnabled(flag: FeatureFlag) {
  return featureFlags[flag];
}
