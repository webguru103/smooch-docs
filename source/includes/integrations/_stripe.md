## Stripe

Stripe is a developer-friendly platform that instantly enables businesses to accept and manage payments online and in mobile apps. Our Stripe integration allows you to ask money to your users and accept payments directly within the conversation.

<div class="third-width-img">
	<img alt="in conversation money request" src="../images/in_conversation_money_request.png" />
	<img alt="card capture ui" src="../images/card_capture_ui.png" />
	<img alt="payment completed ui" src="../images/payment_completed_ui.png" />
</div>

### Configuring Stripe

From the Stripe integration page, select which Stripe mode you want Smooch to be using. 

![Stripe integration page ui](Stripe_integration_page_ui.png)

Use Test mode during development, so you can use fake [credit card numbers](https://stripe.com/docs/testing#cards). Select Live to get real money 🤑.

Then Click "Authenticate your Stripe account". This will send you to a Stripe page where you can select which Stripe account to link Smooch with. 

<aside class="info">
If you are using test mode, notice the "Skip this account form" a the top of the Stripe page. No need for a bank account for test mode.
</aside>

### Asking for money

While inside a conversation with a user you can send a buy button with the following syntax

```
$[Button label here](25.00)
```

This works from any channel you configured to use with Smooch.

The amount you specify must be using the dollars dot cents syntax (ie 25.33 for 25 dollars and 33 cents).

Once the user completes a payment you'll get a confirmation along with a link to the payment page on Stripe.



