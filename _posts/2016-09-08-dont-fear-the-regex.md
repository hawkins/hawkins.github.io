---
layout:     post
title:      (Don't Fear) The Regex
date:       2016-09-08
summary:    What are regular expressions, and why should you care?
categories: compsci
---

Have you ever used strings before? That's right, those "arrays of characters" we all know and love? Unless you code only in C, I'd bet you have - and maybe even a lot.

But what about using a lot of strings? Or using strings that your program didn't generate? Maybe you're reading an email, parsing command line arguments, or reading human instructions, and you just need a more structured way to handle this.

Sure, you could iterate over each word or element in the strings. And you'll probably understand the code you used to do so. But for large applications, that can become very overwhelming - and *very* expensive to maintain.


### Enter: The Regular Expression

Without getting too deep into computer science, let's define a Regular Expression real quick.

* Regular expressions are the grammars describing a Regular language
* Regular languages are a form of formal language that can be described by a finite state machine

There are a number of [better explanations on regular languages](http://stackoverflow.com/a/6718286/2192313) out there, so if you're not happy yet, just google for a couple minutes.


### Enter: The Regex

If it hasn't already, here's where it gets funky... I draw a distinction between what programming languages call "regular expressions" and what computer science calls a regular expression.

* Computer Science Regular Expression - a grammar to describe a *regular* language
* Programming Language Regular Expression - a grammar to describe, at most, a *context-sensitive* language

Context-sensitive languages are a good deal more complex and useful, so we'll call a programming language regular expression "regex" now to solidify the distinction that its languages *are not regular*.


### Learning to Write Regexs

Regexs are described between //'s and match strings if they fit the 'pattern' defined between the two //'s. For instance, `/Hi/` matches "Hi", so we can check a string to see if it is (or has, more on that later) "Hi" in the string using a regular expression.

We match characters in a string with regular expressions by typing them normally. For instance, `/Hello World/` will match the string "Hello World".

We could simplify this to match *any* word by adding a little regex magic: `\w` matches any "word" made of only letters: `\w` will match any one word (if only letters).

We can similarly match numbers with `\d`.


#### Example 1

Great, so we can perform string equality or see if strings fit some simple pattern now. So what? Can they be more useful?

You bet! Let's say we wrote an IRC chat bot that listens for someone to say "Josh". Our bot basically scans each message someone says in the channel until we get a match. Then, the bot will respond "Woah, I hope you aren't talking bad about my pal Josh!" Because Josh's only friends are robots.

...

Our bot will use the pattern `/Josh/` to match the strings.

Suddenly, some named Eli stumbles along: "Eli: Josh, do you really need that much caffeine?"

Our bot will kick in gear and scan the message with `/Josh/` and find one match! So he replies, and Eli is sufficiently creeped out. Mission accomplished!

Or was it?

What if our bot was more intelligent? What if the bot addressed whoever spoke by name? Something like "Woah, I hope you aren't bad-mouthing my buddy Josh, Eli."


### Quatntifiers (Repeating Characters)

#### 0 or Many

We can do that... but we've got to learn a few things to get there. First off, **Quantifiers** (for Repeating characters).

We can use \* to match *0 or many* characters before it. For instance, `/a*/` matches "aaaaa" *BUT ALSO* "". That's right, it will match the *empty* string.

\* serves to match something optional, because the character it matches doesn't have to exist. But it can. And it can exist many, many times (theoretically infinitely many times). 

We can match "Josh" with `/Josh/`, but we could also match "JJJJJJJJJosh" and "osh" with `/J*osh/`.


#### 1 or Many

\+ can be used to match *1 or many* characters. It effectively works the same way as \* does, except the character existing is no longer optional. We have to have at least one of those characters to match now.

So, we can match "JJJJosh" and "Josh" with `/J+osh/` but not "osh". 

### Wildcards

Great, we can match a lot more interesting features now. Maybe someone screaming "Joooosh" if they're really mad at me...

But what if they're so mad that they slam their face on the keyboard? How do we match "afuhiudgosigs" if we don't know how pointy their nose is?

With **Wildcards**! 

Wildcards allow you to match *ANYTHING*. Their syntax is `.`. (Yes, just a period. Period.). You'll probably use this a lot, so don't confuse it for matching the end of a sentence.

We can use this to match "Joooafhuaisggsh" by combining our knowledge of repeating characters and wildcards in this regex: `/Jo+.*sh/`. To be clear, this will match 1 "J", 1 or more "o", 0 or many *wildcards*, and 1 "s" and 1 "h". Those five blocks lead us to what we call...


### Character Groups

**Character Groups** are the blocks of characters that appear in order in a string. When you use a `*` or `+`, you're actually matching many of the last *character group*, not just the last *character*.

This is useful to understand in its own right, but combined with repeating characters, can be very powerful. To do this, we can define our own character group by using parenthesis (that's these guys).

Let's say we want to repeat "Jos" but not "h". So "JosJosJosJosJosh" will match. We can do this with the regex `/(Jos)+h/` Easy, right?

But finally... back to our example, how can we get Eli's name in the IRC chat message he sent?

Character groups are also a means of remembering parts of the string. This way we can add parts of a string to variables in our programming code when we see a string that fits the pattern. 

To do this, typically you'll do something like `\1` to match the first specified group.

For instance, `/(.+) \1/` is a special one. Here we look at a group of random characters 1 or more times, have a space afterwards, and then repeat the *exact same characters* again. So this regex will match the string "abc abc" but *not* "abc def" even though "def" would match `(.*)` independently.

Remembering matches is very powerful, and it will probably boil down to the most useful feature of programming with regular expressions.


### Example 2

Whew... finally ready to continue with our IRC bot. Let's use what we learned to see who was talking smack.

If we want to capture the sender's name when they say "Josh", our regex can look like this: `/(\w+): .*Josh.*/` and we can save the match as a variable in our programming language for our reply. 

That's just 1 or more letters followed by ": ", a wildcard for 0 or many characters, the string Josh, and a wildcard for 0 or many characters.

> **Note**: `/.*word.*/` is a simple way to match a string containing "word" that may or may not have other things around it.

In Python, that regex might look like this:

{% highlight python %}
import re
pattern = re.compile(ur'(\w+): .*Josh.*')  # Our regex
string = u"Eli: Josh go move your laundry" # Our string

matches = re.match(pattern, string)        # Test the string

who = matches.group(1)                     # Get who said the message
print(who)                                 # "Eli"
{% endhighlight %}

Notice we used `.group(1)` just like we'd use `\1` in the regex pattern. Nothing new here, aside from using the regex in Python.


### Beginning and End

Until now, we've actually allowed matching strings to occur in any part of the string. For intsance, `/(Jos)+h/` will match any string containing the Jos-repeating-h *anywhere* in the stringg.

What if we wanted the string begin with Jos-repeating-h? We can specify this with `/^(Jos)+h/`, where `^` matches the start of the string. 

Similarly, `$` can be used to match the end of the string.

So if we want our pattern to match strings containg Jos-repeating-h from beginning to end, we can alter it to look like this: `/^(Jos)+h$/`.


### Character Options

But maybe you're writing a regex for a sandwich order. You don't know if the customer wants white or wheat bread, but you'll accept either. How do you add choice in a regex? With **Character Options**!

Character Options allow you to specify a *set* of possible values for a group. Syntax for this is `(white|wheat)` in the context of our sandwhich, where either "white" or "wheat" would be accepted.

You could also use the `[brackets]` to specify options in another way. Each character is an option here, instead of the total string of characters. I.e., "b", "r", "s", "t", e", "k", "c", "r" would each be accepted individually. But this could be handy for more complicated groups, as you can substitute a character for a more complicated expression inside a Character Group here.


### Modifiers

We talk about regex's with `/slash marks/`, right? We know what goes in the middle, but what goes on the sides?

Plot twist, nothing.

*... goes on the left.* The right side, however, has some very, very useful stuff. It's almost a shame we ignored it for so long!

**Modifiers** modify the rules with which the regular expressions are applied.

Here's a list of the most common modifiers (from [Regex101.com](https://regex101.com/)):
|Modifier |Nickname|Description |
|:-:|:- |:- |
| g| global| All matches (don't return on first match)
| m| multi-line| Causes ^ and $ to match the begin/end of each line (not only begin/end of string)
| i| insensitive| Case insensitive match (ignores case of [a-zA-Z])
| x| extended| Spaces and text after a # in the pattern are ignored
| X| extra| A \ followed by a letter with no special meaning is faulted
| s| single line| Dot matches newline characters
| u| unicode| Pattern strings are treated as UTF-16. Also causes escape sequences to match unicode characters
| U| ungreedy| The match becomes lazy by default. Now a `?` following a quantifier makes it greedy
| A| anchored| Pattern is forced to ^
| J| duplicate|allow duplicate subpattern names


For instance, until now, all of our examples have been *case-sensitive*. That means, capitalizing or lower-casing any one character would make that string no longer match the pattern. We can make our patterns *case-**insensitive*** with the `i` modifier.

Maybe Eli was so mad at me that he spammed the chat with a Mix OF casE CHArACters. Never fear, `i` is here! We can match his "I hAate LiVing witH JOSH!!!" rage with `/i ha+te living with josh!+/i`. Now it's easier to read and more powerful and useful. Awesome!

I'll leave the rest of the modifiers for you to play with on your own, but I bet you'll find `igm` to be your most used in general.


### What's next?

Hopefully this article has shown you another useful way to interact with strings a little bit more intelligently. I've hardly even scratched the surface of regexs, but you already know how to use regular expressions for some minor tasks now.

There's an overwhelming number of symbols / tokens to use in your regexs. Typically you'll stumble on them from Stack Overflow searches, or you'll guess them from previous experience (\n is the new line character, for instance). You've more or less got what you need for now, but there's plenty still to learn.

You can get a full list of tokens and test your regexs extensively [here](https://regex101.com). I still use this website almost every time I write regexs, because the testing tool is remarkably helpful and powerful. It even generates code for you if you're not sure how to do it in your programming language yet.

If this was a cakewalk for you, check out [regex crossword puzzles](https://regexcrossword.com/). They'll really get you thinking with regex!
