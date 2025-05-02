// Copyright         : 2025 Stan Ma
// File Name         : ExpoTappay/android/src/main/java/dev/stanma/tappay/ExpoTappayModule.kt
// Description       : Expo Module to integrate with Third-Party Payment Service Provider (Tappay)

package dev.stanma.tappay

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import tech.cherri.tpdirect.api.TPDLinePay
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.types.Enumerable
import tech.cherri.tpdirect.api.TPDLinePayResult
import tech.cherri.tpdirect.api.TPDServerType
import tech.cherri.tpdirect.api.TPDSetup
import tech.cherri.tpdirect.api.TPDCard
import tech.cherri.tpdirect.callback.TPDLinePayResultListener

class ExpoTappayModule : Module() {

  private lateinit var context: Context
  private var applicationInfo: ApplicationInfo? = null
  private var supportPayments: List<String> = emptyList()

  // Line Pay
  private var linePay: TPDLinePay? = null
  private var linePayPromise: Promise? = null

  override fun definition() = ModuleDefinition {
    Name("ExpoTappay")

    OnCreate {
      context = appContext.reactContext ?: throw Exceptions.ReactContextLost()
      applicationInfo = context.packageManager?.getApplicationInfo(context.packageName.toString(), PackageManager.GET_META_DATA)
      supportPayments = applicationInfo?.metaData?.getString("TPDSupportPayments")?.split(",") ?: emptyList()
    }

    OnNewIntent {
      if (linePayPromise == null) {
        return@OnNewIntent
      }

      if (linePay != null) {
        linePay!!.parseToLinePayResult(appContext.reactContext, it.data, object :
          TPDLinePayResultListener {
          override fun onParseSuccess(result: TPDLinePayResult?) {
            if (result == null) {
              linePayPromise?.reject("PAYMENT_FAILED", "NO_RESULT", Exception("NO_RESULT"))
              linePayPromise = null
              return
            }
            linePayPromise?.resolve(mapOf(
              "status" to result.status,
              "recTradeId" to result.recTradeId,
              "orderNumber" to result.orderNumber,
              "bankTransactionId" to result.bankTransactionId,
            ))
            linePayPromise = null
          }

          override fun onParseFail(statusCode: Int, msg: String?) {
            linePayPromise?.reject(statusCode.toString(), msg, Exception(msg))
            linePayPromise = null
          }
        })
      } else {
        linePayPromise?.reject("NOT_READY", "Please Setup Callback URL First.", Exception("Please Setup Callback URL First."))
        linePayPromise = null
      }
    }

    Function("isGenericAvailable") {
      return@Function supportPayments.contains("generic")
    }

    Function("isApplePayAvailable") {
      return@Function false
    }

    Function("isLinePayAvailable") {
      return@Function supportPayments.contains("linePay") && TPDLinePay.isLinePayAvailable(appContext.reactContext)
    }

    Function("setup") { appId: Int, appKey: String, serverType: ServerType ->
      TPDSetup.initInstance(
        context,
        appId,
        appKey,
        when (serverType) {
          ServerType.SANDBOX -> TPDServerType.Sandbox
          ServerType.PRODUCTION -> TPDServerType.Production
        }
      )
    }

    AsyncFunction("getGenericPrime") { cardNumber: String, ccv: String, expiryMonth: String, expiryYear: String, promise: Promise ->
      try {
        TPDCard(
          appContext.reactContext,
          StringBuffer(cardNumber),
          StringBuffer(expiryMonth),
          StringBuffer(expiryYear),
          StringBuffer(ccv),
        )
          .onSuccessCallback { prime, cardInfo, cardIdentifier, _ ->
            val primeData = mapOf(
              "prime" to prime,
              "binCode" to cardInfo.bincode,
              "lastFour" to cardInfo.lastFour,
              "issuer" to cardInfo.issuer,
              "type" to cardInfo.cardType,
              "funding" to cardInfo.funding,
              "cardIdentifier" to cardIdentifier
            )

            promise.resolve(primeData)
          }
          .onFailureCallback { status, reportMsg ->
            promise.reject(status.toString(), reportMsg, Exception(reportMsg))
          }
          .createToken("UNKNOWN")
      } catch (e: Exception) {
        promise.reject("ERROR", e.message, e)
      }
    }

    Function("setupLinePayCallbackUrl") { callbackUrl: String ->
      linePay = TPDLinePay(appContext.reactContext, callbackUrl)
    }

    AsyncFunction("getLinePayPrimeToken") { promise: Promise ->
      if (linePay != null) {
        linePay!!
          .getPrime(
            { prime -> promise.resolve(prime) },
            { statusCode, statusMessage -> promise.reject(statusCode.toString(), statusMessage, Exception(statusMessage)) }
          )
      } else {
        promise.reject("NOT_READY", "Please Setup Callback URL First.", Exception("Please Setup Callback URL First."))
      }
    }

    AsyncFunction("startLinePayPayment") { paymentUrl: String, promise: Promise ->
      if (linePay != null) {
        linePayPromise = promise
        linePay!!.redirectWithUrl(paymentUrl)
      } else {
        promise.reject("NOT_READY", "Please Setup Callback URL First.", Exception("Please Setup Callback URL First."))
      }
    }
  }
}

enum class ServerType(val value: String) : Enumerable {
  SANDBOX("sandbox"),
  PRODUCTION("production")
}
