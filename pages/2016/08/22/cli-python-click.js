import React from 'react'
import ReactMarkdown from 'react-markdown'

export default () => {
  return (
    <ReactMarkdown source={`Python has always been easy to make command line applications in. Since most \*nix systems have some version of it installed, it's a good choice for quick CLI apps.

I'll demonstrate how to do make command line apps in Python by writing a quick WiFi control program for my Ubuntu 14.04 setup.

### Vanilla Python

Vanilla Python is what I'll call Python without any major libraries that would change the overall structure of the code in this scenario. With vanilla Python, we can create command line apps fairly easily.

We'll start with this overall setup:

\`\`\`Python
#!/usr/bin/python
import os
import sys

if __name__ == "__main__":
    """Script execution begins here"""
    pass
\`\`\`

Let's take a look at what we've got here first:

- Line 1 is a "shebang", which instructs the shell on how to execute the script. Since my Python is installed at \`/usr/bin/python\`, the shell will grab Python to execute this file if I just run \`./script.py\`. You could similarly run \`python script.py\`, but we won't worry about this for now.
- The next few lines are importing modules we'll use to handle the command line. OS allows us to run commands, and SYS allows us to read arguments passed to our program.
- The Script Execution section is what code will run if the program is run normally. Think of it as our 'main' function.

Next let's look at how we connect to WiFi in the first place.

I use nmcli to handle this on Ubuntu 14.04, whose commands look like this: \`nmcli d disconnect iface <INTERFACE>\` and \`nmcli d wifi connect <SSID> password <PASSWORD> iface <INTERFACE>\`. We'll make our python script handle these for us.

\`\`\`Python
def connect(ssid, pw, iface='wlan0'):
	"""Connect to a given network"""
	print('Connecting to %s' % ssid)
	os.system('nmcli d wifi connect "%s" password %s iface %s' % (ssid, pw, iface))

def disconnect(iface):
	"""Disconnect from a given interface"""
	print('Disconnecting interface %s' % iface)
	os.system('nmcli d disconnect iface %s' % iface)
\`\`\`

Great - now we can call \`connect("OurWiFi", "password")\` to connect, and \`disconnect(interface_name)\` to disconnect.

Now how can we make our program listen to instructions to call these commands? Let's check that out under the Script Execution portion.

Let's mock how we want to interact with this. Since we're using sys to see arguments, we can be simple and behave like \`python script.py connect OurWifi OurPassword OurInterface\`. Not the most robust design, but we'll go with it.

\`\`\`Python
if __name__ == "__main__":
    """Script execution begins here"""

    # If we want to connect
    if sys.argv[1] == 'connect':
        # If we passed an interface
        if len(sys.argv) > 4:
            connect(sys.argv[2], sys.argv[3], sys.argv[4])
        else:
            connect(sys.argv[2], sys.argv[3])

    # If we instead want to disconnect
    elif sys.argv[1] == 'disconnect':
        disconnect(sys.argv[2])

    # If the command is not recognized, print help
    else:
        print('Invalid command %s' % sys.argv[1])
\`\`\`

So what's this? We've got our pattern built! All we do here is look at the second argument for our command (\`sys.argv[1]\`), then decide how to handle that. We've already made our connect and disconnect functions, so that's pretty easy. Let's review the whole code once more

#### Finished Vanilla Python Product

\`\`\`Python
#!/usr/bin/python
import os
import sys

def connect(ssid, pw, iface='wlan0'):
    """Connect to a given network"""
    print('Connecting to %s' % ssid)
    os.system('nmcli d wifi connect "%s" password %s iface %s' % (ssid, pw, iface))

def disconnect(iface):
    """Disconnect from a given interface"""
    print('Disconnecting interface %s' % iface)
    os.system('nmcli d disconnect iface %s' % iface)

if __name__ == "__main__":
    """Script execution begins here"""

    # If we want to connect
    if sys.argv[1] == 'connect':
        # If we passed an interface
        if len(sys.argv) > 4:
            connect(sys.argv[2], sys.argv[3], sys.argv[4])
        else:
            connect(sys.argv[2], sys.argv[3])

    # If we instead want to disconnect
    elif sys.argv[1] == 'disconnect':
        disconnect(sys.argv[2])

    # If the command is not recognized, print help
    else:
        print('Invalid command %s' % sys.argv[1])

\`\`\`

Let's check it out in action:

\`\`\`shell
$ python script.py connect OurWifi password
Connecting to OurWifi

$ python script.py disconnect wlan0
Disconnecting interface wlan0

$ python script.py make me a sandwich
Invalid command make
\`\`\`

Pretty schwifty!

So we can already see Python is a good fit for CLI. But can we further simplify this? Sure! Let's check out the Python library called "Click".

### Click

Click, the Command Line Interface Creation Kit, is a library we can use to greatly simplify the code by using decorators to alter and arrange functions. You can check it out on the web [here](http://click.pocoo.org/5/), but for now let's get started by running \`pip install click\` from the command line.

For a basic app like this, there are a number of ways Click can handle it. My personal favorite structure goes something like this:

- Click CLI Group
  - Click Command 1
  - Click Command 2
- Main calls CLI Group Function

I'm really not a fan of using \`sys.argv\`, so let's kick that bucket first. Replace \`import sys\` with \`import click\`. This is great, too, because Click will handle arguments from command line and pass them appropriately as function arguments!

Now, let's make a new interface and Click group to hold our commands.

\`\`\`Python
@click.group()
def cli():
    pass
\`\`\`

This is our Group, which will hold commands.

So how do we make it handle commands? Let's look at this with disconnect first, since it's simpler.

Disconnect has 1 required argument and 0 optional arguments, so its structure in Click looks like this:

\`\`\`Python
@cli.command()         # Add this command to cli group
@argument('iface')     # Require 1 argument named 'iface'
def disconnect(iface):
\`\`\`

Click also provides \`click.echo()\` as a replacement for console logging, so let's swap that in for \`print\`. The function otherwise will be unchanged:

\`\`\`Python
@cli.command()         # Add this command to cli group
@argument('iface')     # Require 1 argument named 'iface'
def disconnect(iface):
    """Disconnect from a given interface"""
    click.echo('Disconnecting interface %s' % iface)
    os.system('nmcli d disconnect iface %s' % iface)
\`\`\`

So how about for connect? It has 2 required arguments and 1 optional argument, but how do we make optional arguments with Click?

Turns out, it's as simple as \`click.option('--flag', default='value', help='Description')\`, so let's add the decorators now:

\`\`\`Python
@cli.command()
@click.argument('ssid')
@click.argument('pw')
@click.option('--iface', default='wlan0', help='Network interface to use')
def connect(ssid, pw, iface):
    """Connect to a given network"""
    click.echo('Connecting to %s' % ssid)
    os.system('nmcli d wifi connect "%s" password %s iface %s' % (ssid, pw, iface))
\`\`\`

Now let's tie it all together, by making our script execution block simply call the \`cli\` function:

\`\`\`Python
if __name__ == "__main__":
    cli()
\`\`\`

We'll review this now, this time comparing to vanilla.

#### Finished Click Product

\`\`\`Python
#!/usr/bin/python
import os
import click

@click.group()
def cli():
    """The CLI for PyFi"""
    pass

@cli.command()
@click.argument('ssid')
@click.argument('pw')
@click.option('--iface', default='wlan0', help='Network interface to use.')
def connect(ssid, pw, iface):
    """Connect to a given network"""
    click.echo('Connecting to %s' % ssid)
    os.system('nmcli d wifi connect "%s" password %s iface %s' % (ssid, pw, iface))

@cli.command()
@click.argument('iface')
def disconnect(iface):
    """Disconnect from a given interface"""
    click.echo('Disconnecting interface %s' % iface)
    os.system('nmcli d disconnect iface %s' % iface)

if __name__ == "__main__":
    cli()
\`\`\`

What's interesting to note here, is it's actually a hair longer than vanilla. Vanilla came out at 18 lines of code, and Click at 20. The benefit here tho, is that it's much much easier to read and understand, and the bulk of the operation (picking a command) is handled by Click instead, so maintaining this code will be much easier. Additionally, Click gives us a nice help interface:

\`\`\`Shell
$ click.py
Usage: clickPyFi.py [OPTIONS] COMMAND [ARGS]...

  The CLI for PyFi

Options:
  --help  Show this message and exit.

Commands:
  connect     Connect to a given network
  disconnect  Disconnect from a given interface

$ python click.py connect --help
Usage: clickPyFi.py connect [OPTIONS] SSID PW

  Connect to a given network

Options:
  --iface TEXT  Network interface to use.
  --help        Show this message and exit.
\`\`\`

Had we wanted to implement that in Vanilla, our code would have been much longer.

So now you know how to write command line apps in Python, and how to do so easily and quickly with Click. You can check out other similar libraries like Click [here](http://docs.python-guide.org/en/latest/scenarios/cli/), but rest assured I'll compare some of them in this same setting in the future.

Thanks for reading, and be sure to share this post with your friends if you thought it was helpful!`} />
  )
}
