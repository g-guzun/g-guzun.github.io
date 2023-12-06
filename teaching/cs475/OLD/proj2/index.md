## CS 475 - Operating Systems

### Project 2: Xinu Ready Queue

As you're aware, through the implementation of the previous project, the current version of Xinu implements the FIFO scheduling policy. As we learned in class, the FIFO scheduling policy is "fair" in the sense that every process will in theory receive CPU time in the order that they were created. However, that is rarely what users of the computer system want or need. It would be desirable to be able to prioritize the execution of certain processes over others.

In this project, you will be implementing a priority scheduling policy with aging.

#### Student Outcomes

- To extend the Xinu scheduler to consider priority
- To implement an aging policy

#### Pair Assignments

You will be working with the following students. Just one submission per group is sufficient.

```
[B Williams, A Vermeulen]
[J Ota, L Aron]
[C Brace, M Sanchez-Forman]
[R Mathur, L Leary]
[S Park, K Schuh]
[T Gaeta, B Gamble]
[F Godfrey-Link, R Pietenpol]
[C Hong, R Weaver]
[E Shimanski, E Markewitz]
[B McAuliffe, J Kaeppel]
```

#### Starter Code

Starter code for this assignment is provided on the github repo. You are not required to submit your code to me on Github, but it's strongly recommended that you do.

