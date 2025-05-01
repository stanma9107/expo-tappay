// File Name         : ExpoTappay/src/providers/applePay.ts
// Description       : Apple Pay payment provider
// Copyright         : 2025 Stan Ma

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";

export class ApplePay extends BasePaymentProvider {
  public async isAvailable(): Promise<boolean> {
    return ExpoTappayModule.isApplePayAvailable();
  }
}
