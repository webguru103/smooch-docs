---
title: SMS
section: guide
layout: two-column
---
# SMS

Smooch offers SMS through integration with Twilio.

## Twilio

[Twilio](https://www.twilio.com/) is an SMS messaging service. Our Twilio integration allows your users to send you text messages at your Twilio number for your to receive in any of our channels like Slack, HipChat or Help Scout. Your replies are sent back as an SMS to the user.

### Configuring Twilio

You'll need a Twilio account with a phone number configured on it. A trial account is ok to test but is only good to send SMS to the phone you used while signing up. Once you've set up your Twilio account, obtain your API credentials from the Twilio account settings page and enter them into the corresponding Smooch page.

![Enter API credentials](/images/twilio.png)

Once your Twilio account is authenticated, select the phone number you want to use and hit save. You should now be able to receive messages from your Twilio phone number and reply via any of your configured channels.
