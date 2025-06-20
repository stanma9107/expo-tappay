// Copyright         : 2025 Stan Ma
// File Name         : ExpoTappay/ios/ExpoTappayModule.swift
// Description       : Expo Module to integrate with Third-Party Payment Service Provider (Tappay)

import ExpoModulesCore
import TPDirect

let APPLE_PAY_START_EVENT_NAME = "onApplePayStart"
let APPLE_PAY_CANCEL_EVENT_NAME = "onApplePayCancel"
let APPLE_PAY_SUCCESS_EVENT_NAME = "onApplePaySuccess"
let APPLE_PAY_RECEIVE_PRIME_EVENT_NAME = "onReceivePrime"
let APPLE_PAY_FAILED_EVENT_NAME = "onApplePayFailed"
let APPLE_PAY_FINISH_EVENT_NAME = "onApplePayFinished"

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
    case AmEx
    case Visa
    case MasterCard
    case JCB
}

public class ExpoTappayModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoTappay")
        
        let supportPayments = Bundle.main.object(forInfoDictionaryKey: "TPDSupportPayments") as? NSArray ?? []
        
        // APPLE PAY
        let consumer: TPDConsumer = TPDConsumer()
        let merchant: TPDMerchant = TPDMerchant()
        var applePay: TPDApplePay!
        var cart: TPDCart = TPDCart()
        
        // Line Pay
        var linePay: TPDLinePay? = nil
        
        Events(APPLE_PAY_START_EVENT_NAME)
        Events(APPLE_PAY_CANCEL_EVENT_NAME)
        Events(APPLE_PAY_SUCCESS_EVENT_NAME)
        Events(APPLE_PAY_RECEIVE_PRIME_EVENT_NAME)
        Events(APPLE_PAY_FAILED_EVENT_NAME)
        Events(APPLE_PAY_FINISH_EVENT_NAME)
        
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
            return supportPayments.contains("applePay")
        }

        // TODO: Check If Apple Pay Can Make Payments
        Function("applePayCanMakePayments") {
            return TPDApplePay.canMakePayments()
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
        
        // TODO: Show Setup Page
        Function("showApplePaySetupView") {
            TPDApplePay.showSetupView()
        }
        
        // TODO: Clear Cart
        Function("clearApplePayCart") {
            cart = TPDCart()
        }
        
        // TODO: Add New Item to Cart
        Function("addItemToApplePayCart") {(name: String, amount: Int) in
            cart.add(TPDPaymentItem(itemName: name, withAmount: NSDecimalNumber(value: amount)))
        }
        
        // TODO: Start Apple Pay Payment
        AsyncFunction("startApplePay") { (promise: Promise) in
            let applePayDelegate = ApplePayDelegate() { (name: String, body: [String: Any?]) -> Void in
                self.sendEvent(name, body)
            }
            applePay = TPDApplePay.setupWthMerchant(merchant, with: consumer, with: cart, withDelegate: applePayDelegate)
            
            // TODO: Start Payment
            applePay.startPayment()
        }
        
        // TODO: Show Apple Pay Payment Result in Payment Sheet
        Function("showApplePayResult") { (isSuccess: Bool) in
            applePay.showPaymentResult(isSuccess)
        }

        // TODO: Get Generic Prime
        AsyncFunction("getGenericPrime") { (cardNumber: String, ccv: String, expiryMonth: String, expiryYear: String, promise: Promise) in
            let card: TPDCard = TPDCard.setWithCardNumber(cardNumber, withDueMonth: expiryMonth, withDueYear: expiryYear, withCCV: ccv)
            card
                .onSuccessCallback{ (prime, cardInfo, cardIdentifier, merchantReferenceInfo) in
                    if
                        let directPayPrime = prime, directPayPrime != "",
                        let creditCardInfo = cardInfo,
                        let creditCardIdentifier = cardIdentifier
                    {
                        promise.resolve([
                            "prime": directPayPrime,
                            "binCode": creditCardInfo.bincode ?? "",
                            "lastFour": creditCardInfo.lastFour ?? "",
                            "issuer": creditCardInfo.issuer ?? "",
                            "type": creditCardInfo.cardType,
                            "funding": creditCardInfo.funding,
                            "cardIdentifier": creditCardIdentifier
                        ])
                    } else {
                        promise.reject("NO_PRIME", "PRIME IS EMPTY")
                    }

                }
                .onFailureCallback{ (status, message) in
                    promise.reject(String(status), message)
                }
                .createToken(withGeoLocation: "UNKNOWN")
        }
        
        // TODO: Install Line Application
        Function("installLineApp") {
            TPDLinePay.installLineApp()
        }
        
        // TODO: Setup Line Pay Callback
        Function("setupLinePayCallbackUrl") {(url: String) in
            linePay = TPDLinePay.setup(withReturnUrl: url)
        }
        
        // TODO: Get Line Pay Prime Token
        AsyncFunction("getLinePayPrimeToken") {(promise: Promise) in
            if (linePay != nil) {
                linePay?
                    .onSuccessCallback{(Prime) in
                        promise.resolve(Prime)
                    }
                    .onFailureCallback{(status, msg) in
                        promise.reject(String(status), msg)
                    }
                    .getPrime()
            } else {
                promise.reject("NOT_READY", "Please Setup Callback URL First.")
            }
        }
        
        // TODO: Redirect & Get Payment Result
        AsyncFunction("startLinePayPayment") {(paymentUrl: String, promise: Promise) in
            if (linePay != nil) {
                DispatchQueue.main.async {
                    let viewController = UIViewController()
                    linePay?.redirect(paymentUrl, with: viewController, completion: {(result) in
                        promise.resolve([
                            "status": result.status,
                            "recTradeId": result.recTradeId!,
                            "orderNumber": result.orderNumber!,
                            "bankTransactionId": result.bankTransactionId!
                        ])
                    })
                }
            } else {
                promise.reject("NOT_READY", "Please Setup Callback URL First.")
            }
        }
    }
}
