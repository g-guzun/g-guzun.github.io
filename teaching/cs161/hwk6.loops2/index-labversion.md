## CS 161 - Intro to Computer Science

### Homework: Loops and Arrays

In this assignment, you'll be working with arrays, loops, and nested loops. 

**READ THIS** Before we get started, it should be noted that I do not expect you to complete this lab within the period. You will get credit for attending and for making progress. So **don't get discouraged or frustrated** -- this can be a particularly difficult assignment because we're still at the point where we're trying to wrap our minds around loops and arrays!

#### Student Outcomes

- Exposure to writing loops (and nested loops).
- Exposure to arrays.

#### Instructions


You can view any problems you weren't able to solve during the lab period as review problems -- they are a good study tool. 

Open BlueJ and create a new project. Create a new class and name it `LoopsLab`. This class will not have any fields or constructors.

##### Part I: Arrays and Loops

Let's work on a couple methods that input arrays. The problems in this section can be solved *without* using nested loops.

1. **(Arrays + Loop)**  Write a method called `countEvens()` which inputs an integer array and returns the number of even integers in the array. Here are some things that can help.

    - An array of integers is declared using: `int[] arrayName`
    - You can always find the length of the array using: `arrayName.length`
    - To access a certain element of the array, use `arrayName[pos]` where `pos` is the integer address of the element you seek.

    If you got everything to work, here's a sample output of what it should look like on code pad:

    ```java
    LoopsLab loopie = new LoopsLab();
    int[] list1 = {-4, -1, 2, 3, 4, 5, 6, 6};
    System.out.println(loopie.countEvens(list1));
    > 5

    int[] list2 = {};
    System.out.println(loopie.countEvens(list2));
    > 0
    ```

2. **(Arrays + Loop)** Write a method called `rotateRight()` that inputs an array of Strings and shifts every element in the array one position to the right. The right-most item would then jump to the first position. 

    ```java
    import java.util.Arrays;  // this is for printing arrays

    LoopsLab loopie = new LoopsLab();
    String[] list1 = {"A", "B", "C", "D", "E"};
    System.out.println(Arrays.toString(loopie.rotateRight(list1)));
    > [E, A, B, C, D]

    String[] list2 = {};
    System.out.println(Arrays.toString(loopie.rotateRight(list2)));
    > []
    ```

##### Part II: Nested Loops
Let's try our hand at writing some nested loops.

1. **(Nested Loops)** `printRightTriangle()` which inputs an integer `n` and does not return. It prints a right triangle (see below) of height and base of size `n`, with the straight edge facing east. Hint: For each row `r`, you must determine how many spaces followed by how many asterisks... might them both be some function of `r`? Ignore negative input.

    ```java
    LoopsLab loopie = new LoopsLab();
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

2. **(Nested Loops)** `reveal()` which inputs an integer `n` and returns a String. It gradually reveals each number 1, 2, 3, ..., up to `n`, on each line (see below). This method requires a nested loop. Ignore negative input. 

    ```java
    LoopsLab loopie = new LoopsLab();
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

##### Part III: Arrays + Nested Loops
The ones below are more challenging, but give it a go!


1. **(Arrays + Nested Loops)** Write a method called `barGraph()` which inputs an integer array and prints a horizontal bar graph based on the contents of that array. Say the array `[3, 6, 4]` is input. Your method should print 3 asterisks on the first line, followed by 6 asterisks on the next line, followed by 4 asterisks on the last line. You may assume all values in the array are nonnegative. Here's an example:

    ```java
    LoopsLab loopie = new LoopsLab();
    int[] list1 = {6, 4, 3, 5, 6};
    loopie.barGraph(list1);
    ******
    ****
    ***
    *****
    ******

    int[] list2 = {5};
    loopie.barGraph(list2);
    *****
    ```


2. **(Arrays + Nested Loops)** Write a method called `median()` which inputs an integer array and returns the median. The median of an array is defined to be the value in the list that has an equal number of values larger and smaller than itself. For instance, the median of `[3, 5, 7, 3, 9, 8, 2]` is `5`, because there are three numbers less than 5, and three numbers greater than 5. For each value `x[i]` in the array `x`, you need to traverse the array again (skipping itserlf) and count up the values greater than and less than `x[i]` (keep two counters). If these counters are equal, then return `x[i]` to be the median.

    - The algorithm described above only works for odd-length arrays, so make sure you use those for input while testing. (How would you modify your algorithm to work with even-length arrays?)

      ```java
      LoopsLab loopie = new LoopsLab();
      int[] list1 = {6, 3, 5, 6, 4};
      System.out.println(loopie.median(list1));
      > 4

      int[] list2 = {7};
      System.out.println(loopie.median(list2));
      > 7
      ```

##### Challenges
If you've got a good grasp on this stuff, and want a real challenge. Try this one.

- **(Arrays + Nested Loops: challenging)** Write a method called `vertBarGraph()` which does the same as above, but prints a vertical bar graph. This method can be quite challenging. Give it your best shot! Here's an example of what it does.

  ```java
  LoopsLab loopie = new LoopsLab();
  int[] list1 = {6, 3, 4, 5, 6};
  loopie.vertBarGraph(list1);
  *       *
  *     * *
  *   * * *
  * * * * *
  * * * * *
  * * * * *
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
