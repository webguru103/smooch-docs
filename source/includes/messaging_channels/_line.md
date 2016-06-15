## LINE

LINE is a Japan based rapidly growing mobile messaging app that offers free voice and video calls, messages, and a limitless variety of stickers. With over 600 million users worldwide, LINE's expanding platform is a great way to stay in touch with your customers.

Our LINE integration allows your users to send messages to your LINE bot which you receive in channels like Slack, HipChat or Help Scout. Your replies are sent back as coming from your LINE bot.

You can also receive the user messages through a [webhook](/rest#webhooks).

### Creating a LINE bot

To create a bot you first need to create a LINE account through a [mobile app](http://line.me/en-US/download).

After having signed up with your phone number, you will need to activate email registration and create a LINE business account.

1. Go in the settings (see screenshot below) > account and click on "Email registration". Enter your email address and password and click "Register". LINE will send you an email to confirm your registration. <span class="half-width-img">![Line settings](../images/line_settings.png)</span>

1. Login to the [LINE business section](https://business.line.me) with the credentials entered previously. You'll need your phone to login.


1. Enter your account details, and confirm the registration by email.

1. Enter information about your business to complete the LINE business account registration.

1. Click "Create a Business Account", and enter your account name.

1. On the next screen, click the "Start" button to the right of "BOT API Trial Account". Scroll down and click the blue "Start" button.

1. Agree to the terms and click "create" to create your bot.

You can now edit information about your bot such as the name and avatar by clicking "EDIT". You're also ready to configure your LINE bot with Smooch.

### Configuring LINE

Once you've configured your bot, login to the Smooch dashboard and select LINE in the list of integrations and follow these steps.

1. Enter your Channel ID, Channel Secret and MID on the integration page.

1. Copy the callback url displayed on the page. In the bot settings click on "EDIT" at the bottom of your bot settings in LINE, paste the provided Callback URL and click "SAVE".

1. In the Smooch dashboard, click "Connect your LINE bot" to complete the integration.

You can now add your bot to your list of friends by scanning the QR code displayed in the LINE bot settings, and talk directly to it. All messages should be sent to any backend channel you've configured.
