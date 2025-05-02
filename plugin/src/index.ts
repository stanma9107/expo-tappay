// File Name         : ExpoTappay/plugin/src/index.ts
// Description       : Expo Config Plugin for ExpoTappay
// Copyright         : 2025 Stan Ma

import {
  withInfoPlist,
  ConfigPlugin,
  withAndroidManifest,
  withEntitlementsPlist,
  AndroidConfig,
} from "expo/config-plugins";

type PaymentProvider = "generic" | "applePay" | "linePay";

interface DisablePaymentConfig {
  enable: false;
}

interface ApplePayEnabledConfig {
  enable: true;
  merchantId: string;
}

type ApplePayConfig = DisablePaymentConfig | ApplePayEnabledConfig;

interface LinePayEnabledConfig {
  enable: true;
}

type LinePayConfig = DisablePaymentConfig | LinePayEnabledConfig;

interface GenericEnabledConfig {
  enable: true;
}

type GenericConfig = DisablePaymentConfig | GenericEnabledConfig;

interface ConfigPayload {
  generic: GenericConfig;
  applePay: ApplePayConfig;
  linePay: LinePayConfig;
}

const withLSApplicationQueriesSchemes: ConfigPlugin = (config) => {
  return withInfoPlist(config, (config) => {
    if (!config.modResults["LSApplicationQueriesSchemes"]) {
      console.log("Adding LSApplicationQueriesSchemes to Info.plist");
      config.modResults["LSApplicationQueriesSchemes"] = [];
    }
    config.modResults["LSApplicationQueriesSchemes"]?.push("line");
    return config;
  });
};

const withAllowBackupFalse: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    console.log("Applying withAllowBackupFalse...");

    if (
      !config.modResults.manifest.application ||
      !Array.isArray(config.modResults.manifest.application)
    ) {
      console.log(
        "Unexpected format in AndroidManifest.xml. Make sure you have an <application> tag.",
      );
      return config;
    }

    for (const application of config.modResults.manifest.application) {
      if (application && application["$"]) {
        application["$"]["android:allowBackup"] = "false";
        console.log("Set android:allowBackup to false.");
      } else {
        console.log("Skipped an application element.");
      }
    }

    return config;
  });
};

const withLinePayQueryScheme: ConfigPlugin = (config) => {
  config = withAndroidManifest(config, (config) => {
    console.log("Applying queries in manifest...");
    if (!config.modResults.manifest.queries) {
      config.modResults.manifest.queries = [];
    }
    const existingQuery = config.modResults.manifest.queries.find(
      (query) =>
        query.package?.[0]?.$["android:name"] === "jp.naver.line.android",
    );
    if (!existingQuery) {
      config.modResults.manifest.queries.push({
        package: [
          {
            $: {
              "android:name": "jp.naver.line.android",
            },
          },
        ],
      });
      return config;
    }
    return config;
  });
  return config;
};

const withApplePay: ConfigPlugin<ApplePayConfig> = (config, payload) => {
  if (!payload.enable) {
    return config;
  }

  config = enablePayment(config, "applePay");
  return withEntitlementsPlist(config, (config) => {
    console.log("Applying withApplePayEntitlement...");
    config.modResults["com.apple.developer.in-app-payments"] = [
      payload.merchantId,
    ];

    return config;
  });
};

const withLinePay: ConfigPlugin<LinePayConfig> = (config, payload) => {
  if (!payload.enable) {
    return config;
  }

  config = enablePayment(config, "linePay");
  config = withLSApplicationQueriesSchemes(config);
  config = withAllowBackupFalse(config);
  config = withLinePayQueryScheme(config);
  return config;
};

const withGeneric: ConfigPlugin<GenericConfig> = (config, payload) => {
  if (!payload.enable) {
    return config;
  }

  return enablePayment(config, "generic");
};

const enablePayment: ConfigPlugin<PaymentProvider> = (config, payment) => {
  config = withInfoPlist(config, (config) => {
    if (!config.modResults["TPDSupportPayments"]) {
      config.modResults["TPDSupportPayments"] = [];
    }
    const supportPayments = config.modResults["TPDSupportPayments"] as string[];
    if (!supportPayments.includes(payment)) {
      console.log(`Adding ${payment} to TPDSupportPayments...`);
      supportPayments.push(payment);
    }
    return config;
  });

  config = withAndroidManifest(config, (config) => {
    const mainApplication = config.modResults.manifest.application?.[0];
    if (mainApplication) {
      if (!mainApplication["meta-data"]) {
        mainApplication["meta-data"] = [];
      }

      const existingMetaData = mainApplication["meta-data"].find(
        (item) => item.$["android:name"] === "TPDSupportPayments",
      );

      if (existingMetaData) {
        const currentPayments = existingMetaData.$["android:value"]?.split(",");
        if (!currentPayments?.includes(payment)) {
          currentPayments?.push(payment);
          existingMetaData.$["android:value"] = currentPayments?.join(",");
        }
      } else {
        mainApplication["meta-data"].push({
          $: {
            "android:name": "TPDSupportPayments",
            "android:value": payment,
          },
        });
      }
    }
    return config;
  });

  return config;
};

const withPaymentConfig: ConfigPlugin<ConfigPayload> = (config, payload) => {
  config = withApplePay(config, payload.applePay);
  config = withLinePay(config, payload.linePay);
  config = withGeneric(config, payload.generic);
  return config;
};

export default withPaymentConfig;
