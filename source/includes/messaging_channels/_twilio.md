## Twilio

[Twilio](https://www.twilio.com/) is an SMS messaging service. Our Twilio integration allows your users to send you text messages at your Twilio number for your to receive in any of our channels like Slack, HipChat or Help Scout. Your replies are sent back as an SMS to the user.

### Configuring Twilio

You'll need a Twilio account with a phone number configured on it. A trial account is ok to test but is only good to send SMS to the phone you used while signing up. Once you've set up your Twilio account, obtain your API credentials from the Twilio account settings page and enter them into the corresponding Smooch page.

![Enter API credentials](/images/twilio.png)

Once your Twilio account is authenticated, select the phone number you want to use and hit save. You should now be able to receive messages from your Twilio phone number and reply via any of your configured channels.

### Action Buttons

Action buttons with the type of `link` will be translated into text. For example, if you link to `https://google.ca` with the text of the button as `Click Here`, and the text of the message as `This is a very special link`, the text message will look like:

```
This is a very special link

Click Here https://google.ca
```

If the button has the type of `postback`, a list of options will be appended at the end of the message. For example if a message includes two postback actions: `Yes` and `No`, with a text of `Are you sure?`, the text message will look like this:

```
Are you sure?

You can say: YES, NO
```
