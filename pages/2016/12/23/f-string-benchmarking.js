import React from 'react'
import Highlight from 'react-highlight'
import Link from 'next/link'
import Post from '../../../../layouts/post'

export default () => (
  <Post
    title="Benchmarking F-Strings in Python"
    date="2016/12/23"
    summary="Python 3.6 is very impressive!">
    <p>
      If you've not yet read <Link href="/2016/10/22/python-string-formatting">my previous post on Python string benchmarking</Link>, go do so. It's important, so we'll wait for you.
    </p>

    <hr/>

    <p>
      Great, welcome back! Python 3.6 was released today, and I couldn't be more excited!
    </p>

    <p>
      There are <a href="https://docs.python.org/3.6/whatsnew/3.6.html">a host of new features for the language</a>, but the one I'd like to focus on is called 'f-strings'.
    </p>

    <p>
      I spoke about the new method of string formatting in great detail in my previous blog post, so I won't repeat myself now. Let's cut straight to the meat of this article - benchmarking f-strings!
    </p>

    <h2>Benchmarking</h2>

    <p>
      You'll notice this test is very similar to the last one, because the only difference is that I've included f-strings.
    </p>

    <p>
      We'll compare these operations by using <code>`timeit`</code> to perform their interpolations in <code>`3`</code> trials of <code>`1000000`</code> operations each. If you're curious, here's the script I wrote to test performance:
    </p>

    <Highlight className="python">
{`import timeit
import string

# How many operations to time
TRIAL_COUNT = 100000

# Define templates
benchmark = string.Template('This is an $var of string $proc for $purpose')
output = string.Template('str.Template():\t$a\t$b\t$c')

# Define f-string variables
var = 'example'
proc = 'interpolation'
purpose = 'benchmarking'

# Define test functions
def test_percent():
    return 'This is an %s of string %s for %s' % ('example', 'interpolation', 'benchmarking')

def test_format():
    return 'This is an {var} of string {proc} for {purpose}'.format(var='example', proc='interpolation', purpose='benchmarking')

def test_template():
    return benchmark.substitute(var='example', proc='interpolation', purpose='benchmarking')

def test_f_string():
    return f'This is an {var} of of string {proc} for {purpose}'

# Define timer objects
percent_timer  = timeit.Timer(test_percent)
format_timer   = timeit.Timer(test_format)
template_timer = timeit.Timer(test_template)
f_string_timer = timeit.Timer(test_f_string)

# Perform trials
percent_times  = percent_timer.repeat()
format_times   = format_timer.repeat()
template_times = template_timer.repeat()
f_string_times = f_string_timer.repeat()

# Print results
print('Type\t\tTrial 1\t\t\tTrial 2\t\t\tTrial 3')
print('%%:\t\t%.12f\t\t%.12f\t\t%.12f' % (percent_times[0], percent_times[1], percent_times[2]))
print('str.format():\t{}\t{}\t{}'.format(format_times[0], format_times[1], format_times[2]))
print(output.substitute(a=template_times[0], b=template_times[1], c=template_times[2]))
print(f'f-string:\t{f_string_times[0]}\t{f_string_times[1]}\t{f_string_times[2]}')`}
    </Highlight>

    <p>
      <i>Please excuse the tabs - they're just for nicer printing at cost of uglier code. I know, I know.</i>
    </p>

    <h3>Results</h3>

    <p>
      And the output was as follows (time in seconds):
    </p>

    <table>
      <tr>
        <th>
          Type
        </th>
        <th>
          Trial 2
        </th>
        <th>
          Trial 3
        </th>
        <th>
          Trial 4
        </th>
      </tr>
      <tr>
        <td>
          %
        </td>
        <td>
          0.358393278391
        </td>
        <td>
          0.359634358312
        </td>
        <td>
          0.357803165661
        </td>
      </tr>
      <tr>
        <td>
          <code>`str.format()`</code>
        </td>
        <td>
          1.075245370745
        </td>
        <td>
          1.076750640947
        </td>
        <td>
          1.071864144756
        </td>
      </tr>
      <tr>
        <td>
          <code>`str.Template()`</code>
        </td>
        <td>
          4.411845730430
        </td>
        <td>
          4.605993111158
        </td>
        <td>
          4.499692948284
        </td>
      </tr>
      <tr>
        <td>
          <code>`f-string`</code>
        </td>
        <td>
          0.272246474610
        </td>
        <td>
          0.278632974750
        </td>
        <td>
          0.301266738268
        </td>
      </tr>
    </table>

    <blockquote>
      <i>Please refer to older blog post if you'd like to compare result between releases. Here is a quick summary:</i>

      Previously, % was the fastest option by far. <code>`str.format()`</code> was roughly 2.5 times slower than %. And <code>`str.Template()`</code> was vastly slower than either, at roughly 16 times slower than %.
    </blockquote>


    <h3>Conclusions</h3>

    <p>
      I'm a little concerned at how fast f-strings are.
      Were it's computations optimized since they were all strings?
      Either way, the others followed the same procedure and had much worse performance, so I suppose the test is still fair after all!
    </p>

    <p>
      F-strings were roughly 1.3 times faster than % at best. F-strings are both more powerful than % and faster? Wow!
    </p>

    <p>
      % was already wildly faster than the others, clocking in at roughly 3 times faster than `str.format()` and 12 times faster than `string.Template()`.
      This made f-strings roughly 3.8 times faster than `str.format()` and roughly 15.7 times faster than `str.Template()`!
    </p>

    <p>
      I'm actually shocked to see it perform so well.
      I was expecting a heavy price for the wonderful syntax and capability upgrade, but it looks like we got the full-package deal here!
    </p>

    <p>
      With this being only one of dozens of incredible features and improvements to Python 3.6, it's actually quite an incredible upgrade to an already amazing language.
      Great job Python team!
    </p>

    <p>
      <i>For what it's worth, this experiment was conducted using Python 3.6 on Windows 10 with an i5-4690K @ 3.50 GHz.</i>
    </p>
  </Post>
)
