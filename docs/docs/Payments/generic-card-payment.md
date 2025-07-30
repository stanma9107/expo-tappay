# Generic Card Payment 

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
          "generic": {
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

### Checking Generic Card Payment Availability

Checks if Generic Card Payment is available and properly configured on the device

`return: boolean`

```js

if (tappay.generic.isAvailable) {
  console.log("Generic Card Payment is available");
} else {
  console.log("Generic Card Payment is not available");
}

```

### Get Prime Token

Call getPrimeToken() to get the prime token. 

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| cardNumber | string | The card number |
| ccv | string | The card verification code |
| expiryMonth | string | The expiry month |
| expiryYear | string | The expiry year |

[PrimeResult](#PrimeResult)

`return: Promise<PrimeResult>`

```js
tappay.generic.getPrime({
  cardNumber: "4242424242424242",
  ccv: "123",
  expiryMonth: "01",
  expiryYear: "28",
});
```

## Example
[Generic Card Payment Example](https://github.com/stanma9107/expo-tappay/blob/2178364f9fe52afcfd27302d5e6ea91c6a5aa9f8/example/App.tsx)


## Type

### <span id="PrimeResult">Prime Result</span>

| Property | Type | Description |
|----------|------|-------------|
| prime | string | The prime token |
| binCode | string | The bin code (first 6 digits of the card) |
| lastFour | string | The last four digits of the card |
| issuer | string | The issuer of the card |
| type | CardType | The type of the card |
| funding | CardFunding | The funding of the card |
| cardIdentifier | string | The card identifier |



## Version
- TPDirect: v2.17.0