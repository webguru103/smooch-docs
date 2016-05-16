## Email Channel

The Email channel allows you to have conversations with your users by email via any of your back-end messaging channels, be it Slack, Front or a bot connected to the Smooch API.

When you enable the Email channel, you will be provided with a Smooch email address. Email messages sent to that email address will be delivered to your back-end messaging channels.

### Using your own email address

After you set up your *from* address, all your emails to users will appear to come from your own email address instead of your smooch email address.

1. To use your own email address to receive and respond to user emails, simply provide your email address in the "from address" field on the Smooch Email Channel page.

![input from address](/images/input_forwarding_email.png)

2. Configure your email provider to automatically forward incoming email to your Smooch email address (detailed instructions below).

3. Now click the _**Test email forwarding**_ link on the Email channel page (shown below) to confirm that forwarding is working.

![test email forwarding](/images/test_forwarding_email.png)


#### Configuring your email provider to forward email to your Smooch email address

During configuration, your provider may send a confirmation email to your Smooch email address. It's important to have at least one back-end messaging channel set up on Smooch so that you can act on the confirmation email sent by your provider.

##### Provider specific instructions

- [Google Apps and Gmail](https://support.google.com/mail/answer/10957)

- Google Groups

    * 1. [Create a group](https://support.google.com/a/answer/33343)
    * 2. [Add your smooch email address as a member of the group](https://support.google.com/groups/answer/2465464)

- [Microsoft Exchange](https://technet.microsoft.com/en-us/library/dd351134.aspx)

- [Microsoft Exchange 2007](https://technet.microsoft.com/en-us/magazine/dd547068.aspx)

- [Yahoo](https://help.yahoo.com/kb/SLN17371.html)

- [Bluehost](https://my.bluehost.com/cgi/help/forwarders)

- [Dreamhost](http://wiki.dreamhost.com/Email_Setup)

- [FatCow](http://www.fatcow.com/knowledgebase/read_article.bml?kbid=5745)

- [Rackspace](https://support.rackspace.com/how-to/set-up-email-forwarding-on-cloud-sites/)

- [Register.com](https://forum.web.com/register/faq/)

- [OVH](http://help.ovh.co.uk/CreateEmailRedirection)

- [Mailgun](https://documentation.mailgun.com/api-routes.html#actions)

### Action Buttons

[Action buttons](#links) will be rendered as links in the email. So

```
%[hyperlink button](https://smooch.io/)
```

will appear to the user as _[hyperlink button](https://smooch.io/)_.

### Postback Buttons

[Postback buttons](#postbacks) will be rendered as suggested responses, instead of as buttons. So a message like this:

```
Which do you prefer?
%[Star Trek](postback:STAR_TREK)
%[Star Wars](postback:STAR_WARS)
```

will be rendered as:

_Which do you prefer?<br>You can say: STAR TREK, STAR WARS_

A user response of `STAR TREK`, will be cause the payload `STAR_TREK` to be delivered.

### Buy Buttons

[Buy buttons](#stripe) will redirect users to a web page where they can enter payment information, and will be rendered as hyperlinks.

### Sending and receiving files

Email attachments sent by the user will be either be rendered in your back-end channel, if they are images, or posted as hyperlinks, for other types of files.

Images sent to the user via the RESTful API will be embedded in them email as html.

### Whispers

[Whispers](#whispers) sent to email will contain a footer with an unsubscribe link that reads "Not interested in emails from us?".
If the user clicks on this link, they will be permanently unsubscribed from further whispers, though they will still be able to receive non-whisper emails as usual.
