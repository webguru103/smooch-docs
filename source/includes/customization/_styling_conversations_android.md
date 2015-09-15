## Styling the Conversation Interface

Using a `colors.xml` file in your `res/values` folder, you can change the colors used by SupportKit:

```xml
<resources>
    <color name="SupportKit_accent">#9200aa</color>
    <color name="SupportKit_accentDark">#76008a</color>
    <color name="SupportKit_accentLight">#be7cca</color>

    <color name="SupportKit_backgroundInput">#ffffff</color>

    <color name="SupportKit_btnSendHollow">#c0c0c0</color>
    <color name="SupportKit_btnSendHollowBorder">#303030</color>

    <color name="SupportKit_header">#989898</color>

    <color name="SupportKit_messageDate">@color/SupportKit_header</color>
    <color name="SupportKit_messageShadow">#7f999999</color>

    <color name="SupportKit_remoteMessageAuthor">@color/SupportKit_header</color>
    <color name="SupportKit_remoteMessageBackground">#ffffff</color>
    <color name="SupportKit_remoteMessageBorder">#d9d9d9</color>
    <color name="SupportKit_remoteMessageText">#000000</color>

    <color name="SupportKit_userMessageBackground">@color/SupportKit_accent</color>
    <color name="SupportKit_userMessageBorder">@color/SupportKit_accentDark</color>
    <color name="SupportKit_userMessageFailedBackground">@color/SupportKit_accentLight</color>
    <color name="SupportKit_userMessageText">#ffffff</color>
</resources>
```

If you need to update the image of the Send button, simply add an image with the following name to your `drawables`:

```
supportkit_btn_send_normal.png
```

You can find the original resources by browsing external libraries through Android Studio.
