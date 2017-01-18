---
title: LINE
section: guide
layout: two-column
---

# LINE

LINE is a Japan based rapidly growing mobile messaging app that offers free voice and video calls, messages, and a limitless variety of stickers. With over 600 million users worldwide, LINE's expanding platform is a great way to stay in touch with your customers.

Our LINE integration allows your users to send messages to your LINE bot which you receive in a [business system](/guide/business-systems/) or by configuring a [webhook](https://docs.smooch.io/rest#webhooks). Your replies are sent back as coming from your LINE bot.

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
