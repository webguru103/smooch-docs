## WeChat

WeChat is a China-based mobile text and voice messaging communication service. With over 700 million active users, it’s become the de facto hub for Chinese conversational commerce.

Our WeChat integration lets your customers message you from WeChat, while you reply using your favorite business apps. It also connects with other messaging channels to engage with customers wherever they are.

### Configuring WeChat

In order to configure WeChat, you'll need a WeChat business account.

Once you have one, login to your [WeChat dashboard](https://mp.weixin.qq.com) and [Smooch dashboard](https://app.smooch.io), then select WeChat from the list of integrations.

1. In the WeChat dashboard, go to the “Basic Configuration | 基本配置” page below the Develop section and enter your App ID and App Secret on the Smooch integration page.

1. In the WeChat dashboard click on “Modify Configuration | 修改配置” below Basic Configuration, then copy the Webhook URL and Token from the integration page and paste it there.

1. After saving your settings, click on Connect to WeChat to complete the integration.

### Safe Mode

In the WeChat dashboard, there is a configuration option called "Safe Mode". With this mode enabled, all outgoing messages from WeChat will be encrypted using a secure 43 character AES key.

In order to have Safe Mode functioning correctly with Smooch, simply copy your EncodingAESKey from WeChat and paste it in the WeChat integration page. Messages will be automatically decrypted in a secure fashion.
