# Customization

## Strings customization

SupportKit lets you customize any strings it displays by overwriting his keys. Simply add `res/values/strings.xml` file in your Android project and specify new values for the keys used in SupportKit. You can find all available keys by browsing to the `ui-x.x.x/res/values/values.xml` file in the External Libraries in Android Studio.

Dates shown in the conversation view are already localized to the user's device.

```xml
<resources>
    <string name="SupportKit_activityConversation">Messages</string>
    <string name="SupportKit_startOfConversation">This is the start of your conversation with the team.</string>
    <string name="SupportKit_welcome">Feel free to leave us a message about anything that\'s on your mind.</string>
    <string name="SupportKit_messageHint">Type a message…</string>
</resources>
```
