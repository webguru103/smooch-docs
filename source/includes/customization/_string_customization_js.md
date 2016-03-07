## Strings customization

Smooch lets you customize any strings it displays by overwriting its keys. Simply add the `customText` key in your `Smooch.init()` call and specify new values for the keys used in Smooch. You can find all available keys by browsing to the `defaultText` object in the source.

```js
Smooch.init({
    appToken: 'your_app_token',
    customText: {
        headerText: 'How can we help?',
        inputPlaceholder: 'Type a message...',
        sendButtonText: 'Send',
        introText: 'This is the beginning of your conversation.<br/> Ask us anything!',
        settingsText: 'You can leave us your email so that we can get back to you this way.',
        settingsReadOnlyText: 'We\'ll get back to you at this email address if we missed you.',
        settingsInputPlaceholder: 'Your email address',
        settingsSaveButtonText: 'Save',
        settingsHeaderText: 'Email Settings',
        settingsNotificationText: 'In case we\'re slow to respond you can <a href="#" data-ui-settings-link>leave us your email</a>.'
    }
});
```
<aside>
In order to have a working link in `settingsNotificationText`, you must have an `a` tag with a `data-ui-settings-link` attribute on it.
</aside>
