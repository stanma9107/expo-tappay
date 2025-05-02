// File Name         : ExpoTappay/src/types/linePay.types.ts
// Description       : Types for Line Pay
// Copyright         : 2025 Stan Ma

export interface PaymentResult {
  status: number;
  recTradeId: string;
  orderNumber: string;
  bankTransactionId: string;
}
