# Whispers

Smooch allows you to reach out to your users at scale so that you can start conversations with them about anything that matters to your app, even if they aren't in need of service or support. We call this feature "Whispers" and it allows you to automatically send a message to a targeted group of users at exactly the right time.

To help get you started, we've built in 5 basic templates and also allow you to create your own using any custom metadata that you're capturing with the `Smooch User` API.

 * _Welcome Whisper_ : Welcome new users to your app by starting a conversation where you can answer pressing questions and get initial feedback.

 * _Re-Engage Users_ : Send a message to users who were last seen using the app at least 7 days ago.

 * _Announcement_ : Send a message to all users when they launch the app.

 * _Ask for app rating_ : Send a message to all users who have signed up at least 5 days ago, prompting them to rate your app in the app store.

 * _Auto-response_ : Inform users of when to expect an answer, when they send their first message.

 You can start from any of these templates and customize it to meet your needs. You can also create a custom Whisper from scratch and go beyond these templates. You can use Whispers to ask for reviews from your most engaged users at the right time, you can notify users of older versions of your app about new versions, and more.

## How Whispers work

You create Whispers from within the [Smooch dashboard](https://app.smooch.io) by specifying which users should receive your message, the message you'd like to send to your users and the event that should trigger delivery of this message. For example, to create a Whisper that would check in to see how users are doing 2 days after installing an app, you'd create a custom Whisper with these settings:

![Whisper creation form](/images/create_whisper.png)

### Targeting a group of users

You can target your users based on any information that you've stored using the `Smooch User` API. We also provide several built-in properties that you can use without instrumenting your app with calls to `Smooch User` class.

 * _All users_ : Send the Whisper to *everyone* that has your app. Whispers that target everyone must be [linked to an event](#when-are-whispers-sent).

 * _Signed Up_ : Send the message before/after a specified number of days. For example, you can use this to send a message to all users who've been using your app for less than a day or more than a week. See [here](#setting-the-signed-up-date) for more information.

 * _Last Seen_ : Send the message based on when the user last interacted with your app. This value is updated automatically each time a user launches your app.

 * _App Version_ : Send the message to users who are using (or not using) a specific version of your app. The value for this property is taken from the CFBundleShortVersionString key in your app's info.plist file, and is updated each time the user launches your app.

In order to create Whispers based on properties you've defined using the `Smooch User` class, you'll need to run your app and ensure that at least 1 of your users was tagged with the property you want to base your Whisper on. Alternatively, you can make a HTTP request to `PUT /appusers` route of the [Smooch REST API](/rest). For more information on using custom properties, read our [documentation on the subject](#user-data).

### Personalizing the message text

You can personalize the message that's being sent with the first or last name of the user. To do this, simply use the syntax `{{ firstName || fallback }}` when creating your message. If the user's firstName hasn't been set by your code through the `Smooch User` class then the placeholder will be replaced with the string specified as `fallback`.
