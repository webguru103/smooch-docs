---
title: Changelog
section: docs
layout: two-column
---

# Changelog

## December 2nd, 2016

- Added support for Facebook Messenger [list messages](http://docs.smooch.io/rest/#list-message)
- Added new field `type` to the [create message API](http://docs.smooch.io/rest/#post-message)
- Reply actions are now transformed into keyboard buttons on Viber

## November 24th, 2016

- Added typing indicator support in iOS SDK [5.2.0](https://github.com/smooch/smooch-ios/releases/tag/5.2.0)

## November 16th, 2016

- Added typing indicator support in Web messenger [3.8.0](https://github.com/smooch/smooch-js/releases/tag/3.8.0)

## November 15th, 2016

- Added ability to change email in the [account page](https://app.smooch.io/account)
- [Managed accounts API](http://docs.smooch.io/rest/#introduction10) are now available and let you create [apps](http://docs.smooch.io/rest/#apps), configure [integrations](http://docs.smooch.io/rest/#integrations) and generate [keys](http://docs.smooch.io/rest/#app-keys) programmatically

## November 10th, 2016

- Added [suggested replies](http://docs.smooch.io/rest/#action-buttons) support in Web Messenger [3.7.0](https://github.com/smooch/smooch-js/releases/tag/3.7.0)

## November 7th, 2016

- [Viber](https://app.smooch.io/integrations/viber) is now a customer channel available on Smooch. [Learn more](http://blog.smooch.io/bring-your-business-to-viber-with-smooch/)
- Updated [LINE](https://app.smooch.io/integrations/line) to support Carousel, Action buttons, Quick replies and Postback. [Learn more](http://blog.smooch.io/line-upped-its-messaging-game/)
- Web Messenger [3.6.0](https://github.com/smooch/smooch-js/releases/tag/3.6.0) was released to support Viber and LINE
- Added [delete app API](http://docs.smooch.io/rest/#delete-app)

## October 28th, 2016

- Added [Typing activity API](http://docs.smooch.io/rest/#typing-activity)

## October 26th, 2016

- [Integration directory](https://app.smooch.io/integrations) is now available in the dashboard
- Added [Init.ai](https://app.smooch.io/integrations/init.ai), [Rep](https://app.smooch.io/integrations/rep), [Gorgias](https://app.smooch.io/integrations/gorgias), [Gupshup](https://app.smooch.io/integrations/gupshup), [Converse.ai](https://app.smooch.io/integrations/converse.ai) & [Dialog Analytics](https://app.smooch.io/integrations/dialoganalytics) integrations

## October 17th, 2016

- Upgraded [LINE](https://app.smooch.io/integrations/line) to support the new messaging API. LINE BOT API support is now deprecated.

## October 14th, 2016

- Added pagination support in iOS SDK [5.1.0](https://github.com/smooch/smooch-ios/releases/tag/5.1.0)

## September 21th, 2016

- Added support for Facebook Messenger [share buttons](http://docs.smooch.io/rest/#action-buttons) and [quick replies icons](http://docs.smooch.io/rest/#action-buttons).

## September 7th, 2016

- iOS SDK [5.0](https://github.com/smooch/smooch-ios/releases/tag/5.0.0) adds support for iOS 10, replyable notifications, and rich notifications. [Learn more](http://blog.smooch.io/release-notes-frictionless-notifications-for-ios-10/)

## September 2nd, 2016

- Added pagination support on the [conversation API](http://docs.smooch.io/rest/#get-messages)
- Web messenger [3.4.0](https://github.com/smooch/smooch-js/releases/tag/3.4.0) adds support for pagination and loads message history as you scroll

## August 18th, 2016

- Added [persistent menu API](http://docs.smooch.io/rest/#persistent-menus) with support on Facebook Messenger and WeChat
- Added message transferred counts in the dashboard
- Android SDK [4.0.0](https://github.com/smooch/smooch-android/releases/tag/4.0.0) now supports Android 7.0 "Nougat" and Firebase cloud messaging

## August 15th, 2016

- Added user linking for the SMS customer channel on Web messenger [3.3.0](https://github.com/smooch/smooch-js/releases/tag/3.3.0). [Learn more](http://blog.smooch.io/new-feature-sms-linking-added-to-web-messenger/)
- Added [user linking API](http://docs.smooch.io/rest/#link-app-user-to-channel) for SMS

## August 10th, 2016

- Android SDK [3.2.2](https://github.com/smooch/smooch-android/releases/tag/3.2.2) now includes turkish translations

## July 29th, 2016

Web Messenger [3.2.0](https://github.com/smooch/smooch-js/releases/tag/3.2.0) now supports: 
- Being displayed as a button or a tab when closed. 
- Color customization from the dashboard. 
- Automatic contrast detection for text displayed on top of configured colors.

## July 26th, 2016

- Added [carousel API](http://docs.smooch.io/rest/#carousel-messages) with full support for Facebook Messenger and Telegram. Text only fallback for all other channels.

## July 13th, 2016

- Added Suggested replies support via the [API](http://docs.smooch.io/rest/#action-buttons) and via the [message syntax](/guide/sending-images-and-buttons-shorthand/)

## June 29th, 2016

Web Messenger [3.1.0](https://github.com/smooch/smooch-js/releases/tag/3.1.0) adds:
- An error banner when sending a message fails
- Auto resize based on window height

## June 22nd, 2016

- Added [WeChat](https://app.smooch.io/integrations/wechat) as a customer channel. [Learn more](http://blog.smooch.io/wechat-smooch-talk-to-customers-in-asia-your-way/)
- Web Messenger [3.0.0](https://github.com/smooch/smooch-js/releases/tag/3.0.0) adds notifications and account linking on Facebook Messenger, Telegram & WeChat. [Learn more](http://blog.smooch.io/introducing-smooch-web-messenger-smart-notifications/)

## May 25th, 2016

- Android SDK [3.2.0](https://github.com/smooch/smooch-android/releases/tag/3.2.0) allows to manually trigger Smooch push notifications via multiple `GCMListener`

## May 24th, 2016

- Added [Email](https://app.smooch.io/integrations/frontendEmail) as a customer channel. [Learn more](http://blog.smooch.io/integration-spotlight-add-email-to-your-messaging-mix/)