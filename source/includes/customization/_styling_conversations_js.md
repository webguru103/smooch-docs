## Styling the Conversation Interface

### Basic Customization

For basic customization of colors, you can set an Accent Color and a Secondary Color in the web settings of the Smooch dashboard.

* The **Accent Color** customizes the color of customer messages and actions in the footer.
* The **Secondary Color** changes the appearance of links and buttons in your messages.

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
