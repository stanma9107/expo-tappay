// Import the native module. On web, it will be resolved to ExpoTappay.web.ts
// and on native platforms to ExpoTappay.ts
import ExpoTappayModule from "./ExpoTappayModule";

export function getTheme(): string {
  return ExpoTappayModule.getTheme();
}
