## CS 475 - Operating Systems

### Hwk: David Shell (dsh)

A _shell_ is an interactive command-line environment in which users can issue commands to the OS. Even with modern OS's support of point-and-click GUIs, many still prefer to use the shell. Today, many shells exist and are supported by Unix-based systems, but the Bourne-Again Shell (bash) is probably the most widely used.

Your goal for this assignment is to create your very own shell, David Shell (`dsh`), named after your favorite CS Professor.

#### ZyBooks References

- String processing
- Scanning for user inputs

#### Student Outcomes

- To understand how a simple command-line interface to the OS is implemented.
- To work with environment variables with `getenv()`
- To become familiar with process creation with `fork()` and `execv()`
- To become familiar with parent-child synchronization with `wait()`

#### Starter Code

Starter code for this assignment is provided on the github repo. You are not required to submit your code to me on Github, but it's strongly recommended that you do.

- **This step is imperative:** Login to github, and go here: [https://github.com/davidtchiu/cs475-hwk4-dsh](https://github.com/davidtchiu/cs475-hwk4-dsh). Choose to _*fork*_ this repository over to your github account to obtain your own copy. Copy the Github URL to _your_ newly forked project. Then follow the rest of the instructions below. From VS Code, open a terminal, and _*clone*_ your forked Github repo down to your local working directory using:

  ```
  git clone <your-github-url-for-this-project>
  ```

#### Working Solution

I have included a working solution of my program along with the starter code. The binary executable file is called `dshSol`. You can run it from the terminal by first navigating in to the Hwk directory and typing the command `./dshSol`. 

#### Preliminary: Access of Environment Variables

Before we get started, we should first cover what environment variables are within shells. I tend to think of shells to be a suped-up command-line interface. They are the user interface to the OS before there were windows and desktops. Just like your windows environment, there are things that the shell needs to remember so that it's customized to you, specifically. Many of these customizations are stored in what are called **environment variables**. On one hand, often hold values that make the shell more convenient to use (for instance, remembering the path to your "home" directory), and on the other, they store values that customize the command-line environment to your liking (for instance, assigning various colors to files and directories.)

There are certain environment variables that are standard and predefined.

- If you're curious to see what's stored inside the `HOME` variable, you can use the following command on the command line:

    ```
    $ echo $HOME
    /home/dchiu
    ```

- You can also `echo` any environment variable `$VAR` to see its value, such as: `$SHELL` (what shell am I using?), `$PWD` (where am I?), `$PATH` (what are the paths to my executables?), and so on, ...

- Importantly for this assignment, to return the value of an environment variable, you can use the function [getenv()](https://man7.org/linux/man-pages/man3/getenv.3.html), provided in `#include <stdlib.h>`.


#### Handling Input

1. As soon as `dsh` starts, it should repeatedly provide the user with a command-line prompt: `dsh> ` Check out the example below:

    ```
    $ ./dsh
    dsh>
    ```

    From the Terminal, I run `./dsh` and it prints off the motd before sending me to a prompt, awaiting commands. I am now in the David Shell (dsh) environment, and am able to issue commands just like other when you're inside other shell.

2. At the `dsh>` prompt, the user would be able to enter a command which David Shell should attempt to _execute_ as a *separate* process.

   - Some commands may be followed by a list of arguments (for instance, `ls -l` and `ps au`), so you will have to read in the entire line and parse it later. Do do this, I would recommend looking into using [fgets()](https://www.cplusplus.com/reference/cstdio/fgets/), which has the following signature:

    ```c
    char* fgets(
      char* str, /* OUT */
      int num,   /* IN  */
      FILE* stream /* IN */
    )
    ```

    This function will read `num` characters from the `stream`, and place it in a pre-defined string buffer `str`. The `stream`, in our case, is simply `stdin` (the standard input device). The method will return a pointer to `str`. In your program, if the user's input is longer than 256 characters, you should ignore it and and simply output an error.
    Example:
    ```c
    char *line = (char*) malloc(256); // create an empty buffer to store the input
    fgets(line, 256, stdin);  // reads up to 256 characters into the buffer
    ```
    
      - You too may assume that user input will occupy no more than 256 characters.
      - Keep in mind that `fgets(..)` will gobble up everything you enter, including the trailing newline character from hitting the `enter` key!

3. Once you have the input line, you should *trim* it (that is, remove all preceding and trailing white space). If the trimmed input is an empty string (or rather, just a string that contains just a newline character), you should simply re-prompt.

##### Understanding Program Execution and Paths

After the line of  input is read, `dsh` will need to verify that the command entered is *valid*. There's an easy way to tell if it's valid, but first, we need to understand how file system paths work. To create a process and run a program, you need to construct its **full path** in the file system. An full path to a program, say `ls`, looks like this:

  ```
  /bin/ls
  ```

To locate the `ls` program, the OS needs to first traverse to the "root" directory or folder (that's the initial `/`), and from there, traverse into the `bin` directory. Then from `/bin`, to look for a file named `ls` in there. It's really nice when the user types out the full path to the program they want to run, but that's usually not going to be the case. (Try typing `/bin/ls` in your terminal. It works as advertised!) We typically only type `ls`, and it works, which means that shells must do some background processing to figure out _where_ to look for `ls`. 

So this is all pointing to a couple of modes of execution we need to support. The user might give the full path to an executable file, or the user might simply give the name of the executable file they want to run.

1.  **Mode 1 (full path given):** Say the user types in the full path to an executable. You know they typed a full path if their input starts begins with a `'/'` character! First, check to see if the given path even exists. To do this in C, I would first include the `unistd.h` file, and use its `access()` function:

    ```c
    if (access(path, F_OK | X_OK) == 0) {
        // File exists and is executable! Can run!
    }
    else {
        // No good! File doesn't exist or is not executable!
        // Alert user and re-prompt
    }
    ```

    - If the executable isn't found or if it can't be executed (see above snippet), then simply output an error to the screen, and re-display the `dsh>` prompt.

    - If the executable is found, then there are two further options for execution:

      - **Run in foreground:** Execute the path using `fork()` and `execv()` as you learned in class. The call to `execv()` requires the *full path* to the executable, which the user already gave you. Commands may have an arbitrary number of arguments that follow it, which are delimited by whitespace. You'll need to input the command line arguments into an array of strings, and pass it along to `execv()`.  When running a process in the foreground, the parent process (that is, `dsh`) must `wait()` for the child process to finish. Therefore, you would not expect to see the `dsh>` shell prompt again _until_ the child process terminates.

          - This is the usual mode of execution when you're on the terminal!

      - **Run in background:** If the last character in a valid command is an `&` symbol, it indicates that the command is to be run in the background. In other words, when the shell forks a child, it should **not** wait for the child to exit. After forking, the OS will commence running the new process concurrently with `dsh` (and all other processes). This means that you'll see `dsh>` being re-displayed immediately by the parent (`dsh`) process. If the child process prints to the screen, it'll interleave its outputs into the terminal.

        - This mode is useful when you're multitasking, and need to spin off a program, but get your command-line right back so you can run other programs!

2.  **Mode 2 (full path construction):** This case triggers when the input does _not_ start with a `/`. Now we've got some work to do before we can even `fork` and `exec`! We need find the _true_ location of the given command, and we'll use the following steps:

    - First, we'll check to see if the executable file can be found in the current working directory. That is, the location of where your shell thinks you're in. Look into using `getcwd()`, defined in `unistd.h`. Concatenate the user's input to the value of the current working directory, and see if it exists. If not, then move on to the next step.
      
      - For instance, if I typed `ls2` and my current working directory is `/home/dchiu`, then the first place my program would be `/home/dchiu/ls2`. Of course, this file may or may not exist... read on!

    - If the executable is found in the current working directory, then execute it and we're done! If it cannot be found in the current working directory, then there are other paths where it can be found. These paths are stored in the environment variable `PATH`.

    - For example, a `PATH` might hold this value:
      ```
      /opt/local/bin:/opt/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/texbin
      ```
      Basically, what you're seeing here is a `:`-delimited string that separates all the different locations to look for an executable file. Therefore, you need to split this string by `:`s, and concatenate the user's input to the end of each token. 
      
      Again, if I typed `ls2`, then the first location to try is `/opt/local/bin/ls2`, the second place to try is `/opt/local/sbin/ls2`, and so on. As soon as you detect that a full path to the executable exists, then try to run it and be done! Once you've tried all the paths in the environment variable, then you can output a `Command not found` error message and reprompt  for the next command.

##### Support of Built-in Commands

Some commands are not meant to invoke another program. Instead, they are to be handled directly by the shell by calling functions that you built-in. For example, when a user inputs `exit`, your shell is not supposed to attempt to find an executable named `exit` in the user's PATH!  In this case, `dsh` should simply terminate by exiting the loop. These special commands are called "builtins."

Here is a list of built-in commands that David shell needs to support.

- `exit` should exit dsh.

- `pwd` should print the current working directory. Look into `getcwd()`, defined in `unistd.h`.

- `cd [path]` should change the current working directory to the optionally given path. If path is not given, then dsh should change the working directory to the user's home directory, stored in the environment variable `HOME`. Look into the `chdir()` function, defined in `unistd.h`.


##### Flowchart of Activities

Phew! That's a lot to take in. The figure below shows the abstract flowchart for this program. This should (hopefully) give you a better idea of what all needs to be done.

<img src="figures/flowchart.png" width="500px" />

##### Hints

This assignment can be tricky to get started, because there are so many pieces that need to come together. Students in the past have gotten stuck on things that ultimately prevented them from getting very far. If I were tackling this assignment, I'd probably work on things in this order:

1. First, you need to figure out how to create an array of strings. This is important for invoking the `execv()` system call later on, and for the `split()` function (see next bullet point). Because strings are themselves arrays, then an array of strings is essentially a 2D array (or a pointer to pointers to chars). You can create an array of `num` strings as follows:

    ```c
    // this creates num pointers to strings
    char **array = (char**) malloc(num * sizeof(char*));

    // this loops through each array element and instantiates
    // an array of chars of length: CAPACITY
    for (int i = 0; i < num; i++) {
      array[i] = (char*) malloc(CAPACITY * sizeof(char));
    }

    // now I can assign strings to individual array elements
    for (int i = 0; i < num; i++) {
      strcpy(array[i], "hello world");
    }
    ```

2.  Write a function `char** split(char *str, char *delim)`, that has the same behavior as Java String's `split(..)`. Your function should input a string `str`, and a string delimiter, and return an array of substrings (tokens) split on the given delimiter. 

    - First, figure out the number of tokens that you will end up with. I would do this by counting the number of instances of the delimiter found in `str`. The number of tokens is just 1 plus that number and call this value `numTokens`.

    - Now use the previous bullet point to allocate `numTokens+1` pointers to chars. Then write your loop to malloc `numTokens` arrays of chars. (Yes, it is crucial that you only loop up to `numTokens`, and not `numTokens+1`).

    - Use the string function `strtok()` to loop through all of the tokens, and assign each to a corresponding element in your new array by using `strcpy()`. 

    - Because the user of your function wouldn't know the size of the array that you're returning, make sure you set the final element of your array to `NULL`. (This is why I had you malloc `NUMTOKENS+1` spots in the first place). Here's how you might use your new method:

    ```c
    //split cmd on whitespace!
    char cmd[] = "git add .";
    char **terms = split(cmd, " ");

    // print out all the tokens
    int i = 0;
    while (terms[i] != NULL) {
      printf("%s\n", terms[i]);
      i++;
    }
    ```

    Should result in the output below:

    ```
    git
    add
    .
    ```

    This function would be a huge workhorse for this project.

3.  Write the main command-prompt loop to repeatedly accept input. Test the `split(..)` function you just wrote on various inputs, including empty string.

    - You should be using `fgets()` to accept user inputs. Remember that the "enter" key is logged as a `'\n'` character at the end of the string! You'll probably want to truncate that newline character as soon as you obtain the user input, and that's as simple as putting the `'\0'` character in its place.

4.  Work on handling the built-in commands next.

5.  Work on command execution when given the full path to an executable. (Mode 1)

6.  Finally, work on execution when given just the name of an executable. (Mode 2)


#### Example Output

```
dsh> ls -la
-rw-r--r--@ 1 dchiu  faculty  199  Feb  3 22:56 .dsh_motd
-rw-r--r--@ 1 dchiu  faculty  1554 Feb  3 22:56 feelGood.c

dsh> NotARealCommand -o
ERROR: NotARealCommand not found!

dsh> cat feelGood.c
#include <stdio.h>
#include <unistd.h>
int main() {
  while (1) {
    printf("Students think you're inspiring!\n");
    sleep(4);
  }
  return 0;
}

dsh> gcc -Wall feelGood.c -o feelGood

dsh> ./feelGood &

dsh> ls -l
-rw-r--r--@ 1 dchiu  faculty  1554 Feb  3 22:56 feelGood
-rw-r--r--@ 1 dchiu  faculty  1554 Feb  3 22:56 feelGood.c
Students think you're inspiring!

dsh> exit
$
Students think you're inspiring!
Students think you're inspiring!
Students think you're inspiring!
```

#### Grading

```
This assignment will be graded out of 80 points:

[40pt] User input is properly handled, and invalid commands (not found in PATH or
    current working directory) generates an error.

[25pt] Running a valid command works as expected (in-foreground vs. in-background too).

[5pt] cd [path] works as expected, by changing the current directory to the path
    (if given), or $HOME (if not given).

[3pt] exit and pwd works as expected

[2pt] Your program observes good style and commenting.

[5pt] Your program is free of memory leaks and dangling pointers.
```

#### Submitting Your Assignment
1. Commit and push your code to your Github repo. Make sure your repo is public (or private and accessible by me).

2. On canvas, simply submit the URL to your Github repo. No other form of submission is accepted.


#### Credits

Written by David Chiu. 2022.
