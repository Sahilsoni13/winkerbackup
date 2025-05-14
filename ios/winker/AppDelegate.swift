// import UIKit
// import React
// import React_RCTAppDelegate
// import ReactAppDependencyProvider

// @main
// class AppDelegate: UIResponder, UIApplicationDelegate {
//   var window: UIWindow?

//   func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
//     let jsCodeLocation: URL

//     #if DEBUG
//       // guard let jsBundleURL = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index") else {
//       //   fatalError("❌ No se pudo obtener jsBundleURL en modo DEBUG")
//       // }
//       jsCodeLocation  = URL(string: "http://localhost:8081/index.bundle?platform=ios")!
//     #else
//       guard let url = Bundle.main.url(forResource: "main", withExtension: "jsbundle") else {
//         fatalError("❌ main.jsbundle no encontrado en el bundle")
//       }
//       jsCodeLocation = url
//     #endif

//     let rootView = RCTRootView(
//       bundleURL: jsCodeLocation,
//       moduleName: "winker",
//       initialProperties: nil,
//       launchOptions: launchOptions
//     )

//     let rootViewController = UIViewController()
//     rootViewController.view = rootView

//     window = UIWindow(frame: UIScreen.main.bounds)
//     window?.rootViewController = rootViewController
//     window?.makeKeyAndVisible()

//     return true
//   }
// }
//-----------------------------------------------------------------------------------//
// import UIKit
// import React
// import React_RCTAppDelegate
// import ReactAppDependencyProvider

// @main
// class AppDelegate: RCTAppDelegate {
//   override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
//     self.moduleName = "winker"
//     self.dependencyProvider = RCTAppDependencyProvider()

//     // You can add your custom initial props in the dictionary below.
//     // They will be passed down to the ViewController used by React Native.
//     self.initialProps = [:]

//     return super.application(application, didFinishLaunchingWithOptions: launchOptions)
//   }

//   override func sourceURL(for bridge: RCTBridge) -> URL? {
//     self.bundleURL()
//   }

//   override func bundleURL() -> URL? {
// #if DEBUG
//     RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
// #else
//     Bundle.main.url(forResource: "main", withExtension: "jsbundle")
// #endif
//   }
// }

import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
    self.moduleName = "winker"
    self.dependencyProvider = RCTAppDependencyProvider()
    self.initialProps = [:]
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
    #if DEBUG
      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}