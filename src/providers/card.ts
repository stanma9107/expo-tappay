// File Name         : ExpoTappay/src/providers/card.ts
// Description       : Card payment provider
// Copyright         : 2025 Stan Ma

import { UnavailabilityError } from "expo-modules-core";

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";
import type * as GenericTypes from "../types/generic.types";

export class GenericPay extends BasePaymentProvider {
  public get isAvailable(): boolean {
    return ExpoTappayModule.isGenericAvailable();
  }

  /**
   * Get the prime token for the card
   */
  public async getPrime(
    params: GenericTypes.GetPrimeParams,
  ): Promise<GenericTypes.PrimeResult> {
    if (!this.isAvailable) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Generic Pay is not available",
      );
    }

    return ExpoTappayModule.getGenericPrime(
      params.cardNumber,
      params.ccv,
      params.expiryMonth,
      params.expiryYear,
    );
  }
}
