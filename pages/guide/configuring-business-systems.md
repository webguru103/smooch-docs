---
title: Configuring Business Systems
section: guide
layout: two-column
---

# Configuring Business Systems

Smooch allows you to integrate many popular business systems in a single click, so that you're able to manage conversations with your users over any channel inside of your help desk or team collaboration software.

Smooch has developed a number of tightly coupled integrations with business systems. These integrations are covered here, in these docs, but there are also an ever growing number of business systems, add-ons and bot platforms available in our [marketplace](https://app.smooch.io/integrations).

## Email

The [Email integration](https://app.smooch.io/integrations/email) allows you to receive Smooch messages in your inbox.

If Email is enabled, when users send you a message using Smooch, you will receive an email at the configured addresses. This e-mail contains the user's message, device information, and any profile information about the user that you captured in your app. You can respond to your user's message by responding directly to the email.

![context in emails](/images/email_with_context.png)

### Getting help from your team

If you want multiple team members to respond to your Smooch requests, you can specify multiple email addresses, or use a mailing list. Whenever a team member replies, the incoming email address and associated name will be used to determine the team member displayed to the user alongside the message.

### Connecting to your CRM through Email

In addition to Smooch's built-in business systems like [Slack](https://app.smooch.io/integrations/slack) and [Zendesk](https://app.smooch.io/integrations/zendesk), Smooch's Marketplace of integrations like [Front](https://app.smooch.io/integrations/front), and the [REST API](api-quickstart/), it's possible to use Email to connect Smooch to your CRM.

To connect Smooch to your CRM via Email:

1. Take note of the e-mail address that the CRM uses to receive new support requests.

2. Set Smooch's forwarding address to the address you noted in step 1.

3. Turn off any kind of signatures or annotations in your CRM to ensure that users receive a concise chat bubble when you reply.


## HelpScout

[Help Scout](https://app.smooch.io/integrations/helpscout) is a scalable, elegant and intuitive help desk solution. By connecting Smooch to Help Scout, you can manage in-app conversations you have with your users directly from Help Scout. This way, you can use the same system to handle your team's e-mail and in-app support channels. Unlike other Help Scout conversations, agent replies in conversations initiated by Smooch app users won't be sent by email, instead they will appear directly in the app.

### Configuring Help Scout to work with Smooch

Configuring Help Scout is super easy. All you have to do is copy/paste a Help Scout API key into our integration page.

1. Log in to your Help Scout account, go to "Your Profile" -> "API Keys" and generate an API key.

2. On the [Help Scout page](https://app.smooch.io/integrations/helpscout), paste the API key into the field that says "Paste API Key here."

3. Now, pick the mailbox you want to receive app user messages in, and next time one of your users messages you using Smooch, the conversation will appear in the Help Scout mailbox.

![helpscout](/images/helpscout_settings.png)

### Instant messaging from a Help Scout mailbox

You can change or delete the Help Scout mailbox that Smooch sends messages to, but you should note that conversations will not automatically migrate to the new mailbox. You must move the conversations you wish to have in the new mailbox via the Help Scout UI. Otherwise they will continue in the previously configured mailbox. Update your settings before deleting a Help Scout mailbox. If the mailbox configured on Smooch no longer exists, messages will be lost.

## HipChat

[HipChat](https://app.smooch.io/integrations/hipchat) is a team-based chat tool that helps to group all of your team's conversations and workflow into one beautiful, searchable place.

Smooch has a HipChat integration that allows your team to communicate with your app's users, without leaving HipChat.

### Configuring HipChat

#### Step 1. Authorize Smooch so that it can talk to your HipChat

![hipchat](/images/hipchat_smooch_integration.png)

#### Step 2. ...

![There is no Step 2](/images/step_2.png)

HipChat Connect has allowed Smooch to integrate into HipChat in some awesome ways.
<br/>
You can easily view your active conversations and user profiles at a glance.

![At a glance](/images/hipchat_glance.png)
<br/>

We've also added some handy options to the context menu so that you can easily use Smooch's features directly within HipChat.

![HipChat actions](/images/hipchat_actions.png)

This makes adding internal notes for fellow colleagues really easy.

![hipchat](/images/hipchat_note.png)

And you can send your users action buttons through an interface we baked specially for HipChat.

![add action to hipchat](/images/hipchat_add_action.png)

## Slack

[Slack](https://app.smooch.io/integrations/slack) is a communication tool that combines the best things about chat, email and the web to group all of your team's conversations and workflow into one beautiful, searchable place.

Smooch has a Slack integration that allows your team to effortlessly speak to your app's users, without leaving Slack.

### Configuring Slack

Click the "Connect" button on the Slack [integration page](https://app.smooch.io/integrations/slack).

![connect to slack](/images/connecttoslack.png)

This will send you to a Slack page where you will choose which slack team you want to add Smooch to, and it will show you the set of permissions Smooch is requesting in order to function. Once all is done, you'll be redirected back to Smooch. That's it, you're up and running.

When users send you messages, Smooch posts them to Slack. If it's a new conversation, a notification will appear in your dispatch channel in Slack. Smooch will choose `#general` as your dispatch channel by default, and you can change this if you wish. The dispatch notification contains a link to a channel associated to the specific user that sent you the message.

By default, Smooch will generate random channel names for users who start conversations. If you want the channel names to be relevant, you must add a [first name, last name or email to the user](managing-user-information/).

### Talking to the User

From a channel associated with a user, you can get more information on the user and reply to their questions.

The messages you send in this new channel are not visible to your user. We do this so that you can invite teammates to collaborate on the user's issue without exposing your internal conversation.

When you're ready to send a message to the user, simply use Smooch's slash command:

```
/sk TYPE YOUR MESSAGE HERE
```

You'll get a notification in the channel confirming that the message was received.

If you want to consult any [user data](managing-user-information/) that you've associated with the user in order to aid the help process, simply use the command below:

```
/sk !profile
```

## Zendesk

[Zendesk](https://app.smooch.io/integrations/zendesk) is a CRM platform specialized in managing support tickets. Our Zendesk integration combines all the advantages of in-app messaging with a powerful CRM back-end.

### Configuring Zendesk ticketing

Configuring Smooch to communicate with Zendesk is easy. Go to the Zendesk [integration page](https://app.smooch.io/integrations/zendesk), press connect, and enter your Zendesk subdomain.

![zendesk](/images/zendesk_integration.png)

In order to maintain all your interactions with an app user under a single Zendesk End-user profile, it's important to <a href="#user-data">set the email</a> of your user in your app's Smooch integration.

#### Working with Zendesk email signatures

Smooch automagically removes agent's personal signatures from messages. Global signatures can be set, but must be prefixed with `--`, if they aren’t, you’ll see them appear in SK message bubbles, and it can be unsightly.
![unsightly signatures](/images/unsightly_signature.png)

#### Optional additional information on Configuration

Once you are authenticated with your Zendesk app, Smooch will automatically configure targets and triggers so that your Zendesk agents can communicate with your Smooch app users.

During the configuration process any existing triggers in your Zendesk settings will be modified to not email the End-user if the ticket is tagged "smooch". We do this to avoid duplicating the conversation, and to remove any reason for the app user to leave your app to respond via email.

It's suggested that you don't modify the targets and triggers that Smooch configures for you on Zendesk. However, if you do, and anything ever goes wrong, it's easy to fix. Just return to your app settings on the Smooch admin page and in the Zendesk settings click "Remove Integration." Re-adding the integration will remove previously configured Smooch targets and triggers and refresh your configuration.

Note: Smooch only ever configures one target and trigger per a Zendesk subdomain. In the event that multiple apps, or even mutliple Smooch accounts are authorized for a Zendesk subdomain, the triggers and targets will not be removed until all Smooch apps have had the Zendesk integration removed.

### Rate Limiting
Zendesk has a [global rate limit](https://help.zendesk.com/hc/en-us/articles/229137167-Best-practices-for-avoiding-rate-limiting). Additionally, they only allow 15 comments to be made on each individual ticket (regardless of whether the comment is an agent or app user) within a 10 minute period.

In the event that a conversation surpasses the rate limit, the agent will recieve a message in the Zendesk UI saying as much, and preventing the ticket from being updated for a certain period of time, usually around 6 minutes. Your app user's messages will be queued up and sent after the time period specified by Zendesk.

To reduce the likelihood of you bumping up against the rate limit, Smooch batches together all messages sent from the app user within a 5 second period into a single comment.
