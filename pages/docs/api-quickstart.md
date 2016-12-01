---
title: API Quickstart
section: docs
layout: two-column
---

# API Quickstart

## Introduction

This quickstart guide will walk you through getting started with Smooch's REST API. When you complete the guide, you'll know how to connect Facebook Messenger to Smooch and send an automated response to any Facebook Messenger user who sends you a message.

## Create a new Facebook page

This guide uses the Smooch Dashboard to configure Facebook messenger. I is also possible to configure thus via the [integration API](http://docs.smooch.io/rest/#managed-accounts).

First, sign in to a Facebook account and [create a new page](https://www.facebook.com/pages/create/).

![Create a new Facebook page for a fictional character](/images/create_facebook_page.png)

## Connect Facebook to Smooch

If you haven't already, sign up for a [Smooch account](https://app.smooch.io/), and follow SmoochBot's instructions to connect Facebook Messenger.

![SmoochBot](/images/smoochbot.png)

 You can also connect Facebook Messenger from the [integration page for Facebook Messenger](https://app.smooch.io/integrations/messenger).

Now, whenever someone sends a message to your Facebook page, it will also be sent to Smooch. Great! Let's figure out a way to answer them!

## Deploy a server

Now you need to deploy a server and expose a POST `/messages` endpoint to receive user messages. All you want to do for now is log those messages.

We wrote our server in Node.js and used a service called [ngrok](https://ngrok.com/) to create a secure tunnel to localhost. If you need inspiration, check out the complete code at the end of this quickstart.

## Create a Webhook

Once your server is listening for requests, you can create a Smooch Webhook [on this page](https://app.smooch.io/integrations/webhook). In the Webhook URL field, enter the URL for your service and the POST `/messages` route. Pick "App User Messages" as a trigger.

![Create a Webhook](/images/create_webhook.png)

As soon as you "Confirm and Save", you'll be able to inspect the messages you're receiving from Facebook users. Try sending a message to your Facebook page as a Facebook user. Once you check your server logs, you'll see the payload in all of its JSON glory.

**[JSON like this](http://docs.smooch.io/rest/#webhooks-payload)**.

## Authorization

Now it's time to call the Smooch REST API. First thing you'll need is a secret key. Go to your settings page from the Smooch dashboard, and create a new secret key.

![Create a new secret key](/images/create_secret_key.png)

Once you have a secret key, you can use it to generate a JSON Web Token (JWT) that you pass as an Authorization header (`'authorization: Bearer your-jwt'`) when you make requests to the REST API.

Here's an example of how to create a JWT in Node.js:

```javascript
const jwt = require('jsonwebtoken');
const KEY_ID = 'your_key_id';
const SECRET = 'your_secret';
const body = { scope: 'app' };
const config = {
    headers: {
        typ: 'JWT',
        kid: KEY_ID,
        alg: 'HS256'
    }
};

const token = jwt.sign(body, SECRET, config);
```

For additional information, see the [documentation](http://docs.smooch.io/rest/#jwt) on using and creating the JWT to auth, and you can take a look at the code at the end of this quickstart.

## Send a message to a user with the REST API

Each time a Webhook payload is received by your server on the `/messages` route, you can use the REST API to send a message back to the Facebook user who triggered that Webhook.

To send a message via the REST API, you're going to call the [Post Message endpoint](http://docs.smooch.io/rest/#post-message). We need to identify the user we want to send the message to. So let's take a look at the [Webhook payload](http://docs.smooch.io/rest/#webhooks-payload) you'll be receiving.

To send a message to the user, take the `appUser`'s `_id` property from the Webhook payload, and POST a message to `https://app.smooch.io/v1/appusers/{appUser._id}/messages`. Here's an example of calling the Post Message endpoint:

```javascript
const superagent = require('superagent');
const JWT = 'your_token';
const USER_ID = 'some_users_id';

// POST Message
superagent
    .post(`https://app.smooch.io/v1/appusers/${USER_ID}/conversation/messages`)
    .send({
        text: 'Live long and prosper',
        role: 'appMaker'
    })
    .set('authorization', 'Bearer ' + JWT)
    .set('Accept', 'application/json')
    .end(function(err, response) {
        console.log('API RESPONSE:\n', err, response.body, response.statusCode);
    });
```

 We also include the complete code below.

Great! Now, whenever someone sends a message to your Facebook page from a Facebook user account, you should receive your auto response back.

![Facebook Messenger 🎉](/images/facebook_conversation.png)

## Code

```javascript
'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const superagent = require('superagent');

// Config
const PORT = process.env.PORT || 8000;
const KEY_ID = 'your_key_id';
const SECRET = 'your_Secret_key';

// JWT http://docs.smooch.io/rest/#jwt
const authToken = jwt.sign({ scope: 'app' }, SECRET, {
    header: {
        typ: 'JWT',
        kid: KEY_ID,
        alg: 'HS256'
    }
});

// Server http://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());

// Expose /messages endpoint to capture Webhooks http://docs.smooch.io/rest/#webhooks-payload
app.post('/message', function(req, res) {
  console.log('WEBHOOK PAYLOAD:\n', JSON.stringify(req.body, null, 4));

  const appUserId = req.body.appUser._id;
  // Call REST API to send message http://docs.smooch.io/rest/#post-message
  if (req.body.trigger === 'message:appUser') {
    superagent
    .post(`https://app.smooch.io/v1/appusers/${appUserId}/conversation/messages`)
    .send({
        text: 'Live long and prosper',
        role: 'appMaker'
    })
    .set('authorization', 'Bearer ' + authToken)
    .set('Accept', 'application/json')
    .end(function(err, response) {
        console.log('API RESPONSE:\n', err, response.body, response.statusCode);
        res.end();
    });
  }
});

// Listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
```

## Next steps

- If you're using JavaScript you can wrap our Core APIs with [smooch-core, a helpful little npm package](https://www.npmjs.com/package/smooch-core).

- Now that you've had a taste of Smooch, it's time to deep dive into our documentation to explore the possibilities. [You can find them here](http://docs.smooch.io/rest/).

- Take a look at [the other channels we support](https://app.smooch.io/integrations). We're constantly adding new channels and keeping up with the latest features.

- If you're building an integration between Smooch and your product, checkout the Programmable Messaging [guide](/sending-and-receiving-messages), and you will probably want to [configure Webhooks](http://docs.smooch.io/rest/#create-webhook) via the REST API.

- If you want to make Smooch's messaging capabilities an integral part of your product, take a look at our guides for [Creating and Managing apps](/creating-and-managing-apps) and
[Configuring Messaging Channels](/configuring-messaging-channels).

- If you're building a bot, Smooch's REST API is a great place to start, but you don't have to go it alone! Check out some of the [Bot Platforms that plug into Smooch](https://app.smooch.io/integrations/categories/bot-platform).
