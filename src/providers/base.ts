// File Name         : ExpoTappay/src/providers/base.ts
// Description       : Base class for all payment providers
// Copyright         : 2025 Stan Ma

import { Configuration } from "../core/configuration";

export abstract class BasePaymentProvider {
  protected readonly config: Configuration;

  constructor(config: Configuration) {
    this.config = config;
  }

  // Check if the payment provider is available
  public abstract isAvailable: boolean;
}
