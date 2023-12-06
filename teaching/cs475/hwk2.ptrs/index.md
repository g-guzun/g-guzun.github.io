## CS 475 - Operating Systems

### Hwk: Structs, Addressing, and Pointers

This is the second part of a multi-part primer on C. In this tutorial-assignment, you'll gain an appreciation for the way values and variables are stored in memory. You'll be introduced to pointers, as well as the connection between pointers and arrays.

#### ZyBooks Reading

- Chap 9: structs
- Chap 10.1 - 10.4: pointers

#### Student Outcomes

- To understand how values and variables are stored in memory.
- To be familiar with the usage of `struct`s.
- To be familiar with type aliasing (`typedef`)
- To be familiar with pointers and references.
- To understand the connection between pointers and arrays.


#### Instructions

Open your VS Code and get connected to your Remote Development environment. If you don't know what I'm referring to, complete [Hwk 0](../hwk0.vscode).

  - Once you're logged in, you can open a terminal from the `Terminal` menu.


##### Part 0: Structs and Typedef

C is not an object-oriented language, but it does support object-like elements called `struct`. I like to think of `struct`s as classes in Java with only public fields and no methods. Let's see how it's used.

- To create a struct in C, you can use the following syntax:

  ```c
  struct structName {
      type0 field0;
      type1 field1;
      // ... other fields
      typeN fieldN;
  };
  ```

  Usually, the declaration of structs is done in a `.h` file that can be included anywhere the struct is referenced. Once a `struct` has been declared you can use it as a "cookie-cutter" to create "instances" of that type. For example, the following code uses a `struct` to store a point:

  ```c
  #include <stdio.h>
  #include <math.h>

  /**
   * Define a Point struct
   */
  struct Point {
      double xCoord;
      double yCoord;
  };

  /**
  * Finds distance between two points
  * @param u one point
  * @param v another point
  * @return distance between points u and v
  */
  double getDistance(struct Point u, struct Point v) {
      return sqrt(pow(u.xCoord - v.xCoord, 2) + pow(u.yCoord - v.yCoord, 2));
  }


  int main(int argc, char *argv[]) {
      struct Point p, q;  //declare two Points (yes the struct keyword is required -- for now)

      //set Points' location
      p.xCoord = 0;
      p.yCoord = 0;
      q.xCoord = 5.1;
      q.yCoord = 10.75;

      printf("The distance from p to q is: %.3f\n", getDistance(p,q));
      return 0;
  }
  ```

- **Important**

  - All of a `struct`'s fields (called *data members* in C) are `public`. There is no such thing as `private` or `protected` in C. 
  - Like Java, data members are accessed using dot-notation (`var.field`). You'll see a very different notation once we start talking about pointers though.
  - Think of structs, then, as very primitive objects that only serve as a vessel for encapsulating multiple variables.
    - There are *no* constructors, functions/methods that can be defined within a C `struct`.

##### Important Aside: Aliasing Type Names with `typedef`

While it isn't possible in Java (and many other languages), C allows us to give different names to data types. For instance, I could create an type alias `employee_t` to stand for `unsigned short int`, and use `employee_t` everywhere in my code, to improve code understanding. This process is called `typedef`.

```c
typedef <data type> <alias>;
```

- Let's alias `employee_t` to represent an `unsigned short int`. This makes for much more readable and manageable code:

  ```c
  #include <stdio.h>

  typedef unsigned short int emp_t;   //alias emp_t to unsigned short int

  /**
  * Returns a pointer to a string containing an employee's name
  */
  int getSalary(emp_t id) {
      //(code omitted)
  }

  /**
  * Main function
  */
  int main(int argc, char *argv[]) {
      emp_t employeeID;
      printf("Enter an employee id: ");
      scanf("%u", &employeeID);   // read input as unsigned int (%u) into employeeID.

      int salary = getSalary(employeeID);

      // (code omitted)

      return 0;
  }
  ```

- **Important** Typedefs are often used in conjunction with defining `structs`. For example, it's mildly annoying that we have to declare a `Point` named `p` using `struct Point p;` syntax. Using `typedef` totally optional here, but it *would* make the syntax a little more familiar to what we're used to seeing in Java:

  ```c
  typedef struct <structName> {
      //members
  } <structName>;
  ```

  We can now declare the `Point` struct as follows,

  ```c
  typedef struct Point {
      double xCoord;
      double yCoord;
  } Point;
  ```

  and now we can declare using `Point p;` and access its elements just like before: `p.xCoord` and `p.yCoord`.


##### Part 1: Understanding Variables - Data Types

