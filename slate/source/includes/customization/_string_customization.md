# Customization

## Strings customization

Smooch lets you customize any strings it displays via Apple's localization mechanism. To override one or more strings, add an empty string file named `SmoochLocalizable.strings` in your Xcode project and specify new values for the keys you would like to override. For example, to change the "Messages" header, and the "Done" button create a file with these contents:

```
"Messages" = "My Messages";

"Done" = "I'm Done";
```

The full set of keys is listed below. To enable string customization across languages, make sure you "Localize" your `SmoochLocalizable.strings` file in Xcode.

![Localize SmoochLocalizable.strings](/images/localize.png)

```
/* Nav bar button, action sheet cancel button */
"Cancel" = "...";

/* Conversation title */
"Messages" = "...";

/* Conversation header. Uses CFBundleDisplayName */
"This is the start of your conversation with the %@ team. We'll stay in touch to help you get the most out of your app.\nFeel free to leave us a message about anything that’s on your mind. We’ll get back to your questions, suggestions or anything else as soon as we can." = "...";

/* Conversation header when there are previous messages */
"Show more..." = "...";

/* Conversation header when fetching previous messages */
"Retrieving history..." = "...";

/* Error message shown in conversation view */
"No Internet connection" = "...";

/* Error message shown in conversation view */
"Could not connect to server" = "...";

/* Error message shown in conversation view */
"An error occurred while processing your action. Please try again." = "...";

/* Error message shown in conversation view */
"Reconnecting..." = "...";

/* Fallback used by the in app notification when no message author name is found */
"%@ Team" = "...";

/* Conversation send button */
"Send" = "...";

/* Conversation text input place holder */
"Type a message..." = "...";

/* Conversation nav bar left button */
"Done" = "...";

/* Failure text for chat messages that fail to upload */
"Message not delivered. Tap to retry." = "...";

/* Status text for chat messages */
"Sending..." = "...";

/* Action sheet button label */
"Take Photo" = "...";

/* Action sheet button label */
"Use Last Photo Taken" = "...";

/* Action sheet button label */
"Choose from Library" = "...";

/* Action sheet button label */
"Resend" = "...";

/* Action sheet button label */
"View Image" = "...";

/* Error displayed in message bubble if image failed to download */
"Tap to reload image" = "...";

/* Error title when user selects "use latest photo", but no photos exist */
"No Photos Found" = "...";

/* Error description when user selects "use latest photo", but no photos exist */
"Your photo library seems to be empty." = "...";

/* Error title when user attempts to upload a photo but Photos access is denied */
"Can't Access Photos" = "...";

/* Error description when user attempts to upload a photo but Photos access is denied */
"Make sure to allow photos access for this app in your privacy settings." = "...";

/* Error title when user attempts to take a photo but camera access is denied */
"Can't Access Camera" = "...";

/* Error description when user attempts to take a photo but camera access is denied */
"Make sure to allow camera access for this app in your privacy settings." = "...";

/* Generic error title when user attempts to upload an image and it fails for an unknown reason */
"Can't Retrieve Photo" = "...";

/* Generic error description when user attempts to upload an image and it fails for an unknown reason */
"Please try again or select a new photo." = "...";

/* UIAlertView button title to link to Settings app */
"Settings" = "...";

/* UIAlertView button title to dismiss */
"Dismiss" = "...";

/* Title for payment button */
"Pay Now" = "...";

/* Title for message action when payment completed */
"Payment Completed" = "...";

/* 
 Instructions for entering credit card info. Parameters are as follows:
 1. Amount (e.g. 50.45)
 2. Currency (e.g. USD)
 3. App name (Uses CFBundleDisplayName)
*/
"Enter your credit card to send $%@ %@ securely to %@" = "...";

/* Error text when payment fails */
"An error occurred while processing the card. Please try again or use a different card." = "...";

/* Button label for saved credit card view */
"Change Credit Card" = "...";

/*
 Information label for saved credit card view. Parameters are as follows:
 1. Amount (e.g. 50.45)
 2. Currency (e.g. USD)
 3. App name (Uses CFBundleDisplayName)
 */
"You're about to send $%@ %@ securely to %@" = "...";

/* Title for user notification action */
"Reply" = "...";
```