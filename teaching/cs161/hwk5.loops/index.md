## CS 161 - Intro to Computer Science

### Homework: Loop Practice (The Basics!)

In this assignment, you'll be working with loops. It helps to use the David's 4-Step Process for Writing Loops handout I passed out to you in class.

#### Student Outcomes

- Exposure to writing simple loops.

#### Instructions

- Open BlueJ and create a new project called `Hwk5_Loops`. This class will not have any fields or constructors. You'll just be writing and testing various methods. 

- Before you start, read through each of the prompts and decide if it is a **counter-controlled** loop or an **event-controlled* loop. Once you've determined the type of loop, go back to your notes and use the 4-step template that I provided you for writing each loop type.

<!-- - Write `stringRepeat()` which inputs a String `str` and an integer `num` respectively. It returns a String in which `str` is
  is appended to itself `num` times. An empty string should be returned if `nums <= 0`.

  If you typed the following into BlueJ's code pad, you should get the corresponding results.

  ```java
  Loops loopie = new Loops();
  System.out.println(loopie.stringRepeat("David", 5));
  > DavidDavidDavidDavidDavid

  System.out.println(loopie.stringRepeat("wuff ", 3));
  > wuff wuff wuff

  System.out.println(loopie.stringRepeat("David", 1));
  > David

  System.out.println(loopie.stringRepeat("$", 0));
  >

  System.out.println(loopie.stringRepeat("$", -5));
  >

  System.out.println(loopie.stringRepeat(loopie.stringRepeat("!", 2), 4));
  > !!!!!!!!
  ``` -->

#### Problems

1. We'll start with an easy one, and I'll guide you through it. The famous **Collatz conjecture** is stated as follows. Given a positive integer `n`, divide `n` by 2 if it is even, otherwise, multiply `n` by 3 and add 1 to it. If you do this repeatedly, the Collatz conjecture states that `n` will eventually reach 1. (Interestingly, this conjecture still has not been proven, but no one has been able to find a counter-example.) Write a method called `collatz` that inputs a positive integer `n` and prints the sequence by which `n` reaches 1. (Fun fact: The numbers that appear in a sequence are also called "Hailstone Numbers.")

    Clues:
    - This is an event-controlled loop. The event we're hoping eventually occurs is `n == 1`.
    - Being an event-controlled loop, there is no need for a separate counter.
    - The looping condition is the **negation** of the event.

    Output:

    ```java
    Loops loopie = new Loops();
    loopie.collatz(1);
    1

    loopie.collatz(2);
    2
    1

    loopie.collatz(3);
    3
    10
    5
    16
    8
    4
    2
    1
    ```

2. Write a method called `runningSum` that inputs two integers `low` and `high`, and adds all numbers between `low` to `high` (inclusive), and returns this sum. If `low` is greater than `high`, then you must exchange these values before proceeding with the summation.

    Clues:
    - Hmm there seems to be a definite beginning and end to this problem.

    ```java
    Loops loopie = new Loops();
    System.out.println(loopie.runningSum(0,1));
    > 1
    
    System.out.println(loopie.runningSum(9,9));
    > 9
    
    System.out.println(loopie.runningSum(1,100));
    > 5050
    
    System.out.println(loopie.runningSum(100,1));
    > 5050
    
    System.out.println(loopie.runningSum(500,-500));
    > 0

    System.out.println(loopie.runningSum(-1000,-150));
    > -489325
    ```

3. Write a method called `hammingDistance` that inputs two equal-length strings, and returns the number of positions in which the two strings differ. Return `-1` if the two strings are not of equal length. Have the **String API** handy to help you out. Particularly, you will need a way to extract an individual character out of both strings and compare them. You will also need to a way to determine the length of a string to see if you even need to proceed with count. 

    ```java
    Loops loopie = new Loops();
    System.out.println(loopie.hammingDistance("01010101", "10101010"));
    > 8

    System.out.println(loopie.hammingDistance("David", "Davis"));
    > 1

    System.out.println(loopie.hammingDistance("david", "Davis"));
    > 2

    System.out.println(loopie.hammingDistance("david", ""));
    > -1

    System.out.println(loopie.hammingDistance("Grace", "Grace"));
    > 0
    ```

