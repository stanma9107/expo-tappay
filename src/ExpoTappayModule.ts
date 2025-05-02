// File Name         : ExpoTappay/src/ExpoTappayModule.ts
// Description       : Expo Module to integrate with Third-Party Payment Service Provider (Tappay)
// Copyright         : 2025 Stan Ma

import { requireNativeModule } from "expo";

import { ExpoTappayModule } from "./types/module.types";

export default requireNativeModule<ExpoTappayModule>("ExpoTappay");
