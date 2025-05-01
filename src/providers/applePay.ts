// File Name         : ExpoTappay/src/providers/applePay.ts
// Description       : Apple Pay payment provider
// Copyright         : 2025 Stan Ma

import { UnavailabilityError } from "expo-module-scripts";

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";
import type * as ApplePayTypes from "../types/applePay.types";

export class ApplePay extends BasePaymentProvider {
  public async isAvailable(): Promise<boolean> {
    return ExpoTappayModule.isApplePayAvailable();
  }

  /**
   * Setup Apple Pay Merchant
   */
  public async setupMerchant(
    params: ApplePayTypes.SetupMerchantParams,
  ): Promise<void> {
    if (!this.isAvailable()) {
      throw new UnavailabilityError("Apple Pay is not available");
    }

    return ExpoTappayModule.setupApplePayMerchant(
      params.name,
      params.merchantCapability,
      params.merchantId,
      params.countryCode,
      params.currencyCode,
      params.supportedNetworks,
    );
  }
}
