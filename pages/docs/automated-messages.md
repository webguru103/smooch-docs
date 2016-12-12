---
title: Automated Messages
section: docs
layout: two-column
---

# Automated Messages

Smooch allows you to reach out to your users at scale so that you can start conversations with them about anything that matters to your app, even if they aren't in need of service or support. We call this feature "Whispers" and it allows you to automatically send a message to a targeted group of users at exactly the right time.

To help get you started, we've built in 5 basic templates and also allow you to create your own using any custom metadata that you're capturing with the `Smooch User` API.

 * _Welcome Whisper_ : Welcome new users to your app by starting a conversation where you can answer pressing questions and get initial feedback.

 * _Re-Engage Users_ : Send a message to users who were last seen using the app at least 7 days ago.

 * _Announcement_ : Send a message to all users when they launch the app.

 * _Ask for app rating_ : Send a message to all users who have signed up at least 5 days ago, prompting them to rate your app in the app store.

 * _Auto-response_ : Inform users of when to expect an answer, when they send their first message.

 You can start from any of these templates and customize it to meet your needs. You can also create a custom Whisper from scratch and go beyond these templates. You can use Whispers to ask for reviews from your most engaged users at the right time, you can notify users of older versions of your app about new versions, and more.

<aside class="notice">To prevent conflicts, when an <a href="office-hours/">Office Hours</a> message is sent the `Auto-response` whisper will not trigger.</aside>

## How Whispers work

You create Whispers from within the [Smooch dashboard](https://app.smooch.io) by specifying which users should receive your message, the message you'd like to send to your users and the event that should trigger delivery of this message. For example, to create a Whisper that would check in to see how users are doing 2 days after installing an app, you'd create a custom Whisper with these settings:

![Whisper creation form](/images/create_whisper.png)

### Targeting a group of users

You can target your users based on any information that you've stored using the `Smooch User` API. We also provide several built-in properties that you can use without instrumenting your app with calls to `Smooch User` class.

 * _All users_ : Send the Whisper to *everyone* that has your app. Whispers that target everyone must be [linked to an event](#when-are-whispers-sent).

 * _Signed Up_ : Send the message before/after a specified number of days. For example, you can use this to send a message to all users who've been using your app for less than a day or more than a week.

 * _Last Seen_ : Send the message based on when the user last interacted with your app. This value is updated automatically each time a user launches your app.

 * _App Version_ : Send the message to users who are using (or not using) a specific version of your app. The value for this property is taken from the CFBundleShortVersionString key in your app's info.plist file, and is updated each time the user launches your app.

In order to create Whispers based on properties you've defined using the `Smooch User` class, you'll need to run your app and ensure that at least 1 of your users was tagged with the property you want to base your Whisper on. Alternatively, you can make a HTTP request to the `PUT /appusers` route of the [Smooch REST API](https://docs.smooch.io/rest). For more information on using custom properties, read our [documentation on managing user information](managing-user-information/).

It's possible to add multiple conditions to a Whisper, allowing you to filter out users based on their properties. In the example below, you can see a Whisper that will be sent only if the platform of the user is iOS and if the user has signed up less than 7 days ago:

![Whisper with conditions](/images/whisper_conditions.png)

### Personalizing the message text

You can personalize the message that's being sent with the first or last name of the user. To do this, simply use the syntax `{{ firstName || fallback }}` when creating your message. If the user's firstName hasn't been set by your code through the `Smooch User` class then the placeholder will be replaced with the string specified as `fallback`.

## When are Whispers sent

Whispers can be sent either when a specified event occurs in your app or when a user's profile information matches the criteria of the target group.

Whispers that are based on custom events defined by you in your app are tied to the execution of the Smooch `track:` method. When `track:` is called, Smooch will check to see if the associated Whisper has already been seen by this user. If it hasn't, the Whisper will be immediately presented to the user through an in-app notification that leads to the messaging interface when tapped. When you create a Whisper, Smooch will display a preview of this in-app notification.

```java
Smooch.track("item-in-cart");
```
```javascript
Smooch.track('item-in-cart');
```
```objective_c
[Smooch track:@"user-on-promopage"];
```
```swift
Smooch.track("user-on-promopage");
```

If the Whisper is not tied to an event, Smooch will monitor your userbase for changes and dispatch Whispers when a user's properties make them a fit for the target group of your Whisper. In many cases, this occurs when the user is not using your app. For instance, if you elect to send a Whisper to new users after 1 day has elapsed, Smooch will deliver the message approximately 24 hours after the user first used your app. If you choose to use this powerful method of Whisper delivery, ensure that you've enabled push notifications for your app in Smooch. With push enabled, your users will receive a message that will bring them back into the conversation, even if they're not using your app.

Note that users need to be prompted and accept to receive push notifications. To make sure we don't prompt the user at a bad moment, Smooch will only request permission to send push notifications after a user sends his first message and only if the prompt wasn't shown earlier by your app. To get the full power of Whispers, we recommend you prompt for push permission as early as possible.

## Adding user actions to a Whisper

You can prompt your users to take actions by adding action buttons to your Whisper. Clicking on 'Add an action' will open up a new input box where you can specify the button text and what action to take when the user clicks on the button.

## Managing Whispers

![Manage Whispers](/images/whisper_manage.png)

Once you've created a Whisper you can manage it from within the Smooch web interface. By clicking on the "Whispers" link in the navigation bar, you'll be presented with a list of Whispers as well as the number of users who have been exposed to them while running your app.

You can pause Whispers at any time. When you do so, the Whisper will not be shown to any more users until you mark it as active by clicking "Resume".
