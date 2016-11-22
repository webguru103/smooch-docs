## Styling the Conversation Interface

The web messenger settings page allows for customization of various fields.

<img alt="Web Messenger Settings" src="../images/web_messenger_settings.png" />

### Display Style

The web messenger can be displayed as a button or as a tab. You can select the style in the web settings of the Smooch dashboard. The default style is the button mode.

With the button style web messenger, you have the option of selecting your own button icon. The image must be at least 200 x 200 pixels and must be in either JPG, PNG, or GIF format. 

### Basic Color Customization

For basic customization of colors, you can set the Brand Color, Conversation Color and Action Color in the web settings of the Smooch dashboard.

* The **Brand Color** customizes the color of the messenger header. It is also used for the color of the button or tab in idle state, as well as the color of the default app icon. If no color is specified, the brand color will default to <span style='color: #65758e; font-weight:bold;'>#65758e</span>.
* The **Conversation Color** customizes the color of customer messages and actions in the footer. If no color is specified, the conversation color will default to <span style='color: #0099ff; font-weight: bold;'>#0099ff</span>.
* The **Action Color** changes the appearance of links and buttons in your messages. It is also used for the 'Send' button when it is in active state. If no color is specified, the action color will default to <span style='color: #0099ff; font-weight: bold;'>#0099ff<span>.

<img alt="Color Customization" src="../images/color_customization_web.png" />

### Advanced Customization

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
If you use CSS customizations, we strongly suggest you add Smooch to your site through [npm](#npm-and-browserify) or through [bower](#bower). The version we have on [CDN](#script-tag-method) has our latest updates. Any new changes we push may break your CSS customizations.
</aside>