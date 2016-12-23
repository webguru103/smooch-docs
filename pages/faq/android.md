---
title: Android
section: faq
layout: two-column
---

# Android FAQ

## Why is your SDK only compatible with Android 15+?

Our Android SDK is limited to 15 or above for technical constraints. At the time we made this decision, only 4% of the Android Market is below this API level.

You can [ignore the limitation](http://stackoverflow.com/a/27336683/5534839) but we can't guarantee that it will work properly and do not officially support or test the SDK in this configuration ourselves.

## How can I build my own Android UI on top of Smooch?

If you want to build a fully-custom UI for your messaging interface, you can easily create one using Smooch to manage message sending and receiving.

You'll want to look at Conversation.java & Conversation delegate detailed in the [Android SDK Reference](http://docs.smooch.io/api/android/)

## How do I set the ConversationActivity to Portrait-only mode?

To do so, you’ll need to create your own activity that extends [onversationActivity](http://docs.smooch.io/api/android/).

Once you've created your own activity, ensure that it's [launched when a push notification is received](/docs/native-android-sdk/#notification-action-intent-override).