4. Write `multiply()` which inputs two integers `A` and `B` and returns the product from multiplying them together. Your solution must use a loop to add `A` together `B` times (or vice versa). It must also handle negative inputs. Your loops can iterate at most `|A|` or `|B|` times, and ensure that your solution does not rely on integer overflow. Nested loops are not necessary for this problem. As an optional challenge, can you do this with only one loop?

    ```java
    Loops loopie = new Loops();
    System.out.println(loopie.multiply(3,4));
    > 12

    System.out.println(loopie.multiply(19,0));
    > 0
    
    System.out.println(loopie.multiply(0,19));
    > 0
    
    System.out.println(loopie.multiply(-2,9));
    > -18
    
    System.out.println(loopie.multiply(10,-9));
    > -90
    
    System.out.println(loopie.multiply(-4,-5));
    > 20
    ```

5. Write `findPrimes()` inputs an integer `n` and prints the first `n` prime numbers, beginning with `2`. (We had written a prime number checker in class. Use it!) This method requires just a single loop if you use the `isPrime()` method we wrote in class.

    ```java
    Loops loopie = new Loops();
    loopie.findPrimes(5);
    2
    3
    5
    7
    11

    loopie.findPrimes(1);
    2

    loopie.findPrimes(0);
    (no output)

    loopie.findPrimes(10);
    2
    3
    5
    7
    11
    13
    17
    19
    23
    29
    ```

6. Write a method `String decimal2Binary(int num)` that inputs a non-negative integer, and returns the binary representation of that integer. You may assume that the input is non-negative. You might remember the algorithm from class: If `num` is 0, simply return the string `"0"` and you're done (zero is just 0 in both binary and in decimal!). Otherwise, divide `num` by `2`. The remainder, which is either a one or zero, is appended to the *left* of the current binary string. Repeat these steps until `num` reduces to 0.

    ```java
    Loops loopie = new Loops();
    loopie.decimal2Binary(0)
    > "0"   (String)

    loopie.decimal2Binary(1)
    > "1"   (String)

    loopie.decimal2Binary(5)
    > "101"

    loopie.decimal2Binary(6)
    > "110"

    loopie.decimal2Binary(7)
    > "111"

    loopie.decimal2Binary(55)
    > "110111"

    loopie.decimal2Binary(256)
    > "100000000"
    ```

#### Extra Challenge
For no extra credit points, write the method `int binary2Decimal(String num)` that converts a binary number to an integer in base 10. For your reference, to take 2 to the *ith* power, you can use the method `Math.pow(2,i)`.

  ```java
  Loops loopie = new Loops();
  loopie.binary2Decimal("0")
  > 0   (int)

  loopie.binary2Decimal("1")
  > 1   (int)

  loopie.binary2Decimal("100")
  > 4   (int)

  loopie.binary2Decimal("1001")
  > 9   (int)

  loopie.binary2Decimal("1010")
  > 10   (int)

  loopie.binary2Decimal("1011")
  > 11   (int)

  loopie.binary2Decimal("1010100")
  > 84   (int)
  ```

#### Program Defensively

You can't control how another user or program chooses to use your methods. For each method, think critically about all the things that could go wrong and cause an unintended result (e.g., a runtime error, infinite loop/recursion, etc.). Chances are, I'll be trying all kinds of inputs (negative values, zeroes, nulls, empty-strings, etc.) when I grade your program. The mark of a good programmer is one that can anticipate such scenarios ahead of time and ensure that their program handles all sorts of errors gracefully.

#### Commenting

Each and every method should have a "javadoc-style" comment above it (the ones that use `/* ... */`). For full credit, you should use the @param and @return tags as appropriate in these method comments. Each instance variable (field) should have a brief comment as well. Don't forget the main comment at the top of the class either - I'm looking for more than just a sentence or two.

#### Grading

```
This assignment will be graded out of a total of 65pts.

[10pts] runningSum() is properly implemented. It returns the sum of all numbers between
low and high, inclusive. If low is greater than high, then you should exchange those
values.

[10pts] collatz() is properly implemented. It prints out the collatz sequence from the 
given positive integer n to 1.

[10pts] hammingDistance() is properly implemented. It returns the number of spots where
two strings differ.

[10pts] multiply() is properly implemented. It returns the product of two given ints.
It works with negative inputs.

[10pts] findPrimes() is implemented. It inputs a positive integer, n, and prints the first
n primes, each on a separate line.

[10pts] decimal2Binary() is implemented. 

Misc.
    [5pts] You provide Javadocs style comments for any new methods implemented. You include
           sufficient inline comments to explain the logic of your methods.
```

#### Submitting Your Assignment
Follow these instructions to submit your work. You may submit as often as you'd like before the deadline. I will grade the most recent copy.

- Navigate to our course page on Canvas and click on the assignment to which you are submitting. Click on "Submit Assignment."

- Upload all the files ending in `.java` from your project folder.

- Click "Submit Assignment" again to upload it.

#### Credits

Written by David Chiu.
