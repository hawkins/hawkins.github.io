---
layout:     post
title:      Benchmarking String Formatting in Python
date:       2016-10-22
summary:    Performance and Syntax - Or Why I'm Excited for Python 3.6
categories: python
---

The Zen of Python is pretty clear on having multiple ways to do something. In fact, it has this to say about it:

> There should be one-- and preferably only one --obvious way to do it.

I love this about Python - it leaves you with enough power to make something happen in multiple ways, but it has one *obvious* or *idiomatic* (dare I say *Pythonic*?) way to do it.

That is... until you look at string formatting.

String formatting is one of those things where you need to do it alot, so you'll learn it one way. C has `printf()` for this. And it works great.

Most languages have some means of string formatting similar to `printf()`. Some go the extra mile and add my favorite style of String Interpolation, where you can evaluate expressions directly inside of the string (and not simply sprinkle them in later, as you do with `printf()`). In Ruby, this is done like so:

{% highlight ruby %}
op = "interpolation"
"String #{op}"
{% endhighlight %}

This is my favorite syntax for string formatting, and I desperately wish Python had something similar. Thankfully, [we're getting this in Python 3.6 with *f-strings* from PEP 498](https://www.python.org/dev/peps/pep-0498/)!

## f-strings

f-strings are the *new* new style of string formatting presented in PEP 498. They're similar to Ruby's string interpolation shown above, and basically provide this syntax:

{% highlight python %}
f"Hi, my name is {some_variable}, and I love programming languages."
{% endhighlight %}

As you can see, they're very easy to use - simply slap an `f` in front of the string literal and type your expressions inside of `{}`.

There's also some powerful formatting options included with f-string, that may come at a cost to performance. I'll let you read about these options yourself in the PEP linked above, but for now - let's talk about why I want 3.6 here yesterday.


## Current String Formatting Options

Why do I want Python 3.6 so badly? Because I feel we're sorely lacking in the syntactical sugar department for current string interpolation options. Python is a very terse language - that is, it avoids excessive verbosity (unlike my blog). This, to me, feels very *un*-Pythonic.

So let's take a look at the current options for this in Python and compare their drawbacks, as well as benchmark them to see why we might consider using each of them.


### %-formatting

[View the docs](https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting)

Python has what the gurus on stack overflow call "old-style string formatting" with the **%** operator. Its syntax goes a bit like this:

{% highlight python %}
name = "Josh"
print("Hi, my name is %, and I love programming languages." % name)
{% endhighlight %}

If you wanted to pass in more than one value, the syntax changes a bit:

{% highlight python %}
name = "Josh"
thing = "programming languages"
print("Hi, my name is %, and I love %." % (name, thing))
{% endhighlight %}

Notice the addition of the tuple to hold all arguments. This can make modifying code a bit tedious when this change occurs, but the minor inconsistency is not the most of its issues.

The biggest pitfall to this operator is that it only supports a few types - only ints, strs, and doubles can be formatted. All other types must be converted to one of these or are simply not supported. So you see it's not particularly powerful, but it is fast.

However, this operator also has some finnicky behavior when a tuple is passed in. For instance, if `name` was a tuple, the snippet below would present this error:

{% highlight python %}
tup = ('some', 'data')
print("This is a tuple %" % tup)
TypeError: not all arguments converted during string formatting
{% endhighlight %}

So its simple syntax for a single argument is nifty, but its inconsitencies are also frustrating. We'll see how it performs compared to the other options at the end of the article.


### str.format

[View the docs](https://docs.python.org/3/library/string.html#formatstrings)

Python also has what the gurus might call "new-style string formatting" with the `str.format()` function. For examp

str.format alleviates the inconsistency between supplying only one versus more arguments. Additionally, to quote PEP 498:

> In particular, it uses normal function call syntax (and therefor supports multiple parameters) and it is extensible through the \_\_format\_\_() method on the object being converted to a string.

Here's an example of `str.format()` using keys to map arguments to their positions in the string:

{% highlight python %}
print("This function maps {a} supplied to {c} to {b}.".format(a="arguments", b="keys" c="positions"))
{% endhighlight %}

As you can already see, the biggest issue of `str.format()` is its verbosity. This is in contrast to most of Python being so terse. This can cause longer string formatting operations to seperate the arguments from its location, making the code harder to read. Even in its simplest structure, it takes a good deal of code to format the string, yet it still unfortunately separates the arguments from their positions:

{% highlight python %}
print("This function maps {} supplied to {} to {}.".format("arguments", "keys" "positions"))
{% endhighlight %}

So `str.format()` is more powerful than the % operator, but it is significantly more cumbersome to use. This leaves one last option for string formatting prior to Python 3.6:


### str.Template

[View the docs](https://docs.python.org/3/library/string.html#template-strings)

`str.Template()` takes a different approach. Let's take a peek first:

{% highlight python %}
t = string.Template("Hi, my name is $name and I like $thing.")
print(t.substitute(name="Josh", thing="programming languages"))
{% endhighlight %}

As you can see, this will suffer from some of the same issue that `str.format()` does, with separating the arguments from their string and its verbosity.

However, you're probably already guessing this is useful for repeated formatting operations, much like logging. Hang on just a second tho - let's go ahead and compare the three operations in terms of performance so we can nip this thought in the bud:


## Benchmarking

We'll compare these operations by using `timeit` to perform their interpolations in 3 trials of 1000000 operations each. If you're curious, here's the script I wrote to test performance:

{% highlight python %}
from __future__ import print_function
import timeit
import string

# How many operations to time
TRIAL_COUNT = 100000

# Define templates
benchmark = string.Template('This is an $var of string $proc for $purpose')
output = string.Template('str.Template():\t$a\t$b\t$c')

# Define test functions
def test_percent():
    return 'This is an %s of string %s for %s' % ('example', 'interpolation', 'benchmarking')

def test_format():
    return 'This is an {var} of string {proc} for {purpose}'.format(var='example', proc='interpolation', purpose='benchmarking')

def test_template():
    return benchmark.substitute(var='example', proc='interpolation', purpose='benchmarking')

# Define timer objects
percent_timer  = timeit.Timer(test_percent)
format_timer   = timeit.Timer(test_format)
template_timer = timeit.Timer(test_template)

# Perform trials
percent_times  = percent_timer.repeat()
format_times   = format_timer.repeat()
template_times = template_timer.repeat()

# Print results
print('Type\t\tTrial 1\t\tTrial 2\t\tTrial 3')
print('%%:\t\t%.12f\t%.12f\t%.12f' % (percent_times[0], percent_times[1], percent_times[2]))
print('str.format():\t{}\t{}\t{}'.format(format_times[0], format_times[1], format_times[2]))
print(output.substitute(a=template_times[0], b=template_times[1], c=template_times[2]))
{% endhighlight %}


### Results

And the output was as follows (time in seconds):

| Type | Trial 1 | Trial 2 | Trial 3 |
|:-:|:-:|:-:|:-:|
| % | 0.255867058399 | 0.256962734151 | 0.275552650658 |
| str.format() | 0.683378964547 | 0.67034378765 | 0.660407515312 |
| str.Template() | 4.0731706778 | 3.9941664409 | 3.90372740406 |


As you can see, % was the fastest option by far. `str.format()` was roughly 2.5 times slower than %. And `str.Template()` was vastly slower than either, at roughly 16 times slower than %.

*For what it's worth, this experiment was conducted using Python 2.7 on Windows 10 with an i5-4690K @ 3.50 GHz.*


### Conclusions

% may be the fastest operation, but it is also the least powerful. It is probably the best tool for the job if you will only use strings, integers, and doubles.

Should you need formatting capabilities and types supported, `str.format()` is still a good choice.

Now you might wonder where `str.Template()` is useful then. If it's slower than we first thought, and extremely so, why use it?

Well, it boils down to a time before `str.format()` and when % just didn't cut it. When Python programmers didn't like % syntax, they devised a more readable solution - `str.Template()` (described in [PEP 292](https://www.python.org/dev/peps/pep-0292/)).

It still exists today in later versions of Python, even though it may be only for the sake of backwards compatibility.

So if performance is not an issue in your script and you value readability above all else, you may enjoy using `str.Template()`. But if you're formatting alot of strings, sticking to `str.format()` or % may be your best bet.

---

I'm itching to get my hands on Python 3.6 - I *love* the new syntax for f-strings, and can't wait to benchmark it against the older styles!

*(Is this how the programmers waiting for `str.Template()` felt, potentially unaware of the performance costs awaiting them?)*

---

If you enjoyed this article, please share it below! If you have your own reasons for using one style over another *please drop me a line or mention me on Twitter!* I'd love to hear your reasons for one or the other.
