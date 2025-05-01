// Copyright         : 2025 Stan Ma
// File Name         : ExpoTappay/android/src/main/java/dev/stanma/tappay/ExpoTappayModule.kt
// Description       : Expo Module to integrate with Third-Party Payment Service Provider (Tappay)

package dev.stanma.tappay

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import tech.cherri.tpdirect.api.TPDLinePay
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.types.Enumerable
import tech.cherri.tpdirect.api.TPDServerType
import tech.cherri.tpdirect.api.TPDSetup

class ExpoTappayModule : Module() {

  private lateinit var context: Context
  private var applicationInfo: ApplicationInfo? = null
  private var supportPayments: List<String> = emptyList()

  override fun definition() = ModuleDefinition {
    Name("ExpoTappay")

    OnCreate {
      context = appContext.reactContext ?: throw Exceptions.ReactContextLost()
      applicationInfo = context.packageManager?.getApplicationInfo(context.packageName.toString(), PackageManager.GET_META_DATA)
      supportPayments = applicationInfo?.metaData?.getString("TPDSupportPayments")?.split(",") ?: emptyList()
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


  }
}

enum class ServerType(val value: String) : Enumerable {
  SANDBOX("sandbox"),
  PRODUCTION("production")
}
