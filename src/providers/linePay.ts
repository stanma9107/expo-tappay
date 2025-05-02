// File Name         : ExpoTappay/src/providers/linePay.ts
// Description       : Line Pay payment provider
// Copyright         : 2025 Stan Ma

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";
import type * as LinePayTypes from "../types/linePay.types";

export class LinePay extends BasePaymentProvider {
  public async isAvailable(): Promise<boolean> {
    return ExpoTappayModule.isLinePayAvailable();
  }

  /**
   * Install Line APP
   */
  public install() {
    ExpoTappayModule.installLineApp();
  }

  /**
   * Setup Line Pay Callback URL
   * @param url
   */
  public setupCallback(url: string) {
    ExpoTappayModule.setupLinePayCallbackUrl(url);
  }

  /**
   * Get Line Pay Prime Token
   */
  public async getPrimeToken(): Promise<string> {
    return ExpoTappayModule.getLinePayPrimeToken();
  }

  /**
   * Start Line Pay Payment
   * @param paymentUrl
   */
  public async startPayment(
    paymentUrl: string,
  ): Promise<LinePayTypes.PaymentResult> {
    return ExpoTappayModule.startLinePayPayment(paymentUrl);
  }
}
