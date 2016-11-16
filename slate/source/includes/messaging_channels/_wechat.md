## WeChat

WeChat is a China-based mobile text and voice messaging communication service. With over 700 million active users, it’s become the de facto hub for Chinese conversational commerce.

Our WeChat integration lets your customers message you from WeChat, while you reply using your favorite business apps.

### Configuring WeChat

In order to configure WeChat, you'll need a WeChat Official Account. You can apply for one [here](http://apply.wechat.com).

Once you've created your account, you will need to go through the account verification process. In order to do so, login to your [WeChat dashboard](https://mp.weixin.qq.com) and go to the “WeChat Certification | 微信认证” page below the Set Up section.

Once your account has been verified, login to the [Smooch dashboard](https://app.smooch.io) and select WeChat in the list of integrations and follow these steps.

1. In the WeChat dashboard, go to the “Basic Configuration | 基本配置” page below the Develop section and enter your App ID and App Secret on the Smooch integration page.

1. In the WeChat dashboard, click on “Modify Configuration | 修改配置” below Basic Configuration, then copy the Webhook URL and Token from the Smooch integration page and paste it there.

1. After saving your settings, click on Connect to WeChat to complete the integration.

### Safe Mode

Optionally, you can configure "Safe Mode" in the WeChat dashboard. With this mode enabled, all outgoing messages from WeChat will be encrypted using a secure 43 character AES key.

In order to have Safe Mode functioning correctly with Smooch, simply copy your EncodingAESKey from WeChat and paste it in the WeChat integration page. Messages will be automatically decrypted in a secure fashion.

### Persistent Menu

![WeChat Persistent Menu](/images/wechat_menu.png)

It's possible to configure a menu of 1-5 buttons on the WeChat UI by calling [the Smooch REST API](/rest#persistent-menus). Menus are configured per app, not per user. Menu items can be [link](#links) or [postback](#postbacks) type actions.
