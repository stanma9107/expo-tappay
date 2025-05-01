// Copyright         : 2025 Stan Ma
// File Name         : ExpoTappay/ios/ExpoTappayModule.swift
// Description       : Expo Module to integrate with Third-Party Payment Service Provider (Tappay)

import ExpoModulesCore
import TPDirect

enum ServerType: String, Enumerable {
    case sandbox
    case production
}

enum MerchantCapability: String, Enumerable {
    case debit
    case credit
    case emv
    case threeDSecure
}

enum ApplePayNetwork: String, Enumerable {
    case amex
    case visa
    case masterCard
    case JCB
}

public class ExpoTappayModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoTappay")
        
        let supportPayments = Bundle.main.object(forInfoDictionaryKey: "TPDSupportPayments") as? NSArray ?? []
        
        let merchant: TPDMerchant = TPDMerchant()
      
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
        
        // TODO: Setup Apple Pay Merchant
        Function("setupApplePayMerchant") { (name: String, merchantCapability: MerchantCapability, merchantId: String, countryCode: String, currency: String, networks: [ApplePayNetwork]) in
            // Merchant Display Name
            merchant.merchantName = name;
            
            // Merchant Capability
            switch merchantCapability {
                case .credit:
                    merchant.merchantCapability = .credit
                    break;
                case .debit:
                    merchant.merchantCapability = .debit
                    break;
                case .emv:
                    merchant.merchantCapability = .emv
                    break;
                default:
                    merchant.merchantCapability = .threeDSecure
                    break;
            }
            
            // Merchant Identifier
            merchant.applePayMerchantIdentifier = merchantId
            
            // Country Code & Currency Code
            merchant.countryCode = countryCode
            merchant.currencyCode = currency
            
            // Support Networks
            merchant.supportedNetworks = networks.map { PKPaymentNetwork(rawValue: $0.rawValue) }
        }
    }
}
