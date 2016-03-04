## Shopify

[Shopify](https://www.shopify.com/) is a simple way to set up an online store to organize products, accept credit card payments, and manage orders.

This integration adds the Smooch web plugin to your Shopify online store. Smooch will set your `appToken` and add the code snippet in your theme.

### Adding Smooch to your store

In order to append the plugin to your theme, all you need to do is to press on _Authenticate_ from the integration page or install Smooch from the [Shopify marketplace](https://apps.shopify.com/smooch).

![From the integration page](/images/shopify.png)

<aside class="notice">Integrating Smooch will modify your current Shopify theme. If your theme ever changes, you will need to re-enable this integration.</aside>

### Adding more customer informations

If available, Smooch already includes the `givenName`, `surname`, `email`, *order count*, *last order placed*, *lifetime spent* and the Admin url of the current `customer`. It is also possible to retrieve more information for Shopify's [`customer` object](https://docs.shopify.com/themes/liquid-documentation/objects/customer) (it could also be `orders`, `address` or any object available in [your theme](https://docs.shopify.com/themes/liquid-documentation/objects)). To do so, you need to `Edit HTML/CSS` of your current theme to update the `snippets/smooch.liquid` file and add them into `properties` of the `Smooch.updateUser` call.

```
Smooch.updateUser({
  givenName: "{{ customer.first_name }}",
  surname: "{{ customer.last_name }}",
  email: "{{ customer.email }}",
  properties: {
    "Customer Account": "{{ shop.secure_url }}/admin/customers/{{ customer.id }}",
    ...
    "Location": "{{ customer.default_address.city }}, {{ customer.default_address.country_code }}",
    "Cart Items": "{{ cart.item_count }} {{ cart.item_count | pluralize: 'item', 'items' }} ({{ cart.total_price | money }})"
  }
});
```
