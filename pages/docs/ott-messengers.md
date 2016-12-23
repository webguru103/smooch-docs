---
title: OTT Messengers
section: docs
layout: two-column
---

# OTT Messengers

Over the top (OTT) messaging channels like Viber, Telegram, LINE, WeChat and Facebook Messenger are where the highest growth in messaging use is. Smooch makes it feasible to connect to any number of these OTT channels by abstracting the particularities of their feature sets and APIs, while still making it possible to use rich features available on each platform.

## Facebook Messenger

Our Facebook Messenger integration allows your users to send you Facebook messages through your Facebook Page which you receive in any of our channels like Slack, HipChat or Help Scout. Your replies are sent back as a Facebook message to the user.

### Configuring Facebook Messenger

To use the [Facebook Messenger integration](https://app.smooch.io/integrations/messenger), you need a Facebook account with permissions to manage a published Facebook page. You then need to visit the Facebook Messenger integration page and press on "Connect your Facebook account". This will redirect you to Facebook where you will need to allow Smooch to access your account information.

Once your Facebook account is connected to Smooch, select the Facebook page you want to use and hit save. You should now be able to receive messages from your Facebook page and reply via any of your configured channels.

![Facebook Messenger Integration Page Settings](/images/messenger_settings.png)


### Action Buttons

Action buttons work as expected. A `link` action button will bring the user to the specified URL while a `postback` action button will trigger any [webhook](https://docs.smooch.io/rest/#webhooks) listening to the `postback` trigger.

Because of new [Facebook terms of service](https://developers.facebook.com/policy/#messengerplatform), payment requests (action buttons of type `buy`) cannot currently be sent to Messenger.

### Persistent Menu

![Facebook Messenger Persistent Menu](/images/messenger_menu.png)

It's possible to configure a menu of 1-5 buttons on the Messenger UI by calling [the Smooch REST API](https://docs.smooch.io/rest/#persistent-menus). Menus are configured per app, not per user. Menu items can be [link](structured-messages/#link-buttons) or [postback](structured-messages/#postback-buttons) type actions.

## LINE

LINE is a Japan based rapidly growing mobile messaging app that offers free voice and video calls, messages, and a limitless variety of stickers. With over 600 million users worldwide, LINE's expanding platform is a great way to stay in touch with your customers.

Our LINE integration allows your users to send messages to your LINE bot which you receive in channels like Slack, HipChat or Help Scout. Your replies are sent back as coming from your LINE bot.

You can also receive the user messages through a [webhook](https://docs.smooch.io/rest#webhooks).

Before you can configure LINE to work with Smooch, you'll have to create a LINE business account and a messaging API channel (see below).

### Creating a LINE Business Account

To create a business account you first need to create a LINE account through a [mobile app](http://line.me/en-US/download).

If you already have a LINE business account, login to the [LINE business section](https://business.line.me) then skip to the next section of this guide and create a Messaging API Channel.

After having signed up with your phone number, you will need to activate email registration and create a LINE business account.

1. Go in the settings (see screenshot below) > account and click on "Email registration". Enter your email address and password and click "Register". LINE will send you an email to confirm your registration. <div class="image-row"><img src="/images/line_settings.png" alt="LINE settings"></div>

2. Login to the [LINE business section](https://business.line.me) with the credentials entered previously. You'll need your phone to login.

3. Enter your account details, and confirm the registration by email.

4. Enter information about your business to complete the LINE business account registration.

### Creating a LINE Messaging API Channel

To create a messaging channel, login to the [LINE business section](https://business.line.me) and follow these steps:

1. Click "Account List", and select "Messaging API" to create a Messaging API account.

2. Click "Start using Messaging API" and enter your Account Name and other required information. Upload an icon if you desire.

3. Click "Apply"

4. In the bot settings, click "Enable API" and confirm.

5. In Bot Settings, "Don't Allow" Group Chats, "Allow" Use webhooks, "Don't Allow" Auto Reply Message and "Don't Allow" Greeting Message. <div class="image-row"><img src="/images/line_bot_settings.png" alt="LINE bot settings"></div>

You're now ready to configure your LINE messaging account with Smooch.

### Configuring LINE

Browse to the [LINE developers page](https://developers.line.me/ba). In a separate browser tab, login to the Smooch dashboard and select LINE in the list of integrations and follow these steps.

1. In the LINE developers page, click the Channel Access Token "Issue" button and paste this, as well as the Channel Secret into the respective fields in the Smooch integration page.

2. Copy the webhook url displayed on the page. In the account settings click on "EDIT" at the bottom of your bot settings in LINE, paste the provided Webhook URL and click "SAVE".

3. In the Smooch dashboard, click "Connect your LINE channel" to complete the integration.

You can now add your channel to your list of friends by scanning the QR code displayed in the LINE bot settings, and talk directly to it. All messages should be sent to any backend channel you've configured.

## Telegram

Our Telegram integration allows your users to send you messages through a [Telegram bot](https://core.telegram.org/bots). You can receive the messages in any of our channels like Slack, HipChat or Help Scout, and your replies are sent back as Telegram messages from the bot to the user.

<aside class="notice">
Make sure to <a href="https://web.telegram.org/#/login">log in to Telegram</a> before continuing the steps below.
</aside>

### Creating a Bot
To [create a bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot), follow the instructions [here](https://core.telegram.org/bots#botfather).

![Create a bot with BotFather](/images/botfather_create_bot.png)

After choosing the bot's username, BotFather will generate an access token for the API, which Smooch will need to integrate with Telegram.

### Configuring Telegram

![Telegram Integration Page Settings](/images/telegram_not_integrated.png)

Once you have created the bot, all you have to do is enter the bot's access token on the [integration page](https://app.smooch.io/integrations/telegram). Your bot should now relay any message it receives to your backend channel.

### Conversations Through the Bot
To send a user to the bot, Telegram users have to search for the username of your bot (obtained while creating a bot with BotFather). Once they have added your bot to their contacts, your bot will act as any other Telegram user. Any user will be able to send normal text messages to your bot or any of the supported file formats (documents, images, sound). If the user sends a file, the message will contain a link to the file that was sent.

<aside class="notice">
Bots cannot retrieve files bigger than 20MB. If a user attempts to send a file bigger than the limit, you will receive an alert.
</aside>

When you reply from any of the configured backend channels, Telegram users will receive the message as though it was coming from the bot.

### Action Buttons

When used with Telegram, action buttons work as expected. When a button with type of `link` will bring the user to a web page, while postback buttons will trigger any Smooch webhook listening to the `postback` trigger.

Payment requests with the [Stripe integration](#stripe) will turn into link buttons which bring the user to a checkout page where payment information can be entered.
is
intransitive, now literary To exist; to have real existence.
With there as dummy subject: to exist.
intransitive To occupy a place.

## Viber

Our [Viber integration](https://app.smooch.io/integrations/viber) allows users to send you messages through a Viber Public Account. You will receive these messages in one of our other channels like Slack, HipChat or Help Scout.
Your replies will be sent back to users through the Viber Public Account.

### Create a Public Account
If you don't have a Public Account, you can create one [here](https://www.viber.com/en/public-accounts).

### Configuring Viber

Once you have your Public Account token, copy and paste it into the Public Account token box on the Viber configuration page.
Then click on "Connect your Viber Public Account".

![Viber Intergration Page Settings](/images/viber_integration.png)

## WeChat

WeChat is a China-based mobile text and voice messaging communication service. With over 700 million active users, it’s become the de facto hub for Chinese conversational commerce.

Our WeChat integration lets your customers message you from WeChat, while you reply using your favorite business apps.

### Configuring WeChat

In order to configure WeChat, you'll need a WeChat Official Account. You can apply for one [here](http://apply.wechat.com).

Once you've created your account, you will need to go through the account verification process. In order to do so, login to your [WeChat dashboard](https://mp.weixin.qq.com) and go to the “WeChat Certification | 微信认证” page below the Set Up section.

Once your account has been verified, go to the [integration page](https://app.smooch.io/integrations/wechat), connect the integration, and follow these steps.

1. In the WeChat dashboard, go to the “Basic Configuration | 基本配置” page below the Develop section and enter your App ID and App Secret on the Smooch integration page.

2. In the WeChat dashboard, click on “Modify Configuration | 修改配置” below Basic Configuration, then copy the Webhook URL and Token from the Smooch integration page and paste it there.

3. After saving your settings, click on Connect to WeChat to complete the integration.

### Safe Mode

Optionally, you can configure "Safe Mode" in the WeChat dashboard. With this mode enabled, all outgoing messages from WeChat will be encrypted using a secure 43 character AES key.

In order to have Safe Mode functioning correctly with Smooch, simply copy your EncodingAESKey from WeChat and paste it in the WeChat integration page. Messages will be automatically decrypted in a secure fashion.

### Persistent Menu

![WeChat Persistent Menu](/images/wechat_menu.png)

It's possible to configure a menu of 1-5 buttons on the WeChat UI by calling [the Smooch REST API](https://docs.smooch.io/rest/#persistent-menus). Menus are configured per app, not per user. Menu items can be [link](structured-messages/#link-buttons) or [postback](structured-messages/#postback-buttons) type actions.
