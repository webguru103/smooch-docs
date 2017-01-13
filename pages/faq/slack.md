---
title: Slack
section: faq
layout: two-column
---

# Slack FAQ

## I’m trying to write a message to my users but I’m having this error: "This channel isn't linked to a Smooch user, your command has no power here!"

Only channels created by Smooch and having the prefix #sk- can accept the command “/sk”.  The dispatch channel that you choose on our dashboard can’t be used to answer a customer directly.

## How does your Slack integration work?
When you integrate Slack with Smooch, we let you designate a channel to be the "dispatch" channel.

We will notify your team in this “dispatch” channel whenever a new conversation is created with a user. When a user sends you a message, we create a separate channel that starts with #sk-, this is where the conversation between your team and the user takes place. Anyone on your team can join a customer-specific channel by clicking on the link in the dispatch channel.

Inside a conversation channel, you can invite you teammate and speak freely with them. Once you’re ready to answer the user, type /sk followed by your message to send a reply.

## How to add members to a newly created conversation channel?

There are three ways other team members can join a newly created Slack channel:

1. On top of the channel there’s a button “invite others to the channels""
2. You can just mention someone with “@name” (without the”/sk”)
3. On the dispatch channel, the team member can click on the channel name starting by #sk-example-name"

## Why don’t I receive a notification on the dispatch channel for an old conversation?

You receive a notification on your dispatch channel only if you have archived the conversation beforehand. Note also that the owner of the Slack is auto-invited to a Slack channel only once (after the first user’s message)

## How can I change the Slack channel where I receive new conversation notifications?
You can change it on our dashboard Overview > Scroll to Slack and click on it.

## How can a Slack teammate be invited automatically to a conversation?
On our Slack integration page, you’ve selected a channel that we use to provide your team with new message notifications. Everyone in your team can join the channel.

If a user channel is archived, the next time you receive a message from that user this dispatch channel will get notified. The idea is once your teammate has sent the user response, or if they’ve left work for the day, they archive the channel so that Smooch knows to ping the team the next time the user sends a message.

## Is it possible to display the agent profile picture answering in Slack?
We load avatars from gravatar.com. Each user on your Slack team may create a gravatar.com account with the same e-mail they use for Slack. We will then display the image they set as their gravatar to your customers whenever they reply.
