## Styling the Conversation Interface

Using CSS, you can change the style used by Smooch. You can simply inspect any UI elements and override any class in the widget by targeting `#sk-container #sk-wrapper .selector`. Our stylesheet only targets `#sk-container .selector`, it would become less specific than yours.

```css
// To recolor bubbles to orange
#sk-container #sk-wrapper .sk-msg {
    background-color: #ff3333;
}
#sk-container #sk-wrapper .sk-msg::after {
    border-left-color: #ff3333;
}
```
