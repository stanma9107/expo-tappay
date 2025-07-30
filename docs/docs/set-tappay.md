# Setup Tappay 

## Prerequisites
- Please create a Tappay account and get the app ID from [Tappay Dashboard](https://accounts.tappaysdk.com/).
- Create Merchant ID and Apple Pay Certificate from [Apple Developer](https://developer.apple.com/account/resources/identifiers/list/merchant)(Apple Pay is required).
- Integrate your Merchant with Tappay Dashboard.
- Please add the following config in your app.
  
```json
{
  "expo": {
    "plugins": [
      [
        "expo-tappay", {
          "applePay":{
            "enable":true,
            "merchantId": "YOUR_MERCHANT_ID", // replace with your Merchant ID
          },
          "linePay": {
            "enable": true
          },
          "generic": {
            "enable": true
          },
        }
      ]
    ]
  }
}
```

### Apple Pay 

| Parameter | Type | Description |
|-----------|------|-------------|
| enable | boolean | Whether to enable Apple Pay |
| merchantId | string | Your Apple Pay merchant identifier registered with Apple |

### Line Pay 

| Parameter | Type | Description |
|-----------|------|-------------|
| enable | boolean | Whether to enable Line Pay |

### Generic Card Payment 

| Parameter | Type | Description |
|-----------|------|-------------|
| enable | boolean | Whether to enable Generic Card Payment |

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