A variable is a symbol that is associated with: (a) its data type and (b) its location in memory. To understand pointers, we need to have a grasp on both. We'll start discussion with the former. Consider the following code snippet:

```c
char letter = 'p';
int days = 365;
double amt = 90000.75;
```

Although high-level languages like C, Java, etc., hide it from us, the three variables have to exist *somewhere* in your computer's memory. Let's take a look at a make-believe snapshot of my computer's memory as it runs the code shown above.

You might recall from your architecture class that a **CPU word** is the fundamental unit of data transfer between memory and CPU. In these tutorials, we'll assume that a word is a block of four contiguous bytes (i.e., 32-bits), though it is worth mentioning that many CPUs now fully support 8-byte words (i.e., 64-bits).

In the figure below, only each word's start address is shown, but know that each byte within the word addressable too. When a CPU requests the byte located at a certain address, say `1117`,  the *full* word ranging from address `1116` to `1119` is automatically retrieved from memory and brought into one of the CPU's registers. The CPU then extracts the desired byte from the word, if necessary.\

 <img border="1" width="450px" src="figures/proj2-ex1.png"/>

**Important Operator: `sizeof()`**
Notice from the figure above that that an `int` takes up four contiguous bytes, a `char` requires just one byte, and a `double` requires eight. The specific space requirements for each  type actually vary across architectures. **So how did I know these storage requirements apply to my machine?** C provides an important operator `sizeof()` for this purpose. It inputs the name of a variable, a data type, or an expression, and returns the size in bytes that it occupies in memory. Let's see what it does.

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
    char letter = 'p';
    int days = 365;
    double amt = 90000.75;
    double nums[10];

    printf("\n*** sizes of data types ***\n");
    printf("size of char: %lu bytes\n", sizeof(char));
    printf("size of short: %lu bytes\n", sizeof(short));
    printf("size of int: %lu bytes\n", sizeof(int));
    printf("size of long: %lu bytes\n", sizeof(long));
    printf("size of float: %lu bytes\n", sizeof(float));
    printf("size of double: %lu bytes\n", sizeof(double));
    printf("size of long double: %lu bytes\n", sizeof(long double));

    printf("\n*** sizes of vars ***\n");
    printf("size of letter: %lu bytes\n", sizeof(letter));
    printf("size of days: %lu bytes\n", sizeof(days));
    printf("size of amt: %lu bytes\n", sizeof(amt));
    printf("size of nums array: %lu\n", sizeof(nums));

    printf("\n*** sizes of constants and expressions ***\n");
    printf("size of 50: %lu bytes\n", sizeof(50));
    printf("size of '#': %lu bytes\n", sizeof('#'));
    printf("size of 54.999: %lu bytes\n", sizeof(54.999));
    printf("size of hello: %lu bytes\n", sizeof("hello"));
    printf("size of 3/2: %lu bytes\n", sizeof(3/2));
    printf("size of 0.5 * 400 / 2: %lu bytes\n", sizeof(0.5 * 400 / 2));

    return 0;
}
```

When I compile and run it, I get the following output.

```
*** sizes of data types ***
size of char: 1 bytes
size of short: 2 bytes
size of int: 4 bytes
size of long: 8 bytes
size of float: 4 bytes
size of double: 8 bytes
size of long double: 16 bytes

*** sizes of vars ***
size of letter: 1 bytes
size of days: 4 bytes
size of amt: 8 bytes
size of nums array: 80

