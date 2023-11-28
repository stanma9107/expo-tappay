// Import the native module. On web, it will be resolved to ExpoTappay.web.ts
// and on native platforms to ExpoTappay.ts
import ExpoTappayModule from "./ExpoTappayModule";

export function getTheme(): string {
  return ExpoTappayModule.getTheme();
}

export function setup(
  appId: number,
  appKey: string,
  serverType: string = "sandbox",
): void {
  ExpoTappayModule.setup(appId, appKey, serverType);
}

export function setCard(
  cardNumber: string,
  dueMonth: string,
  dueYear: string,
  ccv: string,
): void {
  ExpoTappayModule.setCard(cardNumber, dueMonth, dueYear, ccv);
}

export function removeCard(): void {
  ExpoTappayModule.removeCard();
}

export function getDirectPayPrime(): Promise<{
  prime: string;
  bincode: string;
  lastfour: string;
  issuer: string;
  type: number;
  funding: number;
  cardidentifier: string;
}> {
  return ExpoTappayModule.getDirectPayPrime();
}
