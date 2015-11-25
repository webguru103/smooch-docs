## Slack

Slack is a communication tool that combines the best things about chat, email and the web to group all of your team's conversations and workflow into one beautiful, searchable place.

Smooch has a Slack integration that allows your team to effortlessly speak to your app's users, without leaving Slack.

### Configuring Slack

Click the "Connect to Slack" button on the Slack integration page.

<img style="width:50%; min-width:400px; max-width:800px;" src="/images/connecttoslack.png" alt="Connect to Slack">

This will send you to a Slack page where you will choose which slack team you want to add Smooch to, and it will show you the set of permissions Smooch is requesting in order to function. Once all is done, you'll be redirected back to Smooch. That's it, you're up and running.

When users send you messages, Smooch posts them to Slack. If it's a new conversation, a notification will appear in your dispatch channel in Slack. Smooch will choose `#general` as your dispatch channel by default, and you can change this if you wish. The dispatch notification contains a link to a channel associated to the specific user that sent you the message.

By default, Smooch will generate random channel names for users who start conversations. If you want the channel names to be relevant, you must add a [first name, last name or email to the user](#user-data).

### Talking to the User

From a channel associated with a user, you can get more information on the user and reply to their questions.

The messages you send in this new channel are not visible to your user. We do this so that you can invite teammates to collaborate on the user's issue without exposing your internal conversation.

When you're ready to send a message to the user, simply use Smooch's slash command:

```
/sk TYPE YOUR MESSAGE HERE
```

You'll get a notification in the channel confirming that the message was received.

If you want to consult any [user data](#user-data) that you've associated with the user in order to aid the help process, simply use the command below:

```
/sk !profile
```
