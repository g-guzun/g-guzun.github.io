## CS 261 - Computer Science II

### Warmup Assignment: Letter Counter

This first assignment will give you a chance to refresh your Java programming basics and get reacquainted with your favorite development environment, whether that's BlueJ or something different. Your task, to be completed on your own, is to write a class that gathers information on the frequency with which letters appear in a sample of text. The specifics are spelled out in the next section, and you can use the code provided below to test your class.

This assignment does not require inheritance.


#### Required Files

The following file have been provided for testing your assignment.

- [TestLetterCounter.java](TestLetterCounter.java)

#### Instructions

Your class should be named `LetterCounter`, and count the number of times each letter of the alphabet occurs in the sample text. Your code should ignore digits, punctuation, accented characters (like `é`), spaces, etc. Case should also be ignored — keep a count for each letter, and increment it if you see either an upper or lower case version of that letter.

You will be dealing with the `String` class and the `char` primitive data type (and its wrapper class, `Character`). Make sure you spend some time investigating chars in general, and refer often to the [String](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html) and [Character](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html) APIs.

Your class should implement the following methods. However you may add as many "helper" methods as you may need.

1. A method called `countLetters()` that takes a string as its argument. It traverses the string, updating the individual letter counts as appropriate. It should be possible to call this method multiple times, on different strings, and have the counts accumulate across calls. Methods you'll find useful include: String's charAt(..), and one of Character class' static methods...

