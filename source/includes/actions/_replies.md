## Replies

Reply buttons are a great way to walk the user through a specific flow, by suggesting various courses of action. A reply button, once tapped, will insert a reply on behalf of the user. Suggested replies are invaluable when building a bot or automated conversation flow, because they keep your user focused and provide clear instructions on how to proceed.

Each reply button has an associated `payload`, which should uniquely identify the intent of the action. When the user answers with one of the suggested replies, this payload will be included as part of the message object. The message will then be delivered as a normal message, appearing in any business system integrations, and delivered to webhooks subscribed to the `message:appUser` event.

You can send a reply button with the following syntax:

```
%[Button label here](reply:PAYLOAD_HERE)
```
<aside class="notice">
Reply buttons are mutually exclusive with other action types. When specifying a reply button, all other actions on the same message must also be replies, otherwise the message will be considered invalid.
</aside>
<aside class="notice">
Reply buttons are currently supported on Facebook Messenger, LINE, WeChat, Telegram, SMS, and Email Messaging.
</aside>
