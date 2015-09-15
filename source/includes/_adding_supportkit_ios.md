# Adding SupportKit to your app

There are two ways to install the SupportKit SDK. The recommended and easier way makes use of [CocoaPods](http://cocoapods.org) to manage library dependencies and SDK updates. Alternatively, you can go the manual route and drop the SDK into your Xcode project.

We've documented both methods for adding SupportKit to your app. Read on and follow your preferred way of adding the SDK to your project.

## CocoaPods Method

First, install Cocoapods if it isn't already available on your system: 

```
sudo gem install cocoapods
```

Now that you've installed CocoaPods, we'll add SupportKit to your project's dependencies. Run these commands in terminal from the directory that houses your .xcodeproj file

```
$ echo "pod 'SupportKit'" >> Podfile
```

```
$ pod install
```

Open the .xcworkspace file and add the necessary code to [initialize SupportKit in your app](#import-the-supportkit-header-file). 

<aside class="notice">
Remember — when you use CocoaPods to manage your app's dependencies, you have to build and run your app using the .xcworkspace file and not the .xcodeproj file.
</aside>

## Manual Method
First, grab a copy of SupportKit by [downloading the most recent release](https://github.com/radialpoint/SupportKit/archive/master.zip) or visiting our [GitHub page](https://github.com/radialpoint/SupportKit).

Next, add the SDK to your XCode project by dragging both SupportKit.framework and SupportKit.bundle into your project as shown below.

![Dependencies in XCode](/images/dependencies.jpg)

Now you'll have to add SupportKit's dependencies to your project if they're not already linked in. Go to "Build phases" in your project's target and select "Link Binary With Libraries":

 * CoreGraphics.framework
 * CoreTelephony.framework
 * CoreText.framework
 * Foundation.framework
 * libxml2.dylib
 * OpenGLES.framework
 * QuartzCore.framework
 * SystemConfiguration.framework
 * UIKit.framework
 * AssetsLibrary.framework
 * Photos.framework
 * AVFoundation.framework

 SupportKit should now be available to your app and you're ready to add the necessary code to [initialize SupportKit in your app](#initialize-supportkit-in-your-app).

## Import the SupportKit header file

Import the SupportKit file into the your app delegate's .m file and any other places you plan to use it.

```objective_c
#import <SupportKit/SupportKit.h>
```
```swift
#import <SupportKit/SupportKit.h>
```

<aside class="notice">
If you're writing an app using Swift, then you'll need to import this header into a "bridging header". More info on this is available from [Apple](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html)
</aside>

## Initialize SupportKit in your app


After following the steps above, your app is setup for working with the SupportKit SDK. Before your code can invoke its functionality, you'll have to initialize the library using your app's token.

This token is free and uniquely identifies your app and links it to the SupportKit backend that does the heavy lifting necessary to bridge the gap between you and your users.

You can find your token by [logging into SupportKit](https://app.supportkit.io) and copying it from the settings page as shown below.

![App Token on Overview Page](/images/apptoken.png)

Once you've located your token, use the code below to initialize SupportKit.


Add the following line of code to your applicationDidFinishLaunchingWithOptions: method

```objective_c
[SupportKit initWithSettings:[SKTSettings settingsWithAppToken:@"YOUR_APP_TOKEN"]];
```
```swift
SupportKit.initWithSettings(SKTSettings(appToken: "YOUR_APP_TOKEN"))
```

Make sure to replace `YOUR_APP_TOKEN` with your app token.

### Displaying the SupportKit User Interface

Once you've initialized SupportKit, you're ready to try it out. 

Find a suitable place in your app's interface to invoke SupportKit and use the code below to display the SupportKit user interface. You can bring up SupportKit whenever you think that your user will need access to help or a communication channel to contact you.

```objective_c
[SupportKit show];
```
```swift
SupportKit.show()
```

## Updating SupportKit

### CocoaPods

To update via cocoapods, simply execute this

```
$ pod update
```

### Manual

To manually update SupportKit simply grab a fresh copy of SupportKit by [downloading the most recent release](https://github.com/radialpoint/SupportKit/archive/master.zip) and re-add the SDK to your XCode project by dragging both SupportKit.framework and SupportKit.bundle into your project