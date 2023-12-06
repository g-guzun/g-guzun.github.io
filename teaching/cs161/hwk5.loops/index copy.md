## CS 161 - Intro to Computer Science

### Homework: Loop Practice

In this assignment, you'll be working with loops. It helps to use the David's 4-Step Process for Writing Loops handout I passed out to you in class.

#### Student Outcomes

- Exposure to writing loops and nested loops.

#### Instructions

- Open BlueJ and create a new project called `Hwk5_Loops`. This class will not have any fields or constructors. You'll just be writing and testing various methods.Write the following methods:

- **(Not nested)** `stringRepeat()` which inputs a String `str` and an integer `num`. It returns a String in which `str` is
  is appended to itself `num` times. An empty string should be returned if `nums <= 0`.

  ```java
  Loops loopie = new Loops();
  System.out.println(loopie.stringRepeat("#", 5));
  > #####

  System.out.println(loopie.stringRepeat("wuff ", 3));
  > wuff wuff wuff

  System.out.println(loopie.stringRepeat("#", 1));
  > #

  System.out.println(loopie.stringRepeat("#", 0));
  >

  System.out.println(loopie.stringRepeat("#", -5));
  >

  System.out.println(loopie.stringRepeat(loopie.stringRepeat("!", 2), 4));
  > !!!!!!!!
  ```

- **(Not nested)** Write a method called `hammingDistance` that inputs two equal-length strings, and returns the number of positions in which the two strings differ. Return `-1` if the two strings are not of equal length. Have the String API handy to help you.

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

- **(Not nested)** `multiply()` which inputs two integers `A` and `B` and returns the product from multiplying them together. Your solution must use a loop to add `A` together `B` times (or vice versa). It must also handle negative inputs. Your loops can iterate at most `|A|` or `|B|` times, and ensure that your solution does not rely on integer overflow. Nested loops are not necessary for this problem. As an optional challenge, can you do this with only one loop?

  ```java
  Loops l = new Loops();
  System.out.println(l.multiply(3,4));
  > 12
  System.out.println(l.multiply(19,0));
  > 0
  System.out.println(l.multiply(0,19));
  > 0
  System.out.println(l.multiply(-2,9));
  > -18
  System.out.println(l.multiply(10,-9));
  > -90
  System.out.println(l.multiply(-4,-5));
  > 20
  ```

