import Highlight from "react-highlight";
import Post from "../../layouts/post";

export default () =>
  <Post
    title="Using Hubot to Mention Everyone in GroupMe"
    date="2016/10/11"
    summary="How to add the @all feature to your GroupMe group"
  >
    <p>
      If you're like me, you love <code>`@everyone`</code> in Slack, and your{" "}
      <a href="https://groupme.com/">GroupMe</a> group <i>desperately</i> needs
      that feature.
    </p>

    <p>
      Maybe there are free cookies on the Quad on campus; you've gotta tell your
      friends! Why can't you just say "@all of you get out to the quad for free
      cookies!"?!
    </p>

    <p>
      After following along with this blog, <i>you can!</i>
    </p>

    <h2>How it works</h2>

    <p>
      We'll be writing a <a href="https://hubot.github.com/">Hubot</a> script
      using the{" "}
      <a href="https://github.com/AdamEdgett/hubot-groupme">
        hubot-groupme
      </a>{" "}
      adapter to deploy on Heroku that will listen for messages with "@all" in
      them in a given GroupMe room. We'll deploy our bot for free* on{" "}
      <a href="https://heroku.com">Heroku</a>.
    </p>

    <blockquote>
      <i>
        Free for the first 550 (or 1000 if you verify a credit card) hours per
        month
      </i>
    </blockquote>

    <p>
      Then, we can tag everyone in the group (minus a blacklist) by saying
      anything with "@all" in the message.
    </p>

    <blockquote>
      <b>Note</b>: You can host the bot on your own server instead, but I'm
      writing this for anyone to be able to handle. If you know how to host bots
      / scripts on your own machine, you shouldn't have any trouble translating
      the few Heroku-specific instructions. Moving on...
    </blockquote>

    <h4>How it works (technical)</h4>

    <p>
      If you're the type of guy that throws the manuals away when you buy a
      product, scroll past this section.
    </p>

    <p>
      Hubot uses regular expressions to match messages in a chat room.
      Groupme-at-all listens for <code>`/.*@all.*/i`</code> to act. It will
      construct a <code>`message`</code> to send in an HTTP POST request to the
      GroupMe v3 API.
    </p>

    <blockquote>
      <b>Note</b>:{" "}
      <a href="https://dev.groupme.com/docs/v3">
        GroupMe's API
      </a>{" "}
      is not well-documented. Multiple features are completely or partially
      ignored. In fact, <b>mentions are not documented at all!</b> So tagging,
      as far as I can determine, is handled similarly to an image or emoji
      attachment, which maps a User ID to a string of characters, which appear
      as bold text to users.
    </blockquote>

    <p>
      So after receiving the command, the bot maps every user's ID to an
      individual character in the message for a tag, since some GroupMe versions
      seem to require a tag of <code>`length >= 1`</code>.
    </p>

    <p>
      Next, the bot stringify's the <code>`message`</code> object and sends the
      HTTP POST request, logging the results.
    </p>

    <p>
      Check out the actual code used to do all this:
    </p>

    <Highlight className="coffeescript">
      {`robot.hear /(.*)@all(.*)/i, (res) ->
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
  req.end(json)`}
    </Highlight>

    <h2>How to install groupme-at-all</h2>

    <p>
      Installing this is easy, but there's a few steps...
    </p>

    <h3>Create a GroupMe Bot</h3>

    <p>
      GroupMe has native bot integration - they're kind of just an API token for
      your scripts to use, but that's all Hubot needs.
    </p>

    <ol>
      <li>
        Navigate to{" "}
        <a href="https://dev.groupme.com/">
          the GroupMe dev site
        </a>{" "}
        and log in with your GroupMe account
      </li>
      <li>
        Click <a href="https://dev.groupme.com/bots/new">create a new bot</a>
      </li>
      <li>
        Choose the group your bot will live in
      </li>
      <li>
        Name your bot (something like "All" will do)
      </li>
      <li>
        Provide a callback URL (doesn't really matter for us, but has to be
        unique)
      </li>
      <li>
        Provide a URL for an image for your bot to use (my favorite is All brand
        laundry detergent)
      </li>
      <li>
        Click submit
      </li>
    </ol>

    <p>
      Now you'll be lead to a page with your GroupMe bot's ID, ROOM_ID, and
      TOKEN. Copy these guys into a note, you'll need them again in a moment.
    </p>

    <h3>Setup Hubot</h3>

    <p>
      Follow the instructions at{" "}
      <a href="https://hubot.github.com/docs/">Hubot Getting Started</a> to
      install and wrap your head around Hubot. Just remember to use the adapter{
        " "
      }
      <code>`groupme`</code>.
    </p>

    <p>
      It's easy, so just get the general idea after you install it.
    </p>

    <h3>Setup @all</h3>

    <p>
      Now you're ready for the fun stuff! I've already written the code for you,
      so all you need to do is...
    </p>

    <ol>
      <li>
        Fork my{" "}
        <a href="https://github.com/hawkins/groupme-at-all">
          groupme-at-all repository
        </a>{" "}
        to your own GitHub account. (Bonus points if you "Star" it ;) )
      </li>
      <li>
        Log in (or create an account) to Heroku
      </li>
      <li>
        <a href="https://dashboard.heroku.com/new?org=personal-apps">
          Create a new app
        </a>{" "}
        on Heroku
      </li>
      <li>
        Choose to deploy from your GitHub and select the repo
      </li>
      <li>
        Configure environment variables (see below)
      </li>
    </ol>

    <h3>Configure Environment Variables</h3>

    <p>
      Hubot is centered around environment variables for accessing sensitive
      information.
    </p>

    <ol>
      <li>
        Load your app's settings and click "Reveal Config Vars"
      </li>
      <li>
        Add the config variables and the appropriate values from your GroupMe
        Bot you made earlier:

        <code>`HUBOT_GROUPME_BOT_ID`</code>

        <code>`HUBOT_GROUPME_ROOM_ID`</code>

        <code>`HUBOT_GROUPME_TOKEN`</code>
      </li>
    </ol>

    <h3>Test Your Bot</h3>

    <p>
      At this point, you should be good to go!
    </p>

    <p>
      To start the bot, start your Heroku app (or run{" "}
      <code>`./bin/hubot -a groupme`</code> from your repo's root directory if
      you're not using Heroku).
    </p>

    <p>
      Give it a moment to start up, and then use your regular GroupMe account
      (phone, desktop, etc) to say "Testing @all!" in your group. You should see
      your bot reply "Testing @all" in <b>bold text</b> since it tagged everyone
      in your group!
    </p>

    <h3>Success!</h3>

    <p>
      Hooray!! You can finally tell <i>EVERYONE</i> about Free Chips & Queso day
      at Moe's!
    </p>

    <p>
      Your bot's good to go now, but there's some optional configuration you may
      prefer to do still, such as keep your bot awake.
    </p>

    <h3>[Optional] Further Config</h3>

    <p>
      Here's what else the bot can do:
    </p>

    <ul>
      <li>
        Set up a ping bot to keep your Heroku instance alive
      </li>
      <li>
        Handle a blacklist to not mention specific users by ID
      </li>
    </ul>

    <h4>Begone, sleep!</h4>

    <p>
      Speaking of writing blog posts at 2am... your bot would love to be an
      insomniac. Otherwise, he'll fall asleep <i>after only an hour</i> only to
      be awoken manually later. So, if you're using Heroku, you've got a few
      options...
    </p>

    <ol>
      <li>
        Pay Heroku for a better plan. If you plan to do some serious work here,
        I'd suggest this. If it's just for your Sunday Brunch club, maybe not.
      </li>
      <li>
        Or set up a ping site like{" "}
        <a href="https://www.pingdom.com/">Pingdom</a> or{" "}
        <a href="http://uptimerobot.com/">Uptime Robot</a> to hit your Heroku
        App's URL periodically. This is the easiest option if you don't want to
        code anything.
      </li>
      <li>
        Or set up{" "}
        <a href="https://github.com/hubot-scripts/hubot-heroku-keepalive">
          heroku-keep-alive
        </a>. I've had some issues with this one, but some people like it!
      </li>
      <li>
        Or finally make a simple <code>`setInterval`</code> in your app.
        Something as easy as{" "}
        <code>
          `var http = require("http"); setInterval(() =>
          (http.get("http://your-app-name-goes-here.herokuapp.com"), 300000));`
        </code>{" "}
        to ping your Heroku app every 5 minutes will do.
      </li>
    </ol>

    <p>
      Remember, if you're on a free Heroku plan, you're limited to 550 free
      hours, or 1000 if you verify a credit card. If you host this bad boy on
      your own servers, then your bot already should be a fully-functioning
      insomniac. Congrats!
    </p>

    <h4>Blacklist</h4>

    <p>
      Groupme-at-all uses a redis server controlled by Hubot to keep a
      persistent blacklist. This can be a tricky to get set up, so I'll leave
      this mostly as an excercise for you to understand.
    </p>

    <p>
      In a nutshell tho, here's what you'll do...
    </p>

    <ol>
      <li>
        Create a redis server
      </li>
      <li>
        Configure hubot to use this server
      </li>
      <li>
        Say "blacklist @so-and-so" to blacklist "so-and-so" in GroupMe
      </li>
      <li>
        Cry that people don't want to be notified about free food trucks outside
        the office
      </li>
    </ol>

    <p>
      But, you don't exactly *need* a redis server. The only issue is, that
      without it, your blacklist will reset <i>every time your bot sleeps.</i>{" "}
      That's pretty useless, but if your bot never sleeps then spend this time
      writing your own post on how computers are everything a college student
      ever dreamed of being in finals week.
    </p>
  </Post>;
