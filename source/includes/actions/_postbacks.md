## Postbacks

Postback buttons are a great way to enhance your conversations, since they can trigger server-side logic when a user clicks on them. When you send the postback button, you can attach a `payload` and when the user clicks on it, it will trigger webhooks listening to the `postback` trigger. The payload associated with the action clicked by the user will be included in the webhook body.

This allows you to respond to the press of a button from your backend. The server-side logic can use the `payload` to run different code based on the context of the conversation. These features are very useful when building a bot.

<aside class="notice">
You can send postback buttons through the [REST API](http://docs.smooch.io/rest#action-buttons).
</aside>
