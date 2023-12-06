<?php
/** lab config */
require("../course_cfg.php");
require("lab_cfg.php");
require($cfg['includes_dir']."/course_lab_header.php");
require($cfg['includes_dir']."/highlight.php");
?>

<h3>Overview</h3>
<p>
This lab is all about recursion and getting used to thinking recursively. 
Recursive algorithms call <i>itself</i> repeatedly to solve a problem. They are useful when the problem
is reducible to a smaller subproblem of the same nature.
As I mentioned in class,
recursive solutions are never necessary (i.e., you could always do recursion with a loop). However, 
solutions to some problems are naturally recursive, and when that is the case, recursive algorithms
tend to be more readable and elegant. Finding the sum from $1$ up to $n$ (for $n \ge 1$) is one such
problem that is naturally recursive.
Consider the method $sum(n)$
to find the sum of $1$ up to $n$, for $n \ge 1$:

$$sum(n) = 1 + 2 +  ... + (n-1) + n$$

In a step toward thinking recursively, observe that due to the commutativity of addition, this sum could be rewritten as
adding $n$ to the sum of the remaining numbers, that is,

$$sum(n) = n + [1 + 2 + ... + (n-1)]$$

Now, isn't the partial sum expressed in the square brackets just $sum(n-1)$? Say... we're calling $sum(\cdot)$ again to solve
a for another sum? That's a self (recursive) definition! Indeed, let's rewrite it as such:

$$sum(n) = n + sum(n-1)$$

Therefore, we just need to find $sum(n-1)$, and using the same argument above, $sum(n-1)$ can be written as follows:

$$sum(n-1) = (n-1) + sum(n-2)$$

After substitution we now have $sum(n) = n + (n-1) + sum(n-2)$. We repeat this process for $sum(n-2)$, and $sum(n-3)$, and
so on. If you write  out each substitution on a new line, you'd get something that looks like this:

$$\begin{align}
sum(n) & =  n + sum(n-1)\\
 & =  n + (n-1) + sum(n-2)\\
 & =  n + (n-1) + (n-2) + sum(n-3)\\
 & =  n + (n-1) + (n-2) + (n-3) + sum(n-4)\\
& \cdots
\end{align}$$

That's swell and all, but when do we ever stop? A terminating condition (known as the <b>base case</b>) 
is critical for you to identify! It is the only way we can avoid <i>infinite recursion!</i>
Notice that the input to $sum(\cdot)$ reduces by $1$ on each line. Well, you'd have to ask yourself, &quot;When does
the input become so small that the problem can be solved trivially (without making another recursive call)?&quot;
This occurs when the input becomes $1$ for this problem. Why? Consider the problem statement once
again: the sum from $1$ <i>up to</i> $n=1$ is simply $1$. That terminates the recursion. Okay, let's finish the substitution:

$$\begin{align}
sum(n) & =  n + sum(n-1)\\
 & =  n + (n-1) + sum(n-2)\\
 & =  n + (n-1) + (n-2) + sum(n-3)\\
 & =  n + (n-1) + (n-2) + (n-3) + sum(n-4)\\
 & \cdots\\
 & =  n + (n-1) + (n-2) + (n-3) + ... + sum(2)\\
 & =  n + (n-1) + (n-2) + (n-3) + ... + 2 + sum(1)\\
 & =  n + (n-1) + (n-2) + (n-3) + ... + 2 + 1\\
\end{align}$$

In defining this method, note that there are just two cases we need worry about depending on
the value of $n$. The result is $sum(n) = 1$ when $n = 1$, and $sum = n + sum(n-1)$ when $n > 1$.
The method can be written as follows,
        <pre><?php echo highlightIt('code/summation.java'); ?></pre>
</p>
<p>
The first section of the lab involves code reading, the second section 
asks you to fix some bugs in recursive methods. The third section 
asks you to write some
recursive methods.
</p>
<h3>Objectives</h3>
<ul>
	<li>Read and write recursive methods</li>
	<li>Think recursively in order to solve specific problems</li>
</ul>

