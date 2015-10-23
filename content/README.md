# Auth pages sidebar

Schema for `auth-messages.json`: 

```
{
"sectionTitle": "this is the top title (What' new)",
"title": "This is the title of the article/post/message",
"image": "http://some-url",
"content": "Some content to display",
"buttonTarget": "http://somewhere.io",
"buttonText": "Learn more",
"routes": ["login", "signup"],
"default": true, (optional)
"query": {some: 'value'} (optional, if default is true)
}
```

Display logic:

The routes attributes determines on which route this message should appear. Routes are the last part of the url without the leading /
If the default option is mark as true, this makes the message the default one for the routes specified in routes. If no other messages matches the query, this one will be displayed.

If values are set in query, the message can't be the default one. The message will only be display if the values in query are in the query string. All values in query must be in the query string, but the querystring can contain more parameters than just the one specified in query.

If two messages matches the routes and the querystring, the message with the most values in query will be displayed, i.e. having `{ref: producthunt}` in one message and `{ref: 'producthunt', campaign: 'whisper'}` in another, the second one will be displayed because it's much more specific than the first one.