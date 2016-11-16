## LINE

LINE is a Japan based rapidly growing mobile messaging app that offers free voice and video calls, messages, and a limitless variety of stickers. With over 600 million users worldwide, LINE's expanding platform is a great way to stay in touch with your customers.

Our LINE integration allows your users to send messages to your LINE bot which you receive in channels like Slack, HipChat or Help Scout. Your replies are sent back as coming from your LINE bot.

You can also receive the user messages through a [webhook](/rest#webhooks).

Before you can configure LINE to work with Smooch, you'll have to [create a business account](#creating-a-line-business-account) and a [messaging API channel](#creating-a-line-messaging-api-channel).

### Creating a LINE Business Account

To create a business account you first need to create a LINE account through a [mobile app](http://line.me/en-US/download).

If you already have a LINE business account, login to [LINE business section](https://business.line.me) then skip to [Creating a LINE Messaging API Channel](#creating-a-line-messaging-api-channel).

After having signed up with your phone number, you will need to activate email registration and create a LINE business account.

1. Go in the settings (see screenshot below) > account and click on "Email registration". Enter your email address and password and click "Register". LINE will send you an email to confirm your registration. <span class="half-width-img">![Line settings](../images/line_settings.png)</span>

1. Login to the [LINE business section](https://business.line.me) with the credentials entered previously. You'll need your phone to login.

1. Enter your account details, and confirm the registration by email.

1. Enter information about your business to complete the LINE business account registration.

### Creating a LINE Messaging API Channel

To create a messaging channel, login to the [LINE business section](https://business.line.me) and follow these steps:

1. Click "Account List", and select "Messaging API" to create a Messaging API account.

1. Click "Start using Messaging API" and enter your Account Name and other required information. Upload an icon if you desire.

1. Click "Apply"

1. In the bot settings, click "Enable API" and confirm.

1. In Bot Settings, "Don't Allow" Group Chats, "Allow" Use webhooks, "Don't Allow" Auto Reply Message and "Don't Allow" Greeting Message. <span class="half-width-img">![line_bot_settings](../images/line_bot_settings.png)</span>

You're now ready to configure your LINE messaging account with Smooch.

### Configuring LINE

Browse to the [LINE developers page](https://developers.line.me/ba). In a separate browser tab, login to the Smooch dashboard and select LINE in the list of integrations and follow these steps.

1. In the LINE developers page, click the Channel Access Token "Issue" button and paste this, as well as the Channel Secret into the respective fields in the Smooch integration page.

1. Copy the webhook url displayed on the page. In the account settings click on "EDIT" at the bottom of your bot settings in LINE, paste the provided Webhook URL and click "SAVE".

1. In the Smooch dashboard, click "Connect your LINE channel" to complete the integration.

You can now add your channel to your list of friends by scanning the QR code displayed in the LINE bot settings, and talk directly to it. All messages should be sent to any backend channel you've configured.
