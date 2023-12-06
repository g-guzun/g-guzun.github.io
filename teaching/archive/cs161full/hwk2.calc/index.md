## CS 161 - Intro to Computer Science

### Homework: Calculator

For this assignment you'll write a `Calculator` class that implements the operations of a basic four-function calculator with memory. The methods will each print a message as they're invoked, much like a printing calculator would. Unlike a real calculator, however, yours will only operate on integers.

#### Student Outcomes

- To practice writing Java programs from scratch
- To use integer operations
- To use print statements and concatenation
- To use parameters, fields, and local variables
- To use if-else statements

#### Required Files

The following file(s) have been provided for this assignment.

- [Hwk2_Calculator.zip](Hwk2_Calculator.zip)

#### Instructions

I've created a new project for you that contains the outline of a `Calculator` class. Please download and modify `Calculator` Project instead of creating a new project via BlueJ. The `Calculator` class currently has some sample methods to remind you of the syntax, but you should delete any code you don't use before submitting. The steps below will guide you through creating the necessary fields and constructors, then the four arithmetic operators, and finally the memory-related functions. Good style is important! Make sure you write comments above each of the methods as you go, indent your code properly, and use meaningful variable and parameter names in your code. In the descriptions below, the text I'm showing illustrates an interaction with your `Calculator` class in the code pad window. You can perform equivalent tests via the point-and-click interface if you prefer.

- Your calculator will need to maintain its state. While we won't have a display like a normal calculator, a `Calculator` object will still need to remember its current value so that it knows what to do when we add to the current value, subtract from it, etc. For this homework, assume that you'll only be working with integer values. Define a new field at the top of the class that will hold the calculator's value. Make sure you give the field a meaningful name so the rest of your code is easier to read.

- Define two constructors: The first should initialize the state to be zero, and needs no parameters. A constructor that requires no inputs is known as the default constructor. The second should take a single integer argument, and set the calculator's initial value to the specified value.

- Implement an getter (accessor) method called `getValue()` that returns the calculator's current value.

- Now add a method called `add()` that takes a single integer argument. It should set the calculator's state to be the sum of its old value and the argument to add. It should also print a message describing the inputs to the addition and the result, as shown below. The lines starting with `>` means it's been output from BlueJ.

  ```java
  Calculator c1;
  c1 = new Calculator();
  c1.add(5);
  > 0 + 5 = 5

  c1.add(10);
  > 5 + 10 = 15

  Calculator c2;
  c2 = new Calculator(100);
  c2.add(61);
  > 100 + 61 = 161
  ```

- After verifying that your constructors and `add()` method work, implement the `subtract()` and `multiply()` methods. They should each take a single integer argument, like `add()`. The `subtract()` method should subtract its argument from the calculator's value, and `multiply()` should multiply its argument by the current value. Each should print a single line of output describing the arithmetic operation, its inputs, and result:

  ```java
  Calculator c;
  c = new Calculator(20);
  c.multiply(3);
  > 20 * 3 = 60

  c.subtract(10);
  > 60 - 10 = 50

  c.multiply(2);
  > 50 * 2 = 100
  ```

- Now it's time to implement `divide()`. It should work like the other three arithmetic methods, but with two major differences: First, it should print an error message if the divisor is zero, and when this the case, your code must skip carrying out the division and simply clear the calculator's current value.

  Second, your calculator should print a warning message if the division is valid (nonzero divisor) but will result in a loss of precision. Since our calculator only works with integers, some divisions will cause the result to be truncated, that is, the fraction portion gets thrown out. For instance, 16 divided by 3 should put 5 as its the current value and output a precision-loss warning.

  ```java
  Calculator c;
  c = new Calculator(40);
  c.divide(2);
  > 40 / 2 = 20

  c.divide(3);
  > Warning: division resulted in loss of precision.
  > 20 / 3 = 6

  c.divide(2);
  > 6 / 2 = 3

  c.divide(-1);
  > 3 / -1 = -3

  c.divide(0);
  > Error: division by zero -- value cleared.
  > -3 / 0 = 0
  ```

- Now implement a method called `square()`, which takes no arguments and will square the current value. Hint: You are reminded that you should reuse code where possible...

  ```java
  Calculator c = new Calculator(1);
  c.add(1);
  > 1 + 1 = 2

  c.square();
  > 2 * 2 = 4

  c.square();
  > 4 * 4 = 16

  c.square();
  > 16 * 16 = 256
  ```

- Next, implement the memory operations. Start with `store()`, which takes no arguments, but causes the calculator's current value to be stored in a memory location. (Hint: You'll need to add a new field to your class.) Then implement `recall()`, which takes no arguments, but causes the stored value to replace the calculator's current value. Also note the expected print-out. For example:

  ```java
  Calculator c;
  c = new Calculator(20);
  c.add(3);
  > 20 + 3 = 23

  c.store();
  > 23 --> mem

  c.multiply(5);
  > 23 * 5 = 115

  c.recall();
  > mem --> 23

  c.add(10);
  > 23 + 10 = 33
  ```

- Add a new method `exchange()` that exchanges the value stored in the calculator's memory with the calculator's current value. Also note the expected print-out. For example:

  ```java
  Calculator c;
  c = new Calculator(20);
  c.store();
  > 20 --> mem

  c.add(10);
  > 20 + 10 = 30

  c.exchange();
  > 20 <--> 30

  c.add(1);
  > 20 + 1 = 21

  c.recall();
  > mem --> 30
  ```

#### Extending the Homework

There's no extra credit for these extensions, but completing one or more will help you achieve enlightenment.

- Implement a method called `cube()`, which takes no arguments and will cube the current value.

- Define additional methods that add functionality to your calculator (e.g., square root, sin, etc.). You've seen how to take square roots using `Math.sqrt()`, but you can learn more about how to get Java to calculate the remaining functions by reading the [online documentation](http://docs.oracle.com/javase/7/docs/api/java/lang/Math.html) for the `Math` class.

#### Grading

```
This assignment will be graded out of a total of 70pts.

[5pts] Appropriate fields have been defined for this class.

[10pts] Both constructors are properly implemented.

[15pts] The add, substract, and multiply method have been implemented.

[5pts] The square method have been implemented, and reuses code you've already written.

[15pts] The divide has been implemented without runtime bugs. Appropriate error and warning
        messages are printed.

[10pts] The recall and store methods have been implemented.

[5pts] The exchange method has been implemented.

[5pts] You include sufficient inline and block comments to explain the logic of your methods.
```

#### Submitting Your Assignment

After you have completed the assignment, use the following to submit your work.
Exit BlueJ

- Open your computer's File Finder (some times called File Explorer). Locate the project folder.

- Right-click on the project folder, then:

  - If using Windows, select Send to then Zip file
  - If using MacOS, select Compress ... items
  - This step takes your selected creates a .zip file that you will submit to me.

  It's really important you got this right. If you have doubts, ask one of us to check for you! I recommend that you double-check by opening the zip file, and investigating the contents to ensure that all the files are in there.

- Navigate to our course page on Canvas and click on the assignment to which you are submitting.

- Click on Submit Assignment, and you should be able to "browse" for your file

- Select the `.zip` you just created, and click Submit Assignment again to upload it.

- You may submit as often as you'd like before the deadline. I will grade the most recent copy.

#### Credits

Adapted for use from a previous assignment by Brad Richards. Shape classes provided by BlueJ.
