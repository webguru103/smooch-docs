---
title: Multi-Device Users
section: docs
layout: two-column
---

Smooch allows you to identify new users on the fly, engage with them in a single conversation thread across multiple devices, and associate user and device profile information so that you can better understand the context of a user's message.

# Users on multiple devices

You may have users using your app on multiple devices. For example, suppose they have your app installed on both their iPhone and their iPad. You might also have Smooch integrated in both your mobile app as well as on your web site.

If you want the user to see the same conversation across devices you can do so by assigning your users a `userId`. This will link a user across all devices and platforms that have integrated with your Smooch app. Specifying a `userId` also facilitates [user authentication](/docs/authenticating-users/).

The `userId` is a string that can be an email, GUID, or an existing ID from your own user directory. The `userId` must be unique within a given Smooch app, and it will only link devices within a single Smooch app.

<aside class="warning">
**Caution:** If you're specifying a `userId` then in order to keep conversations private we strongly suggest [authenticating your users](/docs/authenticating-users/). If a `userId` is used without a JWT credential, then anyone who can discover a user's `userId` could potentially eavesdrop on the conversation.
</aside>

After Smooch has been initialized, you can set the `userId` using the `login` API:

Objective-C:
```objective_c
[Smooch login:yourUserId jwt:nil];
```

Swift:
```swift
Smooch.login(yourUserId, jwt:nil)
```

JavaScript:
```javascript
Smooch.login(yourUserId);
```

Java:
```java
Smooch.login(yourUserId, null);
```

In most use cases Smooch is initialized synchronously as your app loads. For this reason, once you've set your user's `userId` for the first time it is recommended that you store that `userId` locally on the device so that it does not need to be fetched again the next time the user opens the app. If your app knows the `userId` at app boot time, instead of calling `login` you can specify the `userId` during Smooch initialization like so:

Objective-C:
```objective_c
SKTSettings* settings = [SKTSettings settingsWithAppToken:@"YOUR_APP_TOKEN"];
settings.userId = yourUserId;
[Smooch initWithSettings:settings];
```

Swift:
```swift
var settings = SKTSettings(appToken: "YOUR_APP_TOKEN")
settings.userId = yourUserId
Smooch.initWithSettings(settings)
```

JavaScript:
```javascript
Smooch.init({
    appToken: 'YOUR_APP_TOKEN',
    userId: yourUserId
});
```

Java:
```java
Settings settings = new Settings("YOUR_APP_TOKEN");
settings.setUserId(yourUserId);
Smooch.init(this, settings);
```

## Omitting the userId

Smooch will work perfectly fine without a `userId`. Profile information can still be included but the user will only be able to access the conversation from the device they're currently using. This means that even if you specify the same profile information, if the same individual opens Smooch on a new device, or runs your web app in an incognito browser session, they will see a newly created empty conversation when they open Smooch. Only the `userId` can be used to synchronize a conversation across devices.

A `userId` can also be omitted at first and added at a later time. If you deploy an update to your app that assigns an existing user with a new `userId` that they didn't have before, any existing conversation history they have will be preserved and their messages will start being synchronized across all devices where that `userId` is being used. This is particularly useful if a user opens Smooch and starts a conversation before having logged in to your app.

## Switching users

If your app allows a shared device to switch between multiple user identities you can call the `login` API multiple times to switch between different `userId`s.

### Logging out

Your app may have a logout function which brings users back to a login screen. In this case you would want to revert Smooch to a pre-login state. You can do this by calling the `logout` API.

Calling `logout` will disconnect your user from any `userId` they were previously logged in with and it will remove any conversation history stored on the device. Logging out will *not* disable Smooch. While logged out, the user is free to start a new conversation but they will show up as if `userId` was omitted during Smooch initialization.

Objective-C:
```objective_c
[Smooch logout];
```

Swift:
```swift
Smooch.logout()
```

JavaScript:
```javascript
Smooch.logout();
```

Java:
```java
Smooch.logout();
```
