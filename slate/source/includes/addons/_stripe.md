### Transaction fees

Smooch takes a 0.5% + 20¢ fee on every payment we facilitate. This is separate from the [Stripe fees](https://stripe.com/ca/pricing) which are currently at 2.9% + 30¢. For example, on a $100 USD payment, Smooch will receive $0.70 USD and Stripe $3.20 USD.

### Configuring Stripe

From the Stripe integration page, select which Stripe mode you want Smooch to be using. 

![Stripe integration page ui](Stripe_integration_page_ui.png)

Use Test mode during development. While in this mode you can use Stripe's [test credit card numbers](https://stripe.com/docs/testing#cards) to make transactions without using real money. Use Live mode to get real money 💸.

Then Click "Authenticate your Stripe account". This will send you to a Stripe page where you can select which Stripe account to link Smooch with. 

<aside class="info">
If you are using test mode, notice the "Skip this account form" at the top of the Stripe page. There is no need for a bank account in test mode.
</aside>

### Requesting payments

While inside a conversation with a user you can send a buy button with the following syntax

```
$[Button label here](25.00)
```

This works from any channel you configured to use with Smooch.

The amount you specify can be just a dollars amount or dollars and cents as in the example. Note that all amounts are in USD.

Once the user completes a payment you'll get a confirmation along with a link to the payment page on Stripe.
