// File Name         : ExpoTappay/src/types/generic.types.ts
// Description       : Generic payment provider types
// Copyright         : 2025 Stan Ma

export enum CardType {
  UNKNOWN = -1,
  VISA = 1,
  MASTERCARD = 2,
  JCB = 3,
  UNIONPAY = 4,
  AMEX = 5,
}

export enum CardFunding {
  UNKNOWN = -1,
  CREDIT = 0,
  DEBIT = 1,
  PREPAID = 2,
}

/**
 * The parameters of the getPrime function
 */
export type GetPrimeParams = {
  /**
   * The card number
   */
  cardNumber: string;

  /**
   * The card ccv
   */
  ccv: string;

  /**
   * The card expiry month (e.g. 01)
   */
  expiryMonth: string;

  /**
   * The card expiry year (e.g. 28)
   */
  expiryYear: string;
};

/**
 * The result of the getPrime function
 */
export type PrimeResult = {
  /**
   * The prime token
   */
  prime: string;

  /**
   * The bin code (first 6 digits of the card)
   */
  binCode: string;

  /**
   * The last four digits of the card
   */
  lastFour: string;

  /**
   * The issuer of the card
   */
  issuer: string;

  /**
   * The type of the card
   */
  type: CardType;

  /**
   * The funding of the card
   */
  funding: CardFunding;

  /**
   * The card identifier
   */
  cardIdentifier: string;
};
