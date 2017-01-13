---
title: Structured Messages
section: guide
layout: two-column
---

# Structured Messages

Smooch allows you to send [text](/guide/sending-messages/), image and structured messages to your users. Each of the messages you send becomes a part of the conversation between your user and your business system. You can use this wide variety of message types to create rich conversational experiences with your customers that combine a variety of media and interactive elements.

Our [integrated business systems](https://app.smooch.io/integrations/categories/business-systems) allow you to send some types of structured messages to your customers - namely images, action buttons and quick replies, without writing any code. To learn more about how to do this, read about the [Smooch Messaging Shorthand](/guide/sending-images-and-buttons-shorthand/).

In order to take full advantage of the rich variety of supported structured messages, you must use the Smooch API. This chapter explains how to use the API to send each of the different message types supported by the platform.

## Images, Stickers and GIFs

Sending images to users is simple and supported through both [messaging shorthand](/guide/sending-images-and-buttons-shorthand/) and the API.

In order to send an image using the API, we follow the recipe for [sending text messages](/guide/sending-messages/), but set the `type` parameter to `image` and set the `mediaUrl` field to a URL for the image to be sent to the user.

```javascript
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'image',
    mediaUrl: 'http://example.org/image.jpg'
}).then(() => {
    // async code
});
```



To send a sticker, simply have mediaUrl point to a transparent-background PNG and most messaging clients will format the message accordingly. Animated GIFs work in a similar manner.

Often, you may choose to send a message that combines image and text. In this case, simply add a `text` field to the request body as so:

```javascript
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'image',
    mediaUrl: 'http://example.org/image.jpg',
    text: 'This is my caption'
}).then(() => {
    // async code
});
```

You can extend this message type even further by adding a variety of different buttons to the message. This allows users receiving the message to take action with a tap or a click.

## Action Buttons

You can use buttons to guide the user to acting on the information in your conversation. Buttons can trigger replies, web links, purchases and more. When you send buttons or other structured messages with Smooch, you generally don't have to worry about whether or not a specific messaging channel [supports the button type](/guide/channel-capabilities/) as the Smooch API understands your intent and attempts to deliver the best message type to your user.

Most action button types are available in [messaging shorthand](/guide/sending-images-and-buttons-shorthand/).

#### Link Buttons

Link buttons allow you to send a calls to action that open a URL when tapped or clicked. You can configure the buttons with any valid URL - use it to send links to web pages, deep-link into apps or more.

Sending a link button with messaging shorthand is easy. When message text contains shorthand in this form:
 `%[Button Label](http://url.button.com)`
 Smooch will format the shorthand into a valid link button.

 Alternatively, you can use the API to have more fine grained control over how buttons are sent. All buttons in Smooch messages are specified in the `actions` array in the payload of the send message function.

```javascript
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'link',
        text: 'Button Label',
        uri: 'http://url.button.com'
      }
    ]
}).then(() => {
    // async code
});
```

#### Reply Buttons

Reply buttons (or quick replies) are a great way to walk the user through a specific flow, by suggesting various courses of action. A reply button, once tapped, will insert a reply on behalf of the user. Suggested replies are invaluable when building a bot or automated conversation flow, because they keep your user focused and provide clear instructions on how to proceed.

Each reply button has an associated payload, which should uniquely identify the intent of the action. When the user answers with one of the suggested replies, this payload will be included as part of the message object. The message will then be delivered as a normal message, appearing in any business system integrations, and delivered to webhooks subscribed to the message:appUser event.

You can send a reply button with the following syntax:

`%[Button label here](reply:PAYLOAD_HERE)`

By using the API, you can have more control over the presentation of reply buttons. For example, you can configure an icon to appear in the reply button:

```javascript
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Which do you prefer?',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'reply',
        text: 'Tacos',
        iconUrl: 'http://imgur.com/taco.png',
        payload: 'TACOS'
      }, {
        type: 'reply',
        text: 'Burritos',
        iconUrl: 'http://imgur.com/burrito.png',
        payload: 'BURRITOS'
      }
    ]
}).then(() => {
    // async code
});
```

#### Postback Buttons

Postback buttons are a great way to enhance your conversations, since they can trigger server-side logic when a user clicks on them. When you send the postback button, you can attach a payload and when the user clicks on it, it will trigger webhooks listening to the postback trigger. The payload associated with the action clicked by the user will be included in the webhook body. This allows you to respond to the press of a button from your backend. The server-side logic can use the payload to run different code based on the context of the conversation. These features are very useful when building a bot.

Postback buttons are similar in function to reply buttons, but with a few key differences:

 * Postbacks are multi-use. The button does not disappear after the user taps on it, and therefore it can be clicked many times.
 * Postbacks do not echo the user’s selection in the conversation history.
 * Postbacks use the postback webhook event, rather than the `message:appUser` event.

You can send your users a postback button with the following syntax:

`%[Button label here](postback:PAYLOAD_HERE)`

Or you can use Postbacks in combination with other button types using the API:

```javascript
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'postback',
        text: 'Postback Button Label',
        payload: 'PAYLOAD_HERE'
      },
      {
        type: 'link',
        text: 'Link Button Label',
        payload: 'http://url.button.com'
      }
    ]
}).then(() => {
    // async code
});
```

#### Buy Buttons

Buy buttons allow you to collect payments from your users. To learn more about how this works, read about our [payments integration](/guide/stripe-payments/)

#### Share Buttons

When communicating with users on Facebook Messenger, you can take advantage of the share button. The share button enables people to share message bubbles with their contacts using a native share dialog in Messenger.

Messages that are shared display the page name and profile pic, indicating the origin of the message. This attribution can be tapped, enabling friends to start their own conversations from shared content.

```javascript
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Title',
    role: 'appMaker',
    type: 'carousel',
    items: [{
      title: 'Title',
      actions: [{
        type: 'share'
      }]
    }]
}).then(() => {
    // async code
});
```

## Carousels and Lists

#### Carousel Messages

Carousel messages are a horizontally scrollable set of items that may each contain text, an image, and action buttons. Not all messaging channels fully support carousel messages; to check the level of support across Smooch messaging channels see [channel feature grid](/guide/channel-capabilities/).


```javascript
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'carousel',
    items: [{
        title: 'Tacos',
        description: 'Description',
        mediaUrl: 'http://example.org/image.jpg',
        actions: [{
            text: 'Select',
            type: 'postback',
            payload: 'TACOS'
        }, {
            text: 'More info',
            type: 'link',
            uri: 'http://example.org'
        }]
    }, {
        title: 'Ramen',
        description: 'Description',
        mediaUrl: 'http://example.org/image.jpg',
        actions: [{
            text: 'Select',
            type: 'postback',
            payload: 'RAMEN'
        }, {
            text: 'More info',
            type: 'link',
            uri: 'http://example.org'
        }]
    }]
}).then(() => {
    // async code
});
```

#### List Messages

List messages are a vertically scrollable set of items that may each contain text, an image, and action buttons. Not all messaging channels fully support list messages; currently only Facebook Messenger has support. LINE and Telegram have a carousel fallback, and for all other platforms a list message is rendered as raw text.

```javascript
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
   role:"appMaker",
   type:"list",
   items:[
      {
         title:"Tacos",
         description:"Beef and cheese... Mhm...",
         size: "large",
         mediaUrl:"https://www.tacojohns.com/globalassets/2016-tacos-menu/taco-bravo---436x420.jpg",
         actions:[
            {
               text:"Oh yeah!",
               type:"postback",
               payload:"TACOS"
            }
         ]
      },
      {
         title:"Burritos",
         description:"Beefier and cheesier... Mhm...",
         mediaUrl:"http://www.tacobueno.com/media/1381/beefbob.png?quality=65",
         actions:[
            {
               text:"Burritooo!",
               type:"postback",
               payload:"BURRITOS"
            },
            {
               text:"Burritooo!",
               type:"link",
               uri:"http://burritos.com",
               default: true
            }
         ]
      }
   ],
   actions:[
      {
         text:"More Choices!",
         type:"postback",
         payload:"MORE"
      }
   ]
}).then(() => {
    // async code
});
```

## Next Steps

 * Consult the [channel capabilities grid](/guide/channel-capabilities/) to understand how your structured message will be displayed across different platforms.
 * Send your first structured message by using [messaging shorthand](/guide/sending-images-and-buttons-shorthand/).
