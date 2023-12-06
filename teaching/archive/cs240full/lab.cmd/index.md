## CS 240 - Software Engineering

### In-Class Exercise: Command Line (~45min)

In this exercise you will be pulling up the terminal and trying out basic command line operations.

#### Student Outcomes

- Learn how to access your terminal
- Learn how to navigate your file system: `pwd`, `cd`, `ls`
- Learn how to manipulate your file system: `cp`, `mv`, `rm`, `less`, `tar`
- Practice setting permission: `chmod`
- Learn to use `nano` for simple text editing

#### Printable Cheat Sheet

Here is a [command-line cheat sheet](https://commons.wikimedia.org/wiki/File:Unix_command_cheatsheet.pdf) that you can download and print.

#### Prerequisites

- Ideally, you should have the git and Java installed on your machine, but they're big installs. Even if you don't have these yet, you should still be able to do the lab.
  - [https://git-scm.com/downloads](Download) and install git if not already installed. **For windows users** this is particularly important!!!
  - [https://www.java.com](Download) and install Java if not already installed.

#### Part 1 - Navigating the File System

- Open your terminal window. You can get to it in various ways, and it depends on your operating system (on a Mac, Terminal or iTerm; on windows, git-bash is a good option), so if you'd rather use your own terminal program, feel free! I think it's probably easiest to access the terminal through VS Code, since it's the same for both Windows and Mac users. From VS Code, Click on the `Terminal` menu, and click `New Terminal`. You should see the terminal window pop up on the bottom.

- Type the following command to download the files for this lab:

  ```
  git clone https://github.com/davidtchiu/cs240-lab-cmdline
  ```

  **Alternative method:** If, for some reason, you have yet to successfully install git on your machine, you can instead download and unzip the file by [going here](https://github.com/davidtchiu/cs240-lab-cmdline). Then click on the "Code" drop-down button, and select "Download ZIP." Take note of where you download this file to. Once downloaded, you should unzip it. Now go in your Terminal, and navigate to the new `cs240-lab-cmdline` directory. If you're using a Mac, it should be in your `Downloads` folder by default. I believe the same is true for Windows.

- After this succeeds, from the Terminal, list all files in the current directory. You should see a directory called `cs240-lab-cmdline`. Navigate into it, and print the current working directory, which shows you what directory you're "inside of." If you did this correctly, you should get an output like this:

  ```
  /Users/david/Downloads/cs240-lab-cmdline
  ```

Of course, the first part of your path will differ from mine.

- List all files. Remember that you can do this and get a simple output, as follows

  ```
  FastOddEvenSorter$FastOddEvenWorker.class       Heap.java                                       Sorter.ctxt
  FastOddEvenSorter.class                         ListFactory.class                               Sorter.java
  FastOddEvenSorter.ctxt                          ListFactory.ctxt                                Tester.class
  FastOddEvenSorter.java                          ListFactory.java                                Tester.ctxt
  Heap.class                                      README.TXT                                      Tester.java
  Heap.ctxt                                       Sorter.class                                    package.bluej
  ```

  Or, you can call out the details of each file, printed line-by-line, like this. Make sure you know how to print this version:

  ```
  -rw-r--r--@ 1 david  staff  2611 Jul 19 09:05 FastOddEvenSorter.java
  -rw-r--r--@ 1 david  staff  3388 Jul 19 09:05 Heap.class
  -rw-r--r--@ 1 david  staff  2144 Jul 19 09:05 Heap.ctxt
  -rw-r--r--@ 1 david  staff  5354 Jul 19 09:05 Heap.java
  -rw-r--r--@ 1 david  staff  1638 Jul 19 09:05 ListFactory.class
  -rw-r--r--@ 1 david  staff   680 Jul 19 09:05 ListFactory.ctxt
  -rw-r--r--@ 1 david  staff  2029 Jul 19 09:05 ListFactory.java
  -rw-r--r--@ 1 david  staff   471 Jul 19 09:05 README.TXT
  -rw-r--r--@ 1 david  staff  3506 Jul 19 09:05 Sorter.class
  -rw-r--r--@ 1 david  staff  2690 Jul 19 09:05 Sorter.ctxt
  -rw-r--r--@ 1 david  staff  8417 Jul 19 09:05 Sorter.java
  -rw-r--r--@ 1 david  staff  1455 Jul 19 09:05 Tester.class
  -rw-r--r--@ 1 david  staff   126 Jul 19 09:05 Tester.ctxt
  -rw-r--r--@ 1 david  staff  4437 Jul 19 09:05 Tester.java
  -rw-r--r--@ 1 david  staff  1515 Jul 19 09:05 package.bluej
  ```

- As you can see, this is just an old Java project that is compatible with BlueJ. Let's suppose that your instructor wants you to restructure the contents of this directory in a certain way before submission, and here's what you need to do:

  - Remove all files ending `.class`, `.ctxt`, and `.bluej`. You should not have remove files one-by-one... use the `*` wildcard.
  - Rename `README.TXT` to `README.txt`.
  - Create a new directory inside `cs240-lab-cmdline/` called `src` and all files ending in `.java` must be moved inside it.
  - If you list files again, you should see this in your working directory:
    ```
       -rw-r--r--@ 1 dchiu  staff  471 Jul 19 09:05 README.txt
       drwxr-xr-x@ 7 dchiu  staff  224 Jul 19 09:20 src
    ```

- **Permission** (For Mac Users Only): Hmm, the permissions to read any of these files are open to anybody on this system. That doesn't seem like a good idea, given that these are supposedly your homework files.

  - Make sure the owner of all remaining files belong to you (not `david`)
  - Now change permissions for all files ending in `.java` to the following:
    - Owner: read, write, execute
    - Group: none
    - Others: none
    - This should only take a single `chmod` command. If you did it correctly, you should see the following inside your `src/` directory.
      ```
      -rwx------@ 1 david  staff  2611 Jul 19 09:05 FastOddEvenSorter.java
      -rwx------@ 1 david  staff  5354 Jul 19 09:05 Heap.java
      -rwx------@ 1 david  staff  2029 Jul 19 09:05 ListFactory.java
      -rwx------@ 1 david  staff  8417 Jul 19 09:05 Sorter.java
      -rwx------@ 1 david  staff  4437 Jul 19 09:05 Tester.java
      ```

- **Permission** (For Windows Users Only): Windows users can skip this part. The binary numbering system does not work with Windows. Windows uses a different permission system, but it's not really important to us, since the servers I will provide you are not Windows machines.

#### Part 2 - `nano` Text Editor

- Let's edit this `README.txt` file with the following changes. Sure, you can use VS Code (or any other text editor) for this, but let's try one that's available within your shell. There is a text editor called `nano` that we can use. You can open a file for editing using the command `nano <filename>`. This should replace your Terminal window with the file editor. Try moving the cursor around using the directional keys, and make the following changes.

  - Change the PROJECT TITLE to `"Command Line Lab"`
  - Enter today's date after VERSION or DATE
  - Add your name to AUTHORS
  - Remove all remaining lines. You can delete entire lines by moving your cursor on the line by holding down the `control` key and pressing `k`. I'll indicate this sequence as `ctrl + k`. (This command is actually equivalent to a "cut", because it saves the deleted line onto nano's internal clipboard).
  - Save the file using `ctrl + o`. (And hit `enter` again to confirm)
  - Then close the file using `ctrl + x`.

- To be sure, I wouldn't ever recommend using `nano` for heavy-duty coding, but I find it to be pretty useful for viewing or making quick edits when you're working within the Terminal.

- Let's make some more changes to `Sorter.java`, but before we do, I want you to make a copy of it in case we screw up. Back out to the Terminal, make sure you're in the `src` directory, and make a copy of `Sorter.java` to `Sorter.java.sav`. List files and check the contents of `Sorter.java.sav` to be sure that the copy was successful.

- Now open `Sorter.java` in `nano`, and let's learn a few more commands (the following commands are only available in `nano` -- not all editors and certainly not within your shell!):

  - You can get the cursor location using `ctrl + c` (this tells you the line number and position, as well as the total line/word count)
  - Skip down to the next page using `ctrl + v`. Skip up using `ctrl + y`.
  - Search for (case insensitive) string-sequences using `ctrl + w`. (Can you figure out how to do a search-and-replace?)
  - Let's move the `shakerSort` method to the bottom of this class. We'll start by having you find `shakerSort` using `ctrl + w`. Move your cursor to the first line of its method comment, and we'll start cutting by hitting `ctrl + k` consecutive times until the method is totally removed. Don't worry, all those lines we just removed are saved on nano's clipboard. (And it's a different clipboard than your machine's, which means if you were to exit out of `nano` now, you'd lose `shakerSort`!). Now scroll down until you reach the end of the file, and paste the contents of your nano clipboard using `ctrl + u`.
  - Save and close this file to return to the Terminal.

#### Part 3 - Wrapping up

- Back in the Terminal, check to see if you're still be in the `src/` directory. If not, navigate to it. Let's compile this Java program and run it. You can compile using:

  ```
  javac Tester.java
  ```

  If, for some reason, `javac` doesn't exist on your machine, you can skip this part -- it's not of particular importance to the lab.

  Because `Tester.java` depends on the other `.java` files, those will be compiled automatically as well. It may complain about unchecked/unsafe operations, but it's just a warning that you can ignore for this exercise. In the unlikely case in which you get a compilation error, then that means you may have made a mistake moving `shakerSort` in the previous step. Go back in with `nano` and fix it.

- If you list files again, you should now see some `.class` files (those are the compiled versions of the source code). Let's create a new directory called `bin/` at the same level as `src/`. Move all the `.class` files into `bin/`.

  ```
  cs240-lab-cmdline/
  ├── README.txt
  ├── bin/
  │   ├── Heap.class
  │   ├── ListFactory.class
  │   ├── Sorter.class
  │   └── Tester.class
  └── src/
      ├── FastOddEvenSorter.java
      ├── Heap.java
      ├── ListFactory.java
      ├── Sorter.java
      └── Tester.java

  2 directories, 10 files
  ```

- Let's "zip" this directory structure up into a "tarball" file. Use this command:

  ```
  tar -czvf <output-filename.tar.gz> <directory-to-zip>
  ```

  List the contents of the current directory again to make sure your new `tar.gz` file exists.

- Go ahead and delete the _entire_ `cs240-lab-cmdline/` directory structure. (Don't worry, we just archived it in the tarball file.)

- Now unzip (extract) your `tar.gz` file by running:

  ```
  tar -xvf <your-filename.tar.gz>
  ```

  List directory contents to verify that the `cs240-lab-cmdline/` directory is fully restored.

- You may delete the entire `cs240-lab-cmdline` directory structure and the `tar.gz` file if you wish.

- This concludes the lab, and you should understand basic navigation and file manipulation in the shell.
