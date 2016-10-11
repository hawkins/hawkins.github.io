---
layout:     post
title:      Using Hubot to Mention Everyone in GroupMe
date:       2016-10-11
summary:    How to add the @all feature to your GroupMe group
---

If you're like me, you love `@everyone` in Slack, and your [GroupMe](https://groupme.com/) group *desperately* needs that feature.

Maybe there are free cookies on the Quad on campus; you've gotta tell your friends! Why can't you just say "@all of you get out to the quad for free cookies!"?!

After following along with this blog, *you can!*


## How it works

We'll be writing a [Hubot](https://hubot.github.com/) script using the [hubot-groupme](https://github.com/AdamEdgett/hubot-groupme) adapter to deploy on Heroku that will listen for messages with "@all" in them in a given GroupMe room. We'll deploy our bot for free\* on [Heroku](https://www.heroku.com/).

\* *Free for the first 550 (or 1000 if you verify a credit card) hours per month*

Then, we can tag everyone in the group (minus a blacklist) by saying anything with "@all" in the message.

> **Note**: You can host the bot on your own server instead, but I'm writing this for anyone to be able to handle. If you know how to host bots / scripts on your own machine, you shouldn't have any trouble translating the few Heroku-specific instructions. Moving on...


#### How it works (technical)

If you're the type of guy that throws the manuals away when you buy a product, scroll past this section.

Hubot uses regular expressions to match messages in a chat room. Groupme-at-all listens for `/.*@all.*/i` to act. It will construct a `message` to send in an HTTP POST request to the GroupMe v3 API.

> **Note**: [GroupMe's API](https://dev.groupme.com/docs/v3) is not well-documented. Multiple features are completely or partially ignored. In fact, **mentions are not documented at all!** So tagging, as far as I can determine, is handled similarly to an image or emoji attachment, which maps a User ID to a string of characters, which appear as bold text to users.

So after receiving the command, the bot maps every user's ID to an individual character in the message for a tag, since some GroupMe versions seem to require a tag of `length >= 1`.

Next, the bot stringify's the `message` object and sends the HTTP POST request, logging the results.

Check out the actual code used to do all this:

{% highlight coffeescript %}
  robot.hear /(.*)@all(.*)/i, (res) ->
    """@all command"""
    text = res.match[0]
    users = robot.brain.users()

    if text.length < users.length
      text = "Please check the GroupMe, everyone."

    message =
      'text': text,
      'bot_id': bot_id,
      'attachments': [
        "loci": [],
        "type": "mentions",
        "user_ids": []
      ]

    i = 0
    for user, values of users
      if user in blacklist
        continue
      message.attachments[0].loci.push([i, i+1])
      message.attachments[0].user_ids.push(user)
      i += 1

    json = JSON.stringify(message)

    options =
      agent: false
      host: "api.groupme.com"
      path: "/v3/bots/post"
      port: 443
      method: "POST"
      headers:
        'Content-Length': json.length
        'Content-Type': 'application/json'
        'X-Access-Token': token

    req = https.request options, (response) ->
      data = ''
      response.on 'data', (chunk) -> data += chunk
      response.on 'end', ->
        console.log "[GROUPME RESPONSE] #{response.statusCode} #{data}"
    req.end(json)
{% endhighlight %}

----

## How to install groupme-at-all

Installing this is easy, but there's a few steps...


### Create a GroupMe Bot

GroupMe has native bot integration - they're kind of just an API token for your scripts to use, but that's all Hubot needs.

1. Navigate to [the GroupMe dev site](https://dev.groupme.com/) and log in with your GroupMe account
2. Click [create a new bot](https://dev.groupme.com/bots/new)
3. Choose the group your bot will live in
4. Name your bot (something like "All" will do)
5. Provide a callback URL (doesn't really matter for us, but has to be unique)
6. Provide a URL for an image for your bot to use (my favorite is All brand laundry detergent)
7. Click submit

Now you'll be lead to a page with your GroupMe bot's ID, ROOM_ID, and TOKEN. Copy these guys into a note, you'll need them again in a moment.


### Setup Hubot

Follow the instructions at [Hubot Getting Started](https://hubot.github.com/docs/) to install and wrap your head around Hubot. Just remember to use the adapter 'groupme'.

It's easy, so just get the general idea after you install it.


### Setup @all

Now you're ready for the fun stuff! I've already written the code for you, so all you need to do is...

1. Fork [my groupme-at-all repository](https://github.com/hawkins/groupme-at-all) to your own GitHub account
2. Log in (or create an account) to Heroku
3. [Create a new app](https://dashboard.heroku.com/new?org=personal-apps) on Heroku
4. Choose to deploy from your GitHub and select the repo
5. Configure environment variables (see below)


### Configure Environment Variables

Hubot is centered around environment variables for accessing sensitive information.

1. Load your app's settings and click "Reveal Config Vars"

2. Add the config variables and the appropriate values from your GroupMe Bot you made earlier:

    ```HUBOT_GROUPME_BOT_ID```

    ```HUBOT_GROUPME_ROOM_ID```

    ```HUBOT_GROUPME_TOKEN```


### Test Your Bot

At this point, you should be good to go!

To start the bot, start your Heroku app (or run  `./bin/hubot -a groupme` from your repo's root directory if you're not using Heroku).

Give it a moment to start up, and then use your regular GroupMe account (phone, desktop, etc) to say "Testing @all!" in your group. You should see your bot reply "Testing @all" in **bold text** since it tagged everyone in your group!


### Success!

Hooray!! You can finally tell *EVERYONE* about Free Chips & Queso day at Moe's!

Your bot's good to go now, but there's some optional configuration you may prefer to do still, such as keep your bot awake.


### [Optional] Further Config

Here's what else the bot can do:

- Set up a ping bot to keep your Heroku instance alive
- Handle a blacklist to not mention specific users by ID


#### Begone, sleep!

Speaking of writing blog posts at 2am... your bot would love to be an insomniac. Otherwise, he'll fall asleep *after only an hour* only to be awoken manually later. So, if you're using Heroku, you've got a few options...

1. Pay Heroku for a better plan. If you plan to do some serious work here, I'd suggest this. If it's just for your Sunday Brunch club, maybe not.
2. Or set up a ping site like [Pingdom](https://www.pingdom.com/) or [Uptime Robot](http://uptimerobot.com/) to hit your Heroku App's URL periodically. This is the easiest option if you don't want to code anything.
3. Or set up [heroku-keep-alive](https://github.com/hubot-scripts/hubot-heroku-keepalive). I've had some issues with this one, but some people like it!
4. Or finally make a simple `setInterval` in your app. Something as easy as `var http = require("http"); setInterval(function() { http.get("http://<your app name>.herokuapp.com");}, 300000);` to ping your Heroku app every 5 minutes will do.

Remember, if you're on a free Heroku plan, you're limited to 550 free hours, or 1000 if you verify a credit card. If you host this bad boy on your own servers, then your bot already should be a fully-functioning insomniac. Congrats!


#### Blacklist

Groupme-at-all uses a redis server controlled by Hubot to keep a persistent blacklist. This can be a tricky to get set up, so I'll leave this mostly as an excercise for you to understand.

In a nutshell tho, here's what you'll do...

1. Create a redis server
2. Configure hubot to use this server
3. Say "blacklist @so-and-so" to blacklist "so-and-so" in GroupMe
4. Cry that people don't want to be notified about free food trucks outside the office

But, you don't exactly *need* a redis server. The only issue is, that without it, your blacklist will reset *every time your bot sleeps.* That's pretty useless, but if your bot never sleeps then spend this time writing your own post on how computers are everything a college student ever dreamed of being in finals week.
