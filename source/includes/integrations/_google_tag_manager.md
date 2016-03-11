## Google Tag Manager

You can load Smooch's web widget through Google Tag Manager. Simply connect to your Google Tag Manager account, go inside your container and follow the guide below. 

### 1. Create a new Tag and give it a cute name like "Smooch"

On your Google Tag Manager dashboard, create a new tag and rename it "Smooch".

![GTM New Tag](/images/gtm_new_tag.png)

### 2. Select "Custom HTML Tag"

At the end of the product list, click on "Customer HTML Tag" and continue.

![GTM HTML Tag](/images/gtm_html_tag.png)

### 3. Paste Smooch's code snipet 

Paste the code below in the suggested text field. Make sure to replace 'your-app-token' with your Smooch's app token.

```html
<script src="https://cdn.smooch.io/smooch.min.js"></script>
<script>
    Smooch.init({ appToken: 'your-app-token'});
</script>
```

![GTM HTML Tag](/images/gtm_smooch_snippet.png)

### 4. Select to Fire On "All Pages"

Choose the trigger "All Pages" to fire the initialization of our widget when the page loads.

![GTM HTML Tag](/images/gtm_fire_on.png)

### 5. Save Tag and Publish

You're almost there. Save your Tag and don't forget to publish your changes. You could need to clear the recent the cache and reload your web page to see the widget.