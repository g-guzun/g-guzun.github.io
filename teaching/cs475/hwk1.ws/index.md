## CS 161 - Intro to Computer Science

### Hwk: Getting Started on C

This is the first part of a multi-part primer on C, a lower-level language that is commonly used in systems programming. This tutorial is written for students who have prior experience in another language (say, Java), so you will often see me making comparisons to language features found in Java.

#### ZyBooks Reading

- Chap 3: data types and variables
- Chap 6: arrays
- Chap 7: strings
- Chap 8: functions

#### Student Outcomes

- To become familiar with the programming environment
- To become familiar with compiling single-source C programs.
- To become familiar with C's supported data types, arrays (and strings), function writing, structs, and input/output functions.

#### Instructions

Open your VS Code and get connected to your Remote Development environment. If you don't know what I'm referring to, complete [Hwk 0](../hwk0.vscode).

  - Once you're logged in, you can open a terminal from the `Terminal` menu.

##### Part I: The Basics

- From your shell, create a directory to store your first program. Let's call this directory `learningTypes/`.

  ```bash
  $ mkdir learningTypes
  ```

- Now navigate inside this directory:

  ```bash
  $ cd learningTypes
  ```
- Now let's create a new file using the VSCode editor.

  ```bash
  $ code types.c
  ```

  Paste in the following code, and we'll discuss what each line means later in this assignment.

  ```c
  /**
   * A simple C program
   *
   * @author David
   */

  #include <stdio.h>

  #define VAL 0
  #define PI 3.14

  int main(int argc, char *argv[])
  {
      char a = 'X';
      int b = 9;
      float c = 6;
      double d = 0;
      char str[] = "Hello world!";

      if (VAL == d)
      {
          printf("Value of a is %c\n", a);
          printf("Value of b is %d\n", b);
          printf("Value of c is %f\n", c);
          printf("Value of d is %f\n", d);
          printf("Value of str is %s\n", str);

          //printf can input varying amounts of arguments
          printf("Values of a, b, and c are %c, %d, and %f\n", a, b, c);

          //controlling floating point output
          printf("c/b is: %f\n", c/b);
          printf("c/b is: %0.0f\n", c/b);
          printf("c/b is: %25.3f\n", c/b);
          printf("c/b is: %0.9f\n", c/b);

          //obtaining input
          printf("Enter a character: ");
          scanf("%c", &a);
          printf("Enter an integer: ");
          scanf("%d", &b);
          printf("You entered %c and %d\n", a, b);
          printf("Enter an float: ");
          scanf("%f", &c);
          printf("You entered %f\n", c);
      }
      return 0;
  }
  ```

- Save this file, and return to the Terminal to compile it:

  ```bash
  $ gcc -Wall -g -o hello hello.c
  ```

  The `gcc` command runs the C compiler. Let's unpack all the flags:
    - `-Wall` means to report all warnings to the output
    - `-g` generates debugging information for tools that we'll use later
    - `-o hello` gives the name of the executable file to output
    - `hello.c` is the name of the source file

  Now run it, which prints this to the screen:

  ```bash
  $ ./hello
  Value of a is X
  Value of b is 9
  Value of c is 6.000000
  Value of d is 0.000000
  Value of str is Hello world!
  Values of a, b, and c are X, 9, and 6.000000
  c/b is: 0.666667
  c/b is: 1
  c/b is:                     0.667
  c/b is: 0.666666687
  Enter a character: h
  Enter an integer: 8
  You entered h and 8
  Enter a float: 30
  You entered 30.000000
  ```

