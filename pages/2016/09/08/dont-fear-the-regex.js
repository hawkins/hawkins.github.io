import React from 'react'
import Highlight from 'react-highlight'
import Post from '../../../../layouts/post'

export default () => (
  <Post
    title="(Don't Fear) The Regex"
    date="2016/09/08"
    summary="What are regular expressions, and why should you care?">
    <p>
      Have you ever used strings before? That's right, those "arrays of characters" we all know and love? Unless you code only in C, I'd bet you have - and maybe even a lot.
    </p>
    <p>
      But what about using a lot of strings? Or using strings that your program didn't generate? Maybe you're reading an email, parsing command line arguments, or reading human instructions, and you just need a more structured way to handle this.
    </p>
    <p>
      Sure, you could iterate over each word or element in the strings. And you'll probably understand the code you used to do so. But for large applications, that can become very overwhelming - and <i>very</i> expensive to maintain.
    </p>

    <h3>Enter: The Regular Expression</h3>

    <p>
      Without getting too deep into computer science, let's define a Regular Expression real quick.
    </p>

    <ul>
      <li>
        Regular expressions are the grammars describing a Regular language
      </li>
      <li>
        Regular languages are a form of formal language that can be described by a finite state machine
      </li>
    </ul>

    <p>
      There are a number of <a href="http://stackoverflow.com/a/6718286/2192313">better explanations on regular languages</a> out there, so if you're not happy yet, just google for a couple minutes.
    </p>

    <h3>Enter: The Regex</h3>

    <p>
      If it hasn't already, here's where it gets funky... I draw a distinction between what programming languages call "regular expressions" and what computer science calls a regular expression.
    </p>

    <ul>
      <li>
        Computer Science Regular Expression - a grammar to describe a <i>regular</i> language
      </li>
      <li>
        Programming Language Regular Expression - a grammar to describe, at most, a <i>context-sensitive</i> language
      </li>
    </ul>

    <p>
      Context-sensitive languages are a good deal more complex and useful, so we'll call a programming language regular expression "regex" now to solidify the distinction that its languages <i>are not regular</i>.
    </p>

    <h3>Learning to Write Regexs</h3>

    <p>
      Regexs are described between <code>`//`</code>'s and match strings if they fit the 'pattern' defined between the two <code>`//`</code>'s. For instance, <code>`/Hi/`</code> matches "Hi", so we can check a string to see if it is (or has, more on that later) "Hi" in the string using a regular expression.
    </p>

    <p>
      We match characters in a string with regular expressions by typing them normally. For instance, <code>`/Hello World/`</code> will match the string "Hello World".
    </p>

    <p>
      We could simplify this to match <i>any</i> word by adding a little regex magic: <code>`\w`</code> matches any "word" made of only letters: <code>`\w`</code> will match any one word (if only letters).
    </p>

    <p>
      We can similarly match numbers with <code>`\d`</code>.
    </p>


    <h4>Example 1</h4>

    <p>
      Great, so we can perform string equality or see if strings fit some simple pattern now. So what? Can they be more useful?
    </p>

    <p>
      You bet! Let's say we wrote an IRC chat bot that listens for someone to say "Josh". Our bot basically scans each message someone says in the channel until we get a match. Then, the bot will respond "Woah, I hope you aren't talking bad about my pal Josh!" Because Josh's only friends are robots.
    </p>

    <p>
      ...
    </p>

    <p>
      Our bot will use the pattern <code>`/Josh/`</code> to match the strings.
    </p>

    <p>
      Suddenly, some named Eli stumbles along: "Eli: Josh, do you really need that much caffeine?"
    </p>

    <p>
      Our bot will kick in gear and scan the message with <code>`/Josh/`</code> and find one match! So he replies, and Eli is sufficiently creeped out. Mission accomplished!
    </p>

    <p>
      Or was it?
    </p>

    <p>
      What if our bot was more intelligent? What if the bot addressed whoever spoke by name? Something like "Woah, I hope you aren't bad-mouthing my buddy Josh, Eli."
    </p>

    <h3> Quatntifiers (Repeating Characters)</h3>

    <h4>0 or Many</h4>

    <p>
      We can do that... but we've got to learn a few things to get there. First off, <b>Quantifiers</b> (for Repeating characters).
    </p>

    <p>
      We can use <code>`*`</code> to match <i>0 or many</i> characters before it. For instance, <code>`/a*/`</code> matches "aaaaa" <i>BUT ALSO</i> "". That's right, it will match the <i>empty</i> string.
    </p>

    <p>
      <code>`*`</code> serves to match something optional, because the character it matches doesn't have to exist. But it can. And it can exist many, many times (theoretically infinitely many times).
    </p>

    <p>
      We can match "Josh" with <code>`/Josh/`</code>, but we could also match "JJJJJJJJJosh" and "osh" with <code>`/J*osh/`</code>.
    </p>

    <h4>1 or Many</h4>

    <p>
      <code>`+`</code> can be used to match <i>1 or many</i> characters. It effectively works the same way as <code>`*`</code> does, except the character existing is no longer optional. We have to have at least one of those characters to match now.
    </p>

    <p>
      So, we can match "JJJJosh" and "Josh" with <code>`/J+osh/`</code> but not "osh".
    </p>

    <h3>Wildcards</h3>

    <p>
      Great, we can match a lot more interesting features now. Maybe someone screaming "Joooosh" if they're really mad at me...
    </p>

    <p>
      But what if they're so mad that they slam their face on the keyboard? How do we match "afuhiudgosigs" if we don't know how pointy their nose is?
    </p>

    <p>
      With <b>Wildcards</b>!
    </p>

    <p>
      Wildcards allow you to match <i>ANYTHING</i>. Their syntax is <code>`.`</code>. (Yes, just a period. Period.). You'll probably use this a lot, so don't confuse it for matching the end of a sentence.
    </p>

    <p>
      We can use this to match "Joooafhuaisggsh" by combining our knowledge of repeating characters and wildcards in this regex: <code>`/Jo+.*sh/`</code>. To be clear, this will match 1 "J", 1 or more "o", 0 or many <i>wildcards</i>, and 1 "s" and 1 "h". Those five blocks lead us to what we call...
    </p>

    <h3>Character Groups</h3>

    <p>
      <b>Character Groups</b> are the blocks of characters that appear in order in a string. When you use a <code>`*`</code> or <code>`+`</code>, you're actually matching many of the last <i>character group</i>, not just the last <i>character</i>.
    </p>

    <p>
      This is useful to understand in its own right, but combined with repeating characters, can be very powerful. To do this, we can define our own character group by using parenthesis (that's these guys).
    </p>

    <p>
      Let's say we want to repeat "Jos" but not "h". So "JosJosJosJosJosh" will match. We can do this with the regex <code>`/(Jos)+h/`</code> Easy, right?
    </p>

    <p>
      But finally... back to our example, how can we get Eli's name in the IRC chat message he sent?
    </p>

    <p>
      Character groups are also a means of remembering parts of the string. This way we can add parts of a string to variables in our programming code when we see a string that fits the pattern.
    </p>

    <p>
      To do this, typically you'll do something like <code>`\1`</code> to match the first specified group.
    </p>

    <p>
      For instance, <code>`/(.+) \1/`</code> is a special one. Here we look at a group of random characters 1 or more times, have a space afterwards, and then repeat the <i>exact same characters</i> again. So this regex will match the string "abc abc" but <i>not</i> "abc def" even though "def" would match <code>`(.*)`</code> independently.
    </p>

    <p>
      Remembering matches is very powerful, and it will probably boil down to the most useful feature of programming with regular expressions.
    </p>

    <h3>Example 2</h3>

    <p>
      Whew... finally ready to continue with our IRC bot. Let's use what we learned to see who was talking smack.
    </p>

    <p>
      If we want to capture the sender's name when they say "Josh", our regex can look like this: <code>`/(\w+): .*Josh.*/`</code> and we can save the match as a variable in our programming language for our reply.
    </p>

    <p>
      That's just 1 or more letters followed by ": ", a wildcard for 0 or many characters, the string Josh, and a wildcard for 0 or many characters.
    </p>

    <blockquote>
      <b>Note</b>: <code>`/.*word.*/`</code> is a simple way to match a string containing "word" that may or may not have other things around it.
    </blockquote>

    <p>
      In Python, that regex might look like this:
    </p>

    <Highlight className="python">
{`
import re
pattern = re.compile(ur'(\\w+): .*Josh.*')  # Our regex
string = u"Eli: Josh go move your laundry" # Our string

matches = re.match(pattern, string)        # Test the string

who = matches.group(1)                     # Get who said the message
print(who)                                 # "Eli"
`}
    </Highlight>

    <p>
      Notice we used <code>`.group(1)`</code> just like we'd use <code>`\1`</code> in the regex pattern. Nothing new here, aside from using the regex in Python.
    </p>

    <h3>Beginning and End</h3>

    <p>
      Until now, we've actually allowed matching strings to occur in any part of the string. For intsance, <code>`/(Jos)+h/`</code> will match any string containing the Jos-repeating-h <i>anywhere</i> in the string.
    </p>

    <p>
      What if we wanted the string begin with Jos-repeating-h? We can specify this with <code>`/^(Jos)+h/`</code>, where <code>`^`</code> matches the start of the string.
    </p>

    <p>
      Similarly, <code>`$`</code> can be used to match the end of the string.
    </p>

    <p>
      So if we want our pattern to match strings containg Jos-repeating-h from beginning to end, we can alter it to look like this: <code>`/^(Jos)+h$/`</code>.
    </p>

    <h3>Character Options</h3>

    <p>
      But maybe you're writing a regex for a sandwich order. You don't know if the customer wants white or wheat bread, but you'll accept either. How do you add choice in a regex? With <b>Character Options</b>!
    </p>

    <p>
      Character Options allow you to specify a <i>set</i> of possible values for a group. Syntax for this is <code>`(white|wheat)`</code> in the context of our sandwhich, where either "white" or "wheat" would be accepted.
    </p>

    <p>
      You could also use the <code>`[brackets]`</code> to specify options in another way. Each character is an option here, instead of the total string of characters. I.e., "b", "r", "s", "t", e", "k", "c", "r" would each be accepted individually. But this could be handy for more complicated groups, as you can substitute a character for a more complicated expression inside a Character Group here.
    </p>

    <h3>Modifiers</h3>

    <p>
      We talk about regex's with <code>`/slash marks/`</code>, right? We know what goes in the middle, but what goes on the sides?
    </p>

    <p>
      Plot twist, nothing.
    </p>

    <p>
      <i>... goes on the left.</i> The right side, however, has some very, very useful stuff. It's almost a shame we ignored it for so long!
    </p>

    <p>
      <b>Modifiers</b> modify the rules with which the regular expressions are applied.
    </p>

    <p>
      Here's a list of the most common modifiers (from <a href="https://regex101.com/">Regex101.com</a>):
    </p>

    |Modifier |Nickname|Description |
    |:-:|:--|:--|
    | g| global| All matches (don't return on first match)|
    | m| multi-line| Causes ^ and $ to match the begin/end of each line (not only begin/end of string)|
    | i| insensitive| Case insensitive match (ignores case of [a-zA-Z])|
    | x| extended| Spaces and text after a # in the pattern are ignored|
    | X| extra| A \ followed by a letter with no special meaning is faulted|
    | s| single line| Dot matches newline characters|
    | u| unicode| Pattern strings are treated as UTF-16. Also causes escape sequences to match unicode characters|
    | U| ungreedy| The match becomes lazy by default. Now a `?` following a quantifier makes it greedy|
    | A| anchored| Pattern is forced to ^|
    | J| duplicate|allow duplicate subpattern names|

    <p>
      For instance, until now, all of our examples have been <i>case-sensitive</i>. That means, capitalizing or lower-casing any one character would make that string no longer match the pattern. We can make our patterns <i>case-<b>insensitive</b></i> with the <code>`i`</code> modifier.
    </p>

    <p>
      Maybe Eli was so mad at me that he spammed the chat with a Mix OF casE CHArACters. Never fear, <code>`i`</code> is here! We can match his "I hAate LiVing witH JOSH!!!" rage with <code>`/i ha+te living with josh!+/i`</code>. Now it's easier to read and more powerful and useful. Awesome!
    </p>

    <p>
      I'll leave the rest of the modifiers for you to play with on your own, but I bet you'll find <code>`igm`</code> to be your most used in general.
    </p>

    <h3>What's next?</h3>

    <p>
      Hopefully this article has shown you another useful way to interact with strings a little bit more intelligently. I've hardly even scratched the surface of regexs, but you already know how to use regular expressions for some minor tasks now.
    </p>

    <p>
      There's an overwhelming number of symbols / tokens to use in your regexs. Typically you'll stumble on them from Stack Overflow searches, or you'll guess them from previous experience (<code>`\n`</code> is the new line character, for instance). You've more or less got what you need for now, but there's plenty still to learn.
    </p>

    <p>
      You can get a full list of tokens and test your regexs extensively (<a href="https://regex101.com">here</a>. I still use this website almost every time I write regexs, because the testing tool is remarkably helpful and powerful. It even generates code for you if you're not sure how to do it in your programming language yet.
    </p>

    <p>
      If this was a cakewalk for you, check out <a href="https://regexcrossword.com/">regex crossword puzzles</a>. They'll really get you thinking with regex!
    </p>
  </Post>
)
