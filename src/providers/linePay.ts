// File Name         : ExpoTappay/src/providers/linePay.ts
// Description       : Line Pay payment provider
// Copyright         : 2025 Stan Ma

import { UnavailabilityError } from "expo-modules-core";

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";
import type * as LinePayTypes from "../types/linePay.types";

export class LinePay extends BasePaymentProvider {
  public isAvailable(): boolean {
    return ExpoTappayModule.isLinePayAvailable();
  }

  /**
   * Install Line APP (Only for iOS)
   */
  public install() {
    if (!this.isAvailable()) {
      throw new UnavailabilityError("expo-tappay", "Line Pay is not available");
    }

    ExpoTappayModule.installLineApp();
  }

  /**
   * Setup Line Pay Callback URL
   * @param url
   */
  public setupCallback(url: string) {
    if (!this.isAvailable()) {
      throw new UnavailabilityError("expo-tappay", "Line Pay is not available");
    }

    ExpoTappayModule.setupLinePayCallbackUrl(url);
  }

  /**
   * Get Line Pay Prime Token
   */
  public async getPrimeToken(): Promise<string> {
    if (!this.isAvailable()) {
      throw new UnavailabilityError("expo-tappay", "Line Pay is not available");
    }

    return ExpoTappayModule.getLinePayPrimeToken();
  }

  /**
   * Start Line Pay Payment
   * @param paymentUrl
   */
  public async startPayment(
    paymentUrl: string,
  ): Promise<LinePayTypes.PaymentResult> {
    if (!this.isAvailable()) {
      throw new UnavailabilityError("expo-tappay", "Line Pay is not available");
    }

    return ExpoTappayModule.startLinePayPayment(paymentUrl);
  }
}