*** sizes of constants and expressions ***
size of 50: 4 bytes
size of '#': 4 bytes
size of 54.999: 8 bytes
size of hello: 6 bytes
size of 3/2: 4 bytes
size of 0.5 * 400 / 2: 8 bytes
```

1. The unsigned integer that is returned by `sizeof()` is the number of bytes required to store that data. A couple other things worth pointing out about the code:

   <!-- - The `%lu` specifier means unsigned long integer, which is what is returned by `sizeof()`. In fact, if you dig into `sizeof()`, you'll see that it actually returns a type called size_t, which is an alias to an unsigned long. -->

   - **Lines 10-17**: We're now introduced to a few more data types (`short`, `long`, `long double`), which are all variants of the four original primitives. 

   - **Line 23:** shows how `sizeof()` can be used to determine the size of the array `nums` in bytes: 80, or `(10 * sizeof(double))`, bytes.

     ```c
     printf("size of nums array: %lu\n", sizeof(nums));
     ```

   <!-- - Line 27: a character constant is represented as an `int` (4 bytes on my machine). -->

   - **Line 28:** shows that a floating-point literal is interpreted as a `double`, not a `float`. (This is also true in Java.)

     ```c
     printf("size of 54.999: %lu bytes\n", sizeof(54.999));
     > 80
     ```

   - **Line 29**: the string literal `"hello"` occupies 6 bytes (not 5!) Why do you think this is?

     ```c
     printf("size of hello: %lu bytes\n", sizeof("hello"));
     > 6
     ```

   - **Line 30**: holds the result of an integer expression, which returns an `int`

     ```c
     printf("size of 3/2: %lu bytes\n", sizeof(3/2));
     > 4
     ```

   - **Line 31**: holds the result of a mixed arithmetic expression, which returns a `double`

     ```c
     printf("size of 0.5 * 400 / 2: %lu bytes\n", sizeof(0.5 * 400 / 2));
     > 8
     ```

2. Remember the `sizeof()` operator for later and for the future tutorial. `sizeof()` is one of the most important built-in operators in C. 

3. One of the benefits of a typed language like C and Java should be somewhat apparent now. When a programmer declares a variable's type, the executable files knows *exactly* how many contiguous bytes to read and write memory.

  This is in contrast to un-typed languages like Python and JavaScript, where the type of a variable is allowed to change during runtime, and requires a bit of overhead to interpret, or *juggle* their storage requirements. This *type-juggling* overhead accounts for much of the reason why compiled programs usually run faster than interpreted programs. It also adds a lot of confusion when reading code. (This is why I've always preferred strongly-typed languages like C and Java.)

- **Practice Questions (not graded):**

  - Although a `char` requires just one byte of storage, most CPUs will insist on wasting, or "padding" the remaining 3 bytes (see figure above). Why do you think CPUs prefer this, instead of, say, having `amt` start from address `1117` to save you space? *(Ans: It's all about word-alignment. Recall that a unit of transfer between memory and CPU is a word. If we didn't pad the remaining unused bits of the word, then the start of the next data will begin in the same word, and must span across two words.)*

  - What is an `unsigned` integer? What is the point of an `unsigned integer`, and when would it be appropriate to declare an unsigned variable? Does it take up more space for an integer to be signed vs. unsigned? Does Java support unsigned integers? *(Ans: Recall from architecture that the most-significant bit, called the sign-bit, determines the +/- sign of that number. But the sign-bit wastes a bit! So a regular `int` can cover the range $$[-2^{31}, 2^{31}-1]$$), and an `unsigned int` can cover $$[2^{32}-1]$$. If you know that a value cannot be negative (such as salary or phone numbers), it is appropriate to use unsigned ints.*

  - If a `struct X` element was declared to contain a `char`, a `long`, and an array of 100 `doubles`, what is the size of each instance of `struct X`? *(Essentially, each instance of `struct X` would require 1 + 8 + 100 * 8 = 809 bytes, but will actually take up 812 bytes for preserving word alignment)*

##### Part 2: Understanding Variables - Addressing

Every piece of data in your program, including variables and literals (e.g., 2, 3.14, etc.), is stored in your computer using two pieces: (1) its content, and (2) its location address in memory. We generally only have control over its content. It's up to your OS to find a location in memory to store it. It is possible, however, for programmers to ask the system for the addresses of your data. 

This section focuses on the support for working with a variable's location in C. In particular, we will focus on three new syntax: the address-of operator (`&var`), the pointer-declaration operator (`type *var`), and the de-reference operator (`*var` and `var->field`).

1. Let's now consider the code below. Read through it before moving on.

   ```c
   char letter = 'p';
   int days = 365;
   double amt = 90000.75;

   int *ptr;       //declare pointer to an int
   ptr = &days;    //point ptr at days
   printf("There are %d days\n", days);
   printf("There are %d days\n", *ptr);

   (*ptr)--;   //decrement days by 1
   printf("There are now %d days\n", days);
   printf("There are now %d days\n", *ptr);

   //print addresses
   printf("Location of days: %p\n", &days);
   printf("Location of ptr: %p\n", &ptr);
   printf("Value of ptr: %p\n", ptr);
   ```

2. In this simplified example, we'll assume that the operating system places `days` in bytes **1112** to **1115**, `letter` in byte **1116**, and `amt` in bytes **1120** to **1127**.

3. Here is an example output when this program is executed.

   ```
   There are 365 days
   There are 365 days
   There are now 364 days
   There are now 364 days
   Location of days: 0x458
   Location of ptr: 0x8A2C
   Value of ptr: 0x458
   ```

4. Let's now go back and explain the source code.

   - On **Line 5**, we see a new kind of variable-declaration syntax:

     ```c
     int *ptr;       //declare pointer to an int
     ```

     This declares a new variable named `ptr`, and unlike anything we've seen before, it holds a memory address, which references an `int` value. In other words, `ptr` is a pointer to an integer. Of course, `ptr` is itself a variable that requires storage, and our figure shows that `ptr` itself is located in byte addresses `35372` to `35375`.

   - On **Line 6**:

     ```c
     ptr = &days;    //point ptr at the address of days
     ```

     The operator `&var` returns the address of `var`. Even though `day` occupies four bytes because it is an `int`, only the address of its first byte (**1112**) is returned. Thus, `ptr = &days` will assign **1112** to `ptr`. That's how pointers (called "references" in Java) work! They're just variables that store addresses to data.

   - **Line 8** introduces an important operation, called **dereferencing**.

     ```c
     printf("There are %d days\n", *ptr); // *ptr is used to chase the pointer to the content!
     ```

     Dereferencing is used when we're interested in uncovering the _content_ that's referenced by `ptr`. If we simply output the value of `ptr`, we'd still get **1112**, which is not what we want in this case. Therefore, when the objective is to "follow" the pointer to its destination, we use the  dereferencing operator `*var`, where `var` is a pointer variable. **(This irks me a bit, because the * operator now has 3 interpretations in C: multiply,  declaration of a pointer variable, and pointer dereference. Expect this to lead to headaches down the line.)**

   - On **Line 10**:

     ```c
     (*ptr)--;   //decrement the content of 'days' by 1
     ```

     Okay this is a strange one. `ptr` is first dereferenced to get the content `365`. It is then decremented to `364` and written back. *(What's the order of precedence? What would `*ptr--` do? What about `*(p--)`?)*

   - On **Lines 15-17**: shows that we can use the output specifier, `%p` to print an address (in hexadecimal).

     ```c
     printf("Location of days: %p\n", &days);
     printf("Location of ptr: %p\n", &ptr);
     printf("Value of ptr: %p\n", ptr);
     ```

     The addresses of `days` (0x458 == 1112) and `ptr` (0x8A2C == 35372) are first printed. This is followed by printing the contents of `ptr`, which unsurprisingly, stores the address of `days`.

- *Important:* In the examples above, we showed that the `&` operator returns only the address of the *first byte* of `days`, even though `days`  occupies the following three bytes as well. When we dereference `*ptr` on **Line 8** and **Line 12**, the system was *smart* enough to know that the next three bytes are part of `days` value. Had the program read anymore than three additional bytes, we would've gotten a much larger number, and had it read fewer than three bytes, it would've truncated our number. How the heck does the system know **exactly three** more bytes (and not zero, or one, or seven, or 1000) trailed first byte? (Ans: This is why we declare data types in the first place! When we told C that `days` is an `int`, the C compiler translates `int` to something equivalent to a 32-bit `DWORD` in the underlying assembly language. The compiler would also translate `double` to a 64-bit `QUAD WORD`, and so on.)

- **Practice Problems (not graded)**

  - We know that a pointer to an int (`int*`) occupies 4 bytes on my machine by calling `sizeof(int*)`. What would the size be for a pointer to a `char`, or a pointer to a `double`, or a pointer to some `struct` on my machine? Try it out. (Hint: Does the maximum size of an address ever change?)

  - You can also create a pointer to a `void` data type, which seems odd at first. Do some searching on the web, and figure out what a `void*` pointer means, and why it's useful. (Hint: Think generics in Java).

##### Part 3: Pointer Basics

Now that we have a good handle on data types and addressing, let's put everything together. There are three basic pointer concepts you have to master to succeed in this class:

1. Address-of Operator: Given a variable var, `&var` returns the address of var's location in memory.

2. A pointer variable stores the address of some data. This data can be a variable, an array, another pointer... To declare a pointer, you use the following syntax:

   ```c
   dataType *ptr;          //pointer to a dataType
   dataType *ptr1, *ptr2, *ptr3;   //multiple pointers
   ```

   When assigning a pointer `q` to another pointer `p`, it causes them both to point to the same data.

   ```c
   double *a = NULL, *b = NULL, c = 10;
   b = &c; //point b at c
   a = b;  //point a at c
   ```

   - Memory contents after the declaration:\
     <img border="1" width="250px" src="figures/proj2-ptrAssign1.png" />

   - Memory contents after the assignment statements on Line 2 and 3.\
     <img border="1" width="250px" src="figures/proj2-ptrAssign2.png" />

   - You must first `#include <stdlib.h>` to get access to the `NULL` constant.

