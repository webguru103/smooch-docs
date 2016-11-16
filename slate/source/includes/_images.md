# Images

To send the user an image from one of your Business System integrations, use the following syntax with a publicly visible web url:

```
![](http://url-of.the/image.jpg)
```

This works from any channel you configured to use with Smooch. You can also use the [REST API](/rest#upload-image) to upload images.

<aside class='notice'>Images can't be sent along with text. On most frontend channels, only the image will be displayed.</aside>
<aside class='notice'>Only one image per message is supported; multiple image syntaxes in a same message will be rendered as links.</aside>
