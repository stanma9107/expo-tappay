import ExpoModulesCore
import TPDirect

public class ApplePayDelegate: NSObject, TPDApplePayDelegate {
    let APPLE_PAY_START_EVENT_NAME         = "onApplePayStart"
    let APPLE_PAY_CANCEL_EVENT_NAME        = "onApplePayCancel"
    let APPLE_PAY_SUCCESS_EVENT_NAME       = "onApplePaySuccess"
    let APPLE_PAY_RECEIVE_PRIME_EVENT_NAME = "onReceivePrime"
    let APPLE_PAY_FAILED_EVENT_NAME        = "onApplePayFailed"
    let APPLE_PAY_FINISH_EVENT_NAME        = "onApplePayFinished"
    
    let callbackFunction: (_ name: String, _ body: [String: Any?]) -> Void
    
    init(callbackFunction: @escaping (_ name: String, _ body: [String: Any?]) -> Void) {
        self.callbackFunction = callbackFunction
    }
    
    public func tpdApplePay(_ applePay: TPDApplePay!, didReceivePrime prime: String!, withExpiryMillis expiryMillis: Int, with cardInfo: TPDCardInfo!, withMerchantReferenceInfo merchantReferenceInfo: [AnyHashable : Any]!) {
        if (prime != nil) {
            callbackFunction(APPLE_PAY_RECEIVE_PRIME_EVENT_NAME, [
                "success": true,
                "prime": prime,
                "expiryMillis": expiryMillis,
                "totalAmount": applePay.cart.totalAmount?.doubleValue ?? 0,
                "clientIP": applePay.consumer.clientIP
            ])
        } else {
            callbackFunction(APPLE_PAY_RECEIVE_PRIME_EVENT_NAME, [
                "success": false,
                "message": "CANNOT_GET_PRIME"
            ])
        }
    }
    
    public func tpdApplePay(_ applePay: TPDApplePay!, didSuccessPayment result: TPDTransactionResult!) {
        callbackFunction(APPLE_PAY_SUCCESS_EVENT_NAME, [
            "status": result.status,
            "amount": result.amount,
            "message": result.message,
            "description": result.description
        ])
    }
    
    public func tpdApplePay(_ applePay: TPDApplePay!, didFailurePayment result: TPDTransactionResult!) {
        callbackFunction(APPLE_PAY_FAILED_EVENT_NAME, [
            "stautus": result.status,
            "amount": result.amount,
            "message": result.message,
            "description": result.description
        ])
    }
    
    public func tpdApplePayDidStartPayment(_ applePay: TPDApplePay!) {
        callbackFunction(APPLE_PAY_START_EVENT_NAME, [
            "status": 0,
            "message": "APPLE_PAY_START"
        ])
    }
    
    public func tpdApplePayDidCancelPayment(_ applePay: TPDApplePay!) {
        callbackFunction(APPLE_PAY_CANCEL_EVENT_NAME, [
            "status": 0,
            "message": "APPLE_PAY_CANCEL"
        ])
    }
    
    public func tpdApplePayDidFinishPayment(_ applePay: TPDApplePay!) {
        callbackFunction(APPLE_PAY_FINISH_EVENT_NAME, [
            "status": 0,
            "message": "APPLE_PAY_FINISH"
        ])
    }
}
