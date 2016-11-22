## Postbacks

Postback buttons are a great way to enhance your conversations, since they can trigger server-side logic when a user clicks on them. When you send the postback button, you can attach a `payload` and when the user clicks on it, it will trigger webhooks listening to the `postback` trigger. The payload associated with the action clicked by the user will be included in the webhook body. This allows you to respond to the press of a button from your backend. The server-side logic can use the `payload` to run different code based on the context of the conversation. These features are very useful when building a bot.

Postback buttons are similar in function to [reply buttons](#replies), but with a few key differences:

1. Postbacks are multi-use. The button does not disappear after the user taps on it, and therefore it can be clicked many times.
2. Postbacks do not echo the user's selection in the conversation history.
3. Postbacks use the `postback` webhook event, rather than the `message:appUser` event.

You can send your users a postback button with the following syntax:

```
%[Button label here](postback:PAYLOAD_HERE)
```
