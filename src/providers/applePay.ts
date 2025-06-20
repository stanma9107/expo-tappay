// File Name         : ExpoTappay/src/providers/applePay.ts
// Description       : Apple Pay payment provider
// Copyright         : 2025 Stan Ma

import { UnavailabilityError } from "expo-modules-core";
import type { EventSubscription } from "expo-modules-core";

import ExpoTappayModule from "../ExpoTappayModule";
import { BasePaymentProvider } from "./base";
import type * as ApplePayTypes from "../types/applePay.types";

export class ApplePay extends BasePaymentProvider {
  public isAvailable(): boolean {
    return ExpoTappayModule.isApplePayAvailable();
  }

  public canMakePayments(): boolean {
    return ExpoTappayModule.applePayCanMakePayments();
  }

  /**
   * Setup Apple Pay Merchant
   */
  public async setupMerchant(
    params: ApplePayTypes.SetupMerchantParams,
  ): Promise<void> {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
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

  /**
   * Show Apple Pay Setup View
   */
  public async showSetupView(): Promise<void> {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.showApplePaySetupView();
  }

  /**
   * Clear Apple Pay Cart
   */
  private async clearCart(): Promise<void> {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.clearApplePayCart();
  }

  /**
   * Add Item to Apple Pay Cart
   */
  private async addItemToCart(name: string, amount: number): Promise<void> {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.addItemToApplePayCart(name, amount);
  }

  /**
   * Start Apple Pay Payment
   */
  public startPayment(cartItems: ApplePayTypes.ApplePayPaymentItem[]): void {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    this.clearCart();
    for (const item of cartItems) {
      this.addItemToCart(item.name, item.amount);
    }

    ExpoTappayModule.startApplePay();
  }

  /**
   * Show Apple Pay Result
   */
  public async showResult(isSuccess: boolean): Promise<void> {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.showApplePayResult(isSuccess);
  }

  /**
   * Add Apple Pay Recieve Prime Listener
   */
  public addRecievePrimeListener(
    listener: (data: ApplePayTypes.OnReceivePrimeEvent) => void,
  ): EventSubscription {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.addListener("onReceivePrime", listener);
  }

  /**
   * Add Apple Pay Start Listener
   */
  public addStartListener(
    listener: (data: ApplePayTypes.OnApplePayGeneralEvent) => void,
  ): EventSubscription {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.addListener("onApplePayStart", listener);
  }

  /**
   * Add Apple Pay Cancel Listener
   */
  public addCancelListener(
    listener: (data: ApplePayTypes.OnApplePayGeneralEvent) => void,
  ): EventSubscription {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.addListener("onApplePayCancel", listener);
  }

  /**
   * Add Apple Pay Success Listener
   */
  public addSuccessListener(
    listener: (data: ApplePayTypes.OnApplePayTransactionEvent) => void,
  ): EventSubscription {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.addListener("onApplePaySuccess", listener);
  }

  /**
   * Add Apple Pay Failed Listener
   */
  public addFailedListener(
    listener: (data: ApplePayTypes.OnApplePayTransactionEvent) => void,
  ): EventSubscription {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.addListener("onApplePayFailed", listener);
  }

  /**
   * Add Apple Pay Finished Listener
   */
  public addFinishedListener(
    listener: (data: ApplePayTypes.OnApplePayTransactionEvent) => void,
  ): EventSubscription {
    if (!this.isAvailable()) {
      throw new UnavailabilityError(
        "expo-tappay",
        "Apple Pay is not available",
      );
    }

    return ExpoTappayModule.addListener("onApplePayFinished", listener);
  }
}