- If you want to submit your code on Github, do this step. If not, you may skip this step. Make sure you already have a Github account. Login to github, and go here: [https://github.com/davidtchiu/cs475-proj2](https://github.com/davidtchiu/cs475-proj2). Choose to _*fork*_ this repository over to your github account to obtain your own copy. Copy the Github URL to _your_ newly forked project. Then follow the rest of the instructions below. From your Ubuntu virtual machine, open a terminal, and _*clone*_ your forked Github repo down to your local working directory using:

  ```
  git clone <your-github-url-for-this-project>
  ```

- If you aren't planning to submit your assignment via a Github link, then you can simply download the starter files onto your Ubuntu virtual machine using:

  ```
  git clone https://github.com/davidtchiu/cs475-proj2
  ```

#### Solution Executable

I've provided you with a precompiled solution called `xinuSol` in the `compile/` directory. If you're interested to see the proper behavior, navigate to `compile/` and run `./uploadSol.sh` to upload my precompiled kernel to the back-end VM. Then start up the back-end VM and run `minicom`.

#### Part 1: Preliminary

The required mechanisms to support priority scheduling is straightforward. We will start by adding a priority field to the PCB. We will then make the necessary changes to the FIFO queue you wrote for the previous project. Here's what you need to know (and do).

1. Go ahead and navigate into the new `proj2` directory. Before you do anything, let's take a look at the new `system/main.c` file.

   ```c
   /*  main.c  - main */

   #include <xinu.h>
   #include <stdio.h>

   void    bigargs(int32 argc, int32 *argv)
   {
     int a = argv[0];
     int b = argv[1];
     int c = argv[2];
     int d = argv[3];
     int e = argv[4];
     int f = argv[5];
     kprintf("bigargs(%d, %d, %d, %d, %d, %d) == %d\r\n", a, b, c, d, e, f, a+b+c+d+e+f);
   }


   void    printpid(int32 argc, int32 *argv)
   {
     int i;
     for (i=0; i<argv[0]; i++)
     {
         kprintf("This is process %d (%s)\r\n", currpid, proctab[currpid].prname);
         resched();
     }
   }

   int main(uint32 argc, uint32 *argv)
   {
     static uint32 args[] = {1, 2, 3};
     static uint32 *args1 = args;
     static uint32 args2[] = {10, 20, 30, 40, 50, 60};

     kprintf("Hello XINU WORLD!\r\n");

     //priority of process is input as the 3rd argument of create()
     ready(create((void*) printpid, INITSTK, 1, "PRINTER-1", 2, 1, args1++), FALSE);
     ready(create((void*) printpid, INITSTK, 5, "PRINTER-B", 2, 1, args1++), FALSE);
     ready(create((void*) printpid, INITSTK, 10, "PRINTER-C", 2, 1, args1++), FALSE);
     ready(create((void*) printpid, INITSTK, 5, "PRINTER-D", 2, 1, args1++), FALSE);
     ready(create((void*) bigargs, INITSTK, 5, "BIGARGS", 2, 6, args2), FALSE);

     return 0;
   }
   ```

   Nothing too special here to note, except for a subtle change to `create()`. It now accepts an additional argument (the 3rd argument to be exact), which is the process' priority value. In the example above, the priorities for the five jobs are: 1, 5, 10, 5, and 5, respectively.

#### Part 2: Priority Scheduling (Graded)

Priority scheduling can be implemented by extending our ready queue to a priority queue. Here's what you need to consider:

1. **PCB Modifications:** Add a field to the PCB structure which will store that process' priority. You **must** name this field `prprio`. Recall from your last assignment that the PCB is declared as `struct procent`.

- The data type for a priority in Xinu is defined as `pri16` (see `include/kernel.h`). It is simply an alias to `int16`, which implies that priorities _can_ take on negative values.

2. **Process Creation:** You now need to ensure that the code used to create processes provide an initial priority value. Modify the `create()` function (which is found in `system/create.c`) so that it accepts the new process' priority. Important: For things to work with my tester code, the priority input should be the 3rd argument in `create()`. Remember to modify `create()`'s prototype in `includes/prototypes.h` to reflect the changes.

3. **Extending to a Priority Queue:** Now we need to extend your queue structures and functions to consider priority. In effect, we want to update the FIFO queue you created in the previous project to be a priority queue. In a priority queue, each queue entry now additionally stores a _key_ field, and the entry with the largest key value is always at the head of the queue. There are several ways to implement this data structure. I'll outline one of the simpler ways:

- Modify `struct qentry` to include a new field, named `int32 key`. You might wonder why we don't declare this field as `pri16 prio`. Good design seeks to abstract and reduce specialization. Giving the field a generic data type and name allows it to have other uses.

- Modify `enqueue()` so that it takes a third argument, `int32 key` as input. This function will now insert the new entry in descending order of the key. That is, the highest key value will be stored at the head of the queue. Entries with equal key values should be appear in FIFO order.

4. You now need to modify `ready()` and `resched()` to use your new `enqueue()` function. You will assign the process' priority as its key in the priority queue.

5. Proper implementation of priority scheduling. In our implementation, we will assume that process' priority is specified as an integer, and a higher value implies higher priority.

   ```
   Hello XINU WORLD!
   This is process 4 (PRINTER-C)
   This is process 4 (PRINTER-C)
   This is process 4 (PRINTER-C)
   This is process 3 (PRINTER-B)
   This is process 5 (PRINTER-D)
   bigargs(10, 20, 30, 40, 50, 60) == 210
   This is process 3 (PRINTER-B)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 2 (PRINTER-1)

   All user processes have completed.
   ```

6. Notice that `PRINTER-1` starves until the end due to its low priority value of 1.

#### Part 3: Starvation and Aging (Graded)

Remember those dinosaur cartoons I showed you in class? [Of course you do](https://www.flickr.com/photos/48880420@N05/5166566802). As you saw in the lecture, low-priority processes are always preempted by higher-priority processes, and in theory, can be denied CPU time indefinitely (in OS lingo, we say that these low-priority processes starve).

One way to combat starvation is through **aging**, where processes eligible for execution (those on the ready queue) gain priority over time. You will implement an aging policy for your kernel that is invoked whenever `resched()` is called.

1. Define (`#define`) a kernel configuration parameter `AGING` in `include/kernel.h`, that when set to `TRUE`, will impose the aging policy, and when `FALSE`, the kernel will ignore the aging policy.

2. Define and implement your own aging policy. It must ensure that every process will eventually receive CPU time.

3. Note that there are two places to change process' priorities: `PCB` and the `readyqueue`.

4. Construct a test case that demonstrates process starvation when `AGING` is `FALSE`, but demonstrates aging when `AGING` is set to `TRUE`. Turn this test case in as your `system/main.c` (you can overwrite the file that I provided).

5. Below, the output with my aging policy enabled.

   ```
   Hello XINU WORLD!
   This is process 4 (PRINTER-C)
   This is process 4 (PRINTER-C)
   This is process 4 (PRINTER-C)
   This is process 3 (PRINTER-B)
   This is process 5 (PRINTER-D)
   bigargs(10, 20, 30, 40, 50, 60) == 210
   This is process 2 (PRINTER-1)
   This is process 3 (PRINTER-B)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   This is process 5 (PRINTER-D)
   All user processes have completed.
   ```

6. Notice that `PRINTER-1` no longer starves under my aging policy. My aging policy is simply:

   ```
   The priority of each process in the ready queue increases by one every time resched()
   is called (except for the nullproc process, the process that was just preempted, and
   the process that was just selected for scheduling). After it gets scheduled, a process'
   priority reverts back to its original priority.
   ```

   You must define and implement a different policy than mine, and demonstrate through `main.c` that yours is also working as expected when `AGING` is enabled.

#### Grading

```
This assignment will be graded out of 55 points:

[20pt] The struct queue and struct qentry now implement a priority queue.
       The enqueue() function must now insert a new entry in descending
       order of the key. Changes to ready() and resched() have been made
       to work with your new queue.

[20pt] An effective aging policy has been implemented, and is called by
       resched() when AGING is set to TRUE.

[10pt] Proper test case(s) that demonstrates the effectiveness of your
       aging policy is (are) provided in main.c.

[5pt] The README is written and placed in your project directory, with a
       lucid explanation of your test-case results. Your program observes
       good style and commenting.
```

#### Submitting Your Assignment

After you have completed the assignment, use the following to submit your work on Canvas. I assume you wrote your program inside your virtual machine. There are two options to submit your work.

1. If you pushed all your code to a Github repository: Make sure your Github repo is public, and simply submit the URL to your repo to me on Canvas.

2. If you'd rather submit a "zipped" file on Canvas, do the following .

   - Open the Terminal, navigate into your project's `compile/` directory. Run `make clean` to remove the binaries.

   - Zip up your project directory: `tar -czvf proj2_name1_name2.tar.gz proj2/` where name1 and name2 refer to your last names.

3. Go into canvas and click on `Submit Assignment`, and you should be able to "browse" for your file.

4. When you've selected the proper file, click Submit Assignment again to upload it.

5. You may submit as often as you'd like before the deadline. I will grade the most recent copy.

6. I do not need separate submissions from your partner!

#### Credits

Written by David Chiu, based on a previous project by [Prof. John Donaldson](https://www.cs.oberlin.edu/~jdonalds/). 2015
