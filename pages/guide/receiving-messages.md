---
title: Receiving Messages
section: guide
layout: two-column
---

# Receiving Messages

Smooch's architecture is centered on the concept of a *conversation*. A conversation is an exchange of messages between a particular *appUser* and your systems. Each appUser created in your app's context has a single conversation. This conversation is initialized at the same moment as the appUser is created.

This design makes it really easy for you to take advantage of all of the context present in communication with your appUser. When the appUser sends you a message, the message and its associated metadata is written to the conversation and sent to your business systems.

In addition to receiving these messages from within [Smooch's business integrations](/guide/configuring-business-systems/), your software can receive the messages via a webhook.

## Message Webhooks

Webhooks are a fantastic way to extend the Smooch platform beyond the built-in feature set. You can use webhooks to build your own Smooch chat clients, to integrate more deeply with your favorite CRM, or to build a bot.

When a webhook trigger is triggered, a JSON payload will be posted to the URL configured in your webhook object:

```json
{
    "trigger": "message:appUser",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "_id": "55c8c1498590aa1900b9b9b1",
        "text": "Hi! Do you have time to chat?",
        "role": "appUser",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Steve",
        "received": 1444348338.704,
        "metadata": {},
        "actions": [],
        "source": {
            "type": "messenger"
        }
    }],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "appVersion": "1.0",
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "ios",
            "pushNotificationToken": "<...>",
            "info": {
              "appName": "ShellApp",
              "devicePlatform": "x86_64",
              "os": "iPhone OS",
              "osVersion": "9.2"
            }
          }
        ]
    }
}
```

The payload contains information on the message, the user who sent it and all associated metadata. You can receive webhooks for a variety of events that occur in Smooch.

|Trigger|Event|
|:-:|:-:|
|message|all messages|
|message:appUser|only messages with role appUser|
|message:appMaker|only messages with role appMaker or whisper|
|postback|when a user clicks on a postback action|
|merge:appUse|when two or more users are merged into one|
|*|when any of the above triggers occurs|

See the [webhook payload reference](http://docs.smooch.io/rest/#webhooks-payload) for more details.

#### Configuring Via the Integrations Directory

If you won't be managing many Smooch *apps*, it's probably easiest for you to configure webhooks via the UI using our integrations directory.

Visit the [Webhook](https://app.smooch.io/integrations/webhook) page allows you to quickly enable support for an app. Once you add turn on the feature, you'll be able to specify a target URL endpoint as well as what events you want to be notified on.

![Create a webhook](/images/create_webhook.png)

Once the webhook is configured, the target URL will start receiving notifications from Smooch when the events occur.

#### Configuring Via API

Every *app* you create on Smooch needs to have webhooks individually enabled for it. If you're using [managed accounts](/guide/managed-accounts/) or simply want to have your software be in control over Smooch's configuration, we've made it easy to use our API to configure webhooks for each app you've created.

To create a webhook using the Smooch API simply call the webhooks.create() function:

```javascript
smooch.webhooks.create({
    target: 'http://example.com/callback',
    triggers: [
        'message:appUser'
    ]
}).then((response) => {
    // async code
});
```

The `target` parameter is the URL that accepts webhooks in your system and the `triggers` parameter allows you to specify a list of all the events you want to be notified on.

Note that although each app you create needs to have its own webhook configuration, the target does not have to be unique. Your system can set the same target URL to receive webhooks from every Smooch *app* pointing to it.

Our [API Reference](http://docs.smooch.io/rest/#webhooks) provides full details on how to configure and manage webhooks for your app using our API.

## Retrieving Conversation History

Every message sent or received through Smooch is available via the API in the conversation object as long as they haven't been deleted from the system.

To access the conversation history, simply make a GET request to a particular user's messages endpoint. For example:

```javascript
smooch.appUsers.getMessages('c7f6e6d6c3a637261bd9656f', {before: '1471995721'}).then((response) => {
    // async code handles the response
});
```

This returns the last 100 messages as of UNIX timestamp `1471995721` or `23 Aug, 2016 - 23:42:01 GMT`. You can also specify a timestamp `after` to retrieve the 100 messages sent or received after the timestamp.

## Next Steps

- [Reply](/guide/sending-messages/) to messages you receive from users.

- Read the full [reference on webhooks](http://docs.smooch.io/rest/#webhooks) to learn more about the various triggers
