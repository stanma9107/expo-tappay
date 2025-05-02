// File Name         : ExpoTappay/src/providers/card.ts
// Description       : Card payment provider
// Copyright         : 2025 Stan Ma

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";
import * as GenericTypes from "../types/generic.types";

export class GenericPay extends BasePaymentProvider {
  public async isAvailable(): Promise<boolean> {
    return ExpoTappayModule.isGenericAvailable();
  }

  /**
   * Get the prime token for the card
   */
  public async getPrime(
    params: GenericTypes.GetPrimeParams,
  ): Promise<GenericTypes.PrimeResult> {
    return ExpoTappayModule.getGenericPrime(
      params.cardNumber,
      params.ccv,
      params.expiryMonth,
      params.expiryYear,
    );
  }
}
