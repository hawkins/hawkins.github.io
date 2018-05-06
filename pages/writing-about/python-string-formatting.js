import Highlight from "react-highlight";
import Post from "../../layouts/post";

export default () => (
  <Post
    title="Benchmarking String Formatting in Python"
    date="2016/10/22"
    summary="Performance and Syntax - Or Why I'm Excited for Python 3.6"
  >
    <p>
      The Zen of Python is pretty clear on having multiple ways to do something.
      In fact, it has this to say about it:
    </p>

    <blockquote>
      There should be one-- and preferably only one --obvious way to do it.
    </blockquote>

    <p>
      I love this about Python - it leaves you with enough power to make
      something happen in multiple ways, but it has one <i>obvious</i> or{" "}
      <i>idiomatic</i> (dare I say <i>Pythonic</i>?) way to do it.
    </p>

    <p>That is... until you look at string formatting.</p>

    <p>
      String formatting is one of those things where you need to do it alot, so
      you'll learn it one way. C has <code>`printf()`</code> for this. And it
      works great.
    </p>

    <p>
      Most languages have some means of string formatting similar to{" "}
      <code>`printf()`</code>. Some go the extra mile and add my favorite style
      of String Interpolation, where you can evaluate expressions directly
      inside of the string (and not simply sprinkle them in later, as you do
      with <code>`printf()`</code>). In Ruby, this is done like so:
    </p>

    <Highlight className="ruby">
      {`op = "interpolation"
"String #{op}"`}
    </Highlight>

    <p>
      This is my favorite syntax for string formatting, and I desperately wish
      Python had something similar. Thankfully,{" "}
      <a href="https://www.python.org/dev/peps/pep-0498/">
        we're getting this in Python 3.6 with <i>f-strings</i> from PEP 498
      </a>!
    </p>

    <h2>f-strings</h2>

    <p>
      f-strings are the <i>new</i> new style of string formatting presented in
      PEP 498. They're similar to Ruby's string interpolation shown above, and
      basically provide this syntax:
    </p>

    <Highlight className="python">
      {`f"Hi, my name is {some_variable}, and I love programming languages."`}
    </Highlight>

    <p>
      As you can see, they're very easy to use - simply slap an <code>`f`</code>{" "}
      in front of the string literal and type your expressions inside of{" "}
      <code>`{}`</code>.
    </p>

    <p>
      There's also some powerful formatting options included with f-string, that
      may come at a cost to performance. I'll let you read about these options
      yourself in the PEP linked above, but for now - let's talk about why I
      want 3.6 here yesterday.
    </p>

    <h2>Current String Formatting Options</h2>

    <p>
      Why do I want Python 3.6 so badly? Because I feel we're sorely lacking in
      the syntactical sugar department for current string interpolation options.
      Python is a very terse language - that is, it avoids excessive verbosity
      (unlike my blog). This, to me, feels very <i>un</i>-Pythonic.
    </p>

    <p>
      So let's take a look at the current options for this in Python and compare
      their drawbacks, as well as benchmark them to see why we might consider
      using each of them.
    </p>

    <h3>
      <code>`%`</code>-formatting
    </h3>

    <p>
      <a href="https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting">
        View the docs
      </a>
    </p>

    <p>
      Python has what the gurus on stack overflow call "old-style string
      formatting" with the <code>`%`</code> operator. Its syntax goes a bit like
      this:
    </p>

    <Highlight className="python">
      {`name = "Josh"
print("Hi, my name is %, and I love programming languages." % name)`}
    </Highlight>

    <p>
      If you wanted to pass in more than one value, the syntax changes a bit:
    </p>

    <Highlight className="python">
      {`name = "Josh"
thing = "programming languages"
print("Hi, my name is %, and I love %." % (name, thing))`}
    </Highlight>

    <p>
      Notice the addition of the tuple to hold all arguments. This can make
      modifying code a bit tedious when this change occurs, but the minor
      inconsistency is not the most of its issues.
    </p>

    <p>
      The biggest pitfall to this operator is that it only supports a few types
      - only <code>`ints`</code>, <code>`strs`</code>, and{" "}
      <code>`doubles`</code> can be formatted. All other types must be converted
      to one of these or are simply not supported. So you see it's not
      particularly powerful, but it is fast.
    </p>

    <p>
      However, this operator also has some finnicky behavior when a tuple is
      passed in. For instance, if <code>`name`</code> was a tuple, the snippet
      below would present this error:
    </p>

    <Highlight className="Python">
      {`tup = ('some', 'data')
print("This is a tuple %" % tup)
TypeError: not all arguments converted during string formatting`}
    </Highlight>

    <p>
      So its simple syntax for a single argument is nifty, but its
      inconsitencies are also frustrating. We'll see how it performs compared to
      the other options at the end of the article.
    </p>

    <h3>str.format</h3>

    <p>
      <a href="https://docs.python.org/3/library/string.html#formatstrings">
        View the docs
      </a>
    </p>

    <p>
      Python also has what the gurus might call "new-style string formatting"
      with the <code>`str.format()`</code> function.
    </p>

    <p>
      <code>`str.format`</code> alleviates the inconsistency between supplying
      only one versus more arguments. Additionally, to quote PEP 498:
    </p>

    <blockquote>
      In particular, it uses normal function call syntax (and therefor supports
      multiple parameters) and it is extensible through the{" "}
      <code>`__format__()`</code> method on the object being converted to a
      string.
    </blockquote>

    <p>
      Here's an example of <code>`str.format()`</code> using keys to map
      arguments to their positions in the string:
    </p>

    <Highlight className="python">
      {`print("This function maps {a} supplied to {c} to {b}.".format(a="arguments", b="keys" c="positions"))`}
    </Highlight>

    <p>
      As you can already see, the biggest issue of <code>`str.format()`</code>{" "}
      is its verbosity. This is in contrast to most of Python being so terse.
      This can cause longer string formatting operations to seperate the
      arguments from its location, making the code harder to read. Even in its
      simplest structure, it takes a good deal of code to format the string, yet
      it still unfortunately separates the arguments from their positions:
    </p>

    <Highlight className="Python">
      {`print("This function maps {} supplied to {} to {}.".format("arguments", "keys" "positions"))`}
    </Highlight>

    <p>
      So <code>`str.format()`</code> is more powerful than the <code>`%`</code>{" "}
      operator, but it is significantly more cumbersome to use. This leaves one
      last option for string formatting prior to Python 3.6:
    </p>

    <h3>str.Template</h3>

    <p>
      <a href="https://docs.python.org/3/library/string.html#template-strings">
        View the docs
      </a>
    </p>

    <p>
      <code>`str.Template()`</code> takes a different approach. Let's take a
      peek first:
    </p>

    <Highlight className="python">
      {`t = string.Template("Hi, my name is $name and I like $thing.")
print(t.substitute(name="Josh", thing="programming languages"))`}
    </Highlight>

    <p>
      As you can see, this will suffer from some of the same issue that{" "}
      <code>`str.format()`</code> does, with separating the arguments from their
      string and its verbosity.
    </p>

    <p>
      However, you're probably already guessing this is useful for repeated
      formatting operations, much like logging. Hang on just a second tho -
      let's go ahead and compare the three operations in terms of performance so
      we can nip this thought in the bud:
    </p>

    <h2>Benchmarking</h2>

    <p>
      We'll compare these operations by using <code>`timeit`</code> to perform
      their interpolations in <code>`3`</code> trials of <code>`1000000`</code>{" "}
      operations each. If you're curious, here's the script I wrote to test
      performance:
    </p>

    <Highlight className="python">
      {`from __future__ import print_function
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
print(output.substitute(a=template_times[0], b=template_times[1], c=template_times[2]))`}
    </Highlight>

    <h3>Results</h3>

    <p>And the output was as follows (time in seconds):</p>

    <Table
      columns={{ t: "Type", t1: "Trial 1", t2: "Trial 2", t3: "Trial 3" }}
      rows={[
        {
          t: "`%`",
          t1: "0.255867058399",
          t2: "0.256962734151",
          t3: "0.275552650658"
        },
        {
          t: "`str.format()`",
          t1: "0.683378964547",
          t2: "0.67034378765",
          t3: "0.660407515312"
        },
        {
          t: "`str.Template()`",
          t1: "4.0731706778",
          t2: "3.9941664409",
          t3: "3.90372740406"
        }
      ]}
    />

    <p>
      As you can see, <code>`%`</code> was the fastest option by far.{" "}
      <code>`str.format()`</code> was roughly 2.5 times slower than{" "}
      <code>`%`</code>. And <code>`str.Template()`</code> was vastly slower than
      either, at roughly 16 times slower than <code>`%`</code>.
    </p>

    <p>
      <i>
        For what it's worth, this experiment was conducted using Python 2.7 on
        Windows 10 with an i5-4690K @ 3.50 GHz.
      </i>
    </p>

    <h3>Conclusions</h3>

    <p>
      <code>`%`</code> may be the fastest operation, but it is also the least
      powerful. It is probably the best tool for the job if you will only use
      strings, integers, and doubles.
    </p>

    <p>
      Should you need formatting capabilities and types supported,{" "}
      <code>`str.format()`</code> is still a good choice.
    </p>

    <p>
      Now you might wonder where <code>`str.Template()`</code> is useful then.
      If it's slower than we first thought, and extremely so, why use it?
    </p>

    <p>
      Well, it boils down to a time before <code>`str.format()`</code> and when{" "}
      <code>`%`</code> just didn't cut it. When Python programmers didn't like{" "}
      <code>`%`</code> syntax, they devised a more readable solution -{" "}
      <code>`str.Template()`</code> (described in{" "}
      <a href="https://www.python.org/dev/peps/pep-0292/">PEP 292</a>).
    </p>

    <p>
      It still exists today in later versions of Python, even though it may be
      only for the sake of backwards compatibility.
    </p>

    <p>
      So if performance is not an issue in your script and you value readability
      above all else, you may enjoy using <code>`str.Template()`</code>. But if
      you're formatting alot of strings, sticking to <code>`str.format()`</code>{" "}
      or <code>`%`</code> may be your best bet.
    </p>

    <p>
      Either way, I'm itching to get my hands on Python 3.6 - I <i>love</i> the
      new syntax for f-strings, and can't wait to benchmark it against the older
      styles!
    </p>

    <p>
      <i>
        (Is this how the programmers waiting for <code>`str.Template()`</code>{" "}
        felt, potentially unaware of the performance costs awaiting them?)
      </i>
    </p>
  </Post>
);