2. A `getTotalCount()` method that returns the total number of valid letters encountered across all text samples (strings). (The characters that aren't punctuation, digits, accented, etc.)

3. A `reset()` method that sets all letter counts back to zero.

4. A `toString()` method. It should return a string that, when printed, displays a histogram. (See below for an example.) In the histogram, the horizontal bars should be scaled such that the most frequently occurring letter has a bar 60 characters long (not including the percentage information). 

5. In the `toString()` method above, you need to ensure that the percentages are rounded off to the nearest hundredth. To do this, you should look into the [DecimalFormat](https://docs.oracle.com/javase/8/docs/api/java/text/DecimalFormat.html) class.


You are reminded to declare *constants* where necessary, and runtime errors from erroneous input should be handled gracefully (i.e., without crashing your program). That means you should test often (write a little, test; write a little, test)! Make up good test cases that check "edge" conditions, like inputting null, an empty-string, and inputting a string without any alphabetical characters, and so on.


#### Sample Output
If your program is correct, then running the `static main(..)` method from the class I provided should generate the following output.

```
Frequencies after 317 characters:
a:  ######################  (5.36%)
b:  ##  (.63%)
c:  ##################  (4.42%)
d:  ###############  (3.79%)
e:  ############################################################  (14.51%)
f:  ##############  (3.47%)
g:  ###  (.95%)
h:  ###########################  (6.62%)
i:  ###############################  (7.57%)
j:    (.00%)
k:  #  (.32%)
l:  ###########  (2.84%)
m:  ######  (1.58%)
n:  #################################  (8.20%)
o:  ###################################  (8.52%)
p:  ##########  (2.52%)
q:    (.00%)
r:  ###########################  (6.62%)
s:  ######################  (5.36%)
t:  ###################################  (8.52%)
u:  ###########  (2.84%)
v:  #####  (1.26%)
w:  ##########  (2.52%)
x:    (.00%)
y:  ######  (1.58%)
z:    (.00%)

Frequencies after 624 characters:
a:  ##############################  (6.41%)
b:  ######  (1.44%)
c:  ##################  (3.85%)
d:  #################  (3.69%)
e:  ############################################################  (12.82%)
f:  #################  (3.69%)
g:  #####  (1.12%)
h:  ##############################  (6.57%)
i:  ####################################  (7.85%)
j:    (.00%)
k:    (.16%)
l:  ####################  (4.33%)
m:  #########  (1.92%)
n:  #####################################  (8.01%)
o:  ######################################  (8.17%)
p:  ############  (2.56%)
q:    (.00%)
r:  ##########################  (5.61%)
s:  #########################  (5.45%)
t:  ##########################################  (8.97%)
u:  ############  (2.72%)
v:  ####  (.96%)
w:  #########  (2.08%)
x:    (.00%)
y:  #######  (1.60%)
z:    (.00%)

Frequencies after 903 characters:
a:  ################################  (6.76%)
b:  #####  (1.22%)
c:  ##################  (3.88%)
d:  ###################  (4.10%)
e:  ############################################################  (12.40%)
f:  ##############  (2.99%)
g:  ######  (1.44%)
h:  #############################  (6.09%)
i:  #####################################  (7.75%)
j:    (.00%)
k:  #  (.33%)
l:  #####################  (4.43%)
m:  ###########  (2.33%)
n:  #####################################  (7.75%)
o:  ########################################  (8.31%)
p:  ############  (2.55%)
q:    (.00%)
r:  ########################  (4.98%)
s:  ############################  (5.87%)
t:  ###############################################  (9.75%)
u:  ############  (2.66%)
v:  ####  (1.00%)
w:  #########  (1.99%)
x:    (.00%)
y:  ######  (1.44%)
z:    (.00%)

Frequencies after 1488 characters:
a:  ##################################  (6.92%)
b:  ######  (1.28%)
c:  #################  (3.49%)
d:  ####################  (4.17%)
e:  ############################################################  (11.96%)
f:  ##############  (2.82%)
g:  ##########  (2.02%)
h:  #########################  (5.04%)
i:  #####################################  (7.53%)
j:    (.00%)
k:  #  (.34%)
l:  ###################  (3.97%)
m:  ###########  (2.28%)
n:  ##########################################  (8.40%)
o:  ##########################################  (8.40%)
p:  ##########  (2.15%)
q:    (.07%)
r:  ###########################  (5.58%)
s:  ################################  (6.38%)
t:  ################################################  (9.68%)
u:  ##############  (2.89%)
v:  #####  (1.08%)
w:  #########  (1.95%)
x:    (.07%)
y:  #######  (1.55%)
z:    (.00%)

Frequencies after 1889 characters:
a:  ####################################  (6.93%)
b:  ######  (1.22%)
c:  ##################  (3.60%)
d:  #######################  (4.50%)
e:  ############################################################  (11.54%)
f:  #############  (2.65%)
g:  ###########  (2.17%)
h:  #########################  (4.98%)
i:  ##########################################  (8.10%)
j:    (.00%)
k:  #  (.32%)
l:  #####################  (4.08%)
m:  ############  (2.38%)
n:  ###########################################  (8.42%)
o:  #########################################  (7.99%)
p:  ##########  (1.96%)
q:    (.11%)
r:  ############################  (5.56%)
s:  ################################  (6.19%)
t:  ##################################################  (9.79%)
u:  ###############  (2.91%)
v:  #####  (1.01%)
w:  ##########  (1.96%)
x:    (.05%)
y:  ########  (1.59%)
z:    (.00%)

Frequencies after 2121 characters:
a:  ####################################  (6.88%)
b:  ######  (1.18%)
c:  ##################  (3.49%)
d:  #######################  (4.48%)
e:  ############################################################  (11.32%)
f:  #############  (2.59%)
g:  ###########  (2.22%)
h:  #########################  (4.81%)
i:  ###########################################  (8.20%)
j:    (.00%)
k:  ##  (.42%)
l:  #####################  (4.10%)
m:  ############  (2.36%)
n:  #############################################  (8.53%)
o:  #########################################  (7.87%)
p:  ##########  (2.03%)
q:    (.09%)
r:  #############################  (5.47%)
s:  ##################################  (6.46%)
t:  ###################################################  (9.71%)
u:  ################  (3.11%)
v:  #####  (1.08%)
w:  #########  (1.84%)
x:    (.09%)
y:  ########  (1.65%)
z:    (.00%)

Frequencies after 2548 characters:
a:  ####################################  (6.91%)
b:  ######  (1.26%)
c:  ##################  (3.49%)
d:  ########################  (4.75%)
e:  ############################################################  (11.42%)
f:  #############  (2.55%)
g:  ###########  (2.28%)
h:  #########################  (4.79%)
i:  ##########################################  (8.01%)
j:    (.00%)
k:  #  (.35%)
l:  #####################  (4.12%)
m:  ############  (2.39%)
n:  ###########################################  (8.24%)
o:  ########################################  (7.61%)
p:  ###########  (2.20%)
q:    (.08%)
r:  ############################  (5.49%)
s:  #################################  (6.44%)
t:  ##################################################  (9.69%)
u:  #################  (3.34%)
v:  #####  (1.10%)
w:  ########  (1.65%)
x:  #  (.20%)
y:  ########  (1.65%)
z:    (.00%)

Frequencies after 3214 characters:
a:  ####################################  (6.97%)
b:  ######  (1.15%)
c:  ###################  (3.73%)
d:  ########################  (4.76%)
e:  ############################################################  (11.51%)
f:  ############  (2.43%)
g:  ##########  (2.08%)
h:  #######################  (4.42%)
i:  #######################################  (7.65%)
j:    (.00%)
k:  #  (.31%)
l:  ######################  (4.23%)
m:  #############  (2.52%)
n:  ##########################################  (8.18%)
o:  #######################################  (7.59%)
p:  ###########  (2.15%)
q:    (.06%)
r:  ##############################  (5.82%)
s:  ##################################  (6.66%)
t:  ##################################################  (9.71%)
u:  #################  (3.42%)
v:  ######  (1.15%)
w:  ########  (1.68%)
x:    (.16%)
y:  ########  (1.65%)
z:    (.00%)

Frequencies after 3670 characters:
a:  ###################################  (6.95%)
b:  #####  (1.06%)
c:  ####################  (3.92%)
d:  #######################  (4.66%)
e:  ############################################################  (11.72%)
f:  ###########  (2.32%)
g:  ##########  (2.07%)
h:  ######################  (4.33%)
i:  ######################################  (7.55%)
j:    (.05%)
k:  #  (.33%)
l:  ######################  (4.31%)
m:  ############  (2.45%)
n:  ##########################################  (8.37%)
o:  #######################################  (7.63%)
p:  ###########  (2.21%)
q:    (.05%)
r:  #############################  (5.78%)
s:  #################################  (6.54%)
t:  #################################################  (9.59%)
u:  #################  (3.41%)
v:  #####  (1.14%)
w:  #########  (1.77%)
x:  #  (.22%)
y:  ########  (1.58%)
z:    (.00%)

Frequencies after 4085 characters:
a:  ###################################  (7.10%)
b:  ####  (.95%)
c:  ###################  (3.82%)
d:  #######################  (4.65%)
e:  ############################################################  (11.92%)
f:  ###########  (2.28%)
g:  ##########  (2.11%)
h:  #####################  (4.19%)
i:  #####################################  (7.49%)
j:    (.05%)
k:  #  (.29%)
l:  #####################  (4.33%)
m:  #############  (2.64%)
n:  ##########################################  (8.45%)
o:  ######################################  (7.59%)
p:  ############  (2.42%)
q:    (.05%)
r:  ##############################  (6.00%)
s:  ################################  (6.51%)
t:  ##############################################  (9.25%)
u:  #################  (3.45%)
v:  #####  (1.15%)
w:  ########  (1.59%)
x:  #  (.24%)
y:  #######  (1.44%)
z:    (.02%)
```

#### Grading

```
CS 261 Homework 1 (LetterCounter)

----------------------------------------------------------
[5pts] Appropriate instance variables (i.e., fields) have
been determined. Excessive fields result in deductions. You
should only have a single structure (array, map, etc.) for
storing each letter's count, and you may also store a total
count of letters.


----------------------------------------------------------
[5pts] Completion of the int getTotalCount() method.


----------------------------------------------------------
[5pts] Completion of the void reset() method.


----------------------------------------------------------
[5pts] Completion of the void countLetters() method.


----------------------------------------------------------
[40/40pts] Completion of the toString() method. Each bar
should be scaled to a maximum bar-length of 60 (representing
100%). All percentages should be rounded up to the neareth
hundreths place.


----------------------------------------------------------
[2/2pts] You include sufficient comments to explain the
logic of your methods.


----------------------------------------------------------
[3/3pts] You include sufficient Javadocs comments for each
class and method.
```


#### Submitting Your Assignment
Follow these instructions to submit your work. You may submit as often as you'd like before the deadline. I will grade the most recent copy.

- If this is a team assignment, please ensure that you listed all of your team members in a Javadocs comment at the top of each `.java` file.

- Navigate to our course page on Canvas and click on the assignment to which you are submitting. Click on "Submit Assignment."

- Upload all the files ending in `.java` from your project folder.

- Click "Submit Assignment" again to upload it.


#### Credits

Written by Brad Richards.
