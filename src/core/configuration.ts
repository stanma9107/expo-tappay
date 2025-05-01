// File Name         : ExpoTappay/src/core/configuration.ts
// Description       : Configuration class for the payment providers
// Copyright         : 2025 Stan Ma

import { TPDServerType } from "../types/config.types";

interface ConfigurationOptions {
  appId: number;
  appKey: string;
  serverType?: TPDServerType;
}

export class Configuration {
  readonly appId: number;
  readonly appKey: string;
  readonly serverType: TPDServerType

  constructor(options: ConfigurationOptions) {
    this.appId = options.appId;
    this.appKey = options.appKey;
    this.serverType = options.serverType ?? "sandbox";
  }
}
