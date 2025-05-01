import { Configuration } from "./configuration";
import ExpoTappayModule from "../ExpoTappayModule";
import { ApplePay } from "../providers/applePay";
import { GenericPay } from "../providers/card";
import { LinePay } from "../providers/linePay";

export class Tappay {
  private config: Configuration;

  public generic: GenericPay;
  public applePay: ApplePay;
  public linePay: LinePay;

  constructor(config: Configuration) {
    this.config = config;

    this.generic = new GenericPay(this.config);
    this.applePay = new ApplePay(this.config);
    this.linePay = new LinePay(this.config);
  }

  public setup(): void {
    ExpoTappayModule.setup(
      this.config.appId,
      this.config.appKey,
      this.config.serverType,
    );
  }
}
