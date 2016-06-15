### Action Buttons

Action buttons with the type of `link` will be translated into text. For example, if you link to `https://google.ca` with the text of the button as `Click Here`, and the text of the message as `This is a very special link`, the text message will look like:

```
This is a very special link

Click Here https://google.ca
```

### Postback Buttons

Postback buttons will be rendered as suggested responses, instead of as buttons. So a message like this:

```
Which do you prefer?
%[Star Trek](postback:STAR_TREK)
%[Star Wars](postback:STAR_WARS)
```

will look like:

```
Which do you prefer?
You can say: STAR_TREK, STAR_WARS
```
A user response of `STAR TREK`, will cause the payload `STAR_TREK` to be delivered by [webhook](/rest#webhooks).

### Buy Buttons

Buy buttons will be rendered as hyperlinks and redirect users to a web page where they can enter payment information.
