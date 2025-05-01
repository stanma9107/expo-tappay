// File Name         : ExpoTappay/src/types/module.types.ts
// Description       : Types for the whole module
// Copyright         : 2025 Stan Ma

import { NativeModule } from "expo";

import * as ApplePayTypes from "./applePay.types";
import { TPDServerType } from "./config.types";

export type ExpoTappayModuleEvents = {};

export declare class ExpoTappayModule extends NativeModule<ExpoTappayModuleEvents> {
  // TODO: Setup Tappay with App ID & App Key
  setup(appId: number, appKey: string, serverType: TPDServerType): void;

  // TODO: Check if Generic Pay is available
  isGenericAvailable(): Promise<boolean>;

  // TODO: Check if Line Pay is available
  isLinePayAvailable(): Promise<boolean>;

  // TODO: Check if Apple Pay is available
  isApplePayAvailable(): Promise<boolean>;

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
}
