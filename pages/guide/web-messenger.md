---
title: Web Messenger
section: guide
layout: two-column
---

# Web Messenger

## References

- [Web SDK reference](https://github.com/smooch/smooch-js/)
- [SupportKit to Smooch upgrade guide](https://github.com/smooch/smooch-js/releases/tag/2.0.0)

## Adding Smooch to your site

![Web SDK's UI](/images/web_widget.png)

There are a few ways you can include the Smooch plugin on your web page.

The easiest way to get started is using the Script Tag method, but you can also include it using bower or npm.


### Script Tag Method

####Step 1: Include the Smooch plugin on your web page

Add the following code towards the end of the `body` section on your page. Placing it at the end allows the rest of the page to load first.

```html
<script src="https://cdn.smooch.io/smooch.min.js"></script>
```

####Step 2: Initialize Smooch with your new app token

Once Smooch has been included on your web page, you're almost done. Simply initialize the plugin using this code snippet

```html
<script>
	Smooch.init({appToken: 'your_app_token'});
</script>
```

### npm and browserify

```
npm install smooch
```

In your code:

```javascript
var Smooch = require('smooch');

Smooch.init({appToken: 'your_app_token'});
```

### bower

```
bower install smooch
```

In your code:

```javascript
Smooch.init({appToken: 'your_app_token'});
```

### RequireJS

Since the library is self-defining its name to be `Smooch` in the context of RequireJS, you should do the following to use it :

```javascript

// alias Smooch in your config
require.config({
    "paths": {
        "Smooch": "https://cdn.smooch.io/smooch.min"
    }
});

require(['require', 'Smooch'], function(require){
    var Smooch = require('Smooch');
	// ...
});

// or

define(function(require) {
	var Smooch = require('Smooch');
	// ...
});
```

### Google Tag Manager

You can load Smooch's web widget through [Google Tag Manager](https://www.google.com/analytics/tag-manager/). Simply connect to your Google Tag Manager account, go inside your container and follow the guide below.

#### 1. Create a new Tag and give it a cute name like "Smooch"

On your Google Tag Manager dashboard, create a new tag and rename it "Smooch".

![GTM New Tag](/images/gtm_new_tag.png)

#### 2. Select "Custom HTML Tag"

At the end of the product list, click on "Customer HTML Tag" and continue.

<img style="width:50%; min-width:400px; max-width:800px;" src="/images/gtm_html_tag.png" alt="GTM HTML Tag">

#### 3. Paste Smooch's code snipet

Paste the code below in the suggested text field. Make sure to replace 'your-app-token' with your Smooch's app token.

```html
<script src="https://cdn.smooch.io/smooch.min.js"></script>
<script>
    Smooch.init({ appToken: 'your-app-token'});
</script>
```

![GTM Snippet](/images/gtm_smooch_snippet.png)

#### 4. Select to Fire On "All Pages"

Choose the trigger "All Pages" to fire the initialization of our widget when the page loads.

![GTM Fire on](/images/gtm_fire_on.png)

#### 5. Save Tag and Publish

You're almost there. Save your Tag and don't forget to publish your changes. You might need to clear the recent the cache and reload your web page to see the widget.

### Wordpress

To install Smooch on your Wordpress site, you need to [download our plugin](https://github.com/smooch/smooch-wordpress) and install it through Wordpress.

1. Download the ZIP from our [plugin github page](https://github.com/smooch/smooch-wordpress)
2. Connect on your Wordpress dashboard and go on the plugin section
3. Click on "Add New" and then "Upload Plugin"

	![Wordpress](/images/wordpress_plugin.png)

4. Choose the plugin and click on "Install Now".
5. In your Wordpress settings, click on "Smooch". Paste your app token in the appropriate text field.

	![Wordpress](/images/wordpress_settings.png)

### Ghost

You are wondering how to load our widget on your Ghost blog. First connect to your Ghost dashboard (your-website.com/ghost). Go to the Code Injection menu (on the navigation left bar).

In the Blog Footer section, paste our initialization code.

```html
<script src="https://cdn.smooch.io/smooch.min.js"></script>
<script>
    Smooch.init({ appToken: 'your-app-token'});
</script>
```

![Ghost](/images/ghost.png)

And don't forget to click on Save!

### Zendesk Help Center

Zendesk Help Center is a self-service support software that provides a knowledge base for your team and customers.

Follow the instructions below to add Smooch into your Zendesk Help Center:

#### 1. Connect to your Help Center dashboard and customize your theme

On your Zendesk Help Center dashboard, click on the "General" menu and then "Customize design".

<img style="width:50%; min-width:400px; max-width:800px;" src="../images/zendeskhc_custom_design.png" alt="Zendesk Customize design">

#### 2. Add Smooch javascript code to the footer of your theme

On the newly displayed sidebar, click on "edit theme".

<img style="width:50%; min-width:400px; max-width:800px;" src="../images/zendeskhc_edit_theme.png" alt="Zendesk Edit theme">

Then, on the theme edition dashboard, select "footer" on the first dropdown menu.

<img style="width:50%; min-width:400px; max-width:800px;" src="../images/zendeskhc_footer.png" alt="Zendesk footer menu">

Paste the code provided below just before the ending footer tag.

```html
<script src="https://cdn.smooch.io/smooch.min.js"></script>
<script>
    Smooch.init({ appToken: 'your-app-token'});
</script>
```

![Zendesk Smooch code](/images/zendeskhc_smooch.png)

#### 3. Save and publish!

Click save and don't forget to publish your work.

<img style="width:50%; min-width:400px; max-width:800px;" src="../images/zendeskhc_publish.png" alt="Zendesk Publish">

## Alternate Channels

The Web Messenger supports the ability for users to find and reach out to you on any channel you support.
In order to offer additional channels, simply integrate with whichever [messaging channel](https://app.smooch.io/integrations/categories/customer-channels) you please and it will automatically be added to the list.

<span class="half-width-img">![Alternate Channels](/images/alternate_channels.png)</span>

<span class="half-width-img">![SMS Page](/images/sms.png)</span>

## User linking

If a user starts chatting with you and would like to continue the chat on another messaging channel such as Facebook Messenger, they will have the option to link their Facebook account and continue that same conversation.

These conversations will be merged automatically, allowing you to reply to the customer from the same thread wherever they choose.
When you reply to your user, Smooch will intelligently detect which messaging channel they most recently used and make sure that a user doesn't get spammed with push notifications if they happen to have multiple messaging channels linked.

For example, if a user visits your site and would like to close the tab, they can choose to 'Send to Messenger'. This will connect their conversation to Facebook Messenger and allow them to close the tab and move on.

<span class="half-width-img">![Send to Messenger](/images/send_to_messenger.png)</span>

## Localization

Every string you see in Smooch can be [customized](#strings-customization) and localized. Smooch provides a few languages out of the box, but [adding new languages](#adding-more-languages) is easy to do. When localizing strings, Smooch looks for SmoochLocalizable.strings in your app bundle first then in the Smooch bundle, enabling you to customize any strings and add support for other languages.

### Enabling Localization in your app

For Smooch to display a language other than English, your app needs to first enable support for that language. You can enable a second language in your Xcode project settings:

![Enable Localization](/images/add_language.png)

Once you have this, Smooch will display itself in the device language for the supported language.

These languages are included with the iOS SDK: Arabic, English, Finnish, French, German, Italian, Japanese, Korean, Mandarin Chinese (traditional and simplified), Persian, Portuguese (Brazil and Portugal), Russian, Slovenian, Spanish, and Swedish.

See how to support more languages in [Adding more languages](#adding-more-languages)

<aside class="warning">
Localization is subject to caching. If you can't see your changes, cleaning your project, resetting the simulator, deleting your app from your test devices are good measures.
</aside>

### Adding more languages

To enable other languages beside the provided ones, first copy the english SmoochLocalizable.strings file from the Smooch bundle to the corresponding .lproj folder for that language. Then, translate the values to match that language.

If you translate Smooch's strings to a language not currently supported, we encourage you to share it with us so that every Smooch user can benefit from it. You can do so by [forking](https://github.com/smooch/smooch-ios/fork) our GitHub repo and creating a pull request, or just send us your string file at <a href="mailto:help@smooch.io">help@smooch.io</a>

## Customization

### Embedded mode

To embed the widget in your existing markup, you need to pass `embedded: true` when calling `Smooch.init`. By doing so, you are disabling the auto-rendering mechanism and you will need to call `Smooch.render` manually. This method accepts a DOM element which will be used as the container where the widget will be rendered.



<aside>
The embedded widget will take full width and height of the container.  
You must give it a height, otherwise, the widget will collapse.
</aside>


```js
Smooch.init({
    appToken: 'your_app_token',
    embedded: true
});


Smooch.render(document.getElementById('chat-container'));
```

### Strings customization

Smooch lets you customize any strings it displays by overwriting its keys. Simply add the `customText` key in your `Smooch.init()` call and specify new values for the keys used in Smooch. You can find all available keys [here](https://github.com/smooch/smooch-js/blob/master/src/js/reducers/ui-reducer.js#L6). If some text is between `{}`, or if there is an html tag such as `<a>`, it needs to stay in your customized text.

For example:

```js
Smooch.init({
    appToken: 'your_app_token',
    customText: {
        headerText: 'How can we help?',
        inputPlaceholder: 'Type a message...',
        sendButtonText: 'Send',
    }
});
```

### Styling the Conversation Interface

The web messenger settings page allows for customization of various fields.

<img alt="Web Messenger Settings" src="/images/web_messenger_settings.png" />

#### Display Style

The web messenger can be displayed as a button or as a tab. You can select the style in the web settings of the Smooch dashboard. The default style is the button mode.

With the button style web messenger, you have the option of selecting your own button icon. The image must be at least 200 x 200 pixels and must be in either JPG, PNG, or GIF format.

#### Basic Color Customization

For basic customization of colors, you can set the Brand Color, Conversation Color and Action Color in the web settings of the Smooch dashboard.

* The **Brand Color** customizes the color of the messenger header. It is also used for the color of the button or tab in idle state, as well as the color of the default app icon. If no color is specified, the brand color will default to <span style='color: #65758e; font-weight:bold;'>#65758e</span>.
* The **Conversation Color** customizes the color of customer messages and actions in the footer. If no color is specified, the conversation color will default to <span style='color: #0099ff; font-weight: bold;'>#0099ff</span>.
* The **Action Color** changes the appearance of links and buttons in your messages. It is also used for the 'Send' button when it is in active state. If no color is specified, the action color will default to <span style='color: #0099ff; font-weight: bold;'>#0099ff<span>.

<img alt="Color Customization" src="/images/color_customization_web.png" />

#### Advanced Customization

For complete control over the styling of the widget, you can use CSS to override the style used by Smooch. You can simply inspect any UI elements and override any class in the widget by targeting `#sk-container #sk-wrapper .selector`. Our stylesheet only targets `#sk-container .selector`, it would become less specific than yours.

```css
// To recolor bubbles to orange
#sk-container #sk-wrapper .sk-msg {
    background-color: #ff3333;
}
#sk-container #sk-wrapper .sk-msg::after {
    border-left-color: #ff3333;
}
```

<aside class="warning">
If you use CSS customizations, we strongly suggest you add Smooch to your site through <a href="#npm-and-browserify">npm</a> or through [bower](#bower). The version we have on <a href="#script-tag-method">CDN</a> has our latest updates. Any new changes we push may break your CSS customizations.
</aside>

### Sound notification

By default, a sound notification will be played when a new message comes in and the window is not in focus.

To disable this feature, you need add the `soundNotificationEnabled` option to the `Smooch.init` call, like this:

```js
Smooch.init({
    appToken: 'your_app_token',
    givenName: 'Cool',
    surname: 'Person',
    soundNotificationEnabled: false // Add this line to your 'Smooch.init' call
});
```