3. Dereferencing Operator: Given an already-declared pointer `ptr`, we use `*ptr` to access the value at the location referenced by `ptr`. As I lamented earlier, I wish we chose a different syntax for dereferencing, because `*ptr` already has a different meaning!
   ```c
   double *a = NULL, *b = NULL, c = 10;
   b = &c; //point b at c
   a = b;  //point a at c
   *b = 15; // dereference b! c is now 15
   *a += 5; // dereference a! c is now 20
   ```

- Memory contents after Line 4's assignment statement `*b = 15`.\
  <img border="1" width="250px" src="figures/proj2-ptrAssign3.png" />

- Memory contents after Line 5.\
  <img border="1" width="250px" src="figures/proj2-ptrAssign4.png" />

- **Practice Questions (not graded):**

  - What value does the `NULL` constant hold? Try printing out. 
  
  - What happens to your program when you try to dereference a pointer to `NULL`? *(Ans:  In Java, you'd expect the dreaded NULLPointerException to be thrown, but there are no such things as Exceptions in C... This really is something you should try out in C. It will prove challenging as you write/debug your programs.)*

  - **Do this. For real.** Write a function `void compareAndAssign(int n, int m, int *larger, int *smaller)` that puts the larger of `n` and `m` in `larger` and the smaller value in `smaller`. How would you call this function? (If you need help figuring this out, read on to the next section and try again.)

##### Part 4: "Output" Parameters
Haven't you ever wished that a function/method could return more than one thing? To do this Java, you always had to create a new class that stored multiple values, or returned an array or other data structure. You can also do any of the above in C, but pointers give us another way to "return" multiple values.

1. Consider the following function used to swap the values of two integer variables:

   ```c
   void swap(int *x, int *y) {
     int tmp = *x;  // dereference x and store value in tmp
     *x = *y;
     *y = tmp;      // you don't need to deference `tmp` (why)?
   }

   // later on ...

   int a = 10, b = 20;
   swap(&a, &b);
   printf("%d\n", a); // 20
   printf("%d\n", b); // 10
   ```

   How would you call this function? The method inputs two pointer parameters. Therefore, you have to pass the addresses of (using `&`) the variables you want to swap. Trace execution of calling `swap()` by drawing out the memory contents like you saw me do in earlier examples.
   
   It is not possible to write a function for swap two primitive data types like this in Java. Cool right? You *can* swap two objects, but that's only because object variables in Java are just pointers!

2. Consider this version of swap that accepts two variables (not pointers) as input:

   ```c
   void swap2(int *x, int *y) {
       int *tmp = x;
       x = y;
       y = tmp;
   }

   //(code omitted)
   //...
   int a = 4, b = 3;
   swap2(&a, &b); //swap?
   ```

   Will this method work? Trace its execution.

3. Consider a final version of swap that accepts two variables (not pointers) as input:

   ```c
   void swap3(int x, int y) {
       int *x_ptr = &x;
       int *y_ptr = &y;
       int tmp = *x_ptr;
       *x_ptr = *y_ptr;
       *y_ptr = tmp;
   }

   //(code omitted)
   //...
   int a = 4, b = 3;
   swap3(a,b); //swap?
   ```

   Will this method work? Trace its execution.

4. **"Output Parameters"**: Try using the first `swap()` method in Java. You'll see that the contents of the variables aren't swapped at all after calling it, but it works in C! It is quite common in C for functions to have so-called "output parameters". An output parameter refers to a pointer that is input into a function, and the function modifies its contents. After the function call, one just needs to deference the pointer to obtain the updated value(s). It's convenient for functions like `swap()`, where there's not really a return value that makes any sense, but we expect some side-effects to occur.

   - You've also seen this in action already when you used `scanf()` to accept user input. For example, when `scanf("%d", &var)` is used, we input the address of `var` (i.e., a pointer), and we expect the contents of `var` to have changed afterwards.

   - I strongly recommend that you clearly name and comment when a parameter is an output parameter. For instance (it's not pretty):

     ```c
     void sum(int inX, int inY, int* outSum) {
       *outSum = inX + inY;
     }
     ```

   - In practice you might even see functions written like this:

     ```c
     void sum(
       int x,    /* IN */
       int y,    /* IN */
       int* sum  /* OUT */) {
       *sum = x + y;
     }
     ```

   - Here's another example:

     ```c
     #include <stdio.h>

     typedef struct Student {
      float gpa;
      char name[25];
     } Student;

     /**
     * Clears a GPA to 0
     * @param gpaOut (OUT) A pointer to the GPA to be cleared
     */
     void clearGPA(float *gpaOut) {
       //de-reference pointer, clear the value
       *gpaOut = 0.0;
     }

     int main(int argc, char *argv[]) {
       Student stu;

       printf("Enter a name: ");
       scanf("%s", &stu.name);  //value expected in stu.name
       printf("Enter a GPA: ");
       scanf("%f", &stu.gpa);

       printf("Name: %s, GPA: %.2f\n", stu.name, stu.gpa);
       clearGPA(&stu.gpa);  //stu.gpa gets cleared
       printf("Name: %s, GPA: %.2f\n", stu.name, stu.gpa);

       return 0;
     }
     ```

     ```
     Enter a name: David
     Enter a GPA: 4.0
     Name: David, GPA: 4.00
     Name: David, GPA: 0.00
     ```

##### Part 5: Connection to Arrays (Pointer Arithmetic)
In this section, we'll explore the relationship between pointers and arrays (and strings).
    
1.  Study the following source file, then compile and run it.

    ```c
    #include <stdio.h>

    #define BUFFERSIZE 4

    int main(int argc, char* argv[])
    {
        int arr[BUFFERSIZE] = {9,8,7,6};
        int i;

        printf("*** where is arr[0] stored? ***\n");
        printf("arr[0] location: %p\n", &arr[0]);

        printf("\n*** where is arr stored? ***\n");
        printf("arr location: %p\n", arr);

        printf("\n*** print out contents using pointer arithmetic ***\n");
        for (i = 0; i < BUFFERSIZE; i++)
            printf("%d ", *(arr+i));

        printf("\n\n*** print out contents using familiar subscript syntax ***\n");
        for (i = 0; i < BUFFERSIZE; i++)
            printf("%d ", arr[i]);

        return 0;
    }
    ```

2.  Arrays represent a list of data in contiguous sequence in memory, and that is also how they're laid out in memory: one element after another. It is therefore not all that surprising to find `arr` being represented as in the figure below, with each `int` element occupying 4 bytes. When compiled and executed, this program outputs something akin to the following:

    <img border="1" width="250px" src="figures/proj2-ex3.png" />

    ```
    *** where is arr[0] stored? ***
    arr[0] location: 0x4318

    *** where is arr stored? ***
    arr location: 0x4318

    *** print out contents using pointer arithmetic ***
    9 8 7 6

    *** print out contents using familiar subscript syntax ***
    9 8 7 6
    ```

3.  Looking at the source code,

    - **Lines 11 and 14**: Suppose we want to find the location of the 0th
      element in `arr`. The syntax shown on **Line 11**

      ```c
      printf("arr[0] location: %p\n", &arr[0]);
      ```

      should not be all that surprising; we can simply apply the `&` operator on element `arr[0]` to get its address. The code on **Line 14**, however, may be slightly unexpected.

      ```c
      printf("arr location: %p\n", arr);
      ```

      It would appear that an array's variable name is **actually** a pointer to the location of its 0th element! By the way, `0x4318` is hexadecimal for `17176` (for the figure below).

    - **Line 16-18**: Knowing this, let's try something else. Because we know `arr` is just a pointer, can we also dereference it to access the array elements?

      - `*(arr+0)`, or simply, `*arr` returns 9!

      **Pointer Arithmetic** Exciting! How would we access the array element at index 1? The runtime is smart enough to know that the next element is 4 bytes away because the array was declared to store `int`s. So adding 1 to the pointer will automatically skip the next 3 bytes and move the pointer to the next item in the array!

      - `*(arr+1)` returns 8
      - `*(arr+2)` returns 7
      - `*(arr+3)` returns 6

    - **Line 20-22 (Important!)** Finally, the array indexing syntax we're all familiar with, `arr[i]`, is simply a convenience to programmers: Indeed, `arr[i]` is _actually_ just a shorthand for `*(arr+i)`

      - (Full circle now -- Zero-based Addressing): This may have only come up briefly in a previous course, but now we can appreciate why array indices are **0-based** in every language (i.e., first item stored in `[0]`, second item stored in `[1]`). This is due to  pointer arithmetic. If we store the first item in location `[1]`, then the C compiler would always need to subtract 1 when performing each array index lookup. That's just an unnecessary overhead!

4.  **Arrays are passed by reference:** Now that we know an array is essentially the address of its 0th element, take a look at the following functions that manipulate the array. Each of the following functions have the same effect (initializes all elements to -1)! Make sure you read through each and understand why.

    ```c
    void initArray(int A[], const int SIZE) {
      int i;
      for (i = 0; i < SIZE; i++) {
          A[i] = -1;
      }
    }

    void initArray2(int *A, const int SIZE) {
      int i;
      for (i = 0; i < SIZE; i++) {
          A[i] = -1;
      }
    }

    void initArray3(int A[], const int SIZE) {
      int i;
      for (i = 0; i < SIZE; i++) {
          *A++ = -1;  // wonky! Dereference *A, set its contents to -1, then increment A to next position
      }
    }
    ```

    **Important side note:** Because arrays are passed as pointers, you can now appreciate why modifications to arrays persist after the function terminates (this is also true in Java!).

5.  Here's another example with char arrays (strings). Take a look at the code below, where we define a function `strToUpper(char *s)`:

    ```c
    #include <stdio.h>

    /**
    * Converts given string to upper case
    * @param s A pointer to a string
    */
    void strToUpper(char *s) {
        while (*s) {
            if (*s >= 'a' && *s <= 'z') {
                *s -= 32;   //convert character to to upper case (offset by -32 in ASCII)
            }
            s++;    //move to next character
        }
    }

    int main(int argc, char *argv[]) {
        char univ[] = "puget sound";
        strToUpper(univ);
        printf("%s\n", univ);
        return 0;
    }
    ```

    - **Line 7**: the input parameter `char *s` declares a pointer to a `char`, which we know can _also_ be interpreted as the 0th element in an array of chars. Strings are always input into functions with a type of `char *`.

    - **Line 9:** checks the dereferenced value of pointer `s` to see if we've reached the end of the string. This syntax looks strange, so let's unpack it.
      - Recall that `*s` is an attempt to dereference the pointer `s`.
      - `s` is initially pointing to the 0th character in the string. Once dereferenced, it will return the character at that location, which generally has a non-zero value (recall that any non-zero value is interpreted to be `true`).
      - Remember that all strings must end with the null character `'\0'`, which has an integer value of `0` (implying boolean `false`).
      - Putting it all together: the loop will run for each character in the string, until the null character is reached.

    - **Line 11-12:** checks to see if the character currently being pointed to by s is a lower case letter, and if it is, subtract by 32, which is the offset from its upper-case counterpart.

    - **Line 13:** this will move to pointer to the next element in sequence in memory. Because `s` points to a `char`, we know from pointer arithmetic that the `++` operator moves the pointer (since `sizeof(char) == 1`).

    - **Line 19:** The main function creates a string and we assume it is placed in bytes 272372 to 272383.

    - **Line 20 (and Line 7):** calls `strToUpper(univ)`, which implicitly creates a pointer variable `s` that refers to the first character in `univ`. The memory contents at this point is shown below:\
      <img border="1" width="350px" src="figures/proj2-str2upper1.png" />\
      Right before `strToUpper()` returns, the memory contents are shown below:\
      <img border="1" width="350px" src="figures/proj2-str2upper2.png" />\
      Every time `s++` is called (Line 13), it increments the pointer to the next character in `univ`. Eventually, `s` points to `univ[11]`, allowing it to break out of the loop.

###### Do these exercises (not graded):

- The following is a well-known function. What does it do?
  ```c
  void mystery(char *s, char *t) {
     while (*s++ = *t++) { //assignment, not equivalence (i.e., not a typo)
         ;
     }
  }
  ```
- Using pointer arithmetics, implement the string function `strcat(char *s, char *t)`, which concatenates the string referred to by `t` to the end of the string referred to by `s`.

##### Assignment: HeapSort (Graded)

Your tasked with providing a list of employees sorted in _descending_ order of their salaries. Luckily, you remember Heapsort from your Algorithms or CS II class, and decide to use it...

Heaps are a projection of a balanced binary tree onto arrays. They serve many purposes, but are perhaps most well known as the basis for Heapsort. Heaps are also the backbone for Priority Queues, an important data structure which finds uses in many applications (including in OS). Your goal is to implement Heapsort using a min-heap. A min-heap is an array of n elements `A[0]`,...,`A[n−1]` that can be viewed as a binary tree (not necessarily a binary search tree), with the following properties:

- The root of the heap is `A[0]`.
- For an array index `i`,
  - `parent(i) = (i-1)/2` (except for the root, which has no parent)
  - `left_child(i) = 2(i+1)−1`
  - `right_child(i) = 2(i+1)`
- The _min-heap property_: Every node's value must be less-than-or-equal-to the value of its children. That is, `A[parent(i)] <= A[i]` for all `i`. The figure below shows an example of a min-heap of size 12.

   <img width="500px" src="figures/heap.png" />

###### Starter Code

Starter code for this assignment is provided on the github repo. You are not required to submit your code to me on Github, but it's strongly recommended that you do.

- **This step is imperative:** Login to github, and go here: [https://github.com/davidtchiu/cs475-hwk2-heapsort](https://github.com/davidtchiu/cs475-hwk2-heapsort). Choose to _*fork*_ this repository over to your github account to obtain your own copy. Copy the Github URL to _your_ newly forked project. Then follow the rest of the instructions below. From your VS Code remote development environment, open a terminal, and _*clone*_ your forked Github repo down to your local working directory using:

  ```
  git clone <your-github-url-for-this-project>
  ```


- This should download the starter code in a directory called `cs475-hwk2-heapsort`. After you've done this, you can work freely from VS Code or any other editor. You should see these files inside your new homework directory:

###### Working Solution

I have included a working solution of my program along with the starter code. The binary executable file is called `heapsortSol`. You can run it from the terminal by first navigating in to the Hwk directory and typing the command `./heapsortSol`.

###### Program Requirements

1. Inside the project directory, you should find the following files:

   - `Makefile`
   - `employee.h` contains the definition of the Employee struct
   - `heap.h` contains the function declarations related to the heap
   - `heap.c` contains the stubs for the functions defined in `heap.h`
   - `main.c ` contains the `main()` function

2. Implement the following functions inside `heap.c`:

   - `void heapify(Employee *A, int i, int n)`: This function inputs a pointer to an array
     `A`, an index `i`, and the size of the array `n`. The function assumes the trees that rooted at
     `left_child(i)` and `right_child(i)` already satisfy the min-heap property, but that `A[i]`
     may be larger than its children. This function should trickle `A[i]`
     down in place such that the tree rooted at `i` satisfies the min-heap property.

     In the figure below, you can see how `heapify()` works. Here, `A[2]` violates the min-heap property, and a call to
     `heapify(A, 2, 12)` is made to produce the following:

      <img width="600px" src="figures/heapify.png" />

   - In Step 2, the out-of-place element `A[2]` is swapped with the smaller of the two children, `A[5]`. However, the tree rooted at
     `A[5]` no longer satisfies min-heap property. Thus, a recursive call to heapify on
     `A[5]` corrects the subtree. You should therefore recursively correct the subtrees until you hit a leaf.

   - `void buildHeap(Employee *A, int n)`: Given a pointer to an array
     `A` of size `n`, this function will leave the tree rooted at `A[0]` satisfying the min-heap property. Because leaf nodes trivially satisfy the property, only the non-leaf nodes need to be heapified. It's pertinent to know that the last non-leaf node is located at
     index `n/2`. Run `heapify()` on `A[n/2]` down to `A[0]`.

     The before-and-after of this function call is shown below:

      <img width="400px" src="figures/proj2-buildHeap.png" />

   - `void swap (Employee *e1, Employee *e2)`: Inputs pointers to two Employees, and swaps them.

   - `void printHeap(Employee *A, int n)`: Prints all values in the array referenced by pointer `A`.

   - `void heapsort(Employee *A, int i, int n)`: This function inputs a pointer to an unsorted array of Employees and the size of that array and sorts it in descending order of their salary. Here's the sketch:
     ```
     Build min-heap over A
     Repeat the following until n < 0:
       Swap root of heap with element n−1.
       Now smallest element is sorted into place.
       Heapify up to element n−1
       Decrement n by 1
     ```

3. Implement the following inside `main.c`:

   - Define a constant called `MAX_EMPLOYEES` that will serve as the maximum length of your array.

   - `int main()`: The driver function should create an array of `MAX_EMPLOYEES` elements, and fill it with values from the user. Below, a sample interaction for `MAX_EMPLOYEES` of 5.

4. Here's a sample output:

   ```
   Name: David
   Salary: 60000

   Name: Gabe
   Salary: 75000

   Name: Katie
   Salary: 92000

   Name: Gabe
   Salary: 40000

   Name: Joan
   Salary: 86000

   [id=Katie sal=92000], [id=Joan sal=86000], [id=Gabe sal=75000], [id=David sal=60000], [id=Gabe sal=40000]
   ```

#### Grading

```
This assignment will be graded out of 20 points:

[1pt] Appropriate constants have been defined.
[6pt] Heapify is properly implemented.
[6pt] BuildHeap is properly implemented to build a min-heap.
[6pt] Heapsort sorts employees by descending order of their salary.
[1pt] Your program receives user-input, and does basic error checking.
[1pt] Your program observes good style and commenting.
```

#### Submitting Your Assignment

1. Commit and push your code to your Github repo. Make sure your repo is public (or private and accessible by me).

2. On canvas, simply submit the URL to your Github repo. No other form of submission is accepted.


#### Credits

Written by David Chiu. 2022.
