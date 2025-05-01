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
        
        let supportPayments = Bundle.main.object(forInfoDictionaryKey: "TPDSupportPayments") as? NSArray ?? []
      
        // TODO: Setup Tappay with App ID & App Key
        Function("setup") { (appId: Int32, appKey: String, serverType: ServerType) -> Void in
            let serverType: TPDServerType = (serverType == .production) ? .production : .sandBox
            TPDSetup.setWithAppId(appId, withAppKey: appKey, with: serverType)
        }
        
        // TODO: Check If Generic Payment Available
        Function("isGenericAvailable") {
            return supportPayments.contains("generic")
        }
        
        // TODO: Check If Line Pay Available
        Function("isLinePayAvailable") {
            return supportPayments.contains("linePay") && TPDLinePay.isLinePayAvailable()
        }
        
        // TODO: Check If Apple Pay Available
        Function("isApplePayAvailable") {
            return supportPayments.contains("applePay") && TPDApplePay.canMakePayments()
        }
    }
}
