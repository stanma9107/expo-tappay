# Line Pay 

## Prerequisites
- Please create a Tappay account and get the app ID from [Tappay Dashboard](https://accounts.tappaysdk.com/).
- Integrate your Merchant with Tappay Dashboard.
- Please add the following config in your app.json
```json
{
  "expo": {
    "plugins": [
      [
        "expo-tappay", {
          "linePay": {
            "enable": true
          },
          // other payment methods...
        }
      ]
    ]
  }
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| enable | boolean | Whether to enable Line Pay |

## Usage

### Setup Tappay 

This method configures the Tappay instance. This setup must be completed before any Apple Pay transaction can be processed.

| Parameter | Type | Description |
|-----------|------|-------------|
| appId | number | Your Tappay App ID |
| appKey | string | Your Tappay App Key |
| serverType | [ServerType](#ServerType) | Your Tappay Server Type |

### <span id="ServerType">Server Type</span>

- sandbox: for testing
- production: for production

```js
import Tappay from "expo-tappay";

const tappay = new Tappay({
  appId: 11340, // replace with your Tappay App ID
  appKey: "app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC", // replace with your Tappay App Key
  serverType: "sandbox",
});
```

### Checking Line Pay Availability

Checks if Line Pay is available and properly configured on the device

`return: boolean`

```js

if (tappay.linePay.isAvailable) {
  console.log("Line Pay is available");
} else {
  console.log("Line Pay is not available");
}

```

### Install Line Pay

This method installs Line Pay.

**IMPORTANT: This method only available for iOS cause the Tappay native dependency limitation.**

`return: void`

```js
tappay.linePay.install();
```

### Get Prime Token

Call getPrimeToken() to get the prime token. 

`return: Promise<string>`

```js
tappay.linePay.getPrimeToken();
```

### Setup Callback

You must use setupCallback function to setup the callback URL.

**IMPORTANT: If setupCallback() is not called, the payment will not be successful.**

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| callbackUrl | string | The callback URL |

`return: void`

```js
import * as Linking from "expo-linking";

// To Get Deep Link URL from your app 
const callbackUrl = Linking.createURL("{PATH}");
tappay.linePay.setupCallback(callbackUrl);
```

### Start Payment

Call startPayment() to start the payment.

**IMPORTANT**: First call `getPrimeToken()` to obtain the prime token, then send this token to your [backend server](https://docs.tappaysdk.com/line-pay/en/back.html#response) to generate the payment URL.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| paymentUrl | string | The payment URL |

[PaymentResult](#PaymentResult)

`return: Promise<PaymentResult>`

```js
tappay.linePay.startPayment("{Payment_URL}");
```

## Example
[LinePay Example](https://github.com/stanma9107/expo-tappay/blob/2178364f9fe52afcfd27302d5e6ea91c6a5aa9f8/example/App.tsx)


## Type

### <span id="PaymentResult">Line Pay Payment Result</span>

| Property | Type | Description |
|----------|------|-------------|
| status | number | Transaction status code |
| recTradeId | string | Transaction ID |
| orderNumber | string | Order number |
| bankTransactionId | string | Bank transaction ID |



## Version
- TPDirect: v2.17.0