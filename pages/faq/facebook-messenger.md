---
title: Messenger
section: faq
layout: two-column
---

# Facebook Messenger FAQ

## A user linked a web conversation on Facebook but why doesn't Facebook display the messages he sent from the web messenger?

We can’t post messages to Facebook as a user (it’s a limitation of Facebook API, a Facebook user message can only be posted on Facebook). Thus, if a user posts a message on the web, even if the Facebook account is linked, the user won’t see the messages on Facebook.   

However, if a user posts a message on Facebook, we synchronize the web messenger as well.  

Messages coming from your business are posted (with a notification) to the last active messaging channel and synchronized to the other messaging channels where possible.

## How can I connect 2 Facebook accounts to the same Slack team?

On the top left of our dashboard, we give you the ability to create multiple apps on Smooch with the same account. This way you can connect one Facebook page per app and connect all apps to the same business system you’re using (ex: Slack team).

## Do you suport the Carousel feature of Facebook Messenger?

We fully support carousel messages through our API: http://docs.smooch.io/rest/#carousel-messages

## Why can't i send buy buttons on Facebook Messenger?

It's against Facebook policy to use external payment services on their platform. We'll soon be releasing support for Facebook Payments - as long as you have approval from Facebook to use the feature, Smooch will support it.

## Why do I receive an error when sending a message saying that last user message 24h...

Facebook prevents pages from sending messages to users more than 24 hours after the user last contacted the page. Unfortunately, we cannot circumvent this.

## Can I use Facebook Messenger to answer my customers?

Facebook is a customer facing channel for us and their API doesn’t allow us to use them as an interface from where you can answer your customers. The business app that you can use are on the second half of this page: https://smooch.io/integrations/
