## Slack

Slack is a communication tool that combines the best things about chat, email and the web to group all of your team's conversations and workflow into one beautiful, searchable place.

Smooch has a Slack integration that allows your team to effortlessly speak to your app's users, without leaving Slack. Check out this video to see how it works:

<iframe style="margin-left:42px;" src="//player.vimeo.com/video/117524819?color=a02b8f&amp;byline=0&amp;portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Configuring Slack

#### Step 1. "Authorizify" Smooch so that it can talk to your Slack

#### Step 2. Set up a new "slash command" so that you can send messages to Smooch

<img src="/images/slashcmd.png" alt="Slash Command Setup"/>

<aside class="notice">
Make sure you remember to fill in the "Token" field of the form in Step 2 with the token that Slack's slash command setup page provides you.
</aside>

#### Step 3. Choose a "dispatch channel" to receive new message notifications from your app's users

Once you've completed these 3 steps, you're ready to start speaking to your users with Slack.

When users send you messages, Smooch posts them to Slack. If it's a new conversation, a notification will appear in the dispatch channel.

This notification contains a link to a channel associated to the specific user that sent you the message. From this channel you can get more information on the user and reply to their questions.

The messages you send in this channel are not automatically sent to your user. We do this so that you can invite teammates to read and collaborate on the user's issue, without exposing your internal conversation.

When you're ready to send a message to the user, simply use Smooch's slash command:

```
/sk TYPE YOUR MESSAGE HERE
```

This command will make Smooch send your message directly to the app user. You'll get a notification in the channel confirming that the transmission was successful.

If you want to consult any metadata you've associated with the user in order to aid the help process, simply use the command below to instruct Smooch to display the most up to date metadata on a user.

```
/sk !profile
```

[This section](#identifying-users) how to associate profile information about users.
