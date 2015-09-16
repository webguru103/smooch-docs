# SupportKit
*Beautifully simple in-app messaging*

This project hosts the documentation available at [http://docs.supportkit.io/](http://docs.supportkit.io/).

The docs provides in-depth information on SupportKit’s features and is meant to be a guide for developers integrating the SDK and app makers seeking to engage with their users.

All source code examples are provided in Objective-C, Swift, and JavaScript! You can view code examples inline, and you can switch the programming language of the examples with the tabs in the top left.

For more in-depth details on SupportKit’s api check out our [API reference](http://docs.supportkit.io/api/). The API reference documents every method and property available through SupportKit. If you have any other questions, feel free to reach out to us [here](mailto:help@supportkit.io).

SupportKit is an SDK that connects you to your users so you can communicate with them and build a killer app. If you want to learn more about SupportKit, then visit [our website](https://supportkit.io) or [sign up here](https://app.supportkit.io/signup).

## Install

Grab the repo and install the dependencies

    $ git clone git@github.com:supportkit/supportkit-docs.git
    $ cd supportkit-docs
    $ npm install

Note: This will also run `bundle install` for the Slate dependencies automagically

Run the server

    $ grunt

## To publish docs

Pull the `integration` branch and run the Grunt task

    $ git checkout integration
    $ git pull
    $ grunt publish

This will publish the docs to GitHub Pages live on [http://docs.supportkit.io/](http://docs.supportkit.io/).
