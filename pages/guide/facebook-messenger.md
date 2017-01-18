---
title: Facebook Messenger
section: guide
layout: two-column
---

# Facebook Messenger

Our Facebook Messenger integration allows your users to send you Facebook messages through your Facebook Page which you receive in a business system or with Webhooks. Your replies are sent back as a Facebook message to the user.

### Configuring Facebook Messenger

To use the [Facebook Messenger integration](https://app.smooch.io/integrations/messenger), you need a Facebook account with permissions to manage a published Facebook page. You then need to visit the Facebook Messenger integration page and press on "Connect your Facebook account". This will redirect you to Facebook where you will need to allow Smooch to access your account information.

Once your Facebook account is connected to Smooch, select the Facebook page you want to use and hit save. You should now be able to receive messages from your Facebook page and reply via any of your configured business systems or with the Smooch API.

![Facebook Messenger Integration Page Settings](/images/messenger_settings.png)


### Action Buttons

Action buttons work as expected. A `link` action button will bring the user to the specified URL while a `postback` action button will trigger any [webhook](https://docs.smooch.io/rest/#webhooks) listening to the `postback` trigger.

Because of new [Facebook terms of service](https://developers.facebook.com/policy/#messengerplatform), payment requests (action buttons of type `buy`) cannot currently be sent to Messenger.

### Persistent Menu

![Facebook Messenger Persistent Menu](/images/messenger_menu.png)

It's possible to configure a menu of 1-5 buttons on the Messenger UI by calling [the Smooch REST API](https://docs.smooch.io/rest/#persistent-menus). Menus are configured per app, not per user. Menu items can be [link](structured-messages/#link-buttons) or [postback](structured-messages/#postback-buttons) type actions.
