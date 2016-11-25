---
title: API Quickstart
section: docs
layout: two-column
---

# API Quickstart

## Introduction

This quickstart guide will walk you through getting started with Smooch's REST API. When you complete the guide you'll know how to connect Facebook Messenger to Smooch and send an automated response to any Facebook Messenger user who sends you a message.

## Create a new Facebook page

Smooch provides a [REST API for programmatically connecting to channels like Facebook Messenger](http://docs.smooch.io/rest/#managed-accounts), but you're going to do this part through the UI to get started more quickly.

First, sign-in to a Facebook account and [create a new page](https://www.facebook.com/pages/create/). I created a page for a fictional character (double fictional because I just made it up).

![Create a new Facebook page for a fictional character](/images/create_facebook_page.png)

You can skip through all the setup steps for the new Facebook page. You'll end up with [a page like this](https://www.facebook.com/Manfredi-pilgillets-341436779570384/).

## Connect Facebook to Smooch

Great, now let's setup Smooch. If you haven't already, [Sign-up for a Smooch account](https://app.smooch.io/). You'll be greeted by SmoochBot.

![SmoochBot](/images/smoochbot.png)

SmoochBot will guide you through setting up your first Smooch App and even connecting to Facebook Messenger!

If you didn't connect to Facebook Messenger with SmoochBot, or you already have a Smooch account, just head over to [the integration page for Facebook Messenger](https://app.smooch.io/integrations/messenger) and connect your account now.

Now whenever someone sends a message to your Facebook page, it will also be sent to Smooch. So let's figure out a way to answer them!

## Deploy a server

Now you need to deploy a server and expose a POST `/messages` endpoint to receive user messages. All you want to do for now is log those messages.

I wrote my server in NodeJS and used [a service called ngrok](https://ngrok.com/) to create a secure tunnel to localhost so that I could run a server from my laptop. If you need inspiration, [here's the complete code I used for this quickstart guide](https://gist.github.com/spasiu/fb53541053564ca4cf2052e6e1996ee3).

## Create a Webhook

Once your server is listening for requests, you can create a Smooch Webhook [on this page](https://app.smooch.io/integrations/webhook). In the Webhook URL field, enter the URL for your service and the POST `/messages` route. Pick "App User Messages" as a trigger.

![Create a Webhook](/images/create_webhook.png)

As soon as you "Confirm and Save", you'll be able to inspect the messages you're receiving from Facebook users. Try sending a message to your Facebook page as a Facebook user. When you go check your server logs, you'll see the payload in all of its JSON glory.

**[JSON like this](https://gist.github.com/spasiu/3e98c7b0e7de87302a9faf2cc0d32df3)**.

## Authorization

Now it's time to call the Smooch REST API.

First thing you'll need is a secret key. Go to your settings page from the Smooch dashboard, and create a new secret key.

![Create a new secret key](/images/create_secret_key.png)

Once you have a secret key, you can use it to generate a JSON Web Token (JWT) that you pass as an Authorization header (`'authorization: Bearer your-jwt'`) when you make requests to the REST API.

Here's the [documentation on using and creating the JWT](http://docs.smooch.io/rest/#jwt), or you can take a look at [the code I used for this quickstart](https://gist.github.com/spasiu/109b92445d7fc9c2071e16e7f325fff7).

## Send a message to a user with the REST API

Each time a Webhook payload is received by your server on the `/messages` route, you can use the REST API to send a message back to the Facebook user who triggered that Webhook.

To send a message via the REST API, you're going to call the [Post Message endpoint](http://docs.smooch.io/rest/#post-message). We need to indentify the user we want to send the message to. So let's take a look at [the Webhook payload you'll be receiving](http://docs.smooch.io/rest/#webhooks-payload).

To send a message to the user, take the `appUser`'s `_id` property from the Webhook payload, and POST a message to `https://app.smooch.io/v1/appusers/{appUser._id}/messages`. Here's an example of calling the [Post Message endpoint](https://gist.github.com/spasiu/8ae55ea452378c2b87566ef48a58f095), and here's [my complete code for this quickstart](https://gist.github.com/spasiu/fb53541053564ca4cf2052e6e1996ee3).

Great! Now, whenever we send a message to our Facebook page from a Facebook user account, you should receive your auto response back 🎉.

![Facebook Messenger 🎉](/images/facebook_conversation.png)

## Next steps

- If you're using JavaScript you can wrap our Core APIs with [smooch-core, a helpful little pm package](https://www.npmjs.com/package/smooch-core).

- Now that you've had a taste of Smooch, it's time to deep dive into our documentation to explore the possibilities. [You can find them here](http://docs.smooch.io/rest/).

- Take a look at [the other channels we support](https://app.smooch.io/integrations). We're constantly adding new channels and keeping up with the latest features.

- If you're building an integration between Smooch and your product, you'll want to [configure Webhooks via the REST API](http://docs.smooch.io/rest/#create-webhook).

- If you want to make Smooch's messaging capabilities an integral part of your product, you'll want to be able to connect your customers Facebook (or other) accounts to Smooch via our [Managed Accounts REST API](http://docs.smooch.io/rest/#managed-accounts).

- If you're building a bot, Smooch's REST API is a great place to start, but you don't have to go it alone! Check out some of the [Bot Platforms that plug into Smooch](https://app.smooch.io/integrations/categories/bot-platform).
