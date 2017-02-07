---
title: iOS
section: faq
layout: two-column
---

# iOS FAQ

## How does Smooch handle push notifications?

We can handle push notifications in 2 ways:

If the `enableAppDelegateSwizzling` property of your SKTSettings object is set to `YES`, then Smooch will automatically handle any push notifications that originated from Smooch before forwarding to your app delegate's `didReceiveRemoteNotification` method.

If you set that property to `NO`, then you will have to call `[Smooch handlePushNotification:userInfo]` in your `didReceiveRemoteNotification` callback. To check the origin, you use the following code

```objectivec
BOOL isSmoochNotification = userInfo[SKTPushNotificationIdentifier] != nil
```

You can find official documentation about this in the Smooch header files, or in our api docs:

http://docs.smooch.io/api/ios/Classes/SKTSettings.html#//api/name/enableAppDelegateSwizzling, http://docs.smooch.io/api/ios/Classes/Smooch.html#//api/name/setPushToken, http://docs.smooch.io/api/ios/Classes/Smooch.html#//api/name/handlePushNotification:

## How do I present Smooch inside a View Controller?

The iOS SDK provides [a method](http://docs.smooch.io/api/ios/Classes/Smooch.html#//api/name/newConversationViewController) to present Smooch in a custom ViewController.

## How do I capture a tap on the send button of the iOS SDK?

The delegate method `shouldHandleMessageAction` can be fired so that you can intercept this event. Read more about it in the [iOS SDK Reference](http://docs.smooch.io/api/ios/Protocols/SKTConversationDelegate.html#//api/name/conversation:shouldHandleMessageAction)

## How can I determine whether or not the conversation view controller is active or inactive?

It's best to implement `SKTConversationDelegate` in your code and track state of the conversation view controller this way. The two methods you'll want to use are described in the following links:

http://docs.smooch.io/api/ios/Protocols/SKTConversationDelegate.html#//api/name/conversation:willShowViewController:
http://docs.smooch.io/api/ios/Protocols/SKTConversationDelegate.html#//api/name/conversation:willDismissViewController:

## How do I build my own UI using your iOS SDK?

Although we provide a powerful, fully capable UI - some applications require building something entirely bespoke. You can use our core iOS API to build your own UI on top of Smooch.

The [SKTConversaton](http://docs.smooch.io/api/ios/Classes/SKTConversation.html) and [SKTConversationDelegate](http://docs.smooch.io/api/ios/Protocols/SKTConversationDelegate.html) should provide you with everything you need.

## How can I customize the iOS SDK's appearance?

Read more about this in our [documentation](/guide/native-ios-sdk/#styling-the-conversation-interface)

## Is it possible to switch between app tokens during a session?

Currently, we don’t provide support for switching between app tokens during the same application session. You can however switch users during the same session. (by calling smooch.login with a different userId)

## Xcode build fails with `Library not loaded: @rpath/Frameworks/Smooch.framework`. How can I fix this ?

In your project build settings, make sure `Runtime Search Paths (LD_RUNPATH_SEARCH_PATHS)` is set to `$(inherited), @executable_path/Frameworks`.