// File Name         : ExpoTappay/src/providers/card.ts
// Description       : Card payment provider
// Copyright         : 2025 Stan Ma

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";

export class GenericPay extends BasePaymentProvider {
  public async isAvailable(): Promise<boolean> {
    return ExpoTappayModule.isGenericAvailable();
  }
}