<h3>Required Files</h3>
The following file(s) have been provided for this lab.
<ul>
	<li><a href="Lab11_Recursion.zip">Lab11_Recursion.zip</a></li>
</ul>

<h3>Instructions</h3>
<p>
Download the BlueJ project from the above link. After you unzip it into your working directory,
navigate into the project folder.
</p>

<h3>Part 1: Code Reading and Tracing Recursive Methods</h3>
<p>
Open up the <code>README.txt</code> file by double-clicking on it in the BlueJ project, where you'll
find some questions you need to answer. For each
of the code snippets found below (and in the <code>MysteryMethods</code> class), answer these questions
and any followup questions found below the code snippets:
	<ul>
		<li>
			<p>
			Identify the base case(s), i.e., the terminating condition(s).
			</p>
		</li>
		<li>
			<p>
			Identify the general case(s), i.e., condition(s) under which a recursive call is made. What is the
			unit of work that is being done, and how does the recursive call reduce the problem size?
			</p>
		</li>
		<li>
			<p>
			Describe what the method does in a couple brief sentences. To get in the right mindset,
			imagine if you were tasked with writing the Javadocs comment describing this method. I will
			not accept a line-by-line description of the method!
			</p>
		</li>
	</ul>
Because these are meant to be code reading exercises, <b>do not run the code in BlueJ</b> unless
you're ready to check your answers! I have provided the code to you as static methods in the <code>MysteryMethods</code> class.
Here are the mystery methods you need to consider:
</p>
<ol>
	<li>
	<p>
	I'll do the first one for you to get the juices flowing. Consider the following method.
	Enter various values for $x$ and $y$ and trace the result. You should start with small numbers,
	increasing them, and see how it affects the trace.
        <pre><?php echo highlightIt('code/exp.java'); ?></pre>
	<ul>
		<li>
			<p>
			<b>Identify the base case(s), i.e., the terminating condition(s).</b>
			</p>
			<p>
			<i>
			The base case occurs when $y$ reaches 0, and the value of 1 is returned trivially.
			</i>
			</p>
		</li>
		<li>
			<p>
			<b>Identify the general case(s), i.e., condition(s) under which a recursive call is made. What is the
			unit of work that is being done, and how does the recursive call break down the problem size?</b>
			</p>
			<p>
			<i>
			The general case occurs when $y$ is nonzero. A product is taken between $x$ and the result of
			$\text{mystery0}(x,y-1)$. The problem size, $y$, therefore decreases by 1, reducing toward the base case
			of $y==0$.
			</i>
			</p>
		</li>
		<li>
			<p>
			<b>Describe what the method does in a couple brief sentences.</b>
			</p>
			<p>
			<i>
			This method assumes $y \ge 0$ and returns the value of $x^y$.
			</i>
			</p>
		</li>
	</ul>
	To see that this conclusion is correct, verify it with various inputs and check using a calculator. Also check
	the edge cases that invoke the base case. For instance, given $y=0$ the result is always $1$ independent of $x$.
	</p>
	</li>

	<li>
	<p>
	Let's start with an easy one. 
        <pre><?php echo highlightIt('code/rept.java'); ?></pre>
	</p>
	In addition to the three questions you need to answer, check the following.
	<ul>
		<li>
		Check your edge cases: Can an infinite recursion occur when given certain inputs?
		</li>
	</ul>
	</li>
	<li>
	<p>
	A bit harder now. Answer the three questions above for the code below:
        <pre><?php echo highlightIt('code/add.java'); ?></pre>
	</p>
	In addition to the three questions, answer the following.
	<ul>
		<li>
		Check your edge cases: What inputs for $i$ and $j$ might produce an infinite recursion?
		How would you fix the code so that an infinite recursion is not possible?
		</li>
	</ul>
	</li>
	<li>
	<p>
	Harder still, let's try this last one. Hint: Trace it with random numbers stored in $list$ and $pos = 0$.
        <pre><?php echo highlightIt('code/min.java'); ?></pre>
	</p>
	In addition to the three questions, answer the following.
	<ul>
		<li>
		Why is it imperative that $pos$ starts with $0$ when initially calling this algorithm? What would happen
		if $pos < 0$? What if $pos > 0$?
		</li>
	</ul>
	</li>
