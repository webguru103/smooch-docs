## Telegram

Our Telegram integration allows your users to send you messages through a [Telegram bot](https://core.telegram.org/bots). You can receive the messages in any of our channels like Slack, HipChat or Help Scout, and your replies are sent back as Telegram messages from the bot to the user.

<aside class="notice">
Make sure to [log in to Telegram](https://web.telegram.org/#/login) before continuing the steps below.
</aside>

### Creating a Bot
To [create a bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot), follow the instructions [here](https://core.telegram.org/bots#botfather).

![Create a bot with BotFather](/images/botfather_create_bot.png)

After choosing the bot's username, BotFather will generate an access token for the API, which Smooch will need to integrate with Telegram.

### Configuring Telegram

![Telegram Integration Page Settings](/images/telegram_not_integrated.png)

Once you have created the bot, all you have to do is enter the bot's access token in the [Smooch dashboard](https://app.smooch.io) and click on "Authenticate your Telegram Bot". Your bot should now relay any message it receives to your backend channel.

### Conversations Through the Bot
To send a user to the bot, Telegram users have to search for the username of your bot (obtained while creating a bot with BotFather). Once they have added your bot to their contacts, your bot will act as any other Telegram user. Any user will be able to send normal text messages to your bot or any of the supported file formats (documents, images, sound). If the user sends a file, the message will contain a link to the file that was sent.

<aside class="notice">
Bots cannot retrieve files bigger than 20MB. If a user attempts to send a file bigger than the limit, you will receive an alert.
</aside>

When you reply from any of the configured backend channels, Telegram users will receive the message as though it was coming from the bot.
