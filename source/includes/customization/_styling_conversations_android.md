## Styling the Conversation Interface

Using a `colors.xml` file in your `res/values` folder, you can change the colors used by Smooch:

```xml
<resources>
    <color name="Smooch_accent">#9200aa</color>
    <color name="Smooch_accentDark">#76008a</color>
    <color name="Smooch_accentLight">#be7cca</color>

    <color name="Smooch_backgroundInput">#ffffff</color>

    <color name="Smooch_btnSendHollow">#c0c0c0</color>
    <color name="Smooch_btnSendHollowBorder">#303030</color>

    <color name="Smooch_header">#989898</color>

    <color name="Smooch_messageDate">@color/Smooch_header</color>
    <color name="Smooch_messageShadow">#7f999999</color>

    <color name="Smooch_remoteMessageAuthor">@color/Smooch_header</color>
    <color name="Smooch_remoteMessageBackground">#ffffff</color>
    <color name="Smooch_remoteMessageBorder">#d9d9d9</color>
    <color name="Smooch_remoteMessageText">#000000</color>

    <color name="Smooch_userMessageBackground">@color/Smooch_accent</color>
    <color name="Smooch_userMessageBorder">@color/Smooch_accentDark</color>
    <color name="Smooch_userMessageFailedBackground">@color/Smooch_accentLight</color>
    <color name="Smooch_userMessageText">#ffffff</color>
</resources>
```

If you need to update the image of the Send button, simply add an image with the following name to your `drawables`:

```
smooch_btn_send_normal.png
```

You can find the original resources by browsing external libraries through Android Studio.