</ol>

<h3>Part 2: Fixing Bugs in Recursive Methods</h3>
<p>
Open up the <code>RecursionBugs</code> class in the project, which contains the following methods.
Each of these methods contains a runtime error. Trace them with different inputs on paper. 
Identify the error(s) and fix it (them) directly in the class for full credit.
</p>
      <ol>
          <li>
            <p>
		This method is supposed to print out every other integer from $n$ down to $0$, for $n \ge 0$. Hint: It seems
		to only work about half the time when I try with various inputs.
	        <pre><?php echo highlightIt('code/bug0.java'); ?></pre>	
	    </p>
	  </li>
<!--
          <li>
            <p>
		This method is supposed to print out all integers between $0$ and $n$, for a given $n \ge 0$.
	        <pre><?php echo highlightIt('code/bug1.java'); ?></pre>	
	    </p>
	  </li>
-->
	  <li>
	    <p>
		This method is supposed to perform linear search recursively. It takes as input a list of integers,
		a search key, and the head position of the unexplored sublist ($head$ must be input 0 initially).
		If found, it returns the position of the key. If not found, it returns -1.
	        <pre><?php echo highlightIt('code/bug2.java'); ?></pre>	
	   </p>
	  </li>
	</ol>


<h3>Part 3: Writing Recursive Methods</h3>
<p>
In this last section of the lab, let's test your hand at implementing some recursive methods.
These can be somewhat challenging for first-timers. It is not imperative that you get these written
before end of the day tomorrow, but I want to see you give it a good try when I grade this lab.
For each of the tasks, I'll define the problem statement and give you a hint on how to think 
recursively. 
Open the <code>Recursion</code> class, and start writing these methods
in there.<br/><br/>
</p>

<h4>Count the Number of Digits in an Integer</h4>
<p>
Write a recursive method $countDigits(...)$ that returns the number of digits in an integer. For instance,
$countDigits(40)$ is $2$, $countDigits(10000)$ is $5$, and $countDigits(9)$ is $1$.
You can determine the number of digits an integer $n$ has by repeatedly dividing $n$ by 10. Hint: When $n \lt 10$, it is just
one digit long, and everytime you are able to divide $n$ by $10$, you have another digit to add.
<br><br>
</p>

<h4>Find the Greatest Common Divisor (Euclid's Algorithm)</h4>
<p>
Write a recursive method $gcd(int~m,int~n)$ that returns the greatest common divisor (GCD) between two positive integers $m$ and $n$.
The GCD of $m$ and $n$ is the largest integer that can evenly divide both numbers. For example, the GCD between $m = 14$ and $n = 49$ is $7$. The GCD between $m = 15$ and $n = 19$ is $1$. The GCD between
$m$ and $n$ is either:
</p>
<ul>
	<li>the smaller of the two values if it can evenly divide the larger value, or</li>
	<li>the GCD between the smaller value and the remainder of the larger value when divided by the smaller value</li>
</ul>


<h3>Optional Extensions</h3>
These are not worth any extra credit, but you'll be better prepared for the exam if you do them:
	<ol>
	  <li>
	    <p>
		<b>Array reversal:</b> Given an array, reverse its contents. Your solution must work for both even
		and odd sized arrays. Hint: array reversal has no effect on arrays containing
		zero or one element.
	    </p>
          </li>
	  <li>
	    <p>
		<b>Prime number checking:</b> Given a positive integer $n$, $n$ is prime if and only if it is only divisible
		evenly by 1 and itself. Hint: As long as the remainder is non-zero, divide $n$ by $2$, $3$, $...$, $n-1$. If,
		at any point, the remainder is 0, then reject $n$ as a prime number.
		If the divisor reaches $n$, then $n$ must be prime.
	    </p>
          </li>
	</ol>

<h3>Grading</h3>
        <p>This assignment will be graded out of 10 points.</p>

<?php
require($cfg['includes_dir']."/course_lab_footer.php");
?>
