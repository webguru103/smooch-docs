---
title: Twilio SMS/MMS
section: faq
layout: two-column
---

# Twilio SMS FAQ

## My Twilio number already has a connection with an external service, will it work with Smooch?

Twilio only allows for one web hook endpoint per number:

If Smooch is being added to an existing number, try to remove the Twilio integration on your Smooch dashboard and re-integrate it.

If this doesn't work, you will need to manually delete the web hook manually and re-integrate.

To do so, you should delete the Messaging Request URL on your Twilio number dashboard and reconnect the Twilio integration in the Smooch dashboard.   

## I've connected my Twilio account but I'm unable to receive any messages

The issue can come from many things:  

* If you’re on the trial period of Twilio, the back and forth between Slack and Twilio only works with the “real” phone number you provide Twilio during the sign-up. You may upgrade your Twilio account for testing with other phone numbers.

* We haven’t set the web hook correctly. On your Twilio dashboard, check to see if you can find a URL starting with: https://app.smooch.io/api/twilio/webhooks/ next to `Messaging URL`? If not, you may try removing the integration and retry to integrate it.

## How does Smooch work with Twilio?

Smooch allows you to send and receive Twilio SMS and MMS from within any connected business system or API. With this, you can do awesome things like handle SMS/MMS from your customers in Slack, or even build software that can easily speak to your customers across SMS, Facebook Messenger, WeChat and every other channel that Smooch supports.

## Why am I the only one to see the Twilio messages?

If you have a Twilio test account, you can only have a conversation with the number of the Twilio account owner.

## Can I connect multiple Twilio number with the same Slack account?

You can certainly make this work in Smooch's Twilio integration.

To do so, simply set up a separate Smooch app for each SMS/MMS number you have. You can then point each Smooch app to the same Slack team.

## Our user are getting: "we couldn't connect this number, please try again" when trying to connect their number to our web conversation

In your Twilio settings, try to change your "Messaging Geographic Permissions".
