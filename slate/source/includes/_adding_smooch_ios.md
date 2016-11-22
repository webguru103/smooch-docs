# Adding Smooch to your app

There are two ways to install the Smooch SDK. Our recommended way to install Smooch is through [CocoaPods](#cocoapods-method). We support Carthage too and you can also go the [manual route](#manual-method--carthage) and drop the SDK into your Xcode project.

We've documented both methods for adding Smooch to your app. Read on and follow your preferred way of adding the SDK to your project.

## CocoaPods Method

First, Install [CocoaPods](https://cocoapods.org/) if it isn't already

```
$ sudo gem install cocoapods
```

Next, add the Smooch dependency to your [Podfile](https://guides.cocoapods.org/using/the-podfile.html)

```
pod 'Smooch'
```

Finally, install the pod

```
$ pod install
```

That's it! You're now ready to [initialize Smooch in your app](#import-the-smooch-header-file).

<aside class="notice">
Remember — when you use CocoaPods to manage your app's dependencies, you have to build and run your app using the newly-generated .xcworkspace file and not the .xcodeproj file.
</aside>

## Manual Method / Carthage

1. First, grab a copy of `Smooch.framework` either through [GitHub](https://github.com/smooch/smooch-ios), [Carthage](https://github.com/Carthage/Carthage), or by [direct download](https://github.com/smooch/smooch-ios/archive/master.zip).

1. Add `Smooch.framework` to your project, and link it to the desired targets.

1. Now you'll have to add Smooch's dependencies to your project if they're not already linked in. Go to "Build phases" in your project's target and select "Link Binary With Libraries":
 * AssetsLibrary.framework
 * AVFoundation.framework
 * CFNetwork.framework
 * CoreGraphics.framework
 * CoreTelephony.framework
 * CoreText.framework
 * Foundation.framework
 * Photos.framework
 * QuartzCore.framework
 * SystemConfiguration.framework
 * UIKit.framework
1. Add the `-licucore` option to your app's `Other Linker Flags` build setting.
1. You're now ready to [initialize Smooch in your app](#import-the-smooch-header-file).

## Import the Smooch header file

Import the Smooch file into the your app delegate's .m file and any other places you plan to use it.

```objective_c
#import <Smooch/Smooch.h>
```
```swift
#import <Smooch/Smooch.h>
```

<aside class="notice">
If you're writing an app using Swift, then you'll need to import this header into a "bridging header". More info on this is available from [Apple](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html)
</aside>

## Add Required Keys in your app's Info.plist

The Smooch SDK allows users to send images to you. To support this feature, you must provide a description in your app's Info.plist to explain why access to the camera and photo library is required. These descriptions will be displayed as part of the alert when the system prompts the user to allow access. The keys are:

* NSCameraUsageDescription: describes the reason your app access the camera (ex: `Camera permission is required to send images to ${PRODUCT_NAME}`). More information available [here](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW24)
* NSPhotoLibraryUsageDescription: describes the reason your app accesses the photo library (ex: `Photo library permission is required to send images to ${PRODUCT_NAME}`). More information available [here](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW17)

<aside class="notice">
Starting from iOS 10, these values are required. If they are not present in your app's Info.plist, the option to send an image will not be displayed.
</aside>

## Initialize Smooch in your app


After following the steps above, your app is setup for working with the Smooch SDK. Before your code can invoke its functionality, you'll have to initialize the library using your app's token.

This token is free and uniquely identifies your app and links it to the Smooch backend that does the heavy lifting necessary to bridge the gap between you and your users.

You can find your token by [logging into Smooch](https://app.smooch.io) and copying it from the settings page as shown below.

![App Token on Overview Page](/images/apptoken.png)

Once you've located your token, use the code below to initialize Smooch.


Add the following line of code to your applicationDidFinishLaunchingWithOptions: method

```objective_c
[Smooch initWithSettings:[SKTSettings settingsWithAppToken:@"YOUR_APP_TOKEN"]];
```
```swift
Smooch.initWithSettings(SKTSettings(appToken: "YOUR_APP_TOKEN"))
```

Make sure to replace `YOUR_APP_TOKEN` with your app token.

### Displaying the Smooch User Interface

Once you've initialized Smooch, you're ready to try it out. 

Find a suitable place in your app's interface to invoke Smooch and use the code below to display the Smooch user interface. You can bring up Smooch whenever you think that your user will need access to help or a communication channel to contact you.

```objective_c
[Smooch show];
```
```swift
Smooch.show()
```

## Updating Smooch

### CocoaPods

To update via cocoapods, simply execute this

```
$ pod update
```

### Carthage

To update Carthage dependencies, you can simply run:

```
$ carthage update
```

### Manual

First, grab the latest version of `Smooch.framework` either through [GitHub](https://github.com/smooch/smooch-ios) or by [direct download](https://github.com/smooch/smooch-ios/archive/master.zip). Then, find the location of the old .framework file on disk, and replace it with the new one.