## CS 161 - Intro to Computer Science

### Homework: Nested Loop Practice

In this assignment, you'll be working with loops. It helps to use the David's 4-Step Process for Writing Loops handout I passed out to you in class.

#### Student Outcomes

- Exposure to writing loops, especially nested loops.

#### Instructions

- Open BlueJ and create a new project. Create a new class and name it `NestedLoops`. This class will not have any fields or constructors.  Write the following methods:
  `

- **(Nested)** `printDownTriangle()` which inputs an integer `n` and does not return. It prints a right triangle (see below) of height and base of size `n`, with the straight edge facing east. This method requires a nested loop.

  If you typed the following into BlueJ's code pad, you should get the corresponding results.

  ```java
  NestedLoops loopie = new NestedLoops();
  loopie.printDownTriangle(4);
  ****
  ***
  **
  *

  loopie.printDownTriangle(10);
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

- **(Nested)** `printRightTriangle()` which inputs an integer `n` and does not return. It prints a right triangle (see below) of height and base of size
  `n`, with the straight edge facing east. This method requires a nested loop.

  ```java
  NestedLoops loopie = new NestedLoops();
  loopie.printRightTriangle(5);
      *
     **
    ***
   ****
  *****

  loopie.printRightTriangle(10);
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

- **(Nested)** `reveal()` which inputs an integer `n` and returns a String. It gradually reveals each number 1, 2, 3, ..., up to `n`, on each line (see below). This method requires a nested loop. Ignore negative input. Recall that `"\n"` can be used to symbolize a "newline" character.

  ```java
  NestedLoops loopie = new NestedLoops();
  System.out.println(loopie.reveal(4));
  1---
  12--
  123-
  1234

  System.out.println(loopie.reveal(8));
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

  NestedLoops loopie = new NestedLoops();
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

#### Program Defensively

You can't control how another user or program chooses to use your methods. For each method, think critically about all the things that could go wrong and cause an unintended result (e.g., a runtime error, infinite loop/recursion, etc.). Chances are, I'll be trying all kinds of inputs (negative values, zeroes, nulls, empty-strings, etc.) when I grade your program. The mark of a good programmer is one that can anticipate such scenarios ahead of time and ensure that their program handles all sorts of errors gracefully.

#### Commenting

Each and every method should have a "javadoc-style" comment above it (the ones that use `/* ... */`). For full credit, you should use the @param and @return tags as appropriate in these method comments. Each instance variable (field) should have a brief comment as well. Don't forget the main comment at the top of the class either - I'm looking for more than just a sentence or two.

#### Grading

```
This assignment will be graded out of a total of 60pts.

[10pts] printDownTriangle is implemented.

[10pts] printRightTriangle is fully implemented.

[15pts] reveal is implemented. It inputs a positive integer, n, and prints n lines
of output. Each line of output reveals one more digit.

[20pts] rotate is properly implemented. If N > 0, it should shift every item in the 
array one position to the right, and the right-most item would jump to the left-most 
spot. If N < 0, then it should go the reverse direction.

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