- **(Not nested)** `findPrimes()` inputs an integer `n` and prints the first `n` prime numbers, beginning with `2`. (We had written a prime number checker in class. Use it!) This method requires just a single loop if you use the `isPrime()` method we wrote in class.

  ```java
  Loops l = new Loops();
  l.findPrimes(5);
  2
  3
  5
  7
  11

  l.findPrimes(1);
  2

  l.findPrimes(0);
  (no output)

  l.findPrimes(10);
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

- **(Nested)** `printDownTriangle()` which inputs an integer `n` and does not return. It prints a right triangle (see below) of height and base of size `n`, with the straight edge facing east. This method requires a nested loop.

  ```java
  Loops l = new Loops();
  l.printDownTriangle(4);
  ****
  ***
  **
  *

  l.printDownTriangle(10);
  **********
  *********
  ********
  *******
  ******
  *****
  ****
  ***
  **
  *
  ```

  - **(Nested)** `reveal()` which inputs an integer `n` and returns a String. It gradually reveals each number 1, 2, 3, ..., up to `n`, on each line (see below). This method requires a nested loop. Ignore negative input. Recall that `"\n"` can be used to symbolize a "newline" character.

  ```java
  Loops l = new Loops();
  System.out.println(l.reveal(4));
  1---
  12--
  123-
  1234

  System.out.println(l.reveal(8));
  1-------
  12------
  123-----
  1234----
  12345---
  123456--
  1234567-
  12345678
  ```

- **(Nested, involves arrays)** Write a method called `rotate()` that inputs an array of Strings and an integer `N`. If `N > 0`, your method should shift every item in the array one position to the right, and the right-most item would jump to the left. If `N < 0`, you'll want to do the same, but move all items to the left, with left-most item jumping to the right. Complete this rotation `|N|` times. Your method should return the rotated array. (Hint: Start by focusing on writing a loop that can perform a single rotation, shifting each number one spot left/right).

  ```java
  import java.util.Arrays;  // this is for printing arrays

  Loops loopie = new Loops();
  String[] arr = {"A", "B", "C", "D", "E"};
  System.out.println(Arrays.toString(loopie.rotate(arr, 1)));
  > [E, A, B, C, D]

  System.out.println(Arrays.toString(loopie.rotate(arr, 2)));
  > [C, D, E, A, B]

  System.out.println(Arrays.toString(loopie.rotate(arr, -3)));
  > [A, B, C, D, E]

  System.out.println(Arrays.toString(loopie.rotate(arr, 0)));
  > [A, B, C, D, E]
  ```

#### Additional Practice Problems

These won't fetch you any extra credit, but I strongly recommend students to complete all of these as well for preparation of future materials.

- **(Involves arrays)** Write a method called `instancesOf()` that inputs an array of integers, an integer `M`, and an integer
  `N`. This method returns a boolean true if it can find exactly `N` copies of `M` in the array, and false otherwise.

  ```java
  import java.util.Arrays;  // this is for printing arrays

  Loops loopie = new Loops();
  int[] arr = {10,0,40,40,30,20,20,50,20}
  System.out.println(loopie.instancesOf(arr, 50, 1));
  > true

  System.out.println(loopie.instancesOf(arr, 20, 1));
  > false

  System.out.println(loopie.instancesOf(arr, 20, 3));
  > true
  ```

- **(Involves arrays)** Write a method called `max()` that inputs an array of integers. This method returns the largest number in the array.

  ```java
  Loops loopie = new Loops();
  int[] arr = {10,0,40,40,30,20,20,50,20};
  System.out.println(loopie.max(arr));
  > 50
  ```

- **(Involves arrays)** Write a method called `isSorted()` that inputs an array of integers, and returns true if the array is in ascending order.

  ```java
  Loops loopie = new Loops();

  int A[] = {2,4,6,8,10};
  System.out.println(loopie.isSorted(A));
  > true

  int B[] = {10};
  System.out.println(loopie.isSorted(B));
  > true

  int C[] = {30,40,10,50,60};
  System.out.println(loopie.isSorted(C));
  > false
  ```

- **(Involves arrays)** Write a method called `merge()` that inputs two arrays of integers which are both guaranteed to be sorted in ascending order (you can assume so). This method combines the two arrays into a single array in ascending order.

  ```java
  import java.util.Arrays;  // this is for printing arrays

  Loops loopie = new Loops();
  int[] A = {2,4,6,8,10};
  int[] B = {1,3,5};

  System.out.println(Arrays.toString(loopie.merge(A,B)));
  > [1,2,3,4,5,6,8,10]
  ```



#### Extra Credit Opportunity

Completion of each of the following will yield +1 point per question on your lowest midterm exam.
I strongly recommend students to complete all of these as well for preparation of future materials.

- **(Not nested; involves arrays)** Write a method called `instancesOf()` that inputs an array of integers, an integer `M`, and an integer
  `N`. This method returns a boolean true if it can find exactly `N` copies of `M` in the array, and false otherwise.

  ```java
  import java.util.Arrays;  // this is for printing arrays

  Loops loopie = new Loops();
  int[] arr = {10,0,40,40,30,20,20,50,20}
  System.out.println(loopie.instancesOf(arr, 50, 1));
  > true

  System.out.println(loopie.instancesOf(arr, 20, 1));
  > false

  System.out.println(loopie.instancesOf(arr, 20, 3));
  > true
  ```

- **(Not nested; involves arrays)** Write a method called `max()` that inputs an array of integers. This method returns the largest number in the array.

  ```java
  Loops loopie = new Loops();
  int[] arr = {10,0,40,40,30,20,20,50,20};
  System.out.println(loopie.max(arr));
  > 50
  ```

- **(Nested)** `printRightTriangle()` which inputs an integer `n` and does not return. It prints a right triangle (see below) of height and base of size
  `n`, with the straight edge facing east. This method requires a nested loop.

  ```java
  Loops l = new Loops();
  l.printRightTriangle(5);
      *
     **
    ***
   ****
  *****

  l.printRightTriangle(10);
           *
          **
         ***
        ****
       *****
      ******
     *******
    ********
   *********
  **********
  ```

- **(Not nested, involves arrays)** Write a method called `isSorted()` that inputs an array of integers, and returns true if the array is in ascending order.

  ```java
  Loops loopie = new Loops();

  int A[] = {2,4,6,8,10};
  System.out.println(loopie.isSorted(A));
  > true

  int B[] = {10};
  System.out.println(loopie.isSorted(B));
  > true

  int C[] = {30,40,10,50,60};
  System.out.println(loopie.isSorted(C));
  > false
  ```

- **(Not nested, involves arrays)** Write a method called `merge()` that inputs two arrays of integers which are both guaranteed to be sorted in ascending order (you can assume so). This method combines the two arrays into a single array in ascending order.

  ```java
  import java.util.Arrays;  // this is for printing arrays

  Loops loopie = new Loops();
  int[] A = {2,4,6,8,10};
  int[] B = {1,3,5};

  System.out.println(Arrays.toString(loopie.merge(A,B)));
  > [1,2,3,4,5,6,8,10]
  ```

#### Program Defensively

You can't control how another user or program chooses to use your methods. For each method, think critically about all the things that could go wrong and cause an unintended result (e.g., a runtime error, infinite loop/recursion, etc.). Chances are, I'll be trying all kinds of inputs (negative values, zeroes, nulls, empty-strings, etc.) when I grade your program. The mark of a good programmer is one that can anticipate such scenarios ahead of time and ensure that their program handles all sorts of errors gracefully.

#### Commenting

Each and every method should have a "javadoc-style" comment above it (the ones that use `/* ... */`). For full credit, you should use the @param and @return tags as appropriate in these method comments. Each instance variable (field) should have a brief comment as well. Don't forget the main comment at the top of the class either - I'm looking for more than just a sentence or two.

#### Grading

```
This assignment will be graded out of a total of 80pts.

[5pts] stringRepeat is properly implemented. It returns the product of two given ints.
It works with negative inputs.

[5pts] hammingDistance is properly implemented. It returns the number of spots where
two strings differ.

[10pts] multiply is properly implemented. It returns the product of two given ints.
It works with negative inputs.

[10pts] findPrimes is implemented. It inputs a positive integer, n, and prints the first
n primes, each on a separate line..

[10pts] printDownTriangle is implemented.

[15pts] reveal is implemented. It inputs a positive integer, n, and prints n lines
of output. Each line of output reveals one more digit.

[20pts] rotate is properly implemented. If N > 0, it should shift every item in the array one position
to the right, and the right-most item would jump to the left-most spot. If N < 0, then it should go the
reverse direction,

Misc.
    [5pts] You provide Javadocs style comments for any new methods implemented. You include
           sufficient inline comments to explain the logic of your methods.
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

Written by David Chiu.
