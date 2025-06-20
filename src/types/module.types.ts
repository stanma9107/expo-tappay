// File Name         : ExpoTappay/src/types/module.types.ts
// Description       : Types for the whole module
// Copyright         : 2025 Stan Ma

import { NativeModule } from "expo";

import * as ApplePayTypes from "./applePay.types";
import { TPDServerType } from "./config.types";
import * as GenericTypes from "./generic.types";
import * as LinePayTypes from "./linePay.types";

export type ExpoTappayModuleEvents = {
  onApplePayStart: (data: ApplePayTypes.OnApplePayGeneralEvent) => void;
  onApplePayCancel: (data: ApplePayTypes.OnApplePayGeneralEvent) => void;
  onApplePaySuccess: (data: ApplePayTypes.OnApplePayTransactionEvent) => void;
  onReceivePrime: (data: ApplePayTypes.OnReceivePrimeEvent) => void;
  onApplePayFailed: (data: ApplePayTypes.OnApplePayTransactionEvent) => void;
  onApplePayFinished: (data: ApplePayTypes.OnApplePayTransactionEvent) => void;
};

export declare class ExpoTappayModule extends NativeModule<ExpoTappayModuleEvents> {
  // TODO: Setup Tappay with App ID & App Key
  setup(appId: number, appKey: string, serverType: TPDServerType): void;

  // TODO: Check if Generic Pay is available
  isGenericAvailable(): boolean;

  // TODO: Check if Line Pay is available
  isLinePayAvailable(): boolean;

  // TODO: Check if Apple Pay is available
  isApplePayAvailable(): boolean;

  // TODO: Check if Apple Pay can make payments
  applePayCanMakePayments(): boolean;

  // TODO: Setup Apple Pay Merchant
  setupApplePayMerchant(
    name: string,
    merchantCapability: ApplePayTypes.merchantCapability,
    merchantId: string,
    countryCode: string,
    currencyCode: string,
    supportedNetworks: ApplePayTypes.applePayNetwork[],
  ): void;

  // TODO: Show Apple Pay Setup View
  showApplePaySetupView(): void;

  // TODO: Clear Apple Pay Cart
  clearApplePayCart(): void;

  // TODO: Add Item to Apple Pay Cart
  addItemToApplePayCart(name: string, amount: number): void;

  // TODO: Start Apple Pay Payment
  startApplePay(): Promise<void>;

  // TODO: Show Result to Apple Pay
  showApplePayResult(isSuccess: boolean): void;

  // TODO: Get Generic Prime
  getGenericPrime(
    cardNumber: string,
    ccv: string,
    expiryMonth: string,
    expiryYear: string,
  ): Promise<GenericTypes.PrimeResult>;

  // TODO: Install Line APP
  installLineApp(): void;

  // TODO: Setup Line Pay Callback URL
  setupLinePayCallbackUrl(url: string): void;

  // TODO: Get Line Pay Prime Token
  getLinePayPrimeToken(): Promise<string>;

  // TODO: Start Line Pay Payment
  startLinePayPayment(paymentUrl: string): Promise<LinePayTypes.PaymentResult>;
}
