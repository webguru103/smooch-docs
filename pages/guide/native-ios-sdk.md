---
title: Native iOS SDK
section: guide
layout: two-column
---

# iOS SDK

## Reference

- [iOS API reference](http://docs.smooch.io/api/ios/)

## Adding Smooch to your app

There are two ways to install the Smooch SDK. Our recommended way to install Smooch is through [CocoaPods](#cocoapods-method). We support Carthage too and you can also go the [manual route](#manual-method--carthage) and drop the SDK into your Xcode project.

We've documented both methods for adding Smooch to your app. Read on and follow your preferred way of adding the SDK to your project.

### CocoaPods Method

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

### Manual Method / Carthage

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

### Import the Smooch header file

Import the Smooch file into the your app delegate's .m file and any other places you plan to use it.

Objective-C:
```objective_c
#import <Smooch/Smooch.h>
```

Swift:
```swift
import Smooch
```

### Add Required Keys in your app's Info.plist

The Smooch SDK may need to ask users permission to use certain features. Depending on the feature, you must provide a description in your app's `Info.plist` to explain why access is required. These descriptions will be displayed the moment we prompt the user for permission.

#### Images

The Smooch SDK allows users to send images to you. To support this feature, you need to provide a description for the following keys:

* NSCameraUsageDescription: describes the reason your app access the camera (ex: `Camera permission is required to send images to ${PRODUCT_NAME}`). More information available [here](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW24)
* NSPhotoLibraryUsageDescription: describes the reason your app accesses the photo library (ex: `Photo library permission is required to send images to ${PRODUCT_NAME}`). More information available [here](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW17)

<aside class="notice">
Starting from iOS 10, these values are required. If they are not present in your app's Info.plist, the option to send an image will not be displayed.
</aside>

#### Location

The Smooch SDK also allows users to send their current location. To support this feature, you must provide a description for any of the following keys depending on your app's use of location services. Smooch will ask the user for the location depending on the key you provide:

* NSLocationWhenInUseUsageDescription: describes the reason for your app to access the user’s location information while your app is in use (ex: `Location services is required to send your current location to ${PRODUCT_NAME}`). This permission is recommended if your app does not use location services and Smooch will default to it if both keys are included. More information available [here](https://developer.apple.com/library/prerelease/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW26)
* NSLocationAlwaysUsageDescription: describes the reason for your app to access the user’s location information at all times (ex: `Location services is required to send your current location to ${PRODUCT_NAME}`). More information available [here](https://developer.apple.com/library/prerelease/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW18)

<aside class="notice">
If you don't provide one of these keys, any attempt from the user to send their current location will fail.
</aside>

### Initialize Smooch in your app


After following the steps above, your app is setup for working with the Smooch SDK. Before your code can invoke its functionality, you'll have to initialize the library using your app's token.

This token is free and uniquely identifies your app and links it to the Smooch backend that does the heavy lifting necessary to bridge the gap between you and your users.

You can find your token by [logging into Smooch](https://app.smooch.io) and copying it from the settings page as shown below.

![App Token on Overview Page](/images/apptoken.png)

Once you've located your token, use the code below to initialize Smooch.


Add the following line of code to your applicationDidFinishLaunchingWithOptions: method

Objective-C:
```objective_c
[Smooch initWithSettings:[SKTSettings settingsWithAppToken:@"YOUR_APP_TOKEN"]];
```

Swift:
```swift
Smooch.initWithSettings(SKTSettings(appToken: "YOUR_APP_TOKEN"))
```

Make sure to replace `YOUR_APP_TOKEN` with your app token.

#### Displaying the Smooch User Interface

Once you've initialized Smooch, you're ready to try it out.

Find a suitable place in your app's interface to invoke Smooch and use the code below to display the Smooch user interface. You can bring up Smooch whenever you think that your user will need access to help or a communication channel to contact you.

Objective-C:
```objective_c
[Smooch show];
```

Swift:
```swift
Smooch.show()
```

### Updating Smooch

#### CocoaPods

To update via cocoapods, simply execute this

```
$ pod update
```

#### Carthage

To update Carthage dependencies, you can simply run:

```
$ carthage update
```

#### Manual

First, grab the latest version of `Smooch.framework` either through [GitHub](https://github.com/smooch/smooch-ios) or by [direct download](https://github.com/smooch/smooch-ios/archive/master.zip). Then, find the location of the old .framework file on disk, and replace it with the new one.

## Configuring push notifications

Push notifications are a great, unobtrusive way to let your users know that a reply to their message has arrived.

### Step 1. Enable Push Notifications and Generate the .p12 Certificate

1. Log into the Identifiers section of the Apple Developer Member Center, and select your app. You can get there by visiting [this link](https://developer.apple.com/account/ios/identifiers/bundle/bundleList.action)

2. Click 'Edit', enable 'Push Notifications', and then click 'Create Certificate..."

3. Follow the instructions to generate a certificate signing request using Keychain Access

4. Once the certificate is ready, download it to your computer and double-click it to open it in Keychain Access

5. Right click on the certificate you created, and select 'Export "Apple Development IOS Push Services:..."'

6. Save the .p12 file to your computer.

### Step 2. Upload the .p12 file to Smooch

1. Go to [the iOS integration page](https://app.smooch.io/integrations/ios).

2. Click on the **Connect** or **Configure** button.

3. Upload the .p12 file.

### Step 3. Re-create your Provisioning Profile

Now that you have enabled push notifications for your app, you MUST re-create your Provisioning Profile. You can not use the one you've used in the past.

1. Go to Provisioning Profiles in the Apple Developer Member Center by [clicking here](https://developer.apple.com/account/ios/profile/profileList.action).

2. Click the '+' button to add a new provisioning profile and follow the on-screen instructions.

3. Notice that once you created the new provisioning profile, it shows that "Push Notifications" is an enabled service. Download the new profile.

4. Double click it to install it. It should now be selectable in Xcode for your app.

5. Build your app.

### Step 4. Test it out!

<aside class="warning">
You can't receive push notifications in the Xcode simulator, you must use a physical device.
</aside>

1. Kill and restart your app.

2. Launch Smooch.

3. Send a message. Important! You must resend a message after uploading the p12 file.

4. Reply to the message from the Business System integration of your choice

You'll receive a notification if you're in the app, or outside the app!

### Step 5. Repeat for Production mode

Take note that there are "Development" and "Production" certificates and profiles. Make sure that you upload the "Production" .p12 file to Smooch when you're ready to release your build through ad-hoc, enterprise or app store distribution.

<aside class="notice">
Smooch automatically handles incoming push notifications by swizzling certain methods on your app's `UIApplicationDelegate`. To disable this behaviour, you can set `enableAppDelegateSwizzling` to `false` on your `SKTSettings` object. However, if you choose to do so, you **must** follow the instructions outlined in the <a href="http://docs.smooch.io/api/ios/Classes/SKTSettings.html#//api/name/enableAppDelegateSwizzling">API documentation</a> to ensure that push notifications continue to be handled correctly.

Additionally, on iOS 10 and above, Smooch will handle user notification presentation and on-tap handling by overriding the `UNUserNotificationCenterDelegate` for your application. To disable this behaviour, you can set `enableUserNotificationCenterDelegateOverride` to `false` on your `SKTSettings` object. As above, if you choose to disable automatic handling of notifications, you **must** follow the instructions outlined in the <a href="http://docs.smooch.io/api/ios/Classes/Smooch.html#//api/name/userNotificationCenterDelegate">API documentation</a>.
</aside>

## Rich Notifications

On iOS 10 and above, it's now possible to display a custom user interface when the user interacts with your application's remote and local notifications. Smooch provides the ability to display the user's conversation history when viewing a notification:

![iOS Rich Notifications](/images/ios_rich_notifications.png)

To enable this behaviour, sample code and configuration instructions can be found in the [smooch-ios-rich-notifications](https://github.com/smooch/smooch-ios-rich-notifications) repository.

## Localization

Every string you see in Smooch can be [customized](#strings-customization) and localized. Smooch provides a few languages out of the box, but [adding new languages](#adding-more-languages) is easy to do. When localizing strings, Smooch looks for SmoochLocalizable.strings in your app bundle first then in the Smooch bundle, enabling you to customize any strings and add support for other languages.

### Enabling Localization in your app

For Smooch to display a language other than English, your app needs to first enable support for that language. You can enable a second language in your Xcode project settings:

![Enable Localization](/images/add_language.png)

Once you have this, Smooch will display itself in the device language for the supported language.

These languages are included with the iOS SDK: Arabic, English, Finnish, French, German, Italian, Japanese, Korean, Mandarin Chinese (traditional and simplified), Persian, Portuguese (Brazil and Portugal), Russian, Slovenian, Spanish, and Swedish.

See how to support more languages in [Adding more languages](#adding-more-languages)

<aside class="warning">
Localization is subject to caching. If you can't see your changes, cleaning your project, resetting the simulator, deleting your app from your test devices are good measures.
</aside>

### Adding more languages

To enable other languages beside the provided ones, first copy the english SmoochLocalizable.strings file from the Smooch bundle to the corresponding .lproj folder for that language. Then, translate the values to match that language.

If you translate Smooch's strings to a language not currently supported, we encourage you to share it with us so that every Smooch user can benefit from it. You can do so by [forking](https://github.com/smooch/smooch-ios/fork) our GitHub repo and creating a pull request, or just send us your string file at <a href="mailto:help@smooch.io">help@smooch.io</a>

## Customization

### Strings customization

Smooch lets you customize any strings it displays via Apple's localization mechanism. To override one or more strings, add an empty string file named `SmoochLocalizable.strings` in your Xcode project and specify new values for the keys you would like to override. For example, to change the "Messages" header, and the "Done" button create a file with these contents:

```
"Messages" = "My Messages";

"Done" = "I'm Done";
```

The full set of keys is listed below. To enable string customization across languages, make sure you "Localize" your `SmoochLocalizable.strings` file in Xcode.

![Localize SmoochLocalizable.strings](/images/localize.png)

```
/* Nav bar button, action sheet cancel button */
"Cancel" = "...";

/* Conversation title */
"Messages" = "...";

/* Conversation header. Uses CFBundleDisplayName */
"This is the start of your conversation with the %@ team. We'll stay in touch to help you get the most out of your app.\nFeel free to leave us a message about anything that’s on your mind. We’ll get back to your questions, suggestions or anything else as soon as we can." = "...";

/* Conversation header when there are previous messages */
"Show more..." = "...";

/* Conversation header when fetching previous messages */
"Retrieving history..." = "...";

/* Error message shown in conversation view */
"No Internet connection" = "...";

/* Error message shown in conversation view */
"Could not connect to server" = "...";

/* Error message shown in conversation view */
"An error occurred while processing your action. Please try again." = "...";

/* Error message shown in conversation view */
"Reconnecting..." = "...";

/* Fallback used by the in app notification when no message author name is found */
"%@ Team" = "...";

/* Conversation send button */
"Send" = "...";

/* Conversation text input place holder */
"Type a message..." = "...";

/* Conversation nav bar left button */
"Done" = "...";

/* Failure text for chat messages that fail to upload */
"Message not delivered. Tap to retry." = "...";

/* Status text for chat messages */
"Sending..." = "...";

/* Action sheet button label */
"Take Photo" = "...";

/* Action sheet button label */
"Use Last Photo Taken" = "...";

/* Action sheet button label */
"Choose from Library" = "...";

/* Action sheet button label */
"Resend" = "...";

/* Action sheet button label */
"View Image" = "...";

/* Error displayed in message bubble if image failed to download */
"Tap to reload image" = "...";

/* Error displayed as message if location sending fails */
"Could not send location" = "...";

/* Error title when user selects "use latest photo", but no photos exist */
"No Photos Found" = "...";

/* Error description when user selects "use latest photo", but no photos exist */
"Your photo library seems to be empty." = "...";

/* Error title when user attempts to upload a photo but Photos access is denied */
"Can't Access Photos" = "...";

/* Error description when user attempts to upload a photo but Photos access is denied */
"Make sure to allow photos access for this app in your privacy settings." = "...";

/* Error title when user attempts to take a photo but camera access is denied */
"Can't Access Camera" = "...";

/* Error description when user attempts to take a photo but camera access is denied */
"Make sure to allow camera access for this app in your privacy settings." = "...";

/* Generic error title when user attempts to upload an image and it fails for an unknown reason */
"Can't Retrieve Photo" = "...";

/* Generic error description when user attempts to upload an image and it fails for an unknown reason */
"Please try again or select a new photo." = "...";

/* Error title when user attempts to send the current location but location access is denied */
"Can't Access Location" = "...";

/* Error description when user attempts to send the current location but location access is denied */
"Make sure to allow location access for this app in your privacy settings." = "...";

/* UIAlertView button title to link to Settings app */
"Settings" = "...";

/* UIAlertView button title to dismiss */
"Dismiss" = "...";

/* Title for payment button */
"Pay Now" = "...";

/* Title for message action when payment completed */
"Payment Completed" = "...";

/*
 Instructions for entering credit card info. Parameters are as follows:
 1. Amount (e.g. 50.45)
 2. Currency (e.g. USD)
 3. App name (Uses CFBundleDisplayName)
*/
"Enter your credit card to send $%@ %@ securely to %@" = "...";

/* Error text when payment fails */
"An error occurred while processing the card. Please try again or use a different card." = "...";

/* Button label for saved credit card view */
"Change Credit Card" = "...";

/*
 Information label for saved credit card view. Parameters are as follows:
 1. Amount (e.g. 50.45)
 2. Currency (e.g. USD)
 3. App name (Uses CFBundleDisplayName)
 */
"You're about to send $%@ %@ securely to %@" = "...";

/* Title for user notification action */
"Reply" = "...";
```

### Styling the Conversation Interface

The style of the conversation user interface can be controlled through two techniques:

 * Using the `UIAppearance` proxy of `UINavigationBar` to style the navigation bar's color and appearance.
 * The `SKTSettings` class provides access to the status bar and the color of the message bubbles.

Suppose you wanted the conversation UI to have a black navigation bar and red message bubbles. First, you'd use `UINavigationBar`'s appearance proxy to set up the navigation bar. Then, you'd use SKTSettings to finish styling the UI:

Objective-C:
```objective_c
SKTSettings* settings = [SKTSettings settingsWithAppToken:@"YOURAPP_TOKEN"];
settings.conversationAccentColor = [UIColor redColor];
settings.conversationStatusBarStyle = UIStatusBarStyleLightContent;

[[UINavigationBar appearance] setBarTintColor:[UIColor blackColor]];
[[UINavigationBar appearance] setTintColor:[UIColor redColor]];
[[UINavigationBar appearance] setTitleTextAttributes:@{ NSForegroundColorAttributeName : [UIColor redColor] }];
```

Swift:
```swift
var settings = SKTSettings(appToken: "YOUR_APP_TOKEN")
settings.conversationAccentColor = UIColor.redColor();
settings.conversationStatusBarStyle = UIStatusBarStyle.LightContent;

UINavigationBar.appearance().barTintColor = UIColor.blackColor()
UINavigationBar.appearance().tintColor = UIColor.redColor()
UINavigationBar.appearance().titleTextAttributes = [ NSForegroundColorAttributeName : UIColor.redColor()]
```