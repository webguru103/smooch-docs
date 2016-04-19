## Facebook Messenger

Our Facebook Messenger integration allows your users to send you Facebook messages through your Facebook Page which you receive in any of our channels like Slack, HipChat or Help Scout. Your replies are sent back as a Facebook message to the user.

### Configuring Facebook Messenger

To use the Facebook Messenger integration, you need a Facebook account with permissions to manage a Facebook page. You then need to visit the Facebook Messenger integration page and press on "Connect your Facebook account". This will redirect you to Facebook where you will need to allow Smooch to access your account information.

Once your Facebook account is connected to Smooch, select the Facebook page you want to use and hit save. You should now be able to receive messages from your Facebook page and reply via any of your configured channels.

![Facebook Messenger Integration Page Settings](/images/messenger_settings.png)


### Action Buttons

Action buttons work as expected. A `link` action button will bring the user to the specified URL while a `postback` action button will trigger any [webhook](/rest#webhooks) listening to the `postback` trigger.

Payment requests (action buttons of type `buy`) will turn into link buttons which bring the user to a checkout page where payment information can be entered.
