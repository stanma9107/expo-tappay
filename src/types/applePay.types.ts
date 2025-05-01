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
