## Notification Action Intent Override

The default behavior of tapping on a push or in-app notification is to open the Smooch `ConversationActivity` intent.
If you want to change this behavior, simply override the following resource in `settings.xml` to the value of your choice:

```xml
<resources>
  <string name="Smooch_settings_notificationIntent">io.smooch.ui.ConversationActivity</string>
</resources>
```

<aside class="notice">Note that the specified intent must extend from the `Activity` class.</aside>
