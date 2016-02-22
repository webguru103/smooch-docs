# Customization

## Embedded mode

To embed the widget in your existing markup, you need to pass `embedded: true` when calling `Smooch.init`. By doing so, you are disabling the auto-rendering mechanism and you will need to call `Smooch.render` manually. This method accepts a DOM element which will be used as the container where the widget will be rendered.

The embedded widget will take full width and height of the container. You must give it a height, otherwise, the widget will collapse.


```js
Smooch.init({
    appToken: 'your_app_token',
    embedded: true
});

// later

Smooch.render(document.getElementById('chat-container'));
```
