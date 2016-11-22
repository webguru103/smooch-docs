## Strings customization

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