- Referring back to the `types.c` source code:

  - **Lines 7-10**: are called preprocessor directives. The `#include <stdio.h>` is like an `import` statement in Java. The `stdio.h` library provides many useful functions for input/output. The `#define <name> [value]` directive defines constant with an optional value.

  - **Line 12**: In C, the only necessary function you need to write is `main()`. Its functionality is the same as Java's `main()` method, in that, it's where the program execution begins. Studying its declaration, we find that it returns an `int` and like Java, it allows arguments to be input directly from the command-line (more on command-line arguments later).
  
  - **Lines 14 to 18**: defines some local variables. C supports: `char` (8-bits), `int` (32-bits), `float` (32-bits), and `double` (64-bits). Finally, note that strings in C are simply `char` arrays (more on strings later).
  
  - **Line 20**:  Unlike Java, there is no `boolean` data type in C, nor are there `true` and `false` keywords. **Know this:** In C, any value other than the integer value `0` is assumed to be true. An integer value of `0` is false!!
  
  - **Lines 22-26**: uses the `printf()` function (provided in `stdio.h`) to print. The first argument is a formatted string, followed by any number of values to be inserted into the formatted string. It is worth spending some time understanding C's **format specifiers** (those `%` thingies). Here are some common format specifiers:
    - `%c` - a character
    - `%d` - a signed integer
    - `%u` - an unsigned integer
    - `%f` - a floating point number
    - `%s` - a string
  
  - **Lines 32-35**: shows that you can further format the above specifiers by prefixing it with `width.precision` modifier. For example, if left without a modifier (Line 32) `printf()` rounds up to six places after the floating point. Line 33 tells `printf()` to display 0 left-margin and display no values after the decimal, causing it to round 0.666667 up to 1. Line 34 specifies a `width`, which left-justifies the output to begin on the 25th place, rounded up to the third decimal place. Finally, Line 35 tries to output to the ninth decimal place, but here, you can see that floats can only be trusted up to six decimal places.
  
  - **Lines 38-41**: shows how we might obtain user-input with `scanf()`, which inputs a format string, and a reference to the address of the variable where the input should be stored. Let's study Line 39 in particular. The first argument, `%c` tells `scanf()` to read in the next `char` from the input stream. It will ignore white-spaces until it reaches a character, then reads until the next white-space is encountered. The data is then stored in the variable `a`.
  
    - Important: In C the `&` operator is known as the address-of operator when it prefixes a variable var. It give the variable's location in memory (what data type do you think `&var` gives?)

  - **Line 44**: returns `0` before exiting the program. This value is not arbitrary -- the `0` signifies a normal exit, while a non-zero value indicates an error.

- **Do these exercises (not graded):**

  - Edit the `types.c` program so that you input a string from the user, and read it into str using `scanf()`. What happens when there's a white-space in your input? What happens when you try to read a string whose length is longer than 12? (Hint: The original string is length 12).

  - Write a program `temperature.c` that prompts the user for a temperature in Fahrenheit, and converts it to Celsius. Round temperatures off to the nearest hundredth degree.

  - Update `temperature.c` so that it asks the user whether they'd like to do another conversion after each conversion. If the user enters `'y'` then perform another conversion, exit the program if the user enters `'n'`, and if the user enters neither of those options, prompt again. (Hint: C's while-loop syntax is exactly the same as Java's).

##### More about `char`

