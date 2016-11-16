### Action Buttons

Action buttons with the type of `link` will be translated into text. For example, if you link to `https://google.ca` with the text of the button as `Click Here`, and the text of the message as `This is a very special link`, the text message will look like:

```
This is a very special link

Click Here https://google.ca
```

### Reply and Postback Buttons

Reply buttons and Postback buttons will be rendered as text suggestions, instead of as buttons. So a message like this:

```
Which do you prefer?
%[Star Trek](reply:STAR_TREK)
%[Star Wars](reply:STAR_WARS)
```

will look like:

```
Which do you prefer?
You can say: STAR TREK, STAR WARS
```

Smooch will then do string matching on the user's reply to determine if they have selected one of the options, and take the appropriate action. For example, a user response of `STAR TREK` or `star trek`, will cause the payload `STAR_TREK` to be attached to the message.

### Buy Buttons

Buy buttons will be rendered as hyperlinks and redirect users to a web page where they can enter payment information.
