## Zendesk

Zendesk is a CRM platform specialized in managing support tickets. Our Zendesk integration combines all the advantages of in-app messaging with a powerful CRM back-end.

### Configuring Zendesk ticketing

Configuring Smooch to communicate with Zendesk is easy. Go to your app settings on the Smooch admin page, and in the Zendesk settings, enter your Zendesk subdomain and click on the authenticate button.

<img style="width:50%; min-width:400px; max-width:800px;" src="/images/zendesk_integration.png" alt="Configure Zendesk integration page"/>

In order to maintain all your interactions with an app user under a single Zendesk End-user profile, it's important to <a href="#user-data">set the email</a> of your user in your app's Smooch integration.

#### Working with Zendesk email signatures

Smooch automagically removes agent's personal signatures from messages. Global signatures can be set, but must be prefixed with `--`, if they aren’t, you’ll see them appear in SK message bubbles, and it can be unsightly.
<img style="width:50%; min-width:200px; max-width:400px;" src="/images/unsightly_signature.png" alt="Oops, how unsightly"/>

#### Optional additional information on Configuration

Once you are authenticated with your Zendesk app, Smooch will automatically configure targets and triggers so that your Zendesk agents can communicate with your Smooch app users.

During the configuration process any existing triggers in your Zendesk settings will be modified to not email the End-user if the ticket is tagged "smooch". We do this to avoid duplicating the conversation, and to remove any reason for the app user to leave your app to respond via email.

It's suggested that you don't modify the targets and triggers that Smooch configures for you on Zendesk. However, if you do, and anything ever goes wrong, it's easy to fix. Just return to your app settings on the Smooch admin page and in the Zendesk settings click "Remove Integration." Re-adding the integration will remove previously configured Smooch targets and triggers and refresh your configuration.

Note: Smooch only ever configures one target and trigger per a Zendesk subdomain. In the event that multiple apps, or even mutliple Smooch accounts are authorized for a Zendesk subdomain, the triggers and targets will not be removed until all Smooch apps have had the Zendesk integration removed.

### Rate Limiting
Zendesk limits each account to 200 requests per a minute (globally). Additionally, they only allow 15 comments to be made on each individual ticket (regardless of whether the comment is an agent or app user) within a 10 minute period.

In the unlikely event that a conversation surpasses the rate limit, the agent will recieve a message in the Zendesk UI saying as much, and preventing the ticket from being updated for a certain period of time, usually around 6 minutes. Your app user's messages will be queued up and sent after the time period specified by Zendesk.

To reduce the likelihood of you bumping up against the rate limit, Smooch batches together all messages sent from the app user within a 5 second period into a single comment.
