---
title: Web Messenger
section: faq
layout: two-column
---

# Web Messenger FAQ

## How can I automatically open the web messenger on my website?

You can use the function `open()` function of the Smooch Web Messenger. Simply call this function after you initialize Smooch on your web page.

## How can I customize the texts that are displayed on the web messenger?

Customizing labels is easy, our [web messenger documentation](/docs/web-messenger/#strings-customization). You can find the list of all customizable strings on the [web messenger GitHub page](https://github.com/smooch/smooch-js#options)

## How can I customize the web messenger?

You have three tools for changing the appearance of the widget:

1. Apply CSS styles to it directly
2. Use our built in style selector
3. Fork the web messenger and change whatever aspects you like.

Note that if you use CSS to change the appearance of the messenger, we can’t guarantee that a major improvement of our codebase won’t break your custom styles.

## How can I capture user's info before starting the conversation with the user on the web?

You can create a form on your website and pass us the info in `Smooch.init()`.

## How can I reset a anonymous conversation on the web (for testing)

On the dev console, navigate to `Application tab > Local storage > your website` and delete the line `sk_devideid`

## How can I embed the web messenger in a container of my website

You can embed the web messenger by using this [function](/docs/web-messenger/#embedded-mode)

## The web messenger doesn't display well on mobile. How can I fix that?

Make sure you have this code in your HTML file:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

## How can I update the user data?

You can update any information that you want on the user by using the [updateUser() method](https://github.com/smooch/smooch-js#updateuseruser)

## What URL is your CDN calling?

Here’s the list of URL we’re calling.

* cdn.smooch.io - Our CDN
* api.smooch.io - Our API
* netdna.bootstrapcdn.com - Font-awesome
* checkout.stripe.com - For the Stripe Connect integration
* connect.facebook.net - For the Messenger integration
* www.gravatar.com - Some avatars may come from here
* telegram.me - For the telegram integration (only during redirects)
* mp.weixin.qq.com - For the WeChat integration, used to pull a QR code
* maxcdn.bootstrapcdn.com - Twitter Bootstrap CSS

## Why is my profile picture not updating?

Did you enable "Use app icon and a single team name for all messages” on the dashboard?  

If you did, the image may be persisted in your cache. Refresh it and try again.

## How can I add a feature to your web messenger?

Our web messenger is open-source, you can contribute on [github](https://github.com/smooch/smooch-js).

## Nothing shows up when I add Smooch script?

There’s a couple of quick checks that you can do if our script doesn’t load:

1. Make sure you separate the 2 scripts we provide
2. Make sure your app token doesn’t contain “copy”

If that doesn’t do the trick, note that there are a couple of libraries we conflict with currently: mootools, requirejs & Prototype js. Make sure that you’re not using one of them.

## How do I customize your web messenger and remove the branding?

We'd really love if you could keep the branding around (especially if you're a free user), however if you really want to remove the branding you can do so through a CSS override.

## How can I insert your widget in a container?

You can embed Smooch anywhere on your webpage now by following the instructions of the docs.

## How can I ask the user’s e-mail or name before starting the conversation?

You can natively ask the customer for his email after his first message. We designed Smooch this way because we value conversation over e-mail capturing. To do so, inside Smooch.init, you should set emailCapturedEnabled to true as explained in our doc. If you’ve enabled another channel (Facebook Messenger for example), this feature is fi  If you want to capture e-mail before starting the conversation, you can always create a form on your web page before the initialization of Smooch and pass the e-mail and the name when you call Smooch.init(). You will find more info in our GitHub doc.

## Do I need a mobile app to use Smooch?

No, you don't necessarily need an app to use Smooch. You can use our web messenger on your website or integrate with any popular messaging app(Facebook Messenger, WeChat…).  Your team can answer your customers through different business tools like Slack, HipChat, HelpScout or Zendesk.

## How do I disable the sound notifications?

You can follow these [instructions](/docs/web-messenger/#sound-notification) to disable the sound notifications.

## How can I notify my customers that the office is closed and nobody is around to answer?

Our [office hours](/docs/office-hours/) feature makes this a breeze.

## Can I put the web messenger on two different websites, and also change the header?

Yes, you can place the web chat on as many sites as you like. To change the header, just set a different `introductionText` property in your init call on each site.
