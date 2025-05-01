// File Name         : ExpoTappay/src/providers/linePay.ts
// Description       : Line Pay payment provider
// Copyright         : 2025 Stan Ma

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";

export class LinePay extends BasePaymentProvider {
  public async isAvailable(): Promise<boolean> {
    return ExpoTappayModule.isLinePayAvailable();
  }
}
