// File Name         : ExpoTappay/src/types/applePay.types.ts
// Description       : Apple Pay payment provider types
// Copyright         : 2025 Stan Ma

export type merchantCapability = "debit" | "credit" | "emv" | "threeDSecure";

export type applePayNetwork = "AmEx" | "Visa" | "MasterCard" | "JCB";

/**
 * Setup Apple Pay Merchant Parameters
 * @param name - The name of the merchant
 * @param merchantCapability - The merchant capability
 * @param merchantId - The merchant ID
 * @param countryCode - The country code
 * @param currencyCode - The currency code
 * @param supportedNetworks - The supported networks
 */
export type SetupMerchantParams = {
  /**
   * The display name of the merchant
   */
  name: string;

  /**
   * The merchant capability (debit, credit, emv, threeDSecure)
   */
  merchantCapability: merchantCapability;

  /**
   * The merchant ID
   */
  merchantId: string;

  /**
   * The country code
   */
  countryCode: string;

  /**
   * The currency code
   */
  currencyCode: string;

  /**
   * The supported networks (amex, visa, masterCard, JCB)
   */
  supportedNetworks: applePayNetwork[];
};

/**
 * Apple Pay Payment Item
 * @param name - The name of the payment item
 * @param amount - The amount of the payment item
 */
export type ApplePayPaymentItem = {
  /**
   * The name of the payment item
   */
  name: string;

  /**
   * The amount of the payment item
   */
  amount: number;
};

/**
 * On Success Receive Prime Event
 */
type OnSuccessReceivePrimeEvent = {
  /**
   * The success status
   */
  success: true;

  /**
   * The prime token of the payment (expired after 90 seconds)
   */
  prime: string;

  /**
   * The expiry time of the prime token (expired after 90 seconds)
   */
  expiryMillis: number;

  /**
   * The total amount of the payment
   */
  totalAmount: number;

  /**
   * The client IP address
   */
  clientIP: string;
};

/**
 * On Fail Receive Prime Event
 */
type OnFailReceivePrimeEvent = {
  /**
   * The success status
   */
  success: false;

  /**
   * The error message of the payment
   */
  message: string;
};

/**
 * Apple Pay Recieve Prime Data
 * @param prime - The prime
 */
export type OnReceivePrimeEvent =
  | OnSuccessReceivePrimeEvent
  | OnFailReceivePrimeEvent;

/**
 * On Apple Pay General Event
 */
export type OnApplePayGeneralEvent = {
  /**
   * The status of the payment
   */
  status: number;

  /**
   * The message of the payment
   */
  message: string;
};

/**
 * On Apple Pay Transaction Event
 */
export type OnApplePayTransactionEvent = {
  /**
   * The status of the payment
   */
  status: number;

  /**
   * The amount of the payment
   */
  amount: number;

  /**
   * The message of the payment
   */
  message: string;

  /**
   * The description of the payment
   */
  description: string;
};

/**
 * Apple Pay Event Name
 */
export type EventName =
  | "onApplePayStart"
  | "onApplePayCancel"
  | "onApplePaySuccess"
  | "onReceivePrime"
  | "onApplePayFailed"
  | "onApplePayFinished";
