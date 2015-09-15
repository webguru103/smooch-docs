## When are Whispers sent

Whispers can be sent either when a specified event occurs in your app or when a user's profile information matches the criteria of the target group.

Whispers that are based on custom events defined by you in your app are tied to the execution of the SupportKit `track:` method. When `track:` is called, SupportKit will check to see if the associated Whisper has already been seen by this user. If it hasn't, the Whisper will be immediately presented to the user through an in-app notification that leads to the messaging interface when tapped. When you create a Whisper, SupportKit will display a preview of this in-app notification.

```java
SupportKit.track("item-in-cart");
```
```javascript
SupportKit.track('item-in-cart');
```
```objective_c
[SupportKit track:@"user-on-promopage"];
```
```swift
SupportKit.track("user-on-promopage");
```

If the Whisper is not tied to an event, SupportKit will monitor your userbase for changes and dispatch Whispers when a user's properties make them a fit for the target group of your Whisper. In many cases, this occurs when the user is not using your app. For instance, if you elect to send a Whisper to new users after 1 day has elapsed, SupportKit will deliver the message approximately 24 hours after the user first used your app. If you choose to use this powerful method of Whisper delivery, ensure that you've enabled push notifications for your app in SupportKit. With push enabled, your users will receive a message that will bring them back into the conversation, even if they're not using your app.

Note that users need to be prompted and accept to receive push notifications. To make sure we don't prompt the user at a bad moment, SupportKit will only request permission to send push notifications after a user sends his first message and only if the prompt wasn't shown earlier by your app. To get the full power of Whispers, we recommend you prompt for push permission as early as possible.