It is worth giving special attention to the char data type. A `char` is essentially an 8-bit integer. That means chars can represent $$2^8 = 256$$ numbers, and each map to a unique character under the ASCII standard. Below I list a few notable mappings, but click here to see the [full list of ASCII codes](https://www.asciitable.com/).

- Do not confuse the character, `'0'` (which has an ASCII integer value of `48`), with `'\0'` (which has an ASCII integer value of 0). The character `\0` is called the "NULL character" and it plays a big role with C strings.

- To see that `char`s are really stored numerically, you can print them out using the `%d` formatter to view their ASCII values. You can even type-cast `int`s into `char`s, and vice versa.

  ```c
  printf("%c = %d\n", 'A', 'A');  //prints A = 65
  printf("%c = %d\n", 'a', 'a');  //prints a = 97

  //casting an int to a char
  int x = 33;
  char c = (char) x;  // cast 33 to a char
  printf("%c\n", c);  // prints '!'

  //casting char to an int
  c = '#';
  x = (int) c;
  printf("%d\n", x);  //prints 35, the ASCII value of '#'
  ```

- Therefore, it is possible to do some arithmetics directly on chars, which may look a bit wonky at first, but can be useful. For instance, we could  convert any letter to upper case by subtracting an offset of `32`:

  ```c
  if (c >= 'a' && c <= 'z') {
      c -= 32;
  }
  ```

- Check out the [ctype](https://www.cplusplus.com/reference/cctype/) library for other useful functions on chars.

##### Array Basics

C has array support, but unlike Java, arrays in C are not considered objects. C's arrays are even more fundamental. That means we don't have that nice `array.length` field to tell us the length of an array, so it is the programmer who must always keep track of, and pass along, each array's length. There's also no memory protection -- so you may be able to access out of bounds elements, without an exception being thrown at runtime! Therefore it is especially important to check for 1-off errors.

- The syntax to create an array is:

  ```c
  dataType arrayName[N];
  ```

  where `N` is a constant integer. Alternatively, you can also create an array with known values:

- The syntax to create an array is:

  ```c
  dataType arrayName[] = {val1, val2, ...};
  ```

- Now create the following program, called `array.c`:

  ```c
  #include <stdio.h>
  #include <stdlib.h>
  #include <time.h>

  #define MAX_VALS 5

  int main(int argc, char *argv[])
  {
      int A[] = {4,3,2,1};
      double B[MAX_VALS];

      //print out contents of A
      int i;
      for (i = 0; i < 4; i++)
          printf("%d ", A[i]);
      printf("\n");

      //seed the random number generator
      srand(time(NULL));

      //fill B[..] with random numbers
      for (i = 0; i < MAX_VALS; i++)
          B[i] = rand() % 100;    //get a number from 0 (inclusive) to 100 (exclusive)

      //print out contents of B
      for (i = 0; i < MAX_VALS; i++)
          printf("%.2f ", B[i]);
      printf("\n");

      return 0;
  }
  ```

- Once you compile and run it, you should get something like:

  ```c
  4 3 2 1
  50.00 95.00 79.00 37.00 92.00
  ```

- Note a few important differences from Java's handling of arrays:

  - You *should not* input the size of the array from the user, then create the array later. There will be a workaround for this limitation after we introduce memory allocation (malloc) in the next tutorial.

  - There is no easy way to determine the size of an existing array. This shouldn't be a problem, since arrays must have had a known size when created. So if you're writing a function that inputs an array, you should also pass along the array's size.

- Referring back to the source file:

  - **Lines 2-3**: the random number generator functions `srand()` and `rand()` are imported from `stdlib.h`. We also include `time.h` to gain access to the `time()` function, which returns the number of seconds elapsed since 00:00 Jan 1, 1970 (known as Unix Time or Epoch Time).

  - **Line 19**: to use the random number generator, we need to first seed it with an unsigned integer. It is common to the current time as the seed.

  - **Lines 23**: after seeding, we can call `rand()` return a number in the range of [0, RAND_MAX].

- **Do these exercises (not graded):**

  - Set a value at an out-of-bounds index for one of the arrays (e.g.,` B[6] = 10;`), and then print out the array element at that index. Do you get runtime errors?

  - What happens if you use `rand()` without seeding it first? Eliminate the call to `srand()`, and run the program a few times. What does this tell you about the connection between `srand()` and `rand()`?


##### C Strings

A string in C is essentially an array of `chars`, with one important caveat: The character sequence **must** be terminated with the null character `'\0'`.

- The following code creates a `char` array of size 20, and is initialized with a string of length 11, `"Puget Sound"`. Note that, although the string is only 11 characters long, it actually occupies 12 elements to store the terminating NULL character.

  ```c
  char str[20];
  str[0] = 'P';
  str[1] = 'u';
  str[2] = 'g';
  str[3] = 'e';
  str[4] = 't';
  str[5] = ' ';
  str[6] = 'S';
  str[7] = 'o';
  str[8] = 'u';
  str[9] = 'n';
  str[10] = 'd';
  str[11] = '\0';
  ```

- Like Java, a string-literal in C is enclosed in double-quotes. When assigned as follows, it has the same effect as the code above. The NULL character does not appear in this syntax. however, string initialization is the **only time** you can assign a literal to a string variable.

  ```c
  char str[20] = "Puget Sound";
  ```

- After this initialization, the contents of `str` are shown below. The null character is appended at `str[11]` automatically. Although the remaining unused characters (`str[12]`, ..., `str[19]`) are shown in the figure as having `'\0'`, C may not make any guarantee of this.
  ![](figures/str1.png)

- **Caveat: This is a biggie, and is very different than other languages.** The *only* time you should be using the assignment operator for strings is during initialization (above). Let's suppose we want to re-assign `str` to the string `"Loggers"`. Unfortunately, the assignment operator will not work!

  ```c
  #include <stdio.h>
  #define MAX_LEN 20

  int main(int argc, char *argv[]) {
      char str[MAX_LEN] = "Puget Sound";
      char str2[MAX_LEN] = "Loggers";

      str = str2;       // won't compile!!
      str = "Loggers";    // won't compile either!!

      printf("%s ", str);
      return 0;
  }
  ```

- Instead, we need to write this very cumbersome code to copy one string to another variable.

  ```c
  //assign str2 to str by copying str2 over
  int i;
  for (i = 0; i < MAX_LEN && str2[i] != '\0'; i++) {
    str[i] = str2[i];
  }
  str[i] = '\0';  //don't forget to terminate str!
  ```

  After the code runs, `str` would contain:
  ![](figures/str2.png)

- Important! You need to be sure that `str` was declared with enough storage to hold the newly assigned string _plus_ the terminating NULL character!  For now, strings in C are usually declared as `char` arrays having "too much capacity," but that'll change once we talk about memory allocation (malloc).

- As you can imagine, manipulating strings in C can be a pain because you need to do everything at the array level. Forgetting something as simple as terminating the string could have dire consequences. Fortunately, C provides a standard string library `string.h` to help us out. Here are a few useful functions:

  - You should really check out [string.h](http://www.cplusplus.com/reference/cstring/) library for the full list of string functions.
  - `strlen(str)`: returns the length of `str`.
  - `strcpy(dest, src)`: copies  `src` to `dest`, and null-terminates.
  - `strcat(dest, src)`: concatenates  `src` to `dest`, and null terminates.
  - `strcmp(str1, str2)`: Just like `compareTo(String)` in Java. This function compares the given strings and returns `0` if equal, a positive int if `str1` is greater than `str2`, and a negative integer otherwise.
  - `sprintf(dest, format, ...)`: This is the most versatile way of building a string. It's got a similar syntax to `printf()`, except instead of printing the string out, the string is placed in `dest`.

- Instead of writing our own, we could therefore use `strcpy()` to copy strings.

  ```c
  #include <stdio.h>
  #include <string.h> //import the string library
  #define MAX_LEN 20

  int main(int argc, char *argv[]) {
      char str[MAX_LEN] = "Puget Sound";  // using = for initialization is okay
      char str2[MAX_LEN] = "Loggers";

      strcpy(str, str2);    // replace "Puget Sound" with "Loggers"
      printf("%s\n", str);  // prints "Loggers"

      strcat(str, " Rule");   // concatenates " Rule" to str
      printf("%s\n", str);    // prints "Loggers Rule"

      int x = 0, y = 1;
      sprintf(str, "x is %d, y is %d", x, y); // easiest way to assign a formatted string
      printf("%s\n", str);    //prints "x is 0, y is 1"

      return 0;
  }
  ```

- Referring back to the source file:

  - **Line 2**: Imports the `string.h` library.

  - **Line 9**: copies all 7 characters from `str2` to `str`. The function automatically appends the terminating null character at `str[7]`.

  - **Lines 12**: concatenates " Rule" to the end of str, and appends terminating character.

  - **Lines 15-16**: The `strcpy()` function is only good for copying a string to another variable. However, we often need to mix types (e.g. strings concatenated with numbers). The `stdio.h` library includes a `sprintf()` that is used like `printf()`, but the string gets stored inside the variable. (Yes it null terminates.)

    - Warning: On Lines 9, 12, and 16, it is assumed that the programmer had allocated enough space in str to hold the new string.

  - **Important: fgets() for string input** When getting input from users, recall that `scanf()` only reads up to the next whitespace. That's good for reading individual tokens like numbers, and names, but what if you wanted to read an entire line of input that could contain white spaces?
    - Check out C's [fgets()](https://www.geeksforgeeks.org/fgets-gets-c-language/) function to read an entire line of input from user into a string. 

  - Java provides the `split()` method in its `String` class to tokenize strings by a delimiter. Look into C's `strtok()` function. Test it out - you will need to use it later.

  - Java provides the useful `Integer.parseInt(String x)` to convert a string `x` into an int. What's the equivalent in C? What about converting strings to floats?

##### Writing Functions

As good programmers, we know that we should promote reuse and modularity by writing functions. In C, function definitions follow this syntax:

```c
returnType funcName(param1, param2, ...) {
    //body
}
```

- Initially, we need to assume that in C, all function definitions must precede its usages.

- Let's write the function `void my_strcat(char s[], char t[])`, which appends string `t` to the end of string `s` (basically, performs the function as `strcat()` from the `string.h` library).

  ```c
  #include <stdio.h>

  /**
  * Concatenates two strings
  * @param s The destination string, with enough space for t[] and null-character
  * @param t The source string to be appended
  */
  void my_strcat(char s[], char t[]) {
      int i = 0, j = 0;

      // assign i to the position immediately following the existing string s
      while (s[i] != '\0') {
          i++;
      }

      // i now at NULL character position of s
      // now append string t to the end of s
      while (t[j] != '\0') {
          s[i] = t[j];
          i++;
          j++;
      }
      s[i] = '\0';    // don't forget to NULL-terminate string s
  }

  int main(int argc, char *argv[]) {
      char str[20] = "Hello";
      my_strcat(str, " World!!");
      printf("%s", str);
      return 0;
  }
  ```

- Let's check out the code:

  - **First**, note that the function is defined **before** it is used in `main()`.

  - **Lines 12-13:** We want `i` be the length of string `s`, and to do that, we simply traverse all characters of `s` until we encounter the NULL terminating character `'\0'`.

  - **Lines 17-20**: The second loop will copy into `s` all elements of `t` until `t`'s NULL character is encountered.

  - **Lastly**, we must insert a NULL terminating character to the end of `s`. As is true in Java, any changes made to an array passed as a parameter will persist beyond the scope of the function call! Therefore, it would be redundant to return `s` in `my_strcat()`.

- Defining all of our functions in the same file before each is used can be a bit of a hassle, and bigger programs can become hard to manage. It would be ideal to split related functions into different files. [Go here to learn more about organizing multi-file programs](http://www.cs.cf.ac.uk/Dave/C/node35.html). As I mentioned in the previous assignment, I usually give you the starter files, but you may want to add some of your own files later on.

- **Do these exercises (not graded):**

  - Write a function that inputs a string, and converts it to upper-case.

  - Can you figure out how a Java function like `Integer.parseInt()` might be implemented in C? That is, given a string like `"365"`, return `365 (int)`.

  - Write a function `void merge(int A[], int B[], int C[], int lengthA, int lengthB, int lengthC)` that inputs 2 sorted int arrays `A` and `B`, and an "output" array `C`. The function merges `A` and `B` into a sorted sequence in array `C`. Because the function doesn't know the arrays' lengths, you must also input those as params.


#### Assignment: Word Stats (Graded)

You're ready to write your first C program for this class! This assignment tries to incorporate almost all of the concepts you learned in this tutorial to make sure you start with strong footing. Specifically, the focus here is on string manipulation. 

You are to create a program generates some basics statistics given user-input strings. When your program begins, it should ask the user to enter a string. Once it is entered, your program should parse all words out of this string, and update the following stats:

- Vowel count
- Consonant count
- A histogram of letter-use frequency
- Update these stats for each word that is read, and continue asking for more input until the user enters #, at which point your program outputs a menu with the following options:

  - Enter 1 to print vowel and consonant frequency.
  - Enter 2 to print word count.
  - Enter 3 to print histogram.
  - Enter 4 to return to inputting more strings.
  - Enter 5 to quit.

##### Starter Code

Starter code for this assignment is provided on the github repo. You are not required to submit your code to me on Github, but it's strongly recommended that you do.

- **This step is imperative:** Login to github, and go here: [https://github.com/davidtchiu/cs475-hwk1-wordstat](https://github.com/davidtchiu/cs475-hwk1-wordstat). Choose to _*fork*_ this repository over to your github account to obtain your own copy. Copy the Github URL of _your_ newly forked project. Then follow the rest of the instructions below. From your VS Code remote development environment, open a terminal, and _*clone*_ your forked Github repo down to your local working directory using:

  ```
  git clone <your-github-url-for-this-project>
  ```

- This should download the starter code to your in a directory called `cs475-hwk1-wordstat`. After you've done this, you can work freely from VS Code or any other editor. You should see these files inside your new homework directory:

- `Makefile` - Do not make changes to this file. It is used for compiling.
- `menu.h` - This file should contain menu-option constants, function declarations
- `menu.c` - You will implement the functions declared in `menu.h` in this file
- `stats.h` - This file should contain constants, `WordStats` struct declaration, function declarations
- `stats.c` - You will implement the functions declared in `stats.h` in this file
- `main.c` - This file will contain the `main()` function, and other related helper functions

##### Working Solution

I have included a working solution of my program along with the starter code. The binary executable file is called `wordstatSol`. You can run it from the terminal by first navigating in to the Hwk1 directory and typing the command `./wordstatSol`.

##### `make`: Compiling Your Code and Cleaning Your Codebase

Compiling a multi-file C program can be tricky, and requires multiple steps and careful sequencing. To simplify the compilation process, I have provided a _script_ for you to run. As long as the `Makefile` is found in your project directory, you can run the command `make`, and it will resolve the rules inside the `Makefile` and compile your project (hopefully). The name of the binary executable has been configured to be called `wordstat`, so if all goes well, you should be able to run `./wordstat` after compiling.

- One related matter is the `make clean` command. This command will remove all intermediate files and binaries, but it will leave your source code alone. Use this command right before you submit the homework, for instance.

##### Program Requirements

1. All programming should be done on the given remote environment via VS Code. The entire program must be written and compiled in C.

2. Display any floating-point number to the hundredth place.

3. The program starts by accepting user inputs (strings). Each string should be processed (update your running stats), before accepting the next string. Continue accepting strings until a line beginning with the value `#` is read, at which point, you should print the option menu.

4. You may not assume that a user always enters a single word per line. If the user enters multiple words on the same line, you should tokenize each one, and determine its length. You may assume that the entire line of user-input cannot exceed 128 characters. (I have defined a global constant `MAX_INPUT_LEN` to store this value in `main.c`.) Ignore any characters that is input beyond this limit. You should be using the aforementioned `fgets()` function, given in C's `stdio.h` library, to obtain a line of input (with spaces) from the user.

    - To split a string into tokens, you should look into using the `strtok()` function given in the `string.h` library.

5. Once the menu is shown, your program should now accept numerical options. If an unknown menu option is entered, print an error informing the user and re-prompt. Note that there is an option to return to string-input mode.

6. To simplify things, you may assume that words are delimited by any whitespace, and that words must begin with an alphabetical character. Ignore any tokens that begin with a digit.

7. Your program must contain several well-defined functions.

8. The bars in the histogram that you print must be vertical (see below). Point deductions will be taken if you print horizontal bars.




##### Sample Output

```
$ ./wordstat 
Enter strings (# to stop):
APPle caT
orangE goat
greenish blue fish
#
*** WORD STATS MENU ***
Enter 1 to print vowel and consonant frequency.
Enter 2 to print histogram.
Enter 3 to return to inputting more strings.
Enter 4 to quit.
1

Vowels = 14 (41.18%), Consonants = 20 (58.82%), Total= 34

*** WORD STATS MENU ***
Enter 1 to print vowel and consonant frequency.
Enter 2 to print histogram.
Enter 3 to return to inputting more strings.
Enter 4 to quit.
2
        *                                           
*       *                                           
*       *   *                                       
*       *   * * *     *   * * *   * * *             
* * *   * * * * *     *   * * *   * * * *           
a b c d e f g h i j k l m n o p q r s t u v w x y z 
4 1 1 0 5 1 3 2 2 0 0 2 0 2 2 2 0 2 2 2 1 0 0 0 0 0 

*** WORD STATS MENU ***
Enter 1 to print vowel and consonant frequency.
Enter 2 to print histogram.
Enter 3 to return to inputting more strings.
Enter 4 to quit.
3
Enter strings (# to stop):
grey SHARK
!!@@!##
@#@#@#@#
#
*** WORD STATS MENU ***
Enter 1 to print vowel and consonant frequency.
Enter 2 to print histogram.
Enter 3 to return to inputting more strings.
Enter 4 to quit.
1

Vowels = 16 (37.21%), Consonants = 27 (62.79%), Total= 43

*** WORD STATS MENU ***
Enter 1 to print vowel and consonant frequency.
Enter 2 to print histogram.
Enter 3 to return to inputting more strings.
Enter 4 to quit.
2
        *                                           
*       *                                           
*       *   *                     *                 
*       *   * *                   * *               
*       *   * * *     *   * * *   * * *             
* * *   * * * * *   * *   * * *   * * * *       *   
a b c d e f g h i j k l m n o p q r s t u v w x y z 
5 1 1 0 6 1 4 3 2 0 1 2 0 2 2 2 0 4 3 2 1 0 0 0 1 0 

*** WORD STATS MENU ***
Enter 1 to print vowel and consonant frequency.
Enter 2 to print histogram.
Enter 3 to return to inputting more strings.
Enter 4 to quit.
19
Error: Unknown option 19.

*** WORD STATS MENU ***
Enter 1 to print vowel and consonant frequency.
Enter 2 to print histogram.
Enter 3 to return to inputting more strings.
Enter 4 to quit.
4
Exiting...
```

#### Grading

```
This assignment will be graded out of 20 points:

[1pt] Appropriate constants have been defined

[1pt] Array(s) and strings are created using a constant length

[6pt] Your program handles multiple-word inputs (with spaces)

[4pt] Your program updates the histogram appropriately

[5pt] Your program prints a vertical (not horizontal) histogram

[1pt] Basic error checking is handled, such as entering invalid menu options.

[1pt] Your program runs repeatedly until sentinel inputs are entered

[1pt] Your program observes good style and commenting.
```

#### Submitting Your Assignment

1. Commit and push your code to your Github repo. Make sure your repo is public (or private and accessible by me).

2. On canvas, simply submit the URL to your Github repo. No other form of submission is accepted.

#### Credits

Written by David Chiu. 2022.
