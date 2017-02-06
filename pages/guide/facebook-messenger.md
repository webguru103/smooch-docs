---
title: Facebook Messenger
section: guide
layout: two-column
---

# Facebook Messenger

Our Facebook Messenger integration allows your users to send you Facebook messages through your Facebook Page which you receive in a business system or with Webhooks. Your replies are sent back as a Facebook message to the user.

### Configuring Facebook Messenger

To use the [Facebook Messenger integration](https://app.smooch.io/integrations/messenger), you need a Facebook account with permissions to manage a published Facebook page. You then need to visit the Facebook Messenger integration page and press on "Connect your Facebook account". This will redirect you to Facebook where you will need to allow Smooch to access your account information.

Once your Facebook account is connected to Smooch, select the Facebook page you want to use and hit save. You should now be able to receive messages from your Facebook page and reply via any of your configured business systems or with the Smooch API.

![Facebook Messenger Integration Page Settings](/images/messenger_settings.png)


### Action Buttons

Action buttons work as expected. A `link` action button will bring the user to the specified URL while a `postback` action button will trigger any [webhook](https://docs.smooch.io/rest/#webhooks) listening to the `postback` trigger.

#### Payments

![Facebook Messenger Payments](/images/messenger_payments.png)

You can request a one time payment from your users on Facebook messenger by sending a Buy button, either via our
[button syntax](https://docs.smooch.io/guide/sending-images-and-buttons-shorthand/) or the [Post Message API](https://docs.smooch.io/rest/#action-buttons). Payments support is native on Facebook Messenger and payments processing goes through their own payment gateway instead of our [Stripe integration](https://docs.smooch.io/guide/stripe-payments/) which is used for all other customer channels. You can learn more about Facebook Payments [here](https://developers.facebook.com/docs/messenger-platform/complete-guide/payments).

##### Setup

To send a payment request, you'll first need to be approved into Facebook Payments's beta program. Facebook is giving select US-based partners the opportunity to collect payments from customers over Messenger.

If you wish to apply, please [contact us](https://smooch.formstack.com/forms/payments_beta?appId=55cb872e5a894f190062fddd) and we’ll reach out to Facebook to open up payments for your account.

##### Send Buy Buttons

You can send Buy buttons either via the `$[label](9.99)` syntax or by including Buy actions in your call to the [Post Message API](https://docs.smooch.io/rest/#action-buttons).

Buy buttons can be combined with a text message, other actions, an image and/or in a [list](https://docs.smooch.io/rest/#list-message) or [carousel](https://docs.smooch.io/rest/#carousel-message) message type.

Facebook limits messages to contain only one buy button per list item and they must be in the first position.

##### Currency limitation

If you are using our Stripe integration to power payments on other channels, enabling Facebook payment will force your default currency to USD since Facebook Payments only support USD at the moment.

The default currency is automatically selected when using the [button syntax](https://docs.smooch.io/guide/sending-images-and-buttons-shorthand/). When using the [Post Message API](https://docs.smooch.io/rest/#action-buttons) you can specify the currency for each call. However if that message needs to be delivered to Messenger, it will be rejected.

### Carousel

Messenger offers full support for carousels which allows you to send a set of horizontally scrollable items that combines text, image and action buttons. 

![Carousel example](http://blog.smooch.io/content/images/2016/08/carousel_demo.gif)

You can send carousels containing up to 10 items via the [Post Message API](https://docs.smooch.io/rest/#carousel-message). Note that reply and location buttons are not allowed in a carousel. 

### List

Messenger also has full support for list messages. List messages are a vertically scrollable set of items that may each contain text, an image, and an action button.

![List example](https://docs.smooch.io/rest/images/list_messenger.png)

You can send list messages containing up to 10 items via the [Post Message API](https://docs.smooch.io/rest/#list-message). Note that each items in a list can only contain 1 button ([Link](https://docs.smooch.io/rest/#link), [Buy](https://docs.smooch.io/rest/#buy), [Postback](https://docs.smooch.io/rest/#postback) & [Share](https://docs.smooch.io/rest/#share) are the only allowed action types). Each item also supports a default action. Using this, you can enable people to open a URL when the row of the list item is tapped.

List messages can also append 1 action button at the bottom of the list. For example, you can use this extra action to let users see more items as shown above (More choices).



### Persistent Menu

![Facebook Messenger Persistent Menu](/images/messenger_menu.png)

It's possible to configure a menu of 1-5 buttons on the Messenger UI by calling [the Smooch REST API](https://docs.smooch.io/rest/#persistent-menus). Menus are configured per app, not per user. Menu items can be [link](structured-messages/#link-buttons) or [postback](structured-messages/#postback-buttons) type actions.
