# Customization

## Strings customization

Smooch lets you customize any strings it displays by overwriting its keys. 
In order to do so, simply add `res/values-<your-language-code>/strings.xml` file in your Android project and specify new values for the keys used in Smooch. You can find all available keys by browsing to the `ui-x.x.x/res/values/values.xml` file in the External Libraries in Android Studio.

Dates shown in the conversation view are already localized to the user's device.

For example, if you wanted to override strings for English, you would create a file `res/values-en/strings.xml` and include the following in that file:

```xml
<resources>
    <string name="Smooch_activityConversation">Messages</string>
    <string name="Smooch_startOfConversation">This is the start of your conversation with the team.</string>
    <string name="Smooch_welcome">Feel free to leave us a message about anything that\'s on your mind.</string>
    <string name="Smooch_messageHint">Type a message…</string>
</resources>
```

<aside>Please note that if you want to specify new strings for the default fallback language, you must override them in `res/values/string.xml`.</aside>