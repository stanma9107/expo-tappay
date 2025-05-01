// Copyright         : 2025 Stan Ma
// File Name         : ExpoTappay/ios/ExpoTappayModule.swift
// Description       : Expo Module to integrate with Third-Party Payment Service Provider (Tappay)

import ExpoModulesCore
import TPDirect

enum ServerType: String, Enumerable {
  case sandbox
  case production
}

public class ExpoTappayModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoTappay")
      
        // TODO: Setup Tappay with App ID & App Key
        Function("setup") { (appId: Int32, appKey: String, serverType: ServerType) -> Void in
            let serverType: TPDServerType = (serverType == .production) ? .production : .sandBox
            TPDSetup.setWithAppId(appId, withAppKey: appKey, with: serverType)
        }
  }
}
