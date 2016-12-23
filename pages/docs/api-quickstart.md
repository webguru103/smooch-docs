---
title: API Quickstart
section: docs
layout: two-column
---

# API Quickstart

## Introduction

This quickstart guide will walk you through getting started with Smooch's REST API. When you complete the guide, you'll know how to connect Facebook Messenger to Smooch and send an automated response to any Facebook Messenger user who sends you a message.

You can also find the complete code for this walkthrough [here](https://github.com/smooch/smooch-api-quickstart-example).

## Create a new Facebook page

This guide uses the Smooch Dashboard to configure Facebook Messenger. It is also possible to configure this via the [integration API](https://docs.smooch.io/rest/#managed-accounts).

First, [create a new page](https://www.facebook.com/pages/create/).

![Create a new Facebook page for a fictional character](/images/create_facebook_page.png)

## Connect Facebook to Smooch

If you haven't already, sign up for a [Smooch account](https://app.smooch.io/), and follow SmoochBot's instructions to connect Facebook Messenger.

![SmoochBot](/images/smoochbot.png)

 You can also connect Facebook Messenger from the [integration page for Facebook Messenger](https://app.smooch.io/integrations/messenger).

Now, whenever someone sends a message to your Facebook page, it will also be sent to Smooch. Great! Let's figure out a way to answer them!

## Deploy a server

Next, you need to deploy a server and expose a POST `/messages` endpoint to receive user messages. All you want to do for now is log those messages.

We wrote our server in Node.js and used a service called [ngrok](https://ngrok.com/) to create a secure tunnel to localhost. If you need inspiration, check out the complete [code](https://github.com/smooch/smooch-api-quickstart-example).

## Create a webhook

Once your server is listening for requests, create a webhook from the [dashboard](https://app.smooch.io/integrations/webhook). In the webhook URL field, enter the full URL for your /messages endpoint (e.g. https://https://MY-NGROK-DOMAIN.ngrok.io/messages ). Pick "App User Messages" as the trigger.

![Create a webhook](/images/create_webhook.png)

As soon as you "Confirm and Save", you'll be able to inspect the messages you're receiving from Facebook users. Try sending a message to your Facebook page as a Facebook user. Once you check your server logs, you'll see the [payload](https://docs.smooch.io/rest/#webhooks-payload) in all of its JSON glory.

## Authorization

To send an answer back, we'll need to call the Smooch REST API. Smooch provides the smooch-core package for Node.js (available via npm).

The smooch-core package will handle creating an app scope JWT and authenticating calls to the REST API.

Install it with npm `npm i smooch-core`

## Send a message to a user with the REST API

Each time a webhook payload is received by your server on the `/messages` route, you can use the REST API to send a message back to the Facebook user who triggered that webhook.

To send a message via the REST API, you're going to call the [POST Message endpoint](https://docs.smooch.io/rest/#post-message). We need to identify the user we want to send the message to. Take a look at the [webhook payload](https://docs.smooch.io/rest/#webhooks-payload) you'll be receiving.

To send a message to the user, take the `appUser`'s `_id` property from the webhook payload, and POST a message to `https://app.smooch.io/v1/appusers/{appUser._id}/messages`. Here's an example of calling the POST Message endpoint with smooch-core:

```javascript
const Smooch = require('smooch-core');

const KEY_ID = 'your_key_id';
const SECRET = 'your_secret_key';

const smooch = new Smooch({
    keyId: KEY_ID,
    secret: SECRET,
    scope: 'app'
});
const USER_ID = 'some_users_id';

// POST Message
smooch.appUsers.sendMessage(appUserId, {
    type: 'text',
    text: 'Live long and prosper',
    role: 'appMaker'
})
    .then((response) => {
        console.log('API RESPONSE:\n', response);
        res.end();
    })
    .catch((err) => {
        console.log('API ERROR:\n', err);
        res.end();
    });
```

You can also take a look at the complete [code](https://github.com/smooch/smooch-api-quickstart-example).

Great! Now, whenever someone sends a message to your Facebook page from a Facebook user account, you should receive your auto response back.

![Facebook Messenger 🎉](/images/facebook_conversation.png)

## Next steps

- If you're writing JavaScript, use [smooch-core](https://www.npmjs.com/package/smooch-core), a helpful little npm package that wraps calls to Smooch APIs.

- Now that you've had a taste of Smooch, it's time to deep dive into our documentation to explore the possibilities. [You can find it here](https://docs.smooch.io/rest/).

- Take a look at [the other channels we support](https://app.smooch.io/integrations/categories/customer-channels). We're constantly adding new channels and keeping up with the latest rich messaging features.

- If you're building an integration between Smooch and your product, checkout the guides on [sending](/docs/sending-messages/) and [receiving](/docs/receiving-messages/) messages, and you will probably want to [configure webhooks](https://docs.smooch.io/rest/#create-webhook) via the REST API.

- If you want to make Smooch's messaging capabilities an integral part of your product, take a look at our guides for [Creating and Managing apps](/docs/creating-and-managing-apps/) and
[Configuring Messaging Channels](/docs/configuring-messaging-channels/).

- If you're building a bot, Smooch's REST API is a great place to start, but you don't have to develop it alone! Check out some of the [Bot Platforms that plug into Smooch](https://app.smooch.io/integrations/categories/bot-platform